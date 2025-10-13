import axios from 'axios';
import { env } from 'node:process';
import { performTokenRefresh } from '../app/actions/perform-token-refresh';
import { saveTokens } from '../app/actions/save-tokens';
import { getBlinqTokens } from '../app/server/get-profile-data';

const httpClient = axios.create({
  baseURL: env.BLINQ_API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag para evitar múltiplas tentativas de refresh simultâneas
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Interceptador para adicionar o token automaticamente
httpClient.interceptors.request.use(async config => {
  try {
    const tokens = await getBlinqTokens();

    config.headers.set('Accept', 'application/json');
    config.headers.set('Content-Type', 'application/json');
    config.headers.set('Authorization', `Bearer ${tokens.access_token}`);
    config.headers.set('Access-Control-Allow-Origin', '*');

    return config;
  } catch (error) {
    console.error('Erro ao obter token:', error);
    return config;
  }
});

// Interceptador para tratar respostas e erros
httpClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Se já estiver fazendo refresh, coloca a requisição na fila
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return httpClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const currentTokens = await getBlinqTokens();
        const newTokens = await performTokenRefresh(
          currentTokens.refresh_token
        );

        // Salva os novos tokens
        await saveTokens(newTokens);

        // Processa a fila de requisições pendentes
        processQueue(null, newTokens.access_token);

        // Refaz a requisição original com o novo token
        originalRequest.headers['Authorization'] =
          `Bearer ${newTokens.access_token}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        console.error('Erro ao renovar token:', refreshError);

        // Redireciona para login ou limpa tokens
        // window.location.href = '/login'; // Se estiver no client-side

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;

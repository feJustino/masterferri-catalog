import { BlingTokens } from '../entities/DTO/blinq';
import axios from 'axios';
import { env } from 'node:process';
import { BASIC_AUTH } from './constants';

// Cliente separado para refresh token (evita dependência circular)
const tokenClient = axios.create({
  baseURL: env.BLINQ_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export async function performTokenRefresh(
  refreshToken: string
): Promise<BlingTokens> {
  try {
    // Validar se o refresh token existe
    if (!refreshToken) {
      throw new Error('Refresh token não encontrado');
    }

    // Preparar dados para URL encoded
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    const tokenResponse = await tokenClient.post('/oauth/token', params, {
      headers: {
        Authorization: `Basic ${BASIC_AUTH}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Validar resposta
    if (!tokenResponse.data.access_token) {
      throw new Error('Token de acesso não recebido na resposta');
    }

    const tokens: BlingTokens = {
      access_token: tokenResponse.data.access_token,
      refresh_token: tokenResponse.data.refresh_token || refreshToken, // Fallback para o token atual
      expires_in: tokenResponse.data.expires_in,
      token_type: tokenResponse.data.token_type,
      scope: tokenResponse.data.scope,
      expires_at: Date.now() + tokenResponse.data.expires_in * 1000,
    };

    return tokens;
  } catch (error) {
    console.error('Erro ao renovar token:', error);

    throw error;
  }
}

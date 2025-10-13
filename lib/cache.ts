import NodeCache from 'node-cache';

// Cache com TTL de 24 horas (86400 segundos)
const cache = new NodeCache({
  stdTTL: 60 * 60 * 24, // 24 horas
  checkperiod: 60 * 60, // Verifica expiração a cada 60 minutos
  useClones: false, // Melhor performance, não clona objetos
});

export default cache;

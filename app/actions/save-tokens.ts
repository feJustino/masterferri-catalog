import { BlingTokens } from '../entities/DTO/blinq';
import { db } from '../../lib/firebase';

export async function saveTokens(tokens: BlingTokens): Promise<void> {
  try {
    const tokenData = {
      ...tokens,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    // Salvar token atual
    await db.collection('bling_tokens').doc('current').set(tokenData);

    console.info('Tokens salvos no Firebase', {
      expiresAt: new Date(tokens.expires_at).toISOString(),
      collection: 'bling_tokens',
    });
  } catch (error) {
    console.error('Erro ao salvar tokens no Firebase', error as Error);
    throw new Error('Falha ao persistir tokens no Firebase');
  }
}

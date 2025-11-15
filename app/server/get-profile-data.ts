'server-only';
import { db } from '@/lib/firebase';
import { BlingTokens } from '../entities/DTO/blinq';

export async function getBlinqTokens() {
  const snapshot = await db.collection('bling_tokens').doc('current').get();
  return snapshot.data() as BlingTokens;
}

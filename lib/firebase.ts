import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const decodeKey = Buffer.from(
  process.env.FIREBASE_PRIVATE_KEY!,
  'base64'
).toString('utf-8');

const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: decodeKey,
});

if (!getApps().length) {
  initializeApp({
    credential: firebaseCert,
  });
}

// Export a function to get the database instance
export function getDb() {
  return getFirestore();
}

// If you need the cert for other purposes, export it as a function too
export function getFirebaseCert() {
  return firebaseCert;
}
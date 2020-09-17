import * as firebaseAdmin from 'firebase-admin'
import firebaseAdminConfig from '../config/firebaseAdminConfig.json'
/**
 * DO NOT READ IT FROM CLIENT
 * */
export function getAdmin(): firebaseAdmin.app.App {
  if (firebaseAdmin.apps.length > 0) {
    return firebaseAdmin.apps[0] as firebaseAdmin.app.App
  }
  const app = firebaseAdmin.initializeApp({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    credential: firebaseAdmin.credential.cert(firebaseAdminConfig as any),
  })
  return app
}

export async function verifyIdToken(idToken: string) {
  const admin = getAdmin()
  const verifedIdToken = await admin.auth().verifyIdToken(idToken)
  return verifedIdToken
}

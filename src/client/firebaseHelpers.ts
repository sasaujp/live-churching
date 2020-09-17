import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyByWnjayeOazTaAtYNygH7gU3Ng8OxKqHk',
  authDomain: 'live-churching.firebaseapp.com',
}

const AppConntainer: {
  app: firebase.app.App | null
} = { app: null }

export function getApp() {
  if (AppConntainer.app) {
    return AppConntainer.app
  }
  if (firebase.apps.length > 0) {
    return (AppConntainer.app = firebase.app())
  }
  console.log(firebaseConfig)
  AppConntainer.app = firebase.initializeApp(firebaseConfig)
  // firebase.analytics() // TODO
  return AppConntainer.app
}

export function getAuth() {
  console.log(getApp())
  return getApp().auth()
}

export async function loginAnonymously(): Promise<firebase.auth.UserCredential | null> {
  try {
    const user = await firebase.auth().signInAnonymously()
    console.log(user)
    return user
  } catch (error) {
    console.error('login failed', error)
    return null
  }
}

export const loginWithGithub = async () => {
  console.log('loginWithGithub')
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    const user = await firebase.auth().signInWithPopup(provider)
    console.log(user)
  } catch (error) {
    console.error('login failed', error)
  }
}

export const linkWithGithub = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    const user = await firebase.auth().currentUser?.linkWithPopup(provider)
    console.log(user)
  } catch (error) {
    console.error('login failed', error)
  }
}

export const logout = async () => {
  try {
    const user = await firebase.auth().signOut()
    console.log(user)
  } catch (error) {
    console.error('login failed', error)
  }
}

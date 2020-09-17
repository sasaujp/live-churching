import React from 'react'
import { GetServerSideProps } from 'next'
import { useAuthState } from 'react-firebase-hooks/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'
import { getAuth, logout } from '../client/firebaseHelpers'
import { Header } from '../client/components/Header'
import { useCurrentUserQuery, useDummyMutation } from '../client/gen/graph'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

const Main: React.FC = () => {
  const [user, loading] = useAuthState(getAuth())
  return (
    <main>
      <Header />
      {!loading && user ? (
        <>
          <button type="button" onClick={() => logout()}>
            Logout
          </button>
          <GraphqlExample />
        </>
      ) : (
        <StyledFirebaseAuth
          uiConfig={{
            signInFlow: 'popup',
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
            callbacks: {
              signInSuccessWithAuthResult: () => {
                return false
              },
            },
          }}
          firebaseAuth={firebase.auth()}
        />
      )}
    </main>
  )
}
export default Main

const GraphqlExample: React.FC = () => {
  const currentUserQuery = useCurrentUserQuery()
  const [dummy, result] = useDummyMutation()
  return (
    <div>
      <div>uid: {currentUserQuery.data?.currentUser?.id}</div>
      <div>name: {currentUserQuery.data?.currentUser?.name}</div>
      <button
        type="button"
        disabled={result.loading}
        onClick={async () => {
          const res = await dummy({ variables: {} })
          console.log(res.data?.dummy?.error)
        }}
      >
        run command
      </button>
    </div>
  )
}

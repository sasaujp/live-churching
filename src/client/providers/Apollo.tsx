import React from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getAuth } from '../firebaseHelpers'

const httpLink = createHttpLink({
  uri: '/api/graphql',
})

const cache = new InMemoryCache()

const authLink = setContext(async (_, { headers }) => {
  const auth = getAuth()
  let token: string | undefined
  if (auth && auth.currentUser) {
    try {
      token = await auth.currentUser.getIdToken(true)
    } catch (err) {
      console.log(err)
    }
  }
  return {
    headers: {
      ...headers,
      // eslint-disable-next-line no-underscore-dangle
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})

export const Apollo: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

import 'isomorphic-unfetch'
import { NextApiResponse, NextApiRequest } from 'next'
import { ApolloServer } from 'apollo-server-micro'
import { resolvers } from '../../server/graphqlResolver'
import typeDefs from '../../../graphql/schema.graphql'
import { verifyIdToken } from '../../server/firebaseAdminHelpers'

const getIdTokenFromReq = (req: NextApiRequest) => {
  const idToken = req.headers.authorization as string
  return idToken?.replace(/^Bearer (.*)/, '$1')
}

const apolloServer = new ApolloServer({
  typeDefs,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolvers: resolvers as any,
  async context(args) {
    const { req } = args
    const idToken = getIdTokenFromReq(req)
    if (idToken != null) {
      const decoded = await verifyIdToken(idToken)
      return { idToken: decoded }
    }
    return { idToken: null, decoded: null }
  },
})
export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export default (req: NextApiRequest, res: NextApiResponse) => {
  return handler(req, res)
}

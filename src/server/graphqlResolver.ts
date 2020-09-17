import { QueryResolvers, MutationResolvers, Resolvers } from './gen/graph'

type Context = { idToken: { uid: string; name: string } | null }

const Query: QueryResolvers<Context> = {
  async currentUser(_parent, _args, context, _info) {
    console.log('cotext', context)
    if (context.idToken) {
      console.log(context)
      return {
        id: context.idToken.uid,
        name: context.idToken.name,
      }
    }
    return null
  },
}

const Mutation: MutationResolvers<Context> = {
  async dummy(_parent, _args, _context, _info) {
    if (_context.idToken?.uid == null) {
      throw new Error('need auth')
    }
    return {
      error: false,
    }
  },
}

export const resolvers: Resolvers<Context> = {
  Query,
  Mutation,
}

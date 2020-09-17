import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  dummy?: Maybe<DummyResponse>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type DummyResponse = {
  __typename?: 'DummyResponse';
  error: Scalars['Boolean'];
};

export type DummyMutationVariables = Exact<{ [key: string]: never; }>;


export type DummyMutation = (
  { __typename?: 'Mutation' }
  & { dummy?: Maybe<(
    { __typename?: 'DummyResponse' }
    & Pick<DummyResponse, 'error'>
  )> }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);


export const DummyDocument = gql`
    mutation dummy {
  dummy {
    error
  }
}
    `;
export type DummyMutationFn = Apollo.MutationFunction<DummyMutation, DummyMutationVariables>;

/**
 * __useDummyMutation__
 *
 * To run a mutation, you first call `useDummyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDummyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dummyMutation, { data, loading, error }] = useDummyMutation({
 *   variables: {
 *   },
 * });
 */
export function useDummyMutation(baseOptions?: Apollo.MutationHookOptions<DummyMutation, DummyMutationVariables>) {
        return Apollo.useMutation<DummyMutation, DummyMutationVariables>(DummyDocument, baseOptions);
      }
export type DummyMutationHookResult = ReturnType<typeof useDummyMutation>;
export type DummyMutationResult = Apollo.MutationResult<DummyMutation>;
export type DummyMutationOptions = Apollo.BaseMutationOptions<DummyMutation, DummyMutationVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    name
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
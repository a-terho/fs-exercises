import { gql } from '@apollo/client';
import { REVIEW_DATA, REPO_LIST_DATA } from './fragments';

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
      totalCount
      edges {
        node {
          ...RepoListData
        }
      }
    }
  }

  ${REPO_LIST_DATA}
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepoListData
      url
      reviews {
        edges {
          node {
            ...ReviewData
          }
        }
      }
    }
  }

  ${REPO_LIST_DATA}
  ${REVIEW_DATA}
`;

export const ME = gql`
  query GetUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewData
          }
        }
      }
    }
  }

  ${REVIEW_DATA}
`;

import { gql } from '@apollo/client';
import { REVIEW_DATA, REPO_LIST_DATA, PAGE_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...RepoListData
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }

  ${REPO_LIST_DATA}
  ${PAGE_INFO}
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!, $numReviews: Int, $afterReview: String) {
    repository(id: $id) {
      ...RepoListData
      url
      reviews(first: $numReviews, after: $afterReview) {
        edges {
          node {
            ...ReviewData
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }

  ${REPO_LIST_DATA}
  ${REVIEW_DATA}
  ${PAGE_INFO}
`;

export const ME = gql`
  query GetUser($includeReviews: Boolean = false, $first: Int, $after: String) {
    me {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewData
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }

  ${REVIEW_DATA}
  ${PAGE_INFO}
`;

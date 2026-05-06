import { gql } from '@apollo/client';
import { REPO_LIST_DATA } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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

import { gql } from '@apollo/client';

export const REPO_LIST_DATA = gql`
  fragment RepoListData on Repository {
    id
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
  }
`;

export const REVIEW_DATA = gql`
  fragment ReviewData on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      id
      ownerName
      name
    }
  }
`;

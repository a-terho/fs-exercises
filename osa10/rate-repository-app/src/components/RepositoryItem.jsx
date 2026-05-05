import { Text } from 'react-native';

const RepositoryItem = ({
  fullName,
  description,
  language,
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
}) => {
  return (
    <>
      <Text>Full name: {fullName}</Text>
      <Text>Description: {description}</Text>
      <Text>Language: {language}</Text>
      <Text>Stars: {stargazersCount}</Text>
      <Text>Forks: {forksCount}</Text>
      <Text>Reviews: {reviewCount}</Text>
      <Text>Rating: {ratingAverage}</Text>
    </>
  );
};

export default RepositoryItem;

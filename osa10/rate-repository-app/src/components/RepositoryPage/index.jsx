import { FlatList, View } from 'react-native';
import { useParams } from 'react-router-native';

import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY } from '../../graphql/queries';

import ItemSeparator from '../ItemSeparator';
import RepositoryListItem from '../RepositoryList/ListItem';
import ReviewItem from './ReviewItem';

const RepositoryPage = () => {
  const params = useParams();

  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id: params.id },
  });

  if (loading || error) return null;

  const { reviews, ...repo } = data.repository;

  // manipuloidaan arviodata sopivaan muotoon
  const userReviews = reviews
    ? reviews.edges.map((edge) => {
        const { __typename, ...review } = edge.node;
        return review;
      })
    : [];

  return (
    // flexShrink = sovita käytettävissä olevaan tilaan (eli näyttöön)
    <View style={{ flexShrink: 1 }}>
      <FlatList
        ListHeaderComponent={<RepositoryListItem data={repo} />}
        data={userReviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item: review }) => (
          <ReviewItem key={review.id} data={review} />
        )}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

export default RepositoryPage;

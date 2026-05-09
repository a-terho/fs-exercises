import { FlatList, View } from 'react-native';
import { useParams } from 'react-router-native';

import ItemSeparator from './shared/ItemSeparator';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

import useRepository from '../hooks/useRepository';

const RepositoryPage = () => {
  const params = useParams();
  const { repository, reviews, fetchMoreReviews } = useRepository({
    id: params.id,
    numReviews: 5,
  });

  return (
    // flexShrink = sovita käytettävissä olevaan tilaan (eli näyttöön)
    <View style={{ flexShrink: 1 }}>
      <FlatList
        ListHeaderComponent={<RepositoryItem data={repository} />}
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item: review }) => {
          const title = review.user.username;
          return <ReviewItem key={review.id} title={title} data={review} />;
        }}
        onEndReached={fetchMoreReviews}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

export default RepositoryPage;

import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';

import ButtonPressable from './ButtonPressable';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';
import Text from './Text';

import useMyReviews from '../hooks/useMyReviews';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    margin: 15,
  },
});

const MyReviews = () => {
  const { reviews, loading, deleteMyReview, fetchMoreReviews } = useMyReviews({
    first: 4,
  });

  const navigate = useNavigate();
  const navigateToRepo = (id) => navigate(`/repos/${id}`);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={reviews}
        renderItem={({ item: review }) => {
          const title = `${review.repository.ownerName}/${review.repository.name}`;
          return (
            <>
              <ReviewItem key={review.id} title={title} data={review} />
              <View style={styles.buttonContainer}>
                <ButtonPressable
                  style={{ flex: 1 }}
                  text="View repository"
                  onPress={() => navigateToRepo(review.repository.id)}
                />
                <ButtonPressable
                  style={{ flex: 1 }}
                  type="cancel"
                  text="Delete review"
                  onPress={() =>
                    Alert.alert(
                      'Delete review',
                      'Are you sure you want to delete this review?',
                      [
                        {
                          text: 'Delete',
                          onPress: () => deleteMyReview(review.id),
                        },
                        { text: 'Cancel', style: 'cancel', isPreferred: true },
                      ],
                      { cancelable: true },
                    )
                  }
                />
              </View>
            </>
          );
        }}
        ListEmptyComponent={
          !loading && reviews.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>You have not made any reviews yet</Text>
            </View>
          ) : null
        }
        onEndReached={fetchMoreReviews}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

export default MyReviews;

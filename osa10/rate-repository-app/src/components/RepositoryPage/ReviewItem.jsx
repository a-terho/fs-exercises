import { View, StyleSheet } from 'react-native';
import theme from '../../theme';

import Text from '../Text';

const styles = StyleSheet.create({
  itemContainer: {
    padding: 8,
    flexDirection: 'row',
    gap: 12,
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  textContainer: {
    flexShrink: 1,
  },
  headerText: {
    marginBottom: 8,
  },
});

const ReviewItem = ({ data }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <View style={styles.itemContainer}>
        <View style={styles.rating}>
          <Text icon color="primary">
            {data.rating}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.headerText}>
            <Text subheading strong>
              {data.user.username}
            </Text>
            <Text subheading color="textSecondary">
              {formatDate(data.createdAt)}
            </Text>
          </View>
          <Text>{data.text}</Text>
        </View>
      </View>
    </>
  );
};

export default ReviewItem;

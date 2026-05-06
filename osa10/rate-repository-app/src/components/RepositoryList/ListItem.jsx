import { Image, View, StyleSheet } from 'react-native';

import Text from '../Text';

import Tag from './Tag';
import Stat from './Stat';

const styles = StyleSheet.create({
  icon: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  itemContainer: {
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  headerTextContainer: {
    flexShrink: 1,
    gap: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  statContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
});

const RepositoryItem = ({
  fullName,
  description,
  language,
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
  ownerAvatarUrl,
}) => {
  return (
    <View testID="repositoryItem" style={styles.itemContainer}>
      <View style={styles.headerContainer}>
        <Image style={styles.icon} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.headerTextContainer}>
          <Text strong subheading>
            {fullName}
          </Text>
          <Text subheading color="textSecondary">
            {description}
          </Text>
          <View style={styles.tagContainer}>
            <Tag text={language} />
          </View>
        </View>
      </View>
      <View style={styles.statContainer}>
        <Stat number={stargazersCount} label="Stars" />
        <Stat number={forksCount} label="Forks" />
        <Stat number={reviewCount} label="Reviews" />
        <Stat number={ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;

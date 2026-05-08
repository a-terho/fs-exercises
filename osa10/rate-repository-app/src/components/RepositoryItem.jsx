import { Image, View, Pressable, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

import ButtonPressable from './shared/ButtonPressable';
import Text from './shared/Text';

import Tag from './RepositoryList/Tag';
import Stat from './RepositoryList/Stat';

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
    marginBottom: 10,
    flexDirection: 'row',
    gap: 10,
  },
});

const RepositoryItem = ({ onPress, data }) => {
  const openURL = () => Linking.openURL(data.url);

  if (!data) return null;

  return (
    <View testID="repositoryItem" style={styles.itemContainer}>
      <Pressable style={styles.headerContainer} onPress={onPress}>
        <Image style={styles.icon} source={{ uri: data.ownerAvatarUrl }} />
        <View style={styles.headerTextContainer}>
          <Text strong subheading>
            {data.fullName}
          </Text>
          <Text subheading color="textSecondary">
            {data.description}
          </Text>
          <View style={styles.tagContainer}>
            <Tag text={data.language} />
          </View>
        </View>
      </Pressable>
      <View style={styles.statContainer}>
        <Stat number={data.stargazersCount} label="Stars" />
        <Stat number={data.forksCount} label="Forks" />
        <Stat number={data.reviewCount} label="Reviews" />
        <Stat number={data.ratingAverage} label="Rating" />
      </View>
      {data.url ? (
        <ButtonPressable text="Open in GitHub" onPress={openURL} />
      ) : null}
    </View>
  );
};

export default RepositoryItem;

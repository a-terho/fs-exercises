import { Image, View, Pressable, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY } from '../../graphql/queries';

import Text from '../Text';
import { SubmitButton } from '../styled';

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
    marginBottom: 10,
    flexDirection: 'row',
    gap: 10,
  },
});

const RepositoryItem = ({ onPress, ...props }) => {
  const params = useParams();

  const { data } = useQuery(GET_REPOSITORY, {
    variables: { id: params.id },
  });

  // renderöityvän datan lähde valitaan url perusteella
  let repo = {};
  if (params.id && data) {
    // käytetään queryn palauttamaa dataa, vastauksessa on
    // __typename kenttä, joka poistetaan destrukturoimalla
    const { __typename, ...rest } = data.repository;
    repo = rest;
  } else {
    // käytetään komponentin propsien kautta välitettyä dataa
    repo = props;
  }

  const openGitHub = () => Linking.openURL(repo.url);

  return (
    <View testID="repositoryItem" style={styles.itemContainer}>
      <Pressable style={styles.headerContainer} onPress={onPress}>
        <Image style={styles.icon} source={{ uri: repo.ownerAvatarUrl }} />
        <View style={styles.headerTextContainer}>
          <Text strong subheading>
            {repo.fullName}
          </Text>
          <Text subheading color="textSecondary">
            {repo.description}
          </Text>
          <View style={styles.tagContainer}>
            <Tag text={repo.language} />
          </View>
        </View>
      </Pressable>
      <View style={styles.statContainer}>
        <Stat number={repo.stargazersCount} label="Stars" />
        <Stat number={repo.forksCount} label="Forks" />
        <Stat number={repo.reviewCount} label="Reviews" />
        <Stat number={repo.ratingAverage} label="Rating" />
      </View>
      {/* vain yksilöidyn kyselyn yhteydessä palautuu url kenttä */}
      {repo.url && (
        <Pressable onPress={openGitHub}>
          <SubmitButton>Open in GitHub</SubmitButton>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;

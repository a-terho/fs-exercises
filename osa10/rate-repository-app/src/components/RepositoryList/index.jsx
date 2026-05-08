import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import { useDebouncedCallback } from 'use-debounce';

import theme from '../../theme';

import ItemSeparator from '../shared/ItemSeparator';
import RepositoryItem from '../RepositoryItem';
import TextInput from '../shared/TextInput';
import Text from '../shared/Text';

import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  filter: {
    backgroundColor: theme.colors.bgFilter,
    padding: 12,
    margin: 5,
    borderRadius: 5,
  },
});

const selectionPrinciples = [
  {
    label: 'Latest repositories',
    value: {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
    },
  },
  {
    label: 'Highest rated repositories',
    value: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
    },
  },
  {
    label: 'Lowest rated repositories',
    value: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
    },
  },
];

export const RepositoryListContainer = ({ repositories, query }) => {
  const [variables, setVariables] = useState({});
  const [filter, setFilter] = useState('');

  // tallennetaan merkkijonona, koska selain ei tykkää objektiarvoista
  // valintakentässä, tämä on toki vähän hack-fiksaus tähän ongelmaan
  const [selectionPriciple, setSelectionPrinciple] = useState(
    JSON.stringify(selectionPrinciples[0].value),
  );

  const debouncedFilter = useDebouncedCallback(
    (value) => updateQueryVariables({ searchKeyword: value }),
    500,
  );

  const updateQueryVariables = (object) => {
    const newVariables = { ...variables, ...object };
    setVariables(newVariables);
    query.refetch(newVariables); // tee kysely uudelleen päivitetyillä muuttujilla
  };

  const changeSelectionPrinciple = (value) => {
    setSelectionPrinciple(value);
    updateQueryVariables(JSON.parse(value));
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const navigate = useNavigate();
  const navigateToRepo = (id) => navigate(`/repos/${id}`);

  return (
    // flexShrink = sovita käytettävissä olevaan tilaan (eli näyttöön)
    <View style={{ flexShrink: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            <TextInput
              placeholder="Filter repositories..."
              style={styles.filter}
              onChangeText={(text) => {
                setFilter(text);
                debouncedFilter(text);
              }}
              value={filter}
            />
            <Picker
              selectedValue={selectionPriciple}
              onValueChange={changeSelectionPrinciple}
            >
              {selectionPrinciples.map((principle) => (
                <Picker.Item
                  key={principle.label}
                  label={principle.label}
                  value={JSON.stringify(principle.value)}
                />
              ))}
            </Picker>
          </>
        }
        data={repositoryNodes}
        renderItem={({ item: repository }) => (
          <RepositoryItem
            key={repository.id}
            onPress={() => navigateToRepo(repository.id)}
            data={repository}
          />
        )}
        onEndReached={query.fetchMore}
        ListEmptyComponent={
          !query.loading && repositoryNodes.length === 0 ? (
            <Text style={{ margin: 5 }}>No repositories found</Text>
          ) : null
        }
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

const RepositoryList = () => {
  const { repositories, loading, refetch, fetchMore } = useRepositories({
    first: 4,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      query={{ loading, refetch, fetchMore }}
    />
  );
};

export default RepositoryList;

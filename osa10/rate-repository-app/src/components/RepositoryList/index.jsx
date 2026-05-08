import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import { useDebouncedCallback } from 'use-debounce';

import theme from '../../theme';

import ItemSeparator from '../ItemSeparator';
import ListItem from './ListItem';
import TextInput from '../TextInput';

const styles = StyleSheet.create({
  filter: {
    backgroundColor: theme.colors.bgFilter,
    padding: 12,
    margin: 5,
    borderRadius: 5,
  },
});

import useRepositories from '../../hooks/useRepositories';

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

export const RepositoryListContainer = ({ repositories, refetch }) => {
  const [variables, setVariables] = useState({});
  const [filter, setFilter] = useState('');

  const [selectionPriciple, setSelectionPrinciple] = useState(
    selectionPrinciples[0].value,
  );
  const debouncedFilter = useDebouncedCallback(
    (value) => filterRepositories(value),
    500,
  );

  const updateQueryVariables = (object) => {
    const newVariables = { ...variables, ...object };
    setVariables(newVariables);
    refetch(newVariables); // tee kysely uudelleen päivitetyillä muuttujilla
  };

  const changeSelectionPrinciple = (value) => {
    setSelectionPrinciple(value);
    updateQueryVariables(value);
  };

  const filterRepositories = (value) => {
    updateQueryVariables({ searchKeyword: value });
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
                <Picker.Item label={principle.label} value={principle.value} />
              ))}
            </Picker>
          </>
        }
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item: repo }) => (
          <ListItem
            key={repo.id}
            onPress={() => navigateToRepo(repo.id)}
            data={repo}
          />
        )}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

const RepositoryList = () => {
  const { repositories, refetch } = useRepositories();

  return (
    <RepositoryListContainer repositories={repositories} refetch={refetch} />
  );
};

export default RepositoryList;

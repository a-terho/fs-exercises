import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';

import ItemSeparator from '../ItemSeparator';
import ListItem from './ListItem';

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
  const [selectionPriciple, setSelectionPrinciple] = useState(
    selectionPrinciples[0].value,
  );

  const changeSelectionPrinciple = (value) => {
    setSelectionPrinciple(value);
    refetch(value); // päivitä kyselyn tiedot uudelleen palvelimelta
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
          <Picker
            selectedValue={selectionPriciple}
            onValueChange={changeSelectionPrinciple}
          >
            {selectionPrinciples.map((principle) => (
              <Picker.Item label={principle.label} value={principle.value} />
            ))}
          </Picker>
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

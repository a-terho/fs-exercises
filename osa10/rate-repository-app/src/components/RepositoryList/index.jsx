import { FlatList, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import useRepositories from '../../hooks/useRepositories';

import ItemSeparator from '../ItemSeparator';
import ListItem from './ListItem';

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const navigate = useNavigate();
  const navigateToRepo = (id) => navigate(`/repos/${id}`);

  return (
    // flexShrink = sovita käytettävissä olevaan tilaan (eli näyttöön)
    <View style={{ flexShrink: 1 }}>
      <FlatList
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
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;

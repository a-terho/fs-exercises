import { FlatList, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import useRepositories from '../../hooks/useRepositories';
import theme from '../../theme';

import ListItem from './ListItem';

const styles = StyleSheet.create({
  list: { maxWidth: theme.maxWidth },
});

const ItemSeparator = () => <View style={theme.itemSeperator} />;

export const RepositoryListContainer = ({ repositories }) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const navigate = useNavigate();
  const navigateToRepo = (id) => navigate(`/repos/${id}`);

  return (
    <>
      <FlatList
        style={styles.list}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item: repo }) => (
          <ListItem
            key={repo.id}
            onPress={() => navigateToRepo(repo.id)}
            {...repo}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;

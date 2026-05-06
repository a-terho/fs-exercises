import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../../hooks/useRepositories';
import theme from '../../theme';

import ListItem from './ListItem';

const styles = StyleSheet.create({
  list: {
    maxWidth: theme.maxWidth,
  },
});

const ItemSeparator = () => <View style={theme.itemSeperator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      <FlatList
        style={styles.list}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item: props }) => <ListItem key={props.id} {...props} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default RepositoryList;

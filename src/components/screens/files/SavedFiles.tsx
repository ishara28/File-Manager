import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {removeFile} from '../../../redux/actions/fileActions';
import FileItem from '../../shared/FileItem';
import {Button, Text} from 'react-native-paper';
import RNFS from 'react-native-fs';

const SavedFiles = () => {
  const files = useSelector((state: RootState) => state.files.files);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const deleteFile = async (uri: string) => {
    dispatch(removeFile(uri));
    await RNFS.unlink(uri);
  };

  const sortedFiles = () => {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedFiles = files.slice(startIndex, endIndex);
    return slicedFiles.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedFiles()}
        keyExtractor={item => item.uri}
        renderItem={({item}) => <FileItem item={item} onDelete={deleteFile} />}
      />
      {files.length !== 0 ? (
        <View style={styles.pagination}>
          <Button onPress={prevPage} disabled={page === 0}>
            Previous
          </Button>
          <Button
            onPress={nextPage}
            disabled={(page + 1) * itemsPerPage >= files.length}>
            Next
          </Button>
          <Button onPress={toggleSortOrder}>{`Sort ${
            sortOrder === 'asc' ? 'Descending' : 'Ascending'
          }`}</Button>
        </View>
      ) : (
        <View style={styles.emptyView}>
          <Text>No files</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  emptyView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default SavedFiles;

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FileMeta} from '../../redux/actions/fileActions';
import FileViewer from 'react-native-file-viewer';
import {pick, types} from 'react-native-document-picker';

const getIconName = (fileType: string) => {
  switch (fileType) {
    case 'pdf':
      return 'file-pdf-o';
    case 'xml':
      return 'file-code-o';
    case 'jpeg':
      return 'file-image-o';
    default:
      return 'file-o';
  }
};

interface FileItemProps {
  item: FileMeta;
  onDelete: (uri: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({item, onDelete}) => {
  const {name, description, uploader, uri} = item;
  const fileType = name.split('.').pop().toLowerCase();

  const openFile = async () => {
    if (fileType === 'xml') {
      const res = await pick({
        type: [types.allFiles],
      });
      await FileViewer.open(item.uri);
    } else {
      FileViewer.open(item.uri)
        .then(() => {
          // success
        })
        .catch(error => {
          Alert.alert('Error', 'Something went wrong');
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Icon
        name={getIconName(fileType)}
        size={30}
        color="#000"
        style={styles.icon}
      />
      <TouchableOpacity onPress={openFile} style={styles.textContainer}>
        <Text style={styles.fileName}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.uploader}>Uploaded by: {uploader}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(uri)}>
        <Icon name="trash" size={20} color="red" style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  uploader: {
    fontSize: 12,
    color: '#999',
  },
  deleteIcon: {
    marginLeft: 10,
  },
});

export default FileItem;

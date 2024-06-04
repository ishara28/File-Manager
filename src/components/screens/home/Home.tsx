import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  DocumentPickerResponse,
  isCancel,
  pick,
  types,
} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {useDispatch} from 'react-redux';
import {addFile} from '../../../redux/actions/fileActions';
import {Button, TextInput} from 'react-native-paper';
import {generateTimestamp} from '../../../utils/utils';

const Home = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState<DocumentPickerResponse | null>(null);
  const [description, setDescription] = useState('');
  const [uploader, setUploader] = useState('');
  const [newFileName, setNewFileName] = useState('');

  const pickFile = async () => {
    try {
      const res = await pick({
        type: [types.allFiles],
      });

      if (res && res[0]) {
        const pickedFile = res[0];
        const fileType = pickedFile.type?.toLowerCase();

        if (
          fileType === 'application/pdf' ||
          fileType === 'image/jpeg' ||
          fileType === 'text/xml'
        ) {
          setFile(pickedFile);
          setNewFileName(pickedFile.name.split('.')[0]);
        } else {
          Alert.alert(
            'Invalid file type',
            'Please select an XML, PDF, or JPEG file.',
          );
        }
      }
    } catch (err) {
      if (isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error(err);
      }
    }
  };

  const uploadFile = async () => {
    if (file && file.name) {
      const timestamp = generateTimestamp();
      const extension = file.name.split('.').pop();
      const destPath = `${RNFS.DocumentDirectoryPath}/${timestamp}_${newFileName}.${extension}`;
      if (uploader === '') {
        Alert.alert('Error', 'Please enter uploader name');
        return;
      }
      try {
        await RNFS.copyFile(file.uri, destPath);
        dispatch(
          addFile({
            name: `${newFileName}.${extension}`,
            description,
            uploader,
            uri: destPath,
          }),
        );
        setDescription('');
        setUploader('');
        setFile(null);
        Alert.alert('Success', 'File uploaded successfully');
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'Failed to upload file');
      }
    } else {
      Alert.alert('No file selected', 'Please pick a file to upload');
    }
  };

  const reset = () => {
    setDescription('');
    setFile(null);
    setUploader('');
  };

  return (
    <View style={styles.container}>
      {file ? (
        <View>
          <Text>Selected File: {file.name}</Text>
          <TextInput
            label="Rename File"
            value={newFileName}
            onChangeText={setNewFileName}
            mode="outlined"
            style={styles.textInput}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.textInput}
            mode="outlined"
          />
          <TextInput
            label="Uploader Name"
            value={uploader}
            onChangeText={setUploader}
            style={styles.textInput}
            mode="outlined"
          />
          <View style={styles.btnView}>
            <Button
              style={styles.btn}
              mode="contained"
              onPress={uploadFile}
              icon={'file-upload'}>
              Upload File
            </Button>
            <Button
              style={styles.btn}
              mode="contained"
              onPress={reset}
              icon={'refresh'}>
              Reset
            </Button>
          </View>
        </View>
      ) : (
        <View style={styles.btnView}>
          <Button
            style={styles.btn}
            mode="contained"
            onPress={pickFile}
            icon={'plus'}>
            Select File
          </Button>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  btn: {
    borderRadius: 8,
    flex: 1,
    margin: 10,
  },
  btnLabel: {color: 'white'},
  textInput: {margin: 5},
});

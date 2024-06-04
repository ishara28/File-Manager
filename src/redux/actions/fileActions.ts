import {ADD_FILE} from './actionTypes';

export interface FileMeta {
  name: string;
  description: string;
  uploader: string;
  uri: string;
}

export const addFile = (file: FileMeta) => ({
  type: ADD_FILE,
  payload: file,
});

export const removeFile = (uri: string) => ({
  type: 'REMOVE_FILE',
  payload: uri,
});

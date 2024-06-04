interface FileMeta {
  name: string;
  description: string;
  uploader: string;
  uri: string;
}

interface FileState {
  files: FileMeta[];
}

const initialState: FileState = {
  files: [],
};

const filesReducer = (state = initialState, action: any): FileState => {
  switch (action.type) {
    case 'ADD_FILE':
      return {
        ...state,
        files: [...state.files, action.payload],
      };
    case 'REMOVE_FILE':
      return {
        ...state,
        files: state.files.filter(file => file.uri !== action.payload),
      };
    default:
      return state;
  }
};

export default filesReducer;

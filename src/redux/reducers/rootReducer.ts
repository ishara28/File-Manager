import {combineReducers} from 'redux';
import filesReducer from './filesReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const filesPersistConfig = {
  key: 'files',
  whitelist: ['files'],
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  files: persistReducer(filesPersistConfig, filesReducer),
});

export default rootReducer;

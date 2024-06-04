This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install the dependancies

First install the packages using npm or yarn

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

## Step 2: Start the Metro Server

Then, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Note

This project is a file archive app developed using React Native. It allows users to upload, list, and remove files, with additional metadata such as description and uploader name. The app uses the following technologies and libraries:

1. react-native-document-picker and react-native-fs:

These libraries were chosen for their reliability and robustness in handling file operations in a React Native environment. react-native-document-picker provides a simple API for picking files, while react-native-fs allows for easy file system access.

2. Redux:

Redux was chosen for state management due to its simplicity and predictability. It allows for a centralized store to manage application state, making it easier to maintain and debug.

3. AsyncStorage:

AsyncStorage was chosen for data persistence as it integrates seamlessly with Redux. It allows for the storage of key-value pairs and is suitable for storing small amounts of data such as file metadata.

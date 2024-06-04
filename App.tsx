import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigator from './src/navigation';
import {PaperProvider} from 'react-native-paper';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
});

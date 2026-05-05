import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';

import Main from './src/components/Main';

const App = () => {
  return (
    <>
      <StatusBar style="light" />
      <NativeRouter>
        <Main />
      </NativeRouter>
    </>
  );
};

export default App;

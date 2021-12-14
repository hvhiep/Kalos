import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import MainStackNavigator from './navigation/MainStackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';

LogBox.ignoreLogs(['Reanimated 2']);
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;

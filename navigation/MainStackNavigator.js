import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import WorkoutInfoScreen from '../screens/WorkoutScreens/WorkoutInfoScreen';
import WorkoutDetailScreen from '../screens/WorkoutScreens/WorkoutDetailScreen';
import CategoryScreen from '../screens/Category/CategoryScreen';
import ExerciseInfoScreen from '../screens/Exercise/ExerciseInfoScreen';
import WorkoutHistoryScreen from '../screens/Profile/WorkoutHistoryScreen';
import Setting from '../screens/Profile/Setting';
import { COLOR } from '../constant';

const MainStack = createStackNavigator();

function MainStackNavigator () {

    return (
        <MainStack.Navigator
        initialRouteName='Tab'
        screenOptions={{
          headerTransparent: true,
          headerTitle: '',
          headerMode:'float'
        }}
        >
          <MainStack.Screen name="Tab" component={MainTabNavigator} />
          <MainStack.Screen name="WorkoutInfo" component={WorkoutInfoScreen} 
          options={{ headerTintColor:'#fff' }}
          />
          <MainStack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} 
          options={{ headerTintColor:'#fff' }}
          />
          <MainStack.Screen name="Category" component={CategoryScreen} 
          options={{ headerTintColor:'#fff' }}
          />
          <MainStack.Screen name="ExerciseInfo" component={ExerciseInfoScreen} 
          options={{ headerTintColor:'#fff' }}
          />
          <MainStack.Screen name="WorkoutHistory" component={WorkoutHistoryScreen} 
          options={{ headerTintColor:'#fff' }}
          />
          <MainStack.Screen name="Setting" component={Setting} 
          options={{
            headerTintColor: '#fff',
            headerTitle:'Cài Đặt',
            headerTitleAlign: 'center', }}
          />
        </MainStack.Navigator>
    );
  };
  
  const styles = StyleSheet.create({
    
  });
  
  export default MainStackNavigator;
  
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
import ExcerciseInfoScreen from '../screens/Exercise/ExerciseInfoScreen';
import FavoriteExerciseScreen from '../screens/FavoriteScreens/FavoriteExerciseScreen';
import FavoriteProgramScreen from '../screens/FavoriteScreens/FavoriteProgramScreen';

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
          <MainStack.Screen name="ExcerciseInfo" component={ExcerciseInfoScreen} 
          options={{ headerTintColor:'#fff' }}
          />
          <MainStack.Screen name="FavoriteExercises" component={FavoriteExerciseScreen} 
          options={{ headerTintColor:'#fff' }}
          />
          <MainStack.Screen name="FavoritePrograms" component={FavoriteProgramScreen} 
          options={{ headerTintColor:'#fff' }}
          />
        </MainStack.Navigator>
    );
  };
  
  const styles = StyleSheet.create({
    
  });
  
  export default MainStackNavigator;
  
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { COLOR } from '../constant'
import { Icon } from 'react-native-elements';


const MainTab = createMaterialBottomTabNavigator();

function MainTabNavigator() {
  return (
    <MainTab.Navigator
      barStyle={{ backgroundColor: 'black' }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang Chủ',
          tabBarIcon: ({ color }) => (
            <Icon name='home'
              type='font-awesome-5'
              size={18} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          tabBarLabel: 'Bài Tập',
          tabBarIcon: ({ color }) => (
            <Icon 
              name="fitness-center"
              type="material"
              size={18}
              color={color}></Icon> 
          ),
        }}
      ></MainTab.Screen>
      <MainTab.Screen name="Favorite" component={FavoriteScreen} 
      options={{
        tabBarLabel: 'Yêu thích',
        tabBarIcon: ({ color }) => (
          <Icon name='heart'
          type='ionicon'
          size={18} color={color} />
        ),
      }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Cá Nhân',
          tabBarIcon: ({ color }) => (
            <Icon name='person'
              type='ionicon'
              size={18} color={color} />
          ),
        }}
      />
      
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({

});

export default MainTabNavigator;

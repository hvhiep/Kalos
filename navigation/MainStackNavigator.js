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
import FavoriteWorkoutScreen from '../screens/FavoriteScreens/FavoriteWorkoutScreen';
import FavoriteVideoScreen from '../screens/FavoriteScreens/FavoriteVideoScreen';
import VideoScreen from '../screens/FavoriteScreens/VideoScreen';
import ExerciseInfoScreen from '../screens/Exercise/ExerciseInfoScreen';
import WorkoutHistoryScreen from '../screens/Profile/WorkoutHistoryScreen';
import Setting from '../screens/Profile/Setting';
import SplashScreen from '../screens/SplashScreen';
import FirstScreen from '../screens/SignIn_Up/FirstScreen';
import SignUpScreen from '../screens/SignIn_Up/SignUpScreen';
import SignInScreen from '../screens/SignIn_Up/SignInScreen';
import ForgotPasswordScreen from '../screens/SignIn_Up/ForgotPasswordScreen';
import EmailAuthScreen from '../screens/SignIn_Up/EmailAuthScreen';
import NewPasswordScreen from '../screens/SignIn_Up/NewPasswordScreen';
import SignUpSurveyScreen from '../screens/SignIn_Up/SignUpSurveyScreen';

import { COLOR } from '../constant';

const MainStack = createStackNavigator();

function MainStackNavigator () {

    return (
        <MainStack.Navigator
        initialRouteName='Splash'
        screenOptions={{
          headerTransparent: true,
          headerTitle: '',
          headerMode:'float'
        }}
        >
          {/* Flow:
          1. first time open app: splash -> first screen -> signIn/signUp screen 
          2. signed in: splash -> tab (must config back button click !!!)
          */}
          <MainStack.Screen name="Splash" component={SplashScreen} />
          <MainStack.Screen name="First" component={FirstScreen} options={{headerShown: false}}/>
          <MainStack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
          <MainStack.Screen name="SignUpSurvey" component={SignUpSurveyScreen} options={{headerShown: false}} />
          <MainStack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}} />
          <MainStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <MainStack.Screen name="EmailAuth" component={EmailAuthScreen} />
          <MainStack.Screen name="NewPassword" component={NewPasswordScreen} />
          

          <MainStack.Screen name="Tab" component={MainTabNavigator}  options={{headerShown: false}}/>
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
          <MainStack.Screen name="FavoriteExercises" component={FavoriteExerciseScreen} 
          options={{ headerTintColor:'#fff' }}
          />
          <MainStack.Screen name="FavoritePrograms" component={FavoriteProgramScreen} 
          options={{ headerTintColor:'#fff' }}
          />
          <MainStack.Screen name="FavoriteWorkouts" component={FavoriteWorkoutScreen} 
          options={{ headerTintColor:'#fff' }}
          />
          <MainStack.Screen name="FavoriteVideos" component={FavoriteVideoScreen} 
          options={{ headerTintColor:'#fff' }}
          />
          <MainStack.Screen name="VideoScreen" component={VideoScreen} 
          options={{ headerTintColor:'#fff' }}/>
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
  
import {
    Dimensions,
    StatusBar
  } from 'react-native';
export const HOST = 'https://klos-backend.herokuapp.com';
export const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const COLOR = {
    TRANSPARENT: '#00000000',
    BLACK : '#181510',
    MATTE_BLACK : '#222222',
    LIGHT_MATTE_BLACK: '#333333',
    DARK_BROWN : '#785F37',
    LIGHT_BROWN : '#A08C5B',
    GOLD : '#CBB682',
    LIGHT_GOLD:'#e9dbbd',
    WHITE: '#fff',
    GREY:'#777777',
    LIGHT_GREY:'#dddddd',
    LIGHT_BLUE:'#b5d3e7',
    LIGHT_BLUE_2:'#1261a0',
    RED:'#ff0000',
    DARK_RED:'#8b0000',
    SILVER:'#bec2cb',
    YELLOW:'#ffff00',
    ORANGE:'#ff5e13',
    BLUE:'#187bcd',
    LIGHT_BLACK : '#484848',
    KELLY_GREEN:'#4cbb17',
}

export const HORIZONTAL_LIST_HEIGHT = 200; //left view 130

export const WORKOUT_TAG_COLLECTION = [
  {
    name: 'Xây dựng sức bền',
    image:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/701/p-1-cardio-workout-1516282523.jpg',
    tag: 'Giảm cân',
    description: 'Thu gọn cơ thể của bạn',
    type : 3
  },
  {
    name: 'Xây dựng sức mạnh',
    image:
      'https://30dayfitness.app/static/d1721fef7d0c45531411fb6c0cc7622c/a1eb1/cardio-workouts-for-men-at-home.jpg',
    tag: 'Tăng cơ',
    description: 'Xây dựng cơ bắp trong mơ',
    type : 2
  },
  {
    name: 'Giảm mỡ',
    image:
      'https://manofmany.com/wp-content/uploads/2020/05/7-minute-workout.jpg',
    tag: 'Giảm mỡ',
    description: 'Tập luyện cơ thể săn chắc',
    type : 1
  },
  {
    name: 'Tabata',
    image:
      'https://30dayfitness.app/static/d1721fef7d0c45531411fb6c0cc7622c/a1eb1/cardio-workouts-for-men-at-home.jpg',
    tag: 'Tabata',
    description: 'Tập luyện cường độ cao',
    type : 4
  },
];
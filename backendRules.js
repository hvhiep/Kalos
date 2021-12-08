const muscleGroups = [
    'Toàn Thân',
    'Lưng',
    'Bắp Tay Trước',
    'Ngực',
    'Bắp Tay Sau',
    'Vai',
    'Bụng',
    'Chân',
];
const levels = [
    'Người Mới',
    'Trung Bình',
    'Nâng Cao',
];
const workoutTypes = [
    'Tập Luyện',
    'Nghỉ',
];
const equipments = [
    'parallettes',
    'Xà Đơn',
    'Xà Thấp',
    'Áo Tạ',
    'Xà Kép',
    'Dây Kháng Lực',
    'Hộp',
    'Ghế Dài',
];

/*
1. parallettes
2. pull up bar - Xà Đơn
3. low bar - Xà Thấp
4. weight vest - Áo Tạ
5. dip bar - Xà Kép
6. resistance band - Dây Kháng Lực
7. box - Hộp
8. bench - Ghế Dài
*/

export const toMuscleGroupName = ( muscleGroupIndex ) => {
    return muscleGroups.find((item, index) => {
        //index + 1 is because muscleGroupIndex starts at 1, index starts at 0
        return (index + 1) === muscleGroupIndex; 
    })
};

export const toLevelName = ( LevelIndex ) => {
    return levels.find((item, index) => {
        //index + 1 is because LevelIndex starts at 1, index starts at 0
        return (index + 1) === LevelIndex; 
    })
};

export const toWorkoutTypeName = ( WorkoutTypeIndex ) => {
    return workoutTypes.find((item, index) => {
        //index + 1 is because WorkoutTypeIndex starts at 1, index starts at 0
        return (index + 1) === WorkoutTypeIndex; 
    })
};

export const toEquipmentName = ( EquipmentIndex ) => {
    return equipments.find((item, index) => {
        //index + 1 is because EquipmentIndex starts at 1, index starts at 0
        return (index + 1) == EquipmentIndex; 
    })
};
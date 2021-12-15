//tags: level, muscleGroup, equipment
const levels = [
    'Tất Cả',
    'Người Mới',
    'Trung Bình',
    'Nâng Cao'
];
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
const equipments = [
    'Không Dụng Cụ',
    'Có Dụng Cụ',
];

export const toMuscleGroupTag = (Index) => {
    return muscleGroups.find((item, index) => {
        return index === Index; 
    })
}

export const toLevelTag = (Index) => {
    return levels.find((item, index) => {
        return index === Index; 
    })
}

export const toEquipmentTag = (Index) => {
    return equipments.find((item, index) => {
        return index === Index; 
    })
}
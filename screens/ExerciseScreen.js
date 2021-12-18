import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Video from 'react-native-video';
import { COLOR, HOST } from '../constant';
import { SearchBar } from "react-native-elements";

//Bottom Sheet
import SheetExerciseDetail from "../components/SheetExerciseDetail";
import SheetFilter from '../components/SheetFilter';
//backend rules
import { toEquipmentName, toMuscleGroupName, toLevelName } from "../backendRules";
import { toLevelTag, toMuscleGroupTag, toEquipmentTag } from "./Exercise/tagsRule";
// get Token
import { getAllExercises } from "../serverAPIs/exercisesAPI";
import {toggleExerciseLike} from '../serverAPIs/favoriteAPI'


function ExerciseScreen({navigation}) {

    const initFilterData = [
        { title: 'level', value: -1, },
        { title: 'muscleGroup', value: -1, },
        { title: 'equipment', value: -1, }
    ];


    //Bottom sheet exercise detail
    //ref + state for sheet
    const bottomSheetRef = useRef(null);
    const sheetFilterRef = useRef(null);
    //ref chứa tất cả bài tập lấy từ api về
    const exercisesRef = useRef([]);
    const [exerciseDetail, setExerciseDetail] = useState(null);
    const [exercisesData, setExercisesData] = useState([]);
    //list bài tập sau khi search
    const [exercisesDataSearched, setExercisesDataSearched] = useState(exercisesData);
    // list bài tập sau khi filter
    const [exercisesDataFilter, setExercisesDataFilter] = useState(exercisesData);
    // list các tag
    const [filterData, setFilterData] = useState(initFilterData);
    const [isSearchSuccess, setSearchSuccess] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    //ref để đồng bộ tag với component SheetFilter
    const filterDataRef = useRef();
    useEffect(() => {
        getExercises();

        const willFocusSubscription = navigation.addListener('focus', () => {
            getExercises();
        });
    
        return willFocusSubscription;
        
    }, [])
    
    useEffect(()=>{
        handleSearch(searchValue)
    },[searchValue])

    //filter bài tập thông qua tag nếu tag state được cập nhật
    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed)
            filterTag()
        return () => isSubscribed = false;
    }, [filterData])

    //hàm để filter qua tag
    const filterTag = () => {
        console.log('exercisesDataSearchedddddddddddddddddddddd: ', exercisesDataSearched);
        const final = filterData.reduce((filterArray, item) => {
            //item.value !== -1 là tag đó có đc hiển thị
            if (item.value !== -1) {
                //case cho từng loại tag
                switch (item.title) {
                    case 'level':
                        const levelFilter = filterArray?.filter((item) => {
                            if (filterData[0].value !== 0)
                                return item.levels.includes(filterData[0].value);
                            return item;
                        })
                        filterArray = [...levelFilter];
                        return filterArray;
                    case 'muscleGroup':
                        const muscleGroupFilter = filterArray?.filter((item) => {
                            return item.muscleGroups.includes(filterData[1].value + 1);
                        })
                        filterArray = [...muscleGroupFilter];
                        return filterArray;
                    case 'equipment':
                        const equipmentFilter = filterArray?.filter((item) => {
                            if (filterData[2].value === 0)
                                return item.equipments.length <= 0;
                            if (filterData[2].value === 1)
                                return item.equipments.length > 0;
                        })
                        filterArray = [...equipmentFilter];
                        return filterArray;
                }
            }
            else
                return filterArray;
        }, exercisesDataSearched)
        console.log('========final filter======: ', final);
        //cập nhật lại bài tập đã filter
        setExercisesDataFilter(final);
    };
    const getExercises = async () => {
        const response = await getAllExercises();
        if (response !== -1) {
            exercisesRef.current = response;
            setExercisesData(response);
            setExercisesDataFilter(response);
            setExercisesDataSearched(response);
        }
        else
            console.log('loi get all exercises');
    }

    //render exercise item
    const renderExerciseItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.exerciseWrapper}
                onPress={() => {
                    console.log("selected ex====", item)
                    handleBottomSheet(item)
                }}>
                <View style={styles.exerciseLeftWrapper}>
                    <Image
                        style={styles.exerciseImage}
                        source={{ uri: item.image }}
                    ></Image>
                </View>
                <View style={styles.exerciseRightWrapper}>
                    <Text
                        style={styles.exerciseName}
                        numberOfLines={2}
                    >
                        {item?.name}
                    </Text>
                    {item?.liked && <Icon name="heart"
                        type="font-awesome-5"
                        solid
                        color="#FF0000"
                        />}
                </View>
            </TouchableOpacity>
        )
    }

    //handle bottom sheet
    const handleBottomSheet = (item) => {
        setExerciseDetail(item);
        bottomSheetRef.current.snapTo(1);
    }
    //handle filter submit
    const handleFilterSubmit = (data) => {
        //RULES:
        // level === 0 -> select all level
        // muscleGroup === -1 -> select all 
        // equipment === -1 -> select all
        setFilterData([...data]);
    }

    //handle searchx
    const handleSearch = (result) => {
        const filterExercises = exercisesRef.current.filter((item, index) => {
            return item.name.toLowerCase().includes(result.trim().toLowerCase());
            
        })
        if (result === '') {
            setExercisesDataSearched(exercisesRef.current);
            setSearchSuccess(true);
            setSearchValue(result);
            //sau khi search, tiếp tục filter với các tag (nếu có)
            filterTag();
        }
        else if (filterExercises.length > 0) {
            setExercisesDataSearched(filterExercises);
            setSearchSuccess(true);
            setSearchValue(result);
            //sau khi search, tiếp tục filter với các tag (nếu có)
            filterTag();
        }
        else
            setSearchSuccess(false);
    }

    //render filter tags
    const renderFilterTags = () => {
        return filterData.map((item) => {
            //
            if (item.value !== -1) {
                //convert value to tag name
                let title = '';
                if (item.title === 'level')
                    title = toLevelTag(item.value);
                if (item.title === 'muscleGroup')
                    title = toMuscleGroupTag(item.value);
                if (item.title === 'equipment')
                    title = toEquipmentTag(item.value);
                return (
                    <View key={item.title} style={styles.filterTagWrapper}>
                        <Text style={styles.filterTagText}>{title}</Text>
                        <TouchableOpacity onPress={() => handleFilterTagClick(item)}>
                            <Icon
                                style={styles.filterIcon}
                                name="close"
                                type="material"
                                size={14}
                                color="white"></Icon>
                        </TouchableOpacity>
                    </View>
                )
            }
        })
    }

    //handle Filter Tag Click
    const handleFilterTagClick = (item) => {
        //hide tag when click on icon
        setFilterData(
            filterData.map((filterItem) => {
                return filterItem === item ? { title: filterItem.title, value: -1, } : filterItem;
            }));

        //unselect item in SheetFilter Component
        switch (item.title) {
            case 'level':
                filterDataRef.current.setLevel();
                break;
            case 'muscleGroup':
                filterDataRef.current.setMuscleGroup();
                break;
            case 'equipment':
                filterDataRef.current.setEquipment();
                break;
            default:
                console.log('Loi khi an filter item');

        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.MATTE_BLACK }}>
            <View style={styles.container}>
                <Text style={styles.title}>Tất Cả Bài Tập</Text>

                {/* Search bar */}
                <View style={styles.searchWrapper}>
                    <SearchBar
                        containerStyle={styles.search}
                        inputStyle={styles.searchInput}
                        placeholder="Tìm Kiếm"
                        inputContainerStyle={styles.searchInput}
                        platform="android"
                        onChangeText={handleSearch}
                        value={searchValue}
                    />
                    {/* exercise filter */}
                    <TouchableOpacity
                        style={styles.searchFilter}
                        onPress={() => sheetFilterRef.current.snapTo(1)}>
                        <Icon
                            name="filter-alt"
                            type="material"
                            size={22}
                            color="white"></Icon>
                    </TouchableOpacity>
                </View>
                {/* filter tags */}
                <View style={{ flexDirection: "row", marginVertical: 10, marginHorizontal: 20 }}>
                    {renderFilterTags()}
                </View>
                {/* List Exercise */}
                {isSearchSuccess === true && <FlatList
                    style={styles.ListExercise}
                    data={exercisesDataFilter}
                    renderItem={renderExerciseItem}
                    keyExtractor={item => `${item._id}`}
                    showsVerticalScrollIndicator={false}>
                </FlatList>}
                {isSearchSuccess === false && <View style={styles.ListExerciseError}><Text style={styles.ListExerciseErrorText}>Không có bài tập nào!</Text></View>}
                {/*Bottom Sheet Exercise Detail */}
                <SheetExerciseDetail
                    // sheet bi che mat 1 it phia duoi
                    bottomSheetRef={bottomSheetRef}
                    initialSnap={0}
                    exerciseDetail={exerciseDetail}
                    handleLikePress={async ()=>{
                        setExercisesDataFilter(prev => prev.map(val =>val._id === exerciseDetail?._id ? {...val, liked: !val.liked} : val))
                        setExercisesDataSearched(prev => prev.map(val =>val._id === exerciseDetail?._id ? {...val, liked: !val.liked} : val))
                        exercisesRef.current = exercisesRef.current.map(val =>val._id === exerciseDetail?._id ? {...val, liked: !val.liked} : val)
                    }}>
                </SheetExerciseDetail>
                {/* Exercise Filter */}
                <SheetFilter
                    initialSnap={0}
                    sheetFilterRef={sheetFilterRef}
                    onSubmit={handleFilterSubmit}
                    ref={filterDataRef}>
                </SheetFilter>
            </View>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        marginBottom: 30,
        backgroundColor: COLOR.MATTE_BLACK,
    },
    title: {
        marginTop: 30,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        color: 'white',

    },
    searchWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 20,
    },
    search: {
        flex: 1,
        borderRadius: 20,
        marginRight: 10,

    },
    searchInput: {
        height: 20,

    },
    searchFilter: {

    },
    ListExercise: {
        marginHorizontal: 20,
        height: '100%',
    },
    ListExerciseError: {
        marginHorizontal: 20,
        height: '100%',
    },
    ListExerciseErrorText: { 
        color: 'white',
        fontSize: 20,
        alignSelf: "center",
        marginTop: 20,
    },
    exerciseWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        height: 80,
    },
    exerciseLeftWrapper: {
    },
    exerciseRightWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    exerciseImage: {
        resizeMode: "center",
        height: 80,
        width: 100,
        borderRadius: 30,

    },
    exerciseName: {
        marginLeft: 20,
        marginRight: 5,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
        maxWidth: '80%',
    },
    heartIcon:{
        minWidth: 20
    },
    filterTagWrapper: {
        marginRight: 5,
        padding: 5,
        backgroundColor: COLOR.LIGHT_BROWN,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    filterTagText: {
        color: 'white',
        fontSize: 14
    },
    filterIcon: {
        padding: 3,
        borderRadius: 40,
        fontWeight: "bold"
    },
});

export default ExerciseScreen;
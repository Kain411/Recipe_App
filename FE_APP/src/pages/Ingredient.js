import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Dimensions, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { IngredientContext } from '../context/IngredientContext';
import { SupplierContext} from '../context/SupplierContext';

const ws = Dimensions.get('screen').width / 440

const IngredientForm = ({item}) => {
    const navigation = useNavigation()

    const [supplier, setSupplier] = useState({})
    const { handleGetSupplierById } = useContext(SupplierContext)
    useEffect(() => {
        const getSupplier = async () => {
            const result = await handleGetSupplierById(item.id_supplier)
            setSupplier(result.supplier)
        }
        getSupplier()
    }, [])
    
    return (
        <View style={styles.item}>
            <TouchableOpacity 
                onPress={() => navigation.navigate("IngredientDetail", { ingredient: item, supplier: supplier })}>
                <Image 
                    source={{uri: item.url}}
                    style={styles.item_image} 
                />
            </TouchableOpacity>

            <Text style={styles.item_name}>{item.name}</Text>

            <Text style={styles.item_price}>{item.price}</Text>

            <TouchableOpacity style={styles.item_cartButton}>
                <Image 
                source={require("../assets/images/Igredient/shopping-cart.png")} 
                style={styles.item_cartIcon} 
                />
            </TouchableOpacity>
        </View>
    )
}

const Ingredient = () => {
    const navigation = useNavigation();
    const { ingredients, handleGetAllIngredient } = useContext(IngredientContext)
    
    useEffect(() => {
        const getIngredients = async () => {
            const result = await handleGetAllIngredient()
            setFilterIngredients(result.ingredients)
            setSortLabel("Giá");        
        }

        getIngredients()
    }, [])

    /*Tim kiem*/
    const [searchKey, setSearchKey] = useState('')
    const [filterIngredients, setFilterIngredients] = useState([])
    useEffect(()=>{
        if(!searchKey){
            setFilterIngredients(ingredients)
            setSortLabel("Giá")        
        }
        else{
            const filter = ingredients.filter(item => 
                item.name.toLowerCase().includes(searchKey.toLowerCase()))

            setFilterIngredients(filter)
        }
    },[searchKey, ingredients])

    /*Sort*/
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [sortLabel, setSortLabel] = useState("Giá");
    const sortByPrice = (ascending = true) => {
        const sortedFilterIngredients = [...filterIngredients].sort((a, b) => {
            return ascending ? a.price - b.price : b.price - a.price;
        });
        setFilterIngredients(sortedFilterIngredients);
    };

    /*Filter*/
    const [showFilterOptions, setShowFilterOptions] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        calories: {enable: false, min: '', max : ''},
        protein: {enable: false, min: '', max : ''},
        fat: {enable: false, min: '', max : ''},
        carb: {enable: false, min: '', max : ''}
    });    

    const toggleFilter = (type) => {
        setSelectedFilters(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                enable: !prev[type].enable
            }
        }))
    }    

    const applyFilters = () => {
        let filtered = [...ingredients];
    
        // if (selectedFilters.calories) {
        //     filtered = filtered.filter(item => item.calories > 0);
        // }
        // if (selectedFilters.protein) {
        //     filtered = filtered.filter(item => item.protein > 0);
        // }
        // if (selectedFilters.fat) {
        //     filtered = filtered.filter(item => item.fat > 0);
        // }
        // if (selectedFilters.carb) {
        //     filtered = filtered.filter(item => item.carb > 0);
        // }
        Object.keys(selectedFilters).forEach(type => {
            const filter = selectedFilters[type];
            if (filter.enable) {
              const min = parseFloat(filter.min) || 0;
              const max = parseFloat(filter.max) || Infinity;
              filtered = filtered.filter(item => item[type] >= min && item[type] <= max);
            }
          });        
        // Áp dụng lại sort dựa trên sortLabel
        if (sortLabel === "Giá tăng dần") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortLabel === "Giá giảm dần") {
            filtered.sort((a, b) => b.price - a.price);
        }        
            setFilterIngredients(filtered);
            setShowFilterOptions(false);
    }    

    return (
    <View style={styles.container}>
        <Text style={styles.header_text} >Igredient</Text>

        <View style={styles.searchContainer}>
            <Image style={styles.searchIcon} source={require("../assets/images/Search.png")}/>
            <TextInput 
                placeholder="Tìm kiếm..." 
                style={styles.searchInput} 
                value = {searchKey}
                onChangeText={setSearchKey}
            />
        </View>
        
        <View style={styles.filterContainer}>
            <TouchableOpacity 
                style={styles.filterButton}
                onPress={()=>{
                    if(showSortOptions)
                        setShowSortOptions(false)
                    else
                        setShowSortOptions(true)
                }}
            >
                <Image
                    source={require("../assets/images/Igredient/sort-alt.png")}
                    style = {styles.filterIcon}
                />
                <Text>
                    {sortLabel}
                </Text>
                <Image 
                    source={require("../assets/images/Arrow.png")} 
                    style={styles.arrowIcon} 
                />      
                       
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.filterButton}
                onPress={()=>{
                    setShowFilterOptions(true)
                }}
            >
                <Image
                    source={require("../assets/images/Igredient/bars-filter.png")}
                    style = {styles.filterIcon}
                />                
                <Text>
                    Bộ lọc
                </Text>

                <View style={styles.filter_result_quantity}>
                    <Text style={{color: 'white'}}> {filterIngredients.length} </Text>
                </View>                        


            </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        {
            showSortOptions && (
                <View style={styles.sortOptionContainer}>
                    <View style={styles.sortPopUpContainer}>
                        <TouchableOpacity 
                            style={styles.sortPopUpOption} 
                            onPress={() => {
                                setSortLabel("Giá tăng dần")
                                setShowSortOptions(false);
                                sortByPrice(true);    
                            }}
                        >
                            <Text style={styles.sortPopUpText}>Giá tăng dần</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.sortPopUpOption} 
                            onPress={() => {
                                setSortLabel("Giá giảm dần")
                                setShowSortOptions(false);
                                sortByPrice(false);    
                            }}
                        >
                            <Text style={styles.sortPopUpText}>Giá giảm dần</Text>
                        </TouchableOpacity>
                    </View>
                </View>  
            )
        }
      

        {
            showFilterOptions && (
                <View style={styles.filterOptionContainer}>
                    <View style={styles.filterPopUpContainer}>
                        <Text style={styles.filterPopUpTitle}>Bộ lọc</Text>
            
                        {["calories", "protein", "fat", "carb"].map(type => (
                            <View style={styles.filterCheckboxOption}>
                                <TouchableOpacity 
                                    key={type}
                                    //style={styles.filterCheckboxOption}
                                    onPress={() => toggleFilter(type)}
                                    style={{flexDirection: 'row', alignItems: 'center', flex: 1}}            
                                >                                 
                                    <View style={[
                                        styles.checkbox, 
                                        selectedFilters[type].enable && styles.checkboxChecked
                                    ]} />

                                    <Text style={styles.checkboxLabel}>{type.toUpperCase()}</Text>
                                </TouchableOpacity>

                                {selectedFilters[type].enable && (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: ws * 15}}>
                                    <TextInput
                                      placeholder="Min"
                                      style={styles.minMaxInput}
                                      keyboardType="numeric"
                                      value={selectedFilters[type].min}
                                      onChangeText={(text) => setSelectedFilters(prev => ({
                                        ...prev,
                                        [type]: {
                                          ...prev[type],
                                          min: text
                                        }
                                      }))}
                                    />
                                    <TextInput
                                      placeholder="Max"
                                      style={styles.minMaxInput}
                                      keyboardType="numeric"
                                      value={selectedFilters[type].max}
                                      onChangeText={(text) => setSelectedFilters(prev => ({
                                        ...prev,
                                        [type]: {
                                          ...prev[type],
                                          max: text
                                        }
                                      }))}
                                    />
                                  </View>
                                )}
                            </View>

                        ))}
            
                        <View style={styles.filterButtonRow}>
                            
                            <TouchableOpacity 
                                style={styles.popupBtn} 
                                onPress={applyFilters}
                            >
                                <Text style={styles.popupBtnText}>Xác nhận</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.popupBtn, { backgroundColor: 'rgba(0, 0, 0, 0.35)' }]} 
                                onPress={() => setShowFilterOptions(false)}
                            >
                                <Text style={styles.popupBtnText}>Thoát</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            )}

        <ScrollView>
            <View style={styles.item_container}>
                {
                    (filterIngredients ?? []).map((item, index) => {
                        return (
                            <IngredientForm key={index} item={item} />
                        )
                    })
                }
            </View>            
        </ScrollView>

                
    </View>
  );
};

export default Ingredient;

const styles = StyleSheet.create({
    header_text:{
        fontSize: 30,
        fontWeight:'bold',
        color: '#307F85',
        marginBottom: ws*10
    },
    container: { 
        flex: 1, 
        backgroundColor: 'white', 
        paddingTop: ws * 50,
        paddingHorizontal: ws * 30,
    },
    searchContainer: { 
        flexDirection: 'row',
        backgroundColor: '#f5f5f5', 
        borderRadius: 50, 
        padding: 5, 
        alignItems: 'center' 
    }, 
    searchInput: { 
        flex: 1, 
        marginLeft: 25
    },  
    searchIcon:{
        marginLeft: 20
    },  

    filterContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginVertical: 10,
    },

    filterButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5', 
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 50, 
        gap: ws*10,
        minWidth: 100
    },
    arrowIcon: { 
        width: ws*20, 
        height: ws*10, 
        transform: [{ rotate: '-90deg' }],      
        objectFit: 'contain',
    },
    filterIcon:{
        width: 15,
        height: 15,
    },
    filter_result_quantity:{
        width: ws*25,
        height: ws*25,
        borderRadius: ws * 15,  
        justifyContent:'center',
        alignItems: 'center',   
        backgroundColor: '#307F85'
    },
    separator:{
        height: 1,
        backgroundColor: '#307F85',
        marginBottom: ws*10
    }
    ,
    item_container: {
        marginVertical: ws*10,
        width: ws*380,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: { 
        width: ws*180,
        backgroundColor: '#f5f5f5',
        borderRadius: ws*20, 
        padding: ws*10, 
        position: 'relative',
        marginBottom: ws*20,    
    },
    item_image: { 
        width: '100%',
        height: ws*150,
        borderRadius: ws*15, 
        borderWidth: 0.25,
        borderColor: '#307F85',
        objectFit: 'cover',     
    },
    item_name: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#376D6B',
        textAlign: 'left',
        marginVertical: ws*5,
        marginLeft: ws*10
    },
    item_price: { 
        fontSize: 14, 
        color: '#6D7D7D',
        marginLeft: ws*10
    },
    item_cartButton: { 
        backgroundColor: 'transparent',
        padding: 5,
        borderRadius: 5,
        position: 'absolute',
        bottom: ws*20,
        right: ws*10,
    },
    item_cartIcon: {
        width: 24,
        height: 24,
        tintColor: '#376D6B',
    },

    //--------------SORT---------------
    sortOptionContainer: {
        position: 'absolute',
        top: ws * 220,
        left: ws * 30,
        right: ws * 30,
        zIndex: 10
    },
    sortPopUpContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '50%',
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: ws*4,
        elevation: ws*5
    },
    sortPopUpOption: {
        paddingVertical: ws*15,
        paddingHorizontal: ws*20,
        borderBottomWidth: ws*1,
        borderBottomColor: '#eee'
    },
    sortPopUpText: {
        fontSize: ws * 15,
        color: '#333'
    },    

    //--------------FILTER-------------
    filterOptionContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom:0,
        backgroundColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20
    },
    filterPopUpContainer: {
        width: '75%',
        backgroundColor: 'white',
        borderRadius: ws * 15,
        padding: ws * 20
    },
    filterPopUpTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#307F85'
    },
    filterCheckboxOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    checkbox: {
        width: ws * 15,
        height: ws * 15,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.61)',
        marginRight: 10,
        borderRadius: ws * 30
    },
    checkboxChecked: {
        backgroundColor: '#307F85'
    },
    checkboxLabel: {
        fontSize: ws * 15
    },
    filterButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    popupBtn: {
        backgroundColor: '#307F85',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8
    },
    popupBtnText: {
        color: 'white',
        fontWeight: 'bold'
    },    
    minMaxInput: {
        width: ws * 60,
        height: ws * 40,
        borderWidth: ws * 1,
        borderColor: '#ccc',
        borderRadius: ws * 10,
        paddingHorizontal: ws * 5,
        paddingVertical: ws *1,
        fontWeight: 'bold',
        // lineHeight: ws * 15
      },    
});

import React, { useEffect, useState} from 'react';
import {
	Dimensions,
	View,
	Text,
	Image,
	StyleSheet,
	TextInput,
	ScrollView,
	TouchableOpacity,
	ImageBackground
} from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
const ws = Dimensions.get('screen').width / 440

const Supplier = () => {
	const navigation = useNavigation();	
	const route = useRoute()

	const supplier = route.params?.supplier
	const supplierIngredients = route.params?.supplierIngredients

	/*Tìm kiếm */
	const[searchKey, setSearchKey] = useState()
	const[filterIngredients, setFilterIngredients] = useState([])
	useEffect(()=>{
		if(!searchKey){
			setFilterIngredients(supplierIngredients)
			setSortLabel("Giá")
		}
		else{
            const filter = supplierIngredients.filter(item => 
                item.name.toLowerCase().includes(searchKey.toLowerCase()))
            setFilterIngredients(filter)			
		}
	}, [searchKey])

	/*Sort */
	const[showSortOptions, setShowSortOptions] = useState(false)
	const [sortLabel, setSortLabel] = useState("Giá");
    const sortByPrice = (ascending = true) => {
        const sortedFilterIngredients = [...filterIngredients].sort((a, b) => {
            return ascending ? a.price - b.price : b.price - a.price;
        });
        setFilterIngredients(sortedFilterIngredients);
    };

	/*Filter */
	const [showFilterOptions, setShowFilterOptions] = useState(false)
	const [selectedFilters, setSelectedFilters] = useState({
		calories: {enable: false, min: '', max: ''},
		protein: {enable: false, min: '', max: ''},
		fat: {enable: false, min: '', max: ''},
		carb: {enable: false, min: '', max: ''},
	})

	const toggleFilter = (type) =>{
		setSelectedFilters(prev =>({
			...prev,
			[type]:{
				...prev[type],
				enable: !prev[type].enable
			}
		}))
	}

	const applyFilters = () =>{
		let filtered = [...supplierIngredients]
		Object.keys(selectedFilters).forEach(type =>{
			const filter = selectedFilters[type]
			if(filter.enable){
				const min = parseFloat(filter.min) || 0
				const max = parseFloat(filter.max) || Infinity
				filtered = filtered.filter(item => item[type]>= min && item[type] <= max)
			}
		})

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
		<ScrollView style={styles.supplier_container}>
			<ImageBackground
				source={{uri: supplier.background_url}}
				imageStyle={{borderRadius: ws * 10}}
				style={styles.supplier_banner}
			>
				<View style={styles.supplier_content}>
					<View style={styles.supplier_header}>
						<TouchableOpacity onPress = {()=> navigation.goBack()}>

							<Image
								source={require('../assets/images/Igredient/back-button.png')}
								style={styles.supplier_back_icon}
							/>
						</TouchableOpacity>

						<View style={styles.supplier_search_container}>
							<Image
								style={styles.supplier_search_icon}
								source={require("../assets/images/Search.png")}
							/>

							<TextInput
								style={styles.supplier_search_input}
								placeholder="Tìm kiếm trong shop"
								placeholderTextColor="#ffffff"
								selectionColor="#ffffff"
								onChangeText={setSearchKey}
							/>
						</View>


						<TouchableOpacity>
							<Image
								source={require('../assets/images/Igredient/option.png')}
								style={styles.supplier_back_icon}
							/>
						</TouchableOpacity>
					</View>

					<View style={styles.supplier_shop_info}>
						<View style={styles.supplier_overlay}>
							<View style={styles.center_y}>
								<Image
									source={{uri: supplier.url}}
									style={styles.supplier_shop_avatar}
								/>

								<View>
									<Text style={styles.supplier_shop_name}>{supplier.name}</Text>
									<Text style={styles.supplier_shop_location}>📍 {supplier.location}</Text>
								</View>
							</View>

							<TouchableOpacity style={styles.supplier_follow_button}>
								<Text style={styles.supplier_follow_text}>Theo dõi</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.separator}></View>
						<Text style={styles.supplier_shop_desc}>
							{supplier.description}
						</Text>

					</View>

				</View>
			</ImageBackground>
		
			<View style={styles.supplier_filter_row}>
					<TouchableOpacity 
					style={styles.supplier_sort_btn}
					onPress={()=>{
						showSortOptions?setShowSortOptions(false):setShowSortOptions(true)
					}}
					>
						<Text style={styles.supplier_sort_text}>
							{sortLabel}
						</Text>

						<Image
							source={require('../assets/images/Arrow.png')}
							style = {styles.supplier_sort_icon}
						/>
					</TouchableOpacity>

					{/* <View style = {styles.supplier_title_container}>
						<Text style = {styles.supplier_title_text}>
							Sản phẩm
						</Text>
					</View> */}

					<TouchableOpacity 
					style={styles.supplier_filter_btn}
					onPress = {()=>{
						setShowFilterOptions(true)
					}}
					>
						<Text style={styles.supplier_filter_text}>Bộ lọc</Text>
						<View style={styles.supplier_filter_badge}>
							<Text style={styles.supplier_filter_badge_text}>{filterIngredients.length}</Text>
						</View>
					</TouchableOpacity>
			</View>

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
									onPress={() => {
										toggleFilter(type)
										console.log("press:" + type)
									}}
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
			<View style={styles.separator_main}></View>

			<View style = {styles.supplier_title_container}>
				<Text style = {styles.supplier_title_text}>
					Sản phẩm
				</Text>
			</View>

			<ScrollView contentContainerStyle={styles.supplier_product_list}>
				{filterIngredients.map((item, index) => (
					<TouchableOpacity 
						key={index} 
						style={styles.supplier_product_card}
						onPress = {()=>{
							navigation.navigate("IngredientDetail", {ingredient: item, supplier: supplier})
						}}	
					>
							<Image 
								source={{uri: item.url}} style={styles.supplier_product_image} 
							/>
							<Text style={styles.supplier_product_name}>
								{item.name}
							</Text>

							<Text style={styles.supplier_product_price}>
								{item.price}
							</Text>

							<Text style = {styles.supplier_product_sold_count}>
								Đã bán: 1.2k
							</Text>
					</TouchableOpacity>
				))}
			</ScrollView> 


		</ScrollView>
	);
};

export default Supplier;

const styles = StyleSheet.create({
	center_y: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: ws * 10,
	},
	separator: {
		height: ws*2,
		backgroundColor: 'white',
		marginVertical: ws * 10,
	},
	separator_main: {
		height: ws*1,
		backgroundColor: 'gray',
		width: '70%',
		alignSelf: 'center'
	},	
	supplier_container: {
		marginTop: ws * 20,
		flex: 1,
		backgroundColor: '#fff',
		// backgroundColor:'green',
		paddingHorizontal: ws * 30,
	},
	supplier_banner: {
		width: '100%',
		height: ws * 250,
		borderRadius: ws*10,
	},	
	supplier_content:{
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.34)',
		borderRadius: ws * 10,		
	},
	supplier_header: {
		width: '100%',
		height: ws*50,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: ws * 10,
		marginTop: ws * 5,
		justifyContent: 'space-between',
	},
	supplier_search_container: {
		width: '80%'
	},
	supplier_search_input: {
		width: '100%',
		borderWidth: 1,
		color: 'white',
		borderColor: '#ccc',
		borderRadius: ws * 10,
		paddingVertical: ws * 5,
		paddingLeft: ws * 30,
		backgroundColor: 'rgba(255,255,255,0.4)',

	},
	supplier_search_icon: {
		position: 'absolute',
		height: ws * 15,
		width: ws * 15,
		zIndex: 10,
		marginLeft: ws * 10,
		marginVertical: ws * 10,
		resizeMode: 'cover',
		tintColor: 'white'
	},
	supplier_back_icon: {
		width: ws * 20,
		height: '100%',
		tintColor: 'white',
		resizeMode: 'contain'
	},
	supplier_shop_info: {
		height: ws * 200,
		marginBottom: 10,
		paddingHorizontal: ws*15
	},
	supplier_banner_gradient: {
		width: '100%',
		height: ws * 250,
		backgroundColor: 'rgba(255, 255, 255, 0.06)',
		borderRadius: ws * 10,
	},
	supplier_overlay: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: ws*10,
	},
	supplier_shop_avatar: {
		width: ws * 60,
		height: ws * 60,
		borderRadius: ws * 50
	},
	supplier_shop_name: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
	},
	supplier_shop_location: {
		color: '#ffffff',
		marginTop: 2,
		fontWeight: 'bold',
		fontStyle: 'italic'
	},
	supplier_shop_desc: {
		color: 'white',
		fontStyle: 'italic',
		fontSize: ws * 17,
		textAlign: 'justify',
		fontWeight: 'bold'
	},
	supplier_follow_button: {
		backgroundColor: '#fff',
		height: ws * 35,
		paddingVertical: ws * 5,
		paddingHorizontal: ws * 10,
		borderRadius: ws * 10,
		alignSelf: 'center',
	},
	supplier_follow_text: {
		color: '#164144',
		fontWeight: 'bold',
		textAlign: 'justify'
	},
	supplier_filter_row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: ws * 10,
		//backgroundColor: 'red'
	},
	supplier_sort_btn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: ws * 45,
		width: ws * 150,
		paddingHorizontal: ws * 10,
		borderColor: 'gray',
		borderWidth: ws * 1,
		borderRadius: ws * 20
	},
	supplier_sort_text: {
		textAlign:  'center',
		color: 'gray',
		fontSize: ws * 15,
	},
	supplier_sort_icon:{
        width: ws*20, 
        height: ws*10, 		
		transform: [{ rotate: '-90 deg' }], 
		objectFit: 'contain',
	},
	supplier_title_container:{
		//backgroundColor: 'green'
		// width: ws * 150,
		// fontWeight:'bold'
	},
	supplier_title_text:{
		fontSize: ws * 30,
		textAlign: 'center',
		color: '#164144',
		fontWeight: 'bold'
	},
	supplier_filter_btn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: ws * 100,
		height: ws * 45,
		paddingHorizontal: ws * 15,
		borderColor: 'gray',
		borderWidth: ws * 1,
		borderRadius: ws * 20		
	},
	supplier_filter_text: {
		color: 'gray',
		fontSize: ws * 15
	},
	supplier_filter_badge: {
		backgroundColor: '#5da4a8',
		borderRadius: 10,
		paddingHorizontal: 6,
		paddingVertical: 2,
		marginLeft: 4,
	},
	supplier_filter_badge_text: {
		color: '#fff',
		fontSize: 12,
	},
	supplier_product_list: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingBottom: ws * 50,
	},
	supplier_product_card: {
		width: '48%',
		backgroundColor: '#f5f5f5',
		borderRadius: ws*20,
		padding: ws * 10,
		marginVertical: ws * 10,
		//marginHorizontal: ws * 9,
		//alignItems: 'center',
	},
	supplier_product_image: {
		width: '100%',
		height: ws * 120,
		borderRadius: ws * 10,
		marginBottom: ws * 10,
	},
	supplier_product_name: {
		fontSize: ws * 25,
		fontWeight: '500',
		marginBottom: ws * 5,
		color: '#376D6B'
	},
	supplier_product_price: {
		fontSize: ws * 20,
		color: '#888',
		marginBottom: 6,
	},
	supplier_product_sold_count: {
		fontSize: ws * 15, 
        color: 'gray',
        fontStyle: 'italic',
        textAlign: 'right' 
	},
	supplier_bottom_nav: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: 70,
		backgroundColor: '#5da4a8',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	supplier_nav_item: {
		alignItems: 'center',
	},
	supplier_nav_text: {
		color: '#fff',
		fontSize: 12,
		marginTop: 2,
	},
	supplier_nav_center_btn: {
		backgroundColor: '#3b7f83',
		padding: 12,
		borderRadius: 30,
	},
    //--------------SORT---------------
    sortOptionContainer: {
        position: 'absolute',
        top: ws * 310,
        left: ws * 0,
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
	/* ---------------FILTER------------- */
    filterOptionContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom:0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
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

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
import { IngredientContext } from '../context/IngredientContext';
import { AuthContext } from '../context/AuthContext';

const ws = Dimensions.get('window').width / 440;

const IngredientDetail = () => {
    const navigation = useNavigation();
    const route = useRoute()

    //Lấy param từ page trước
    const ingredient = route.params?.ingredient
    const supplier = route.params?.supplier

    //SupplierIngredient
    const[supplierIngredients, setSupplierIngredients] = useState([])
    const{handleGetIngredientBySupplierId} = useContext(IngredientContext)
    useEffect(()=>{  
        const getSupplierIngredients = async()=>{
            const result = await handleGetIngredientBySupplierId(supplier.id)
            if (result && result.ingredients) {
                setSupplierIngredients(result.ingredients);
            } else {
                setSupplierIngredients([]); 
            }
        }

        getSupplierIngredients()
    },[])


    /*Dat hang */
    const [showPopUp, setShowPopUp] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)

    const {handleAddIngredientToCart} = useContext(IngredientContext)
    const {userLogin} = useContext(AuthContext)

    return (
        <>
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require("../assets/images/Igredient/back-button.png")}
                        style={styles.header_back_button}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                            source={require("../assets/images/Igredient/option.png")}
                            style={styles.header_option_button}
                    />
                </TouchableOpacity>

            </View>
            
            <View>
                <Image
                    source={{ uri: ingredient.url}}
                    style={styles.main_image}
                />       
                {/* <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.main_image_gradient}
                />          */}
            </View>


            <View style={styles.info_container}>

                <View style={styles.info_title}>
                    <Text style={styles.title}>{ingredient.name} ({ingredient.quantity} {ingredient.unit})</Text>
                    <Text style={styles.sold}>Đã bán: 1.1k</Text>
                </View>

                <View style={styles.info_buy_row}>
                    <Text style={styles.price}>
                        {ingredient.price} VND
                    </Text>
                    <TouchableOpacity 
                    style={styles.buy_button}
                    onPress={() => {
                        setShowPopUp(true)
                    }}
                    >
                        <Text style={styles.buy_button_text}> 
                            Mua ngay
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.shop_container}>
                <Image
                    source={{uri: supplier.url}}
                    style={styles.shop_avatar}
                />
                <View style={styles.shop_info}>
                    <Text style={styles.shop_name}>{supplier.name}</Text>
                    <View style={styles.shop_location_container}>
                        <Image
                            source={require('../assets/images/Igredient/location.png')}
                            style = {styles.shop_location_icon}
                        />                
                        <Text style={styles.shop_location_text}>
                            {supplier.location}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.follow_button}>
                    <Text style={styles.follow_button_text}>
                        Theo dõi
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.separator} />   

            <View style={styles.featured_header}>
                <Text style={styles.featured_title}>
                    Các sản phẩm nổi bật
                </Text>

                <TouchableOpacity 
                onPress={() => navigation.navigate('Supplier', {supplier: supplier, supplierIngredients: supplierIngredients})}>
                    <Text style={styles.view_all}>
                        Xem tất cả ➤
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.featured_list}>
                {supplierIngredients.map((item, index) => (

                    <TouchableOpacity 
                    key={index} 
                    style={styles.featured_item}
                    onPress ={() => navigation.navigate('IngredientDetail', {ingredient: item, supplier: supplier })}    
                    >
                        <Image
                        source={{uri: item.url}}
                        style={styles.featured_image}
                        />
                        <Text style={styles.featured_name}>{item.name}</Text>
                        <Text style={styles.featured_price}>{item.price}</Text>
                        <Text style={styles.featured_sold}>Đã bán 1.2k</Text>
                    </TouchableOpacity>

                ))}
            </ScrollView>

            <View style={styles.separator} />   

            <View style={styles.description_container}>
                <Text style={styles.description_title}>Cà chua:</Text>
                <Text style={styles.description_text}>
                    {ingredient.description}
                </Text>
            </View>
        </ScrollView>       

        {/* Popup mua hàng */}
        {showPopUp && (
            <View style={styles.popupOverlay}>
                <View style={styles.popupContainer}>
                
                {/* Nút X để đóng */}
                <TouchableOpacity onPress={() => setShowPopUp(false)} style={styles.popupCloseBtn}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>✕</Text>
                </TouchableOpacity>

                {/* Ảnh + Tên + Giá */}
                <View style={styles.popupProductInfo}>
                    <Image source={{ uri: ingredient.url }} style={styles.popupImage} />
                    <View>
                    <Text style={styles.popupTitle}>{ingredient.name} ({ingredient.quantity} {ingredient.unit})</Text>
                    <Text style={styles.popupPrice}>{ingredient.price} VND</Text>
                    </View>
                </View>

                {/* Tăng giảm số lượng */}
                <View style={styles.popupQuantity}>
                    <TouchableOpacity onPress={() => setQuantity(prev => Math.max(1, prev - 1))}>
                    <Text style={styles.popupQuantityBtn}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.popupQuantityNumber}>{quantity}</Text>
                    <TouchableOpacity onPress={() => setQuantity(prev => prev + 1)}>
                    <Text style={styles.popupQuantityBtn}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Nút Thêm vào giỏ hàng */}
                <TouchableOpacity 
                    style={styles.popupBuyBtn}
                    onPress={() => {        
                        console.log("Thêm vào giỏ")
                        setShowPopUp(false);
                        setShowSuccessPopup(true)
                        setTimeout(()=>{
                                setShowSuccessPopup(false)
                        }, 10000)                     
                        const handleAdd = async () => {
                            const result = await handleAddIngredientToCart(userLogin.id, ingredient.id, quantity)
                            if(result.success){
                                setShowPopUp(false);
                                setShowSuccessPopup(true)
                                setTimeout(()=>{
                                    setShowSuccessPopup(false)
                                }, 1500)
                            }
                        }
                        handleAdd()
                    }}
                >
                    <Text style={styles.popupBuyBtnText}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
                </View>
            </View>
        )}

        {showSuccessPopup && (
            <View style={styles.successPopup}>
                <Image source={require('../assets/images/Igredient/check.png')} style={styles.checkBtn}/>
                <Text style={styles.successText}>Đã thêm vào giỏ hàng!</Text>
            </View>
        )}        
    </>

  );
};

export default IngredientDetail;

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 'white', 
        paddingHorizontal: ws * 30 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: ws*20,
        marginBottom: ws*5,
        marginVertical: ws*20,
        backgroundColor: 'white'
    },
    header_back_button:{
        width: ws * 30,
        height: ws * 30
    },
    header_option_button:{
        width: ws * 30,
        height: ws * 30        
    },
    main_image: {
        width: '100%',
        height: ws * 250,
        borderRadius: ws * 16,
        resizeMode: 'cover',
    },  
    main_image_gradient:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        borderRadius: ws * 16,        
    },
    info_container: {
        marginTop: ws * 10,
    },
    info_title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: { 
        fontWeight: 'bold', 
        fontSize: ws*25,
        color: '#307F85'
    },
    sold: { 
        fontStyle: 'italic', 
        fontSize: 15, 
        color: 'gray' 
    },
    info_buy_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: ws * 5,
    },
    price: { 
        //fontWeight: 'bold', 
        fontStyle: 'italic',
        fontSize: 18,
        //marginLeft: ws*10,
        color: '#164144'
    },
    buy_button: {
        backgroundColor: '#76cfcf',
        paddingHorizontal: ws*10,
        paddingVertical: ws*10,
        borderRadius: ws*10,
    },
    buy_button_text: { 
        color: 'white', 
        fontWeight: 'bold' 
    },
    shop_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: ws * 10,
    },
    shop_avatar: {
        width: ws*60,
        height: ws*60,
        borderRadius: ws*50,
    },
    shop_info: {
        marginLeft: ws*20,
        flex: 1,
    },
    shop_name: { 
        fontWeight: 'bold',
        fontSize:  ws*20,
        color: '#307F85'
    },
    shop_location_container:{
        flexDirection: 'row',
        // backgroundColor: 'red'
    },
    shop_location_icon:{
        height: '100%',
        width: ws*30,
        resizeMode: 'center',
    },
    shop_location_text: { 
        color: 'gray',
        fontStyle:'italic' 
    },
    follow_button: {
        backgroundColor: '#76cfcf',
        paddingHorizontal: ws*10,
        paddingVertical: ws*10,
        borderRadius: ws*10,
    },
    follow_button_text: {
        color: 'white',
        fontWeight: 'bold',
    },
    separator:{
        height: 1,
        backgroundColor: 'gray',
    },    
    featured_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: ws * 10,
    },
    featured_title: { 
        fontWeight: 'bold', 
        fontSize: 15,
        color:'#164144' 
    },
    view_all: { 
        color: '#307F85', 
        fontWeight: 'bold' 
    },
    featured_list: {
        flexDirection: 'row',
        marginVertical: ws*10
    },

    featured_item: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: ws * 10,
        width: ws * 120,
        marginRight: ws * 10,
        borderWidth: ws * .5,
        borderColor: 'gray'
    },
    featured_image: {
        width: '100%',
        height: ws * 80,
        borderRadius: 8,
        marginBottom: 6,
    },
    featured_name: { 
        fontWeight: 'bold',
        color: '#164144' 
    },
    featured_price: { 
        color: '#376D6B', 
        fontSize: 13 
    },
    featured_sold: { 
        fontSize: 12, 
        color: 'gray',
        fontStyle: 'italic',
        textAlign: 'right' 
    },
    description_container: {
        marginTop: ws * 10,
    },
    description_title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#164144'
    },
    description_text: {
        textAlign: 'justify',
        fontSize: 14,
        marginTop: 6,
        color: '#555',
    },
    /*---------------POP-UP MUA HANG */
    popupOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 0, 0, 0)',
        justifyContent: 'flex-end',
        flex: 1,
      },
      
      popupContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: ws * 20,
        borderTopRightRadius: ws*20,
        padding: ws*25,
        paddingBottom: 40,
        elevation: ws * 10, // đổ bóng trên Android
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderColor: 'rgba(0, 0, 0, 0.16)',
        borderWidth: ws * 1
      },
      
      popupCloseBtn: {
        alignSelf: 'flex-end',
        padding: 5,
      },
      
      popupProductInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
      },
      
      popupImage: {
        width: ws * 100,
        height: ws * 100,
        borderRadius: 10,
        marginRight: 10,
      },
      
      popupTitle: {
        fontSize: ws * 20,
        fontWeight: 'bold',
      },
      
      popupPrice: {
        fontSize: ws * 17,
        color: '#555',
        fontStyle:'italic'
      },
      
      popupQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: ws * 20,
        gap: ws *20,
      },
      
      popupQuantityBtn: {
        fontSize: 24,
        width: 40,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderWidth: 1,
        borderRadius: 5,
      },
      
      popupQuantityNumber: {
        fontSize: ws * 18,
        fontWeight: 'bold',
      },
      
      popupBuyBtn: {
        backgroundColor: '#76cfcf',
        padding: ws * 15,
        borderRadius: ws * 15,
        alignItems: 'center',
      },
      
      popupBuyBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: ws * 17,
      },
    successPopup: {
        position: 'absolute',
        top: '40%',
        left: '25%',
        right: '25%',
        backgroundColor: '#4BB543',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        zIndex: 999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: ws * 5,
        elevation: ws * 20,
    },
    successText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkBtn:{
        width: ws * 50,
        height: ws * 50,
        tintColor: 'white',
        marginBottom: ws * 20,

    }

});

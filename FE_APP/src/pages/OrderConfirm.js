import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ModalDropdown from 'react-native-modal-dropdown';
import { HostURL } from "../services/Host"

const { width } = Dimensions.get('screen');
const ws = width / 440;
const GHN_TOKEN = 'd921acb8-2250-11f0-a31b-ba64a63c693a';
const FROM_DISTRICT_ID = 1542;
const SERVICE_TYPE_ID = 2;

const OrderConfirm = ({ route }) => {
  const { userId, selectedItems } = route.params;
  console.log(selectedItems)
  const API_URL = `${HostURL}/order`
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');

  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [shippingFee, setShippingFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const totalItemsPrice = selectedItems.reduce(
    (total, item) => total + item.price,
    0
  );
  const totalPrice = totalItemsPrice + shippingFee;
  const totalWeight = selectedItems.reduce((weight, item) => {
    if (item.unit !== 'kg' && item.unit !== 'gram') {
      return weight; // bỏ qua item nếu đơn vị không phải kg hoặc gram
    }

    let itemWeightInGram = item.quantity;

    if (item.unit === 'kg') {
      itemWeightInGram *= 1000; // đổi kg -> gram
    }

    return weight + itemWeightInGram;
  }, 0);

  useEffect(() => {
    fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Token': GHN_TOKEN,
      },
    })
      .then(res => res.json())
      .then(json => setProvinceList(json.data || []))
      .catch(err => console.error('Lỗi khi lấy tỉnh:', err));
  }, []);

  useEffect(() => {
    if (!province) return;
    fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': GHN_TOKEN,
      },
      body: JSON.stringify({ province_id: Number(province) })
    })
      .then(res => res.json())
      .then(json => {
        setDistrictList(json.data || []);
        setDistrict('');
        setWard('');
        setWardList([]);
      })
      .catch(err => console.error('Lỗi khi lấy quận:', err));
  }, [province]);

  useEffect(() => {
    if (!district) return;
    fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': GHN_TOKEN,
      },
      body: JSON.stringify({ district_id: Number(district) })
    })
      .then(res => res.json())
      .then(json => {
        setWardList(json.data || []);
        setWard('');
      })
      .catch(err => console.error('Lỗi khi lấy phường:', err));
  }, [district]);

  useEffect(() => {
    if (district && ward) {
      calculateShippingFee(district, ward)
        .then(fee => setShippingFee(fee))
        .catch(() => setShippingFee(0));
    }
  }, [district, ward]);

  const calculateShippingFee = async (districtId, wardCode) => {
    try {
      const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Token': GHN_TOKEN,
          'ShopId': '5750976'
        },
        body: JSON.stringify({
          from_district_id: FROM_DISTRICT_ID,
          service_type_id: SERVICE_TYPE_ID,
          to_district_id: Number(districtId),
          to_ward_code: wardCode,
          weight: totalWeight
        })
      });
      const json = await response.json();
      if (json.code === 200) {
        return json.data.total;
      } else {
        console.error('Tính phí lỗi:', json);
        return 0;
      }
    } catch (error) {
      console.error('Lỗi gọi API tính phí:', error);
      return 0;
    }
  };


  const handlePlaceOrder = async () => {
    try {
      const orderInfo = {
        name: fullName,
        phone: phoneNumber,
        strict: addressDetail,
        ward: selectedWard,
        district: selectedDistrict,
        province: selectedProvince,
        shippingFee: shippingFee,
        paymentType: paymentMethod,
        totalPrice: totalPrice,
        status: 'pending',
        ingredients: selectedItems.map(item => {
          const ingredientData = {
            ingredientId: item.ingredientId,
            quantity: item.quantity,
            price: item.price
          };
    
          // Kiểm tra nếu có `cartIngredientId` và thêm vào
          if (item.cartIngredientId) {
            ingredientData.cartIngreId = item.cartIngredientId;
          }     
          // Kiểm tra nếu có `cartRecipeId` và thêm vào
          if (item.cartRecipeId) {
            ingredientData.cartRecipeId = item.cartRecipeId;
          }
    
          return ingredientData;
        }),
      };
      const response = await fetch(`${API_URL}/${userId}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderInfo }),
      });

      if (!response.ok) {
        throw new Error('Đặt hàng thất bại');
      }

      const data = await response.json();
      console.log('Đặt hàng thành công:', data);
      alert("Đặt hàng thành công");
      navigation.navigate("Cart");
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../assets/images/Arrow.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tạo đơn hàng</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Họ tên"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Số nhà, tên đường..."
            value={addressDetail}
            onChangeText={setAddressDetail}
          />

          <Text style={styles.label}>Tỉnh/Thành phố</Text>
          <ModalDropdown
            options={provinceList.map(p => ({ label: p.ProvinceName, value: p.ProvinceID.toString() }))}
            defaultValue="-- Chọn tỉnh --"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropdownTextStyle={styles.dropdownItemText}
            onSelect={(index, option) => {
              setProvince(option.value);
              setSelectedProvince(option.label); // Set the selected province
              if (option.label !== 'Hà Nội') {
                alert('Chưa hỗ trợ giao hàng tại tỉnh này');
              }
            }}
            renderButtonText={option => option.label}
            renderRow={(option, index, isSelected) => (
              <Text
                style={[
                  styles.dropdownItemText,
                  option.value === province && { backgroundColor: '#70B9BE', color: '#fff' } // Change color when selected
                ]}
              >
                {option.label}
              </Text>
            )}
          />

          <Text style={styles.label}>Quận/Huyện</Text>
          <ModalDropdown
            options={districtList.map(d => ({ label: d.DistrictName, value: d.DistrictID.toString() }))}
            defaultValue="-- Chọn quận --"
            disabled={!province}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropdownTextStyle={styles.dropdownItemText}
            onSelect={(index, option) => {
              setDistrict(option.value);
              setSelectedDistrict(option.label); // Set the selected district
            }}
            renderButtonText={option => option.label}
            renderRow={(option, index, isSelected) => (
              <Text
                style={[
                  styles.dropdownItemText,
                  option.value === district && { backgroundColor: '#70B9BE', color: '#fff' } // Change color when selected
                ]}
              >
                {option.label}
              </Text>
            )}
          />

          <Text style={styles.label}>Phường/Xã</Text>
          <ModalDropdown
            options={wardList.map(w => ({ label: w.WardName, value: w.WardCode.toString() }))}
            defaultValue="-- Chọn phường --"
            disabled={!district}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropdownTextStyle={styles.dropdownItemText}
            onSelect={(index, option) => {
              setWard(option.value);
              setSelectedWard(option.label); // Set the selected ward
            }}
            renderButtonText={option => option.label}
            renderRow={(option, index, isSelected) => (
              <Text
                style={[
                  styles.dropdownItemText,
                  option.value === ward && { backgroundColor: '#70B9BE', color: '#fff' } // Change color when selected
                ]}
              >
                {option.label}
              </Text>
            )}
          />
        </View>

        <Text style={styles.title}>Giỏ hàng</Text>
        <View style={styles.cartCard}>
          {selectedItems.map(item => (
            <View style={styles.cartItem}>
              <Text>{item.name}: {item.quantity} {item.unit}</Text>
              <Text>{item.price} đ</Text>
            </View>
          ))}

          <View style={styles.summary}>
            <Text style={styles.temporaryPrice}>Tạm tính: {totalItemsPrice} đ</Text>
            <Text>Phí vận chuyển: {shippingFee} đ</Text>
            <Text style={styles.total}>Tổng cộng: {totalPrice} đ</Text>
          </View>
        </View>

        <Text style={styles.label}>Phương thức thanh toán</Text>
        <ModalDropdown
          options={[
            { label: 'Thanh toán khi nhận hàng (COD)', value: 'COD' },
            { label: 'Chuyển khoản ngân hàng', value: 'BANK_TRANSFER' }
          ]}
          defaultValue="Thanh toán khi nhận hàng (COD)"
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownTextStyle={styles.dropdownItemText}
          onSelect={(index, option) => setPaymentMethod(option.value)}
          renderButtonText={option => option.label}
          renderRow={option => <Text style={styles.dropdownItemText}>{option.label}</Text>}
        />

        <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
          <Text style={styles.orderButtonText}>Xác nhận đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderConfirm;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  content: {
    padding: ws * 15
  },
  header: {
    height: ws * 60,
    backgroundColor: '#70B9BE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    width: ws * 60,
    height: ws * 60,
    borderRadius: ws * 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: ws * 15,
  },
  backIcon: {
    tintColor: '#000000',
  },
  headerTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowRadius: 6,
  },
  label: { fontSize: 16, marginTop: 10, marginBottom: 5, color: '#666' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fafafa'
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  dropdownText: { fontSize: 16, color: '#333' },
  dropdownItemText: { fontSize: 16, padding: 10, color: '#333' },
  cartCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowRadius: 6,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  summary: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',

  },
  temporaryPrice: {
    marginVertical: 10
  },
  total: { fontWeight: 'bold', fontSize: 18, marginTop: 5, color: '#000' },
  orderButton: {
    backgroundColor: '#70B9BE',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: ws * 15
  },
  orderButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

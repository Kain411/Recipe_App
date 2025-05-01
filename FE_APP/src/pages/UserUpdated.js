import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Alert} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-native-date-picker";
import {getUserByID} from "../services/AuthService"
import { HostURL } from "../services/Host"
import { launchImageLibrary } from 'react-native-image-picker';
const API_URL = `${HostURL}/users/user`
const { width } = Dimensions.get('screen');
const ws = width / 440;

const UserUpdated = ({ route }) => {
  const navigation = useNavigation();
  const { userId } = route.params;

  const [userLogin, setUserLogin] = useState(null);
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      email: "",
      username: "",
      phone: "",
      location: "",
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserByID(userId);
      console.log(result.user)
      if (result.user) {
        setUserLogin(result.user);
        reset({
          email: result.user.email || "",
          username: result.user.username || "",
          phone: result.user.phone || "",
          location: result.user.location || "",
        });
        setGender(result.user.gender || "");
        setDate(parseDate(result.user.dob));
        setProfileImage(result.user.url || "");
        setBackgroundImage(result.user.bg_url || "");
      } else {
        console.error("Không thể tải dữ liệu người dùng");
      }
    };
    fetchUser();
  }, [userId]);
  const parseDate = (dob) => {
    if (!dob) return new Date();
    const parts = dob.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(`${year}-${month}-${day}`);
    }
    return new Date();
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const updatedUser = { 
        ...data, 
        gender, 
        dob: formatDate(date), 
        url: profileImage, 
        bg_url: backgroundImage 
      };
  
      console.log("Dữ liệu gửi đi:", updatedUser);
      console.log("api", `${API_URL}/${userLogin.id}`)

  
      const response = await fetch(`${API_URL}/${userLogin.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });
      const responseData = await response.json();
      console.log('Cập nhật thành công:', responseData);
  
      if (response.ok) {
        alert('Cập nhật thông tin thành công');
      } else {
        console.error("Lỗi từ server:", responseData);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
    }
  };

const selectImage = async (isProfile) => {
  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  launchImageLibrary(options, async (response) => {
    if (response.didCancel) {
      console.log('Người dùng huỷ chọn ảnh');
    } else if (response.errorCode) {
      console.log('Lỗi chọn ảnh:', response.errorMessage);
    } else {
      const asset = response.assets[0];
      const uri = asset.uri;
      const fileName = asset.fileName || 'image.jpg';
      const type = asset.type || 'image/jpeg';

      const formData = new FormData();
      formData.append('image', {
        uri,
        name: fileName,
        type,
      });

      try {
        const uploadType = isProfile ? 'avatar' : 'background';
        const res = await fetch(`http://10.0.2.2:8000/api/upload/${userId}/${uploadType}`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const resJson = await res.json();
        if (res.ok) {
          if (isProfile) {
            setProfileImage(resJson.url);
          } else {
            setBackgroundImage(resJson.url);
          }
          console.log("Upload thành công:", resJson.url);
        } else {
          console.error("Lỗi từ API:", resJson.message);
        }
      } catch (error) {
        console.error("Lỗi khi upload ảnh:", error);
      }
    }
  });
};

  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../assets/images/Arrow.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa</Text>
      </View>

      {/* Profile Images with Edit Options */}
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{ uri: backgroundImage || userLogin?.bg_url || undefined }}
          style={styles.backgroundImage}
        >
          {/* Background Image Edit Button */}
          <TouchableOpacity
            style={styles.editBackgroundButton}
            onPress={() => selectImage(false)}
            >
            <Image
              source={require("../assets/images/camera.png")} // Replace with your camera/edit icon
              style={[styles.editIcon, { transform: [{ rotate: '315deg' }] }]}
            />
          </TouchableOpacity>

          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profileImage|| userLogin?.bg_url || undefined }}
              style={styles.profileImage}
            />

            {/* Profile Image Edit Button */}
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => selectImage(true)} // true for profile image

            >
              <Image
                source={require("../assets/images/camera.png")} // Replace with your camera/edit icon
                style={[styles.editIcon, { transform: [{ rotate: '315deg' }] }]}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <FormField
          label="Tên người dùng"
          name="username"
          control={control}
          placeholder="Tên người dùng"
        />

        <FormField
          label="Email"
          name="email"
          control={control}
          placeholder="Email"
        />

        {/* Custom Gender Selection */}
        <Text style={styles.label}>Giới tính</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderOption,
              gender === "Nam" && styles.genderOptionSelected
            ]}
            onPress={() => setGender("Nam")}
          >
            <Text style={[
              styles.genderText,
              gender === "Nam" && styles.genderTextSelected
            ]}>Nam</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              gender === "Nữ" && styles.genderOptionSelected
            ]}
            onPress={() => setGender("Nữ")}
          >
            <Text style={[
              styles.genderText,
              gender === "Nữ" && styles.genderTextSelected
            ]}>Nữ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              gender === "Khác" && styles.genderOptionSelected
            ]}
            onPress={() => setGender("Khác")}
          >
            <Text style={[
              styles.genderText,
              gender === "Khác" && styles.genderTextSelected
            ]}>Khác</Text>
          </TouchableOpacity>
        </View>

        {/* Date Picker */}
        <Text style={styles.label}>Ngày sinh</Text>
        <TouchableOpacity style={styles.inputContainer} onPress={() => setOpen(true)}>
          <Text style={styles.dateText}>{date.toLocaleDateString("vi-VN")}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={(selectedDate) => {
            setOpen(false);
            setDate(selectedDate);
          }}
          onCancel={() => setOpen(false)}
        />

        <FormField
          label="Số điện thoại"
          name="phone"
          control={control}
          placeholder="00099888"
          keyboardType="phone-pad"
        />

        <FormField
          label="Địa chỉ"
          name="location"
          control={control}
          placeholder="Nhập địa chỉ"
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitButtonText}>Lưu thông tin</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Reusable Form Field Component
const FormField = ({ label, name, control, placeholder, keyboardType = "default" }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={styles.inputContainer}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      )}
    />
  </>
);

export default UserUpdated;

// Optimized styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  imageContainer: {
    position: 'relative',
    height: ws * 200 + ws * 60, // Height for background plus half of profile photo
  },
  backgroundImage: {
    width: '100%',
    height: ws * 200,
    position: 'relative',
  },
  editBackgroundButton: {
    position: 'absolute',
    right: ws * 15,
    top: ws * 15,
    width: ws * 36,
    height: ws * 36,
    borderRadius: ws * 18,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: -ws * 60,
    alignSelf: 'center',
  },
  profileImage: {
    width: ws * 120,
    height: ws * 120,
    borderRadius: ws * 60,
    borderWidth: 5,
    borderColor: '#ffffff',
  },
  editProfileButton: {
    position: 'absolute',
    right: 0,
    bottom: ws * 20,
    width: ws * 32,
    height: ws * 32,
    borderRadius: ws * 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    width: ws * 18,
    height: ws * 18,
    tintColor: '#70B9BE',
  },
  formContainer: {
    paddingHorizontal: ws * 30,
    paddingTop: ws * 8, // Adjusted to account for the new profile image placement
    paddingBottom: ws * 30,
  },
  label: {
    fontSize: 16,
    marginTop: ws * 20,
    color: "#555",
    fontWeight: "bold"
  },
  inputContainer: {
    backgroundColor: "#fff",
    padding: ws * 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 5,
  },
  // Custom gender selector styles
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  genderOption: {
    flex: 1,
    padding: ws * 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    borderRadius: 8,
  },
  genderOptionSelected: {
    backgroundColor: "#70B9BE",
    borderColor: "#70B9BE",
  },
  genderText: {
    fontSize: 16,
    color: "#555",
  },
  genderTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#70B9BE",
    padding: ws * 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: ws * 30,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
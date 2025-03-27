import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { 
  Dimensions, 
  Image, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  ImageBackground,
  Alert
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-native-date-picker";
import { AuthContext } from "../context/AuthContext";

const { width } = Dimensions.get('screen');
const ws = width / 440;

const UserUpdated = ({ route }) => {
  const navigation = useNavigation();
  const { userLogin } = useContext(AuthContext)
  console.log(userLogin)
  
  // Form setup with react-hook-form
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: userLogin?.name || "",
      username: userLogin?.username || "",
      phone: userLogin?.phone || "",
      location: userLogin?.location || ""
    }
  });
  
  // State management
  const [gender, setGender] = useState(userLogin?.gender || "male");
  const parseDate = (dob) => {
    if (!dob) return new Date();
    const parts = dob.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(`${year}-${month}-${day}`);
    }
    return new Date();
  };
  
  const [date, setDate] = useState(parseDate(userLogin?.dob));
  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(userLogin?.url || "");
  const [backgroundImage, setBackgroundImage] = useState(userLogin?.bg_url || "");
  
  // Function to select profile image
  const selectProfileImage = async () => {
    // This is a placeholder - implement based on your image picker library
    Alert.alert(
      "Chọn ảnh đại diện",
      "Chọn nguồn ảnh",
      [
        { 
          text: "Máy ảnh", 
          onPress: () => console.log("Camera option selected")
          // In actual implementation:
          // onPress: () => openCamera({ mediaType: 'photo', width: 300, height: 300 })
          //   .then(image => setProfileImage(image.path))
        },
        {
          text: "Thư viện ảnh", 
          onPress: () => console.log("Gallery option selected")
          // In actual implementation:
          // onPress: () => openGallery({ mediaType: 'photo', width: 300, height: 300 })
          //   .then(image => setProfileImage(image.path))
        },
        { 
          text: "Hủy", 
          style: "cancel" 
        }
      ]
    );
  };
  
  // Function to select background image
  const selectBackgroundImage = async () => {
    // This is a placeholder - implement based on your image picker library
    Alert.alert(
      "Chọn ảnh bìa",
      "Chọn nguồn ảnh",
      [
        { 
          text: "Máy ảnh", 
          onPress: () => console.log("Camera option selected")
          // In actual implementation:
          // onPress: () => openCamera({ width: 800, height: 400 })
          //   .then(image => setBackgroundImage(image.path))
        },
        {
          text: "Thư viện ảnh", 
          onPress: () => console.log("Gallery option selected")
          // In actual implementation:
          // onPress: () => openGallery({ width: 800, height: 400 })
          //   .then(image => setBackgroundImage(image.path))
        },
        { 
          text: "Hủy", 
          style: "cancel" 
        }
      ]
    );
  };
  
  // Handle form submission
  const onSubmit = (data) => {
    const updatedUser = {
      ...userLogin,
      ...data,
      gender,
      dob: date.toISOString(),
      url: profileImage,
      bg_url: backgroundImage
    };
    console.log("Updated user data:", updatedUser);
    // Here you would typically call an API to update the user
    // Then navigate back or show success message
    navigation.goBack();
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
          source={{ uri: backgroundImage || userLogin.bg_url }} 
          style={styles.backgroundImage} 
        >
          {/* Background Image Edit Button */}
          <TouchableOpacity 
            style={styles.editBackgroundButton}
            onPress={selectBackgroundImage}
          >
            <Image 
              source={require("../assets/images/camera.png")} // Replace with your camera/edit icon
              style={[styles.editIcon, { transform: [{ rotate: '315deg' }] }]} 
            />
          </TouchableOpacity>
          
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: profileImage || userLogin.url }} 
              style={styles.profileImage} 
            />
            
            {/* Profile Image Edit Button */}
            <TouchableOpacity 
              style={styles.editProfileButton}
              onPress={selectProfileImage}
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
          label="Họ và tên"
          name="name"
          control={control}
          placeholder="Họ và tên"
        />
        
        <FormField 
          label="Tên người dùng"
          name="username"
          control={control}
          placeholder="Tên người dùng"
        />
        
        {/* Custom Gender Selection */}
        <Text style={styles.label}>Giới tính</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity 
            style={[
              styles.genderOption, 
              gender === "male" && styles.genderOptionSelected
            ]}
            onPress={() => setGender("male")}
          >
            <Text style={[
              styles.genderText,
              gender === "male" && styles.genderTextSelected
            ]}>Nam</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.genderOption, 
              gender === "female" && styles.genderOptionSelected
            ]}
            onPress={() => setGender("female")}
          >
            <Text style={[
              styles.genderText,
              gender === "female" && styles.genderTextSelected
            ]}>Nữ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.genderOption, 
              gender === "other" && styles.genderOptionSelected
            ]}
            onPress={() => setGender("other")}
          >
            <Text style={[
              styles.genderText,
              gender === "other" && styles.genderTextSelected
            ]}>Khác</Text>
          </TouchableOpacity>
        </View>
        
        {/* Date Picker */}
        <Text style={styles.label}>Ngày sinh</Text>
        <TouchableOpacity style={styles.inputContainer} onPress={() => setOpen(true)}>
          <Text style={styles.dateText}>{date.toDateString()}</Text>
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
          name="address"
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
    left: ws * 20,
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
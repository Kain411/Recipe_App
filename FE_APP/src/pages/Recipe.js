import { useState } from "react"
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"

const ws = Dimensions.get('screen').width / 440 

const StepComponent = ({index, DeleteStep}) => {

    const [check, setCheck] = useState(false)
    const [select, setSelect] = useState(0)

    const data = [
        { key: "0", value: "30 giây" },
        { key: "1", value: "1 phút" },
        { key: "2", value: "2 phút" },
        { key: "3", value: "3 phút" },
        { key: "4", value: "5 phút" },
        { key: "5", value: "10 phút" },
    ]

    return (
        <View style={styles.stepComponent_container}>
            <View style={[styles.center_y, styles.space_between, styles.stepComponent_main]}>
                <TextInput 
                    style={styles.stepComponent_input_title}
                    placeholder="Tiêu đề"
                />
                <View style={styles.center_y}>
                    <TouchableOpacity 
                        style={styles.stepComponent_btn_checkbox}
                        onPress={() => setCheck(!check)}
                    >
                        {
                            check ? 
                            <Image source={require("../assets/images/Checkbox_Checked.png")} style={styles.stepComponent_icon_checkbox} />
                            : <Image source={require("../assets/images/Checkbox_UnChecked.png")} style={styles.stepComponent_icon_checkbox} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.stepComponent_btn_checkbox, styles.stepComponent_btn_bin]}
                        onPress={DeleteStep}
                    >
                        <Image source={require("../assets/images/Bin.png")} style={styles.stepComponent_icon_bin} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.center_y, styles.space_between, styles.stepComponent_main]}>
                <TextInput
                    style={styles.stepComponent_input_description}
                    placeholder="Mô tả"
                />
                {
                    check ? 
                    <SelectList 
                        data={data}
                        setSelected={setSelect}
                        placeholder="Select"
                        boxStyles={styles.recipe_select_box}
                        dropdownStyles={styles.recipe_select_dropdown}
                        modalDropdown={true}
                    />
                    : null
                }
            </View>
        </View>
    )
}

const IngredientComponent = () => {

    const [select, setSelect] = useState(0)

    const data = [
        { key: "0", value: "gram" },
        { key: "1", value: "kg" },
    ]

    return (
        <View style={[styles.center_y, styles.ingredientComponent_container]}>
            <View style={[styles.center, styles.ingredientComponent_info]}>
                <Image source={require("../assets/images/food.jpg")} style={styles.ingredientComponent_img} />
                <Text style={styles.ingredientComponent_name}>Đường</Text>
                <TouchableOpacity 
                    style={[styles.center, styles.ingredientComponent_btn_mark_x]}
                >
                    <Image source={require("../assets/images/Mark_X.png")} style={styles.ingredientComponent_icon_mark_x} />
                </TouchableOpacity>
            </View>
            <View style={styles.ingredientComponent_quantity}>
                <TextInput style={styles.ingredientComponent_input_quantity} placeholder="100" />
                <SelectList 
                    data={data}
                    setSelected={setSelect}
                    placeholder="gram"
                    boxStyles={styles.recipe_select_box_ingredient}
                    dropdownStyles={[styles.center, styles.recipe_select_dropdown_ingredient]}
                    modalDropdown={true}
                /> 
            </View>
        </View>
    )
}

const Recipe = () => {

    const [step, setStep] = useState(1)

    const DeleteStep = () => {
        if (step > 1) setStep(step-1)
    }

     return (
        <View style={styles.recipe_container}>
            <View style={[styles.center, styles.recipe_header]}>
                <Text style={styles.recipe_header_title}>Công thức</Text>
            </View>

            <ScrollView style={styles.recipe_main}>
                <View style={styles.space_between}>
                    <View>
                        <Text style={styles.recipe_content}>Hình ảnh</Text>
                        <TouchableOpacity style={styles.recipe_img_video}>
                            <Image 
                                source={require("../assets/images/food.jpg")}
                                style={styles.recipe_img_video}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.recipe_content}>Video</Text>
                        <TouchableOpacity style={styles.recipe_img_video}>
                            <Image 
                                source={require("../assets/images/food.jpg")}
                                style={styles.recipe_img_video}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.recipe_line}></View>

                <View style={styles.recipe_step}>
                    <View style={[styles.center_y, styles.space_between]}>
                        <Text style={styles.recipe_content}>Các bước:</Text>
                        <TouchableOpacity 
                            style={[styles.center, styles.recipe_btn_add_step]}
                            onPress={() => setStep(step+1)}
                        >
                            <Image source={require("../assets/images/Add.png")} style={styles.recipe_icon_add} />
                        </TouchableOpacity>
                    </View>
                    {
                        Array.from({length: step}, (_, index) => {
                            return <StepComponent key={index} index={index} DeleteStep={DeleteStep} />
                        })
                    }
                </View>

                <View style={styles.recipe_line}></View>

                <View>
                    <Text style={styles.recipe_content}>Nguyên liệu:</Text>
                    <View style={[styles.center_y, styles.space_between]}>
                        <View style={styles.recipe_search_container}>
                            <TextInput 
                                style={styles.recipe_search_input}
                                placeholder="Tìm kiếm"
                            />
                            <Image source={require("../assets/images/Search.png")} style={styles.recipe_icon_search} />
                        </View>
                        <TouchableOpacity 
                            style={[styles.center, styles.recipe_ingredient_btn]}
                        >
                            <Text style={styles.recipe_ingredient_add}>Thêm</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.recipe_ingredient_frame}>
                        <IngredientComponent />
                        <IngredientComponent />
                        <IngredientComponent />
                        <IngredientComponent />
                        <IngredientComponent />
                    </View>
                </View>

                <TouchableOpacity 
                    style={[styles.center, styles.recipe_btn_submit]}
                >
                    <Text style={styles.recipe_content_submit}>Lưu</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Recipe;

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    center_x: {
        justifyContent: 'center',
    },
    center_y: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    space_between: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    recipe_container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    recipe_header: {
        width: ws*440,
        height: ws*60,
        backgroundColor: '#70B9BE',
    },
    recipe_header_title: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '500',
    },
    recipe_main: {
        paddingTop: ws*20,
        paddingHorizontal: ws*30,
    },
    recipe_content: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '500',
        marginVertical: ws*10,
    },
    recipe_img_video: {
        width: ws*170,
        height: ws*100,
        objectFit: 'cover',
    },
    recipe_line: {
        width: ws*380,
        marginVertical: ws*20,
        borderWidth: 0.5,
        borderColor: '#70B9BE',
    },
    recipe_btn_add_step: {
        width: ws*80,
        height: ws*30,
        borderRadius: 15,
        backgroundColor: '#70B9BE',
    },
    recipe_icon_add: {
        width: ws*10,
        height: ws*10,
        objectFit: 'contain',
        tintColor: '#ffffff',
    },
    recipe_ingredient_btn: {
        width: ws*80,
        height: ws*50,
        borderRadius: 10,
        backgroundColor: '#70B9BE',
        marginLeft: 10,
    },
    recipe_ingredient_add: {
        fontSize: 18,
        color: '#ffffff',
    },
    recipe_ingredient_frame: {
        marginVertical: ws*20,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    recipe_btn_submit: {
        width: ws*300,
        height: ws*50,
        borderRadius: 10,
        backgroundColor: '#70B9BE',
        marginBottom: ws*60,
        marginHorizontal: 'auto'
    },
    recipe_content_submit: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '500',
    },

    //step component
    stepComponent_container: {
        width: '100%',
        marginBottom: ws*20,
    },
    stepComponent_main: {
        width: '100%,',
        position: 'relative',
    },
    stepComponent_input_title: {
        color: '#000000',
        fontSize: 18,
    },
    stepComponent_btn_checkbox: {
        width: ws*20,
        height: ws*20,
        marginRight: ws*10,
    },
    stepComponent_icon_checkbox: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        tintColor: '#70B9BE',
    },
    stepComponent_btn_bin: {
        marginRight: ws*15,
    },
    stepComponent_icon_bin: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        tintColor: 'red',
    },
    stepComponent_input_description: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 10,
        paddingLeft: ws*25,
        fontSize: 15,
        color: '#D9D9D9',
        marginRight: 10,
        height: ws*50,
    },
    recipe_select_box: {
        width: ws*100,
        height: ws*50,
        fontSize: 8,
        borderColor: '#D9D9D9',
    },
    recipe_select_dropdown: {
        position: 'absolute',
        borderColor: '#D9D9D9',
        top: ws*45,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
    },

    //search
    recipe_search_container: {
        flex: 1,
        height: ws*50,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#D9D9D9',
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    recipe_search_input: {
        width: '100%',
        height: '100%',
        paddingLeft: ws*20,
    },
    recipe_icon_search: {
        width: ws*20,
        height: ws*20,
        objectFit: 'contain',
        position: 'absolute',
        top: ws*15,
        right: 20,
    },

    //ingredient component
    ingredientComponent_container: {
        marginBottom: ws*25,
    },
    ingredientComponent_info: {
        position: 'relative',
    },
    ingredientComponent_img: {
        width: ws*80,
        height: ws*80,
        borderRadius: ws*80,
        objectFit: 'cover',
    },
    ingredientComponent_name: {
        marginTop: ws*10,
        fontSize: 16,
    },
    ingredientComponent_btn_mark_x: {
        width: ws*20,
        height: ws*20,
        borderRadius: ws*20,
        position: 'absolute',
        top: 0,
        right: 0,
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#ffffff',
    },
    ingredientComponent_icon_mark_x: {
        width: ws*10,
        height: ws*10,
        objectFit: 'contain',
        tintColor: 'red',
    },
    ingredientComponent_quantity: {
        marginLeft: 10,
    },
    ingredientComponent_input_quantity: {
        width: ws*80,
        height: ws*50,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        color: '#000000',
        borderRadius: 15,
        marginBottom: 10,
    },
    recipe_select_box_ingredient: {
        width: ws*80,
        height: ws*50,
        fontSize: 8,
        borderColor: '#D9D9D9',
    },
    recipe_select_dropdown_ingredient: {
        position: 'absolute',
        borderColor: '#D9D9D9',
        top: -ws*120,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
    },
})
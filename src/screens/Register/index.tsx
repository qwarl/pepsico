import { View, Text, ImageBackground, Image, TouchableOpacity, ProgressViewIOSComponent, Dimensions, TextInput, Button, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import images from '../../constants/images'
import styles from './style';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { AGENCY } from '../../models/pepsico';
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import dataCity from '../../constants/get_api';
import { DATA_CITY } from '../../constants/get_api';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

type Province = {
    name: string,
    code: Number,
    division_type: string,
    codename: string,
    phone_code: Number,
    districts: [],
}

interface responseChild {
    uri: string,
    fileName?: string
}

const Item = (props: any) => {
    return (
        <View style={{ padding: 5 }} key={props.item}>
            <TouchableOpacity onPress={() => {
                props.handleSetOpen(false);
                props.handleSetValue(props.value)
            }}>
                <Text style={{ color: "#00355A", fontSize: 14 }}>
                    {props.item.value}
                </Text>
                <Text style={{ color: "#5499AB", }}>
                    {props.item.address}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const index = () => {
    const [recipientName, setRecipientName] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');

    const [openProvince, setOpenProvince] = useState(false);
    const [provinceValue, setProvinceValue] = useState<any | null>(null);
    // const [Province, setProvince] = useState(dataCity)
    const [Province, setProvince] = useState(DATA_CITY)

    const [openDistrict, setOpenDistrict] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState('default');
    const [dataDistrict, setDataDistrict] = useState<any | Province[]>([]);

    const [openAgency, setOpenAgency] = useState(false);
    const [agencyValue, setAgencyValue] = useState<string | null>(null);
    const [agency, setAgency] = useState(AGENCY);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateTime, setDateTime] = useState('Chọn thời gian')
    const showDatePicker = () => {

        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {

        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        console.warn("A date has been picked: ", date);
        console.log('ngafy', date);
        setDateTime(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes());
        hideDatePicker();
    };

    const [image1, setImage1] = useState<responseChild | null>(null);
    const [image2, setImage2] = useState<responseChild | null>(null);
    const [image3, setImage3] = useState<responseChild | null>(null);

    const selectImage1 = () => {
        const options: any = {
            maxWidth: 2000,
            maxHeight: 2000,
            mediaType: "photo"
        };
        launchImageLibrary(options, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else if (response.errorMessage) {
                console.log('User tapped custom button: ', response.errorMessage);
            } else {
                const source = { uri: response.assets[0].uri, fileName: response.assets[0].fileName };
                setImage1(source);
            }
        });
    };
    const selectImage2 = () => {
        const options: any = {
            maxWidth: 2000,
            maxHeight: 2000,
            mediaType: "photo"
        };

        launchImageLibrary(options, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else if (response.errorMessage) {
                console.log('User tapped custom button: ', response.errorMessage);
            } else {
                const source = { uri: response.assets[0].uri, fileName: response.assets[0].fileName };
                setImage2(source);
            }
        });
    };

    const selectImage3 = () => {
        const options: any = {
            maxWidth: 2000,
            maxHeight: 2000,
            mediaType: "photo"
        };
        launchImageLibrary(options, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else if (response.errorMessage) {
                console.log('User tapped custom button: ', response.errorMessage);
            } else {
                const source = { uri: response.assets[0].uri, fileName: response.assets[0].fileName };
                setImage3(source);
            }
        });
    };

    // useEffect(() => {
    //     //get all province from this api
    //     // axios.get(`https://provinces.open-api.vn/api/?p==1`).then((res) => {
    //     //     console.log('hihi', res["data"]);
    //     //     // console.log('hihi');
    //     //     setDataProvince(res["data"]);
    //     console.log('hoho', DATA_CITY)


    // }, []);

    // useEffect(() => {
    //     //get all districts from the province you choice
    //     axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`).then((res) => {
    //         console.log('hoho');

    //         setDataDistrict(res["data"]?.districts);
    //     });
    // }, [selectedProvince]);

    return (
        <ImageBackground source={images.bg} style={styles.container}>
            <Image source={images.nav} style={styles.nav_style} />
            <ScrollView>
                <Image source={images.text_register} style={styles.text_register_style} />
                <View style={styles.input_area_view_style}>
                    <View style={styles.contain_content_style}>
                        <Text style={styles.blue_text_style}>THÔNG TIN MUA HÀNG</Text>
                        <View>
                            {/* <View style={styles.contain_style}>
                                <View style={styles.province_input_style}>
                                    <Text style={styles.white_text_style}>Tỉnh / Thành Phố</Text>

                                    <DropDownPicker
                                        open={openProvince}
                                        value={provinceValue}
                                        items={Province}
                                        setOpen={setOpenProvince}
                                        setValue={setProvinceValue}
                                        setItems={setProvince}
                                        // key={dataProvince.code}
                                        listMode="SCROLLVIEW"
                                        style={styles.inputCity}
                                        containerStyle={{
                                            width: width / 2.3,
                                            borderRadius: 5,
                                            // marginRight: 30,
                                        }}
                                        placeholder="Chọn tỉnh / thành"
                                        selectedItemContainerStyle={{
                                            backgroundColor: "#84E5FF",
                                        }}
                                        listItemLabelStyle={{
                                            color: "#00355A"
                                        }}
                                        selectedItemLabelStyle={{
                                            color: "#00355A"
                                        }}
                                        dropDownContainerStyle={{
                                            marginTop: 4,
                                            borderRadius: 5
                                        }}
                                        modalContentContainerStyle={{
                                            backgroundColor: "red"
                                        }}
                                        disableBorderRadius={true}
                                    // zIndex={1000}
                                    />
                                </View>

                                <View style={styles.district_input_style}>
                                    <Text style={styles.white_text_style}>Quận / huyện</Text>
                                    <DropDownPicker
                                        open={openDistrict}
                                        value={selectedDistrict}
                                        items={dataDistrict}
                                        setOpen={setOpenDistrict}
                                        setValue={setSelectedDistrict}
                                        setItems={setDataDistrict}
                                        // key={dataDistrict.code}
                                        listMode="SCROLLVIEW"
                                        style={styles.inputCity}
                                        containerStyle={{
                                            width: width / 2.3,
                                            // color:'#00355A'
                                        }}
                                        selectedItemContainerStyle={{
                                            backgroundColor: "#84E5FF",
                                        }}
                                        listItemLabelStyle={{
                                            color: "#00355A"
                                        }}
                                        selectedItemLabelStyle={{
                                            color: "#00355A"
                                        }}
                                        placeholder="Chọn quận / huyện"
                                        dropDownContainerStyle={{
                                            marginTop: 4,
                                            borderRadius: 5
                                        }}
                                    // zIndex={1000}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.white_text_style}>Đại lý</Text>
                                <DropDownPicker
                                    open={openAgency}
                                    value={agencyValue}
                                    items={agency}
                                    setOpen={setOpenAgency}
                                    setValue={setAgencyValue}
                                    setItems={setAgency}
                                    listMode="SCROLLVIEW"
                                    style={styles.inputCity}
                                    containerStyle={{
                                        width: "100%",
                                        borderRadius: 5
                                    }}
                                    placeholder="Chọn đại lý"
                                    selectedItemContainerStyle={{
                                        backgroundColor: "#84E5FF",

                                    }}
                                    listItemLabelStyle={{
                                        color: "#00355A"
                                    }}
                                    selectedItemLabelStyle={{
                                        color: "#00355A"
                                    }}
                                    dropDownContainerStyle={{
                                        marginTop: 4,
                                        borderRadius: 5,
                                    }}
                                    onSelectItem={(item) => {
                                        console.log(item);
                                    }}
                                    renderListItem={(props) => <Item {...props} handleSetOpen={(payload: boolean) => setOpenAgency(payload)} handleSetValue={(payload: string | null) => setAgencyValue(payload)} />}
                                // zIndex={100}
                                />
                            </View> */}
                            <Text style={{ alignSelf: 'center', color: '#429ACE' }}>________________________________________________</Text>
                            <Text style={styles.blue_text_style}>THÔNG TIN NGƯỜI THAM GIA</Text>
                            <View>
                                <View style={styles.contain_style}>
                                    <View style={styles.province_input_style}>
                                        <Text style={styles.white_text_style}>Họ tên</Text>
                                        <TextInput style={styles.input_style} placeholder='Nhập họ tên' placeholderTextColor='#5499AB' />
                                    </View>

                                    <View style={styles.district_input_style}>
                                        <Text style={styles.white_text_style}>Số điện thoại</Text>
                                        <TextInput style={styles.input_style} placeholder='Nhập số điện thoại' placeholderTextColor='#5499AB' />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.contain_info_party}>
                                <Text style={styles.blue_text_style}>THÔNG TIN TIỆC</Text>
                                <View style={styles.contain_style}>
                                    <View style={styles.province_input_style}>
                                        <Text style={styles.white_text_style}>Tỉnh / Thành Phố</Text>

                                        {/* <DropDownPicker
                                            open={openProvince}
                                            value={selectedProvince}
                                            items={dataProvince}
                                            setOpen={setOpenProvince}
                                            setValue={setSelectedProvince}
                                            setItems={setDataProvince}
                                            // key={dataProvince.code}
                                            listMode="SCROLLVIEW"
                                            style={styles.inputCity}
                                            containerStyle={{
                                                width: width / 2.3,
                                                borderRadius: 5,
                                                // marginRight: 30,
                                            }}
                                            placeholder="Chọn tỉnh / thành"
                                            selectedItemContainerStyle={{
                                                backgroundColor: "#84E5FF",
                                            }}
                                            listItemLabelStyle={{
                                                color: "#00355A"
                                            }}
                                            selectedItemLabelStyle={{
                                                color: "#00355A"
                                            }}
                                            dropDownContainerStyle={{
                                                marginTop: 4,
                                                borderRadius: 5
                                            }}
                                            modalContentContainerStyle={{
                                                backgroundColor: "red"
                                            }}
                                            disableBorderRadius={true}
                                        // zIndex={1000}
                                        /> */}
                                    </View>

                                    <View style={styles.district_input_style}>
                                        <Text style={styles.white_text_style}>Quận / huyện</Text>
                                        <DropDownPicker
                                            open={openDistrict}
                                            value={selectedDistrict}
                                            items={dataDistrict}
                                            setOpen={setOpenDistrict}
                                            setValue={setSelectedDistrict}
                                            setItems={setDataDistrict}
                                            // key={dataDistrict.code}
                                            listMode="SCROLLVIEW"
                                            style={styles.inputCity}
                                            containerStyle={{
                                                width: width / 2.3,
                                                // color:'#00355A'
                                            }}
                                            selectedItemContainerStyle={{
                                                backgroundColor: "#84E5FF",
                                            }}
                                            listItemLabelStyle={{
                                                color: "#00355A"
                                            }}
                                            selectedItemLabelStyle={{
                                                color: "#00355A"
                                            }}
                                            placeholder="Chọn quận / huyện"
                                            dropDownContainerStyle={{
                                                marginTop: 4,
                                                borderRadius: 5
                                            }}
                                        // zIndex={1000}
                                        />
                                    </View>
                                </View>
                                <Text style={styles.white_text_style}>Số nhà, tên đường</Text>
                                <TextInput style={styles.input_party_style} placeholder='Nhập số nhà, tên đường' placeholderTextColor='#5499AB' />
                                <Text style={styles.white_text_style}>Thời gian tiệc</Text>
                                <View>
                                    <View >
                                        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', justifyContent: 'space-between', alignItems: 'center' }} onPress={showDatePicker}>
                                            <Text style={styles.text_view}>{dateTime}</Text>
                                            <Image source={images.calendar} />
                                        </TouchableOpacity>
                                    </View>
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="datetime"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.blue_text_style}>HÌNH ẢNH</Text>
                                <View>
                                    <Text style={styles.white_text_style}>Hình thiệp cưới</Text>
                                    <View style={styles.view_style}>
                                        <TouchableOpacity onPress={selectImage1}>
                                            <TextInput value={image1?.fileName} editable={false} placeholder="Đính kèm hình" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.white_text_style}>Hình hóa đơn bán hàng</Text>
                                    <View style={styles.view_style}>
                                        <TouchableOpacity onPress={selectImage2}>

                                            <View>
                                                {/* <Text style={styles.text_view}>Đính kèm hình</Text> */}
                                                <TextInput value={image2?.fileName} editable={false} placeholder="Đính kèm hình" />

                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.white_text_style}>Hình khối sản phẩm</Text>
                                    <View style={styles.view_style}>
                                        <TouchableOpacity onPress={selectImage3}>

                                            <View>
                                                {/* <Text style={styles.text_view}>Đính kèm hình</Text> */}
                                                <TextInput value={image3?.fileName} editable={false} placeholder="Đính kèm hình" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                <TouchableOpacity>
                    <Image source={images.btn_register} style={styles.btn_register_style} />
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    )
}

export default index
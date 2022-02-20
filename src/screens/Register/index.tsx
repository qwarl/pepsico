import { View, Text, ImageBackground, Image, TouchableOpacity, ProgressViewIOSComponent, Dimensions, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import images from '../../constants/images'
import styles from './style';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { AGENCY } from '../../models/pepsico';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const { width, height } = Dimensions.get('window');

type Province = {
    name: string,
    code: Number,
    division_type: string,
    codename: string,
    phone_code: Number,
    districts: [],
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
    const [selectedProvince, setSelectedProvince] = useState('default');
    const [dataProvince, setDataProvince] = useState<any | Province[]>([])

    const [openDistrict, setOpenDistrict] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState('default');
    const [dataDistrict, setDataDistrict] = useState<any | Province[]>([]);

    const [openAgency, setOpenAgency] = useState(false);
    const [agencyValue, setAgencyValue] = useState<string | null>(null);
    const [agency, setAgency] = useState(AGENCY);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    useEffect(() => {
        //get all province from this api
        axios.get(`https://provinces.open-api.vn/api/?p==1`).then((res) => {
            // console.log('hihi', res["data"]);
            console.log('hihi');
            setDataProvince(res["data"]);

        });
    }, []);

    useEffect(() => {
        //get all districts from the province you choice
        axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`).then((res) => {
            console.log('hoho');

            setDataDistrict(res["data"]?.districts);
        });
    }, [selectedProvince]);

    return (
        <ImageBackground source={images.bg} style={styles.container}>
            <Image source={images.nav} style={styles.nav_style} />
            <Image source={images.text_register} style={styles.text_register_style} />
            <View style={styles.input_area_view_style}>
                <View style={styles.contain_content_style}>
                    <Text style={styles.blue_text_style}>THÔNG TIN MUA HÀNG</Text>
                    <View>
                        <View style={styles.contain_style}>
                            <View style={styles.province_input_style}>
                                <Text style={styles.white_text_style}>Tỉnh / Thành Phố</Text>

                                <DropDownPicker
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
                        </View>
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

                                    <DropDownPicker
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
                            <Text style={styles.white_text_style}>Số nhà, tên đường</Text>
                            <TextInput style={styles.input_party_style} placeholder='Nhập số nhà, tên đường' placeholderTextColor='#5499AB' />
                            <Text style={styles.white_text_style}>Thời gian tiệc</Text>
                            <View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <TextInput editable={false} style={[{ flex: 1 }]} placeholder="Select your date" />
                                    <TouchableOpacity onPress={showDatePicker}>
                                        <Image source={images.btn_home} />
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
                    </View>
                </View>
            </View>

            {/* <TouchableOpacity>
        <Image source={images.btn_register} style={styles.btn_register_style} />
      </TouchableOpacity> */}
        </ImageBackground>
    )
}

export default index
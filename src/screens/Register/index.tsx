import { View, Text, ImageBackground, Image, TouchableOpacity, ProgressViewIOSComponent, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import images from '../../constants/images'
import styles from './style';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { AGENCY } from '../../models/pepsico';
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
                        <Text style={styles.white_text_style}>Đại lý</Text>
                        <DropDownPicker
                            open={openAgency}
                            value={agencyValue}
                            items={agency}
                            setOpen={setOpenAgency}
                            setValue={setAgencyValue}
                            setItems={setAgency}
                            listMode="SCROLLVIEW"
                            style={styles.inputDistrict}
                            containerStyle={{
                                width: "100%",
                                borderRadius: 5
                            }}
                            placeholder="Select an Agency"
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
                        <Text style={{ alignSelf: 'center', color: '#429ACE' }}>________________________________________________</Text>
                        <Text style={styles.blue_text_style}>THÔNG TIN NGƯỜI THAM GIA</Text>
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
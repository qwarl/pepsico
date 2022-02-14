import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import images from '../../constants/images'
import styles from './style';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const index = () => {
    const [recipientName, setRecipientName] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');

    const [selectedProvince, setSelectedProvince] = useState(Number(''));
    const [dataProvince, setDataProvince] = useState<any[]>([])

    const [selectedDistrict, setSelectedDistrict] = useState(Number(''));
    const [dataDistrict, setDataDistrict] = useState(null);

    const [selectedWard, setSelectedWard] = useState(Number(''));
    const [dataWard, setDataWard] = useState(null);
    useEffect(() => {
        //get all province from this api
        axios.get(`https://provinces.open-api.vn/api/?p==1`).then((res) => {
            // console.log('hihi', res["data"]);
            console.log('hihi');
            setDataProvince(res["data"]);
            // console.log('dc chua v', setDataProvince(res["data"]));

        });
    }, []);

    // useEffect(() => {
    //     //get all districts from the province you choice
    //     axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`).then((res) => {
    //         setDataDistrict(res["data"]?.districts);
    //     });
    // }, [selectedProvince]);

    // useEffect(() => {
    //     //get all wards from the district you choice
    //     axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`).then((res) => {
    //         setDataWard(res["data"]?.wards);
    //     });
    // }, [selectedDistrict]);

    return (
        <ImageBackground source={images.bg} style={styles.container}>
            <Image source={images.nav} style={styles.nav_style} />
            <Image source={images.text_register} style={styles.text_register_style} />
            <View style={styles.input_area_view_style}>
                <Text style={styles.blue_text_style}>THÔNG TIN MUA HÀNG</Text>
                <View style={styles.province_input_style}>
                    <Text style={styles.white_text_style}>Tỉnh / Thành Phố</Text>
                </View>
                <View
                    style={{
                        backgroundColor: 'white',
                        elevation: 1,
                        borderWidth: 0.8,
                        borderColor: 'orange',
                        // width: '100%'
                    }}
                >
                    <Picker
                        selectedValue={selectedProvince}
                        style={{
                            fontSize: 18,
                            color: 'grey',
                            fontWeight: "bold",
                            backgroundColor: 'orange',
                        }}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedProvince(itemValue)
                        }}
                    >
                        {/* {
                            selectedProvince == "default" && (
                                <Picker.Item
                                    value="default"
                                    label="Choose Your Province"
                                />
                            )
                        } */}
                        {dataProvince &&
                            dataProvince.map((province: any) => (
                                <Picker.Item
                                    key={province.code}
                                    value={selectedProvince}
                                    label={province.name}
                                // value={province.code}
                                />
                            ))}
                    </Picker>
                </View>
            </View>

            {/* <TouchableOpacity>
        <Image source={images.btn_register} style={styles.btn_register_style} />
      </TouchableOpacity> */}
        </ImageBackground>
    )
}

export default index
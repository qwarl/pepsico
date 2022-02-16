import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    nav_style: {
        width: '100%',
    },
    text_home_style: {
        marginTop: width * 0.135,
        alignSelf: 'center'
    },
    reward_home_style: {
        alignSelf: 'center',
        marginTop: width * 0.011,
    },
    btn_register_style: {
        alignSelf: 'center',
        marginTop: width * 0.27,
    },
    text_register_style: {
        alignSelf: 'center',
        marginTop: width * 0.065,
    },
    input_area_view_style: {
        backgroundColor: '#004F9D',
        marginLeft: width * 0.032,
        marginRight: width * 0.032,
        marginTop: height * 0.03
    },
    blue_text_style: {
        fontFamily: 'Myriad Pro',
        color: '#84E5FF',
        fontWeight: 'bold',
        lineHeight: 19.2,
        fontSize: 16,
        fontStyle: 'normal',
    },
    province_input_style: {
        marginTop:height*0.02,

    },
    white_text_style:{
        fontFamily: 'Myriad Pro',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 17,
        color: '#FFFFFF',
    },

});

export default styles
import { StyleSheet, Text, View, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import images from '../../constants/images'
import styles from '../../constants/style';

const { width, height } = Dimensions.get('window');

const index = () => {
	return (
		<ImageBackground source={images.bg} style={styles.container}>
			<Image source={images.nav} style={styles.nav_style} />
			<Image source={images.text_home} style={styles.text_home_style} />
			<Image source={images.reward_home} style={styles.reward_home_style} />
			<TouchableOpacity>
				<Image source={images.btn_home} style={styles.btn_home_style} />
			</TouchableOpacity>
		</ImageBackground>
	);
};

export default index;


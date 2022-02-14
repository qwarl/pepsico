import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Home from './src/screens/Home'
import Register from './src/screens/Register'
const App = () => {
	return (
		<View style={styles.test}>
			{/* <Home /> */}
			<Register/>
		</View>
	);
};

export default App;

const styles = StyleSheet.create({
	test: {
		flex: 1,
	}
});

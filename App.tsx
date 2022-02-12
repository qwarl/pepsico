import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Home from './src/screens/Home'
const App = () => {
	return (
		<View style={styles.test}>
			<Home />
		</View>
	);
};

export default App;

const styles = StyleSheet.create({
	test: {
		flex: 1,
	}
});

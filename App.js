
/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { Platform, StatusBar, StyleSheet, View } from "react-native"; // React Native
import { Provider } from 'react-redux'; // Redux
import { Root, Text } from "native-base"; // Native Base
import { AppLoading } from "expo"; // Expo
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
/* ========== PROPIOS ================ */
//import Text from './components/StyledText' // Style Text ( Font )
import Store from './store/Store'; // Store de ( State de la App )
import RutasSelection from './navigation/rutasSelection'; // Selector de Rutas


export default class App extends React.Component {
	state = {
		isLoadingComplete: false,
		isLogged: false
	};


	render() {
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
				<AppLoading
					startAsync={this._loadResourcesAsync}
					onError={this._handleLoadingError}
					onFinish={this._handleFinishLoading}
				/>
			);
		} else {
			return (
				<Root>
					<View style={styles.container}>
						{Platform.OS === "ios" && <StatusBar barStyle="default"/>}

						<Provider store={Store}>
							<RutasSelection />
						</Provider>

					</View>
				</Root>
			);

		}
	}

	_loadResourcesAsync = async () => {
		return Promise.all([
			Asset.loadAsync([
				require("./assets/images/robot-dev.png"),
				require("./assets/images/robot-prod.png"),

				require("./assets/images/eagler.png"),
				require("./assets/images/1Basics.png"),
				require("./assets/images/1BasicsAz.png"),
				require("./assets/images/1Body.png"),
				require("./assets/images/1BodyAz.png"),
				require("./assets/images/1Drills.png"),
				require("./assets/images/1DrillsAz.png"),
				require("./assets/images/1IQ.png"),
				require("./assets/images/1IQAz.png"),
				require("./assets/images/1LAz.png"),
				require("./assets/images/SimboloAz.png")
			]),
			Font.loadAsync({
				// This is the font that we are using for our tab bar
				...Ionicons.font,
				// We include SpaceMono because we use it in HomeScreen.js. Feel free
				// to remove this if you are not using it in your app
				Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
				"gilroy-light": require("./assets/fonts/Gilroy-Light.otf"),
				"gilroy-regular": require("./assets/fonts/Gilroy-Regular.otf"),
				"gilroy-semibold": require("./assets/fonts/Gilroy-Semibold.otf"),
				"gilroy-bold": require("./assets/fonts/Gilroy-Bold.otf")
			})
		]);
	};

	_handleLoadingError = error => {
		console.log('TCL: -----------------------')
		console.log('TCL: App -> error', error)
		console.log('TCL: -----------------------')
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
	};

	_handleFinishLoading = () => {
		this.setState({ isLoadingComplete: true });
	};


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	}
});


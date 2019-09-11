/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { View, Image, StyleSheet } from "react-native"; // React Native
import { Container, Button, } from "native-base"; // Native Base
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // Scroll View
/* ========== REDUX ================ */
import { useDispatch } from 'react-redux' // React-Redux
import { actionRegistroUsuario } from '../store/actions/registerAction'; // Actions
/* ========== PROPIOS ================ */
import Text from '../components/CustomText';
import Strings from '../constants/Strings'; // Strings
import SingUpForm from '../navigation/noAutenticados/forms/SingUpForm'; // Form
import globalStyles from "../constants/styles/GlobalStyles"; // Styles

const SingUp = props => {
	const { navigation } = props;
	// REDUX
	// Dispatchs
	const dispatch = useDispatch();
	const registroUsuario = values => dispatch(actionRegistroUsuario(values));

	return (
		<Container>
			<KeyboardAwareScrollView>
				<View style={stylesPage.view_container} >
					<Image
						source={require("../assets/images/1LAz.png")}
						style={globalStyles.logo_start}
						resizeMode="contain"
					/>

					<SingUpForm registroUsuario = {registroUsuario}/>

					<Button
						block
						transparent
						onPress={() => {
							navigation.navigate("SingIn");
						}}
					>
						<Text style={globalStyles.text_link}>
							{Strings.ST9}
						</Text>
					</Button>
				</View>
			</KeyboardAwareScrollView>
		</Container>
	);
}
export default SingUp;

const stylesPage = StyleSheet.create({
	view_container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		// marginTop: 20
	}
})

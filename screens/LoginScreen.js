/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"; // React Native
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // Scroll View
import { Container, Button } from "native-base";
/* ========== REDUX ================ */
import { useDispatch } from 'react-redux' // React-Redux
import { actionLoginUsuario } from '../store/actions/registerAction'; // Actions
/* ========== PROPIOS ================ */
import Text from '../components/CustomText';
import Strings from "../constants/Strings"; // String
import SingInForm from '../navigation/noAutenticados/forms/SingInForm'; // Form
import globalStyles from "../constants/styles/GlobalStyles"; // Styles

const SingIn = props => {
	const { navigation } = props;
	// REDUX
	// Dispatchs
	const dispatch = useDispatch();
	const loginUsuario = values => dispatch(actionLoginUsuario(values));


	return (
		<Container>
			<KeyboardAwareScrollView>
				<View style={stylesPage.view_container}>
					<Image
						source={require("../assets/images/SimboloAz.png")}
						style={globalStyles.logo_start}
						resizeMode="contain"
					/>

					<SingInForm loginUsuario = {loginUsuario}/> 

					<TouchableOpacity style={globalStyles.text_auth}
						// onPress={this.forgetpass.bind(this)}
						activeOpacity={1}
					>
						<Text>
							{Strings.ST5}
						</Text>
					</TouchableOpacity>

					<Button
						block
						transparent
						onPress={() => {
							navigation.navigate("SingUp");
						}}
					>
						<Text style={globalStyles.text_link}>
							{Strings.ST6}
						</Text>
					</Button>

				</View>
			</KeyboardAwareScrollView>
		</Container>
	);
}
export default SingIn;

// Styles del Componente
const stylesPage = StyleSheet.create({
	view_container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		marginTop: 50
	}
});
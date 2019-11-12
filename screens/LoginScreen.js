/* =========== LIBRERIAS ============= */
import React, {useEffect, useState} from "react"; // React
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"; // React Native
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // Scroll View
import { Container, Button, Text, Toast, Root } from "native-base";
/* ========== REDUX ================ */
import { useDispatch, useSelector } from 'react-redux' // React-Redux
import { actionLoginUsuario, actionRestorePassword } from '../store/actions/registerAction'; // Actions
/* ========== PROPIOS ================ */
// import Text from '../components/CustomText';
import Strings from "../constants/Strings"; // String
import SingInForm from '../navigation/noAutenticados/forms/SingInForm'; // Form
import RestorePasswordForm from '../navigation/noAutenticados/forms/ResPassForm';
import globalStyles from "../constants/styles/GlobalStyles"; // Styles

const SingIn = props => {
	const { navigation } = props;
	// REDUX
	const {error} = useSelector(state => state.session)
	// Dispatchs
	const dispatch = useDispatch();
	const loginUsuario = values => dispatch(actionLoginUsuario(values));
	const restorePassword = values => dispatch(actionRestorePassword(values))

	// State
	const [ formPassword, setFormPassword ] = useState( false );

	const mostrarToast = (message, type) => {
		return Toast.show({
			text: message,
			textStyle: { textAlign: "center" },
			type: type,
			duration: 3000,
			position: "bottom"
		});
	};

	useEffect(() => {
		if(error !== null) {
			mostrarToast(error, 'danger')
		}
	},[error])


	return (
		<Root>
			<Container>
				<KeyboardAwareScrollView>
					<View style={stylesPage.view_container}>
						<Image
							source={require("../assets/images/SimboloAz.png")}
							style={globalStyles.logo_start}
							resizeMode="contain"
						/>

						{!formPassword ?
							<>
								<SingInForm loginUsuario = {loginUsuario}/>
							
								<TouchableOpacity style={globalStyles.text_auth}
									onPress={() => setFormPassword(true)}
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
							</>
							: 
							<>
								<RestorePasswordForm restorePassword = {restorePassword} setFormPassword = {setFormPassword}/>

								<TouchableOpacity style={globalStyles.text_auth}
									onPress={() => setFormPassword(false)}
									activeOpacity={1}
								>
									<Text>
										Volver
									</Text>
								</TouchableOpacity>
							</>
						}
						

					</View>
				</KeyboardAwareScrollView>
			</Container>
		</Root>
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
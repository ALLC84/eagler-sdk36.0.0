/* =========== LIBRERIAS ============= */
import React, { useState } from "react"; // React
import { Modal, View, StyleSheet, ImageBackground } from "react-native"; // React Native
import { Form, Button, Text } from "native-base"; // Native Base
import { Ionicons } from '@expo/vector-icons'; // Expo
/* ========== REDUX ================ */
import { useDispatch } from 'react-redux' // React-Redux
import { actionGetFase } from "../store/actions/basicAction"; //Actions Redux
/* ========== PROPIOS ================ */
// import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import { AUTH } from '../services/firebase' // Firebase Auth
import functionUserProfile from "../lib/functions/functionUserProfile"; // Funciones Profile
import TimeClassBasicsForm from '../navigation/autenticados/forms/timeClassBasics'; // Form



const ModalTiempoClase = props => {
	const _userId = AUTH.currentUser.uid;
	const { navigation } = props;
	// STATE
	const [ visibleModal, setVisibleModal ] = useState(true)

	// Actualizar puntos abilidades definiendo % segun tiempo clase
	const actualizarPerfil = (idUser, time) => {
		// TODO: Actualiza datos del Profile segun tiempo de clase
		// await functionUserProfile.defineTiempoHabilidades(idUser, time);
		setVisibleModal(false)
		props.crearTiempoClase(time);
	};

	// Dispatchs
	const dispatch = useDispatch()
	const getFase = (userId) => dispatch(actionGetFase(userId))
	
	return (
		<View>
			<Modal
				animationType="fade"
				transparent={true}
				visible={visibleModal}
			>
				<View style={stylesPage.form_view}>
					<ImageBackground source={require('../assets/images/HomeHD.jpg')} style={stylesPage.form_image}>
						<Button transparent 
							style={stylesPage.form_button_close}
							onPress={() => {
								setVisibleModal(false)
								navigation.navigate('Basics')
							}}
						>
							<Ionicons
								size={40}
								color={"red"}
								name={"ios-close"}
							/>
						</Button>

						<Text style={stylesPage.form_text}>
							{Strings.ST41}
						</Text>

						<Form style={{width: '90%'}}>
							{/* ReduxForm */}
							<TimeClassBasicsForm 
								userId = {_userId}
								actualizarPerfil = {actualizarPerfil}
								actualizaFase = {getFase}
							/>
						</Form>
					</ImageBackground>
				</View>
			</Modal>
		</View>
	);
}
export default ModalTiempoClase;

// Styles del Componente
const stylesPage = StyleSheet.create({
	form_view: {
		flex: 1,
		borderRadius: 20,
		backgroundColor: "#F9F5F4",
	},
	form_image: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: '100%', 
		height: '100%'
	},
	form_button_close: {
		position: 'absolute',
		top: 50,
		right: -1,
		marginRight: 30
	},
	form_text: {
		marginBottom: 40,
		textAlign: "center",
		fontWeight: 'bold'
	}
});

// style={{width: '100%', height: '100%'}}

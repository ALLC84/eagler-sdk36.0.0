/* =========== LIBRERIAS ============= */
import React, { useState, useEffect} from "react"; // React
import { connect } from 'react-redux'; // Redux
import { Modal, View, Dimensions, StyleSheet } from "react-native"; // React Native
import { Form } from "native-base"; // Native Base
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux' // React-Redux
/* ========== PROPIOS ================ */
import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import { AUTH } from '../services/firebase' // Firebase
import PlayUserProfileForm from '../navigation/autenticados/forms/playUserProfile'; // Formulario
import { actionGetUserProfile, actionUpdatePlayUserProfile, actionCreateInitialPhase } from '../store/actions/userProfileAction'; // Actions
import SliderComponent from './SliderComponent'; // Tour App

const width = Dimensions.get('window').width;

const ModalPerfilJuego = props => {
	const user = AUTH.currentUser;
	const { mostrarToast, getFase, cerrarModal } = props;
	// STATE
	const [mostrarTourApp, setMostrarTourApp] = useState(true)
	const [modalVisible, setModalVisible] = useState(true)
	// REDUX
	const { userProfile }= useSelector(state => state.userProfile)
	// Dispatchs
	const dispatch = useDispatch()
	const getUserProfile = userId => dispatch(actionGetUserProfile(userId));
	const updatePlayProfile = (userId, values) => dispatch(actionUpdatePlayUserProfile(userId, values));
	const createInitialPhase = (userId, fase, handicap) => dispatch(actionCreateInitialPhase(userId, fase, handicap));

	useEffect(() => {
		getUserProfile(user.uid)
	}, [])

	const initialValues = {
		anioInicio              : userProfile.anioInicio,
		diasEntrenamientoSemana : userProfile.diasEntrenamientoSemana,
		diasJuegoSemana         : userProfile.diasJuegoSemana,
		handicap                : userProfile.handicap,
		mano                    : userProfile.mano
	}

	// TOUR APP
	const visibleTourApp = () => {
		return (
			<SliderComponent 
				cerrarTourApp = {cerrarTourApp}
			/>
		)
	}
	const cerrarTourApp = () => {
		setMostrarTourApp(false)
	}

	const mostrarForm = (userProfile) => {
		return(
			<View style={stylesPage.form_view}>
				<Text style={stylesPage.form_message} >
					{Strings.ST40}
				</Text>
				
				<Form style={stylesPage.form_container}>
					<PlayUserProfileForm 
						getFase = {getFase}
						initialValues = {initialValues} 
						updatePlayProfile={updatePlayProfile} 
						userId={user.uid} 
						userProfile={userProfile}
						setMessage={mostrarToast}
						createInitialPhase={createInitialPhase}
						cerrarModal={cerrarModal}
					/>
				</Form>
			</View>
		)
	}


	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
		>
			{
				mostrarTourApp
				? visibleTourApp()
				: mostrarForm(userProfile)
			}
		</Modal>
	);
}
export default ModalPerfilJuego;

// Styles del Componente
const stylesPage = StyleSheet.create({
	form_view: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		backgroundColor: "#F9F5F4",
		marginVertical: 100,
		marginHorizontal: 10
	},
	form_message: {
		marginBottom: 40,
		textAlign: "justify",
		paddingHorizontal: 40
	},
	form_container: {
		width: width, 
		paddingLeft: 20, 
		paddingRight: 30
	}
});


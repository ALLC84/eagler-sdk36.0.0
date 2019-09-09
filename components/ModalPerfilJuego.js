/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { connect } from 'react-redux'; // Redux
import { Modal, View, Dimensions, StyleSheet } from "react-native"; // React Native
import { Form } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import { AUTH } from '../services/firebase' // Firebase
import PlayUserProfileForm from '../navigation/autenticados/forms/playUserProfile'; // Formulario
import { actionGetUserProfile, actionUpdatePlayUserProfile, actionCreateInitialPhase } from '../store/actions/userProfileAction'; // Actions
import SliderComponent from './SliderComponent'; // Tour App

const width = Dimensions.get('window').width;

class ModalPerfilJuego extends Component {
	constructor(props) {
		super(props);
		this.user = AUTH.currentUser;
		this.state = {
			mostrarTourApp: true
		}
	}

	componentDidMount() {
		this.props.getUserProfile(this.user.uid);
	}

	render() {
		const { userProfile } = this.props;
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.props.modalVisible}
			>
				{
					this.state.mostrarTourApp
					? this.mostrarTourApp()
					: this.mostrarForm(userProfile)
				}
			</Modal>
		);
	}

	// TOUR APP
	mostrarTourApp = () => {
		return (
			<SliderComponent 
				cerrarTourApp = {this.cerrarTourApp}
			/>
		)
	}
	cerrarTourApp = () => {
		this.setState({
			mostrarTourApp: false
		})
	}

	mostrarForm = (userProfile) => {
		return(
			<View style={stylesPage.form_view}>
				<Text style={stylesPage.form_message} >
					{Strings.ST40}
				</Text>
				
				<Form style={stylesPage.form_container}>
					<PlayUserProfileForm 
						getFase = {this.props.getFase}
						initialValues = {this.props.initialValues} 
						updatePlayProfile={this.props.updatePlayProfile} 
						userId={this.user.uid} 
						userProfile={userProfile}
						setMessage={this.props.mostrarToast}
						createInitialPhase={this.props.createInitialPhase}
						cerrarModal={this.props.cerrarModal}
					/>
				</Form>
			</View>
		)
	}

}

const mapStateToProps = (state) => ({

	modalVisible: true,

	userProfile: state.UserProfileReducer.userProfile,

	initialValues: {
		anioInicio              : state.UserProfileReducer.userProfile.anioInicio,
		diasEntrenamientoSemana : state.UserProfileReducer.userProfile.diasEntrenamientoSemana,
		diasJuegoSemana         : state.UserProfileReducer.userProfile.diasJuegoSemana,
		handicap                : state.UserProfileReducer.userProfile.handicap,
		mano                    : state.UserProfileReducer.userProfile.mano
	}

});

const mapDispatchToProps = (dispatch) => ({

	getUserProfile: (userId) => {
		dispatch(actionGetUserProfile(userId))
	},

	updatePlayProfile: (userId, values) => {
		dispatch(actionUpdatePlayUserProfile(userId, values))
	},

	createInitialPhase: (userId, fase, handicap) => {
		dispatch(actionCreateInitialPhase(userId, fase, handicap))
	}

});
export default connect( mapStateToProps, mapDispatchToProps )(ModalPerfilJuego);

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


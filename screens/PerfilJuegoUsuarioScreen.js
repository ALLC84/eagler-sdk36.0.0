/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from "react-native"; // React-native
import { Container, Content, Form, Toast, Root} from "native-base"; // Native Base
import { connect } from 'react-redux'; // Redux
/* ========== PROPIOS ================ */
import Strings from '../constants/Strings'; // Strings
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import { AUTH } from '../services/firebase'; // Firebase
import PlayUserProfileForm from '../navigation/autenticados/forms/playUserProfile'; // Formulario
import { actionGetUserProfile, actionUpdatePlayUserProfile } from '../store/actions/userProfileAction'; // Actions



class PerfilJuegoUsuarioScreen extends React.Component {
	constructor(props) {
		super(props);
		this.user = AUTH.currentUser;
	}

	componentDidMount(){
		this.props.getUserProfile(this.user.uid);
	}

	render() {
		return (
			<Root>
				<Container>
					{/* Header Page */}
					<DetailScreenHeader
						navigation={this.props.navigation} 
						title={Strings.ST21}
						page={'PERFIL_JUEGO'}
					/>

					{/* Content Page */}
					<Content padder>
						<Form style={stylesPage.form_style}>
							<PlayUserProfileForm 
								initialValues = {this.props.initialValues} 
								updatePlayProfile={this.props.updatePlayProfile} 
								userId={this.user.uid} 
								setMessage={this.mostrarToast}
							/>
						</Form>
					</Content>
				</Container>
			</Root>
		);
	}

	mostrarToast = (message) => {
		return (
			Toast.show({
				text: message,
				textStyle: {textAlign: 'center'},
				duration: 3000,
				position: "bottom",
			})
		)
	}
}

const mapStateToProps = (state) => ({

	userProfile: state.UserProfileReducer.userProfile,

	initialValues: {
		anioInicio: state.UserProfileReducer.userProfile.anioInicio,
		diasEntrenamientoSemana: state.UserProfileReducer.userProfile.diasEntrenamientoSemana,
		diasJuegoSemana: state.UserProfileReducer.userProfile.diasJuegoSemana,
		handicap: state.UserProfileReducer.userProfile.handicap,
		mano: state.UserProfileReducer.userProfile.mano
	}

});

const mapDispatchToProps = (dispatch) => ({

	getUserProfile: (userId) => {
		dispatch(actionGetUserProfile(userId))
	},

	updatePlayProfile: (userId, values) => {
		dispatch(actionUpdatePlayUserProfile(userId, values));
	}

});

export default connect( mapStateToProps, mapDispatchToProps )(PerfilJuegoUsuarioScreen);

// Styles
const stylesPage = StyleSheet.create({
	//Seccion de puntuaciones
	form_style: {
		paddingRight: 20 
	},
});

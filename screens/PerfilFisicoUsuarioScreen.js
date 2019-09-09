/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from "react-native"; // React-native
import { Container, Content, Form, Toast, Root } from "native-base"; // Native Base
import { connect } from 'react-redux'; // Redux
/* ========== PROPIOS ================ */
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import Strings from '../constants/Strings'; // Strings
import { AUTH } from '../services/firebase'; // Firebase
import PlayPhysicalProfileForm from '../navigation/autenticados/forms/physicalUserProfile'; // Formulario
import { actionGetUserProfile, actionUpdatePhysicalUserProfile } from '../store/actions/userProfileAction';// Actions


class PerfilFisicoUsuarioScreen extends React.Component {
	constructor(props) {
		super(props);
		this.user = AUTH.currentUser;
	}

	componentDidMount() {
		this.props.getUserProfile(this.user.uid);
	}

	render() {
		return (
			<Root>
				<Container>
					{/* Header Page */}
					<DetailScreenHeader
						navigation={this.props.navigation} 
						title={Strings.ST20}
						page={'PERFIL_FISICO'}
					/>

					{/* Content Page */}
					<Content padder>
						<Form style={stylesPage.form_style}>
							<PlayPhysicalProfileForm 
								initialValues = {this.props.initialValues}
								updatePhysicalProfile={this.props.updatePhysicalProfile}
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
		altura         : state.UserProfileReducer.userProfile.altura,
		peso           : state.UserProfileReducer.userProfile.peso,
		anioNacimiento : state.UserProfileReducer.userProfile.anioNacimiento,
		sexo           : state.UserProfileReducer.userProfile.sexo,
	}
	 

});

const mapDispatchToProps = (dispatch) => ({

	getUserProfile: (userId) => {
		dispatch(actionGetUserProfile(userId))
	},

	updatePhysicalProfile: (userId, values) => {
		dispatch(actionUpdatePhysicalUserProfile(userId, values));
	}

});

export default connect( mapStateToProps, mapDispatchToProps )(PerfilFisicoUsuarioScreen);

// Styles
const stylesPage = StyleSheet.create({
	//Seccion de puntuaciones
	form_style: {
		paddingRight: 20 
	},
});

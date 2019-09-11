/* =========== LIBRERIAS ============= */
import React, { useEffect } from "react"; // React
import { StyleSheet } from "react-native"; // React-native
import { Container, Content, Form, Toast, Root} from "native-base"; // Native Base
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux' // React-Redux
/* ========== PROPIOS ================ */
import Strings from '../constants/Strings'; // Strings
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import { AUTH } from '../services/firebase'; // Firebase
import PlayUserProfileForm from '../navigation/autenticados/forms/playUserProfile'; // Formulario
import { actionGetUserProfile, actionUpdatePlayUserProfile } from '../store/actions/userProfileAction'; // Actions



const PerfilJuegoUsuarioScreen = props => {
	const { navigation } = props;
	const user = AUTH.currentUser;
	// REDUX
	const { userProfile }= useSelector(state => state.userProfile);
	// Dispatchs
	const dispatch = useDispatch();
	const getUserProfile = userId => dispatch(actionGetUserProfile(userId));
	const updatePlayProfile = (userId, values) => dispatch(actionUpdatePlayUserProfile(userId, values));

	const initialValues = {
		anioInicio: userProfile.anioInicio,
		diasEntrenamientoSemana: userProfile.diasEntrenamientoSemana,
		diasJuegoSemana: userProfile.diasJuegoSemana,
		handicap: userProfile.handicap,
		mano: userProfile.mano
	}

	useEffect(() => {
		getUserProfile(user.uid);
	}, [])

	const mostrarToast = (message) => {
		return (
			Toast.show({
				text: message,
				textStyle: {textAlign: 'center'},
				duration: 3000,
				position: "bottom",
			})
		)
	}

	return (
		<Root>
			<Container>
				{/* Header Page */}
				<DetailScreenHeader
					navigation={navigation} 
					title={Strings.ST21}
					page={'PERFIL_JUEGO'}
				/>

				{/* Content Page */}
				<Content padder>
					<Form style={stylesPage.form_style}>
						<PlayUserProfileForm 
							initialValues = {initialValues} 
							updatePlayProfile={updatePlayProfile} 
							userId={user.uid} 
							setMessage={mostrarToast}
						/>
					</Form>
				</Content>
			</Container>
		</Root>
	);
}
export default PerfilJuegoUsuarioScreen;

// Styles
const stylesPage = StyleSheet.create({
	//Seccion de puntuaciones
	form_style: {
		paddingRight: 20 
	},
});

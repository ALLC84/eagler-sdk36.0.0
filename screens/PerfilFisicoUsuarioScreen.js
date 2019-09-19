/* =========== LIBRERIAS ============= */
import React, {useEffect} from "react"; // React
import { StyleSheet } from "react-native"; // React-native
import { Container, Content, Form, Toast, Root } from "native-base"; // Native Base
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux' // React-Redux
import { actionGetUserProfile, actionUpdatePhysicalUserProfile } from '../store/actions/userProfileAction';// Actions
/* ========== PROPIOS ================ */
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import Strings from '../constants/Strings'; // Strings
import { AUTH } from '../services/firebase'; // Firebase
import PlayPhysicalProfileForm from '../navigation/autenticados/forms/physicalUserProfile'; // Formulario


const PerfilFisicoUsuarioScreen = props => {
	const { navigation } = props;
	const user = AUTH.currentUser;
	// REDUX
	const { userProfile }= useSelector(state => state.userProfile);
	// Dispatchs
	const dispatch = useDispatch();
	const getUserProfile = userId => dispatch(actionGetUserProfile(userId));
	const updatePhysicalProfile = (userId, values) => dispatch(actionUpdatePhysicalUserProfile(userId, values));

	const initialValues= {
		altura: userProfile.altura , peso:userProfile.peso , anioNacimiento:userProfile.anioNacimiento , state:userProfile.state , sexo:userProfile.sexo 
	}

	useEffect(() => {
		getUserProfile(user.uid);
	},[])



	return (
		<Root>
			<Container>
				{/* Header Page */}
				<DetailScreenHeader
					navigation={navigation} 
					title={Strings.ST20}
					page={'PERFIL_FISICO'}
				/>

				{/* Content Page */}
				<Content padder>
					<Form style={stylesPage.form_style}>
						<PlayPhysicalProfileForm 
							initialValues = {initialValues}
							updatePhysicalProfile={updatePhysicalProfile}
							userId={user.uid} 
							setMessage={mostrarToast}
						/>
					</Form>
				</Content>
			</Container>
		</Root>
	);
}

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
export default PerfilFisicoUsuarioScreen;

// Styles
const stylesPage = StyleSheet.create({
	//Seccion de puntuaciones
	form_style: {
		paddingRight: 20 
	},
});

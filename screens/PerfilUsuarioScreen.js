/* =========== LIBRERIAS ============= */
import React, {useEffect} from "react";
import { StyleSheet, ImageBackground, TouchableOpacity, Platform } from "react-native"; // React-native
import { Container, Content, Left, Body, Right, View, List, ListItem, Thumbnail, Text } from "native-base"; // Native-Base
import * as ImagePicker from 'expo-image-picker'; // Expo
import { Ionicons } from '@expo/vector-icons'; // Expo
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux' // React-Redux
/* ========== PROPIOS ================ */
// import Text from '../components/CustomText';
import Strings from '../constants/Strings'; // Strings
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import { AUTH } from '../services/firebase'; // Firebase
import functionGetPermission from '../lib/functions/functionGetPermission'; // Funciones Lib
import FunctionSetPhase from '../lib/functions/functionFaseClase'; // Funciones Lib
import { actionGetUserProfile, actionSetImageProfile } from '../store/actions/userProfileAction' //Actions
import Colors from '../constants/Colors'; // Styles 


const PerfilUsuarioScreen = props => {
	const { navigation } = props;
	const user = AUTH.currentUser;
	// REDUX
	const { userProfile, imageProfile }= useSelector(state => state.userProfile);
	// Dispatchs
	const dispatch = useDispatch();
	const getUserProfile = userId => dispatch(actionGetUserProfile(userId));
	const setImageDB = (uri, name) => dispatch(actionSetImageProfile(uri, name));

	useEffect(() => {
		getUserProfile(user.uid);
	},[])

	// Muestra cada item de la lista de abilidades
	const	mostrarPuntuacion = (habilidad, handicap, puntuacion, icon, func) => {
		
		return (
			<ListItem avatar>
				<Left>
					<Ionicons style={stylesPage.puntuacionLeftIcon}
						name={icon} 
						size={24}
					/>
				</Left>
				<Body>
					<Text style={{fontWeight: '400'}}>{habilidad}</Text>
					<Text style={{fontSize: 14}}> Estas en fase {func(parseInt(puntuacion), parseFloat(handicap))}</Text>
				</Body>
				<Right>
					<Text> {puntuacion} pts</Text>
				</Right>
			</ListItem>
		);
	};

	const obtenerPermisoCamaraRoll = async () => {
		if(Platform.OS === 'ios') {
			const status = await functionGetPermission.getPermissionLibrary();
			if (status === "granted") {
				obtenerImagenProfileGaleria();
			}else {
				throw new Error("Permiso denegado");
			}
		}else {
			obtenerImagenProfileGaleria();
		}
	};

	const obtenerImagenProfileGaleria = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});
		if (!result.cancelled) {
			setImageDB(result.uri, user.uid);
		}
	};

	return (
		<Container>
			{/* Header Page */}
			<DetailScreenHeader
				navigation={navigation} 
				title={Strings.ST18}
				page={'PERFIL_USUARIO'}
			/>

			{/* Content Page */}
			{/* profile */}
			<View style={stylesPage.header_container}>
				<ImageBackground style={stylesPage.header_background}
					source={require("../assets/images/user-profile-header-bg.jpg")}
				>
					<List>
						<ListItem avatar>
							<Left>
								<TouchableOpacity
									onPress={obtenerPermisoCamaraRoll}
								>
									<Thumbnail
										source={
											imageProfile !== "" || imageProfile == undefined
												? {
														uri: imageProfile
													}
												: require("../assets/images/user-img.png")
										}
									/>
								</TouchableOpacity>
							</Left>
							<Body>
								<Text style={stylesPage.text_header}>
									{userProfile.nickName}
								</Text>
								<Text>{userProfile.email}</Text>
							</Body>
						</ListItem>
					</List>
				</ImageBackground>
			</View>

			{/* tiempos */}
			<Content style={stylesPage.puntuacionContainer}>
				{ userProfile.handicap ?
					<List>
						{mostrarPuntuacion(
							"Drive",
							userProfile.handicap,
							userProfile.tiempoDrive,
							"ios-thunderstorm",
							FunctionSetPhase.getPhaseDrive
						)}
						{mostrarPuntuacion(
							"Maderas",
							userProfile.handicap,
							userProfile.tiempoMaderas,
							"ios-compass",
							FunctionSetPhase.getPhaseMaderas
						)}
						{mostrarPuntuacion(
							"Hierros largos",
							userProfile.handicap,
							userProfile.tiempoHierrosLargos,
							"ios-locate",
							FunctionSetPhase.getPhaseHierrosLargos
						)}
						{mostrarPuntuacion(
							"Hierros cortos",
							userProfile.handicap,
							userProfile.tiempoHierrosCortos,
							"ios-timer",
							FunctionSetPhase.getPhaseHierrosCortos
						)}
						{mostrarPuntuacion(
							"Approach",
							userProfile.handicap,
							userProfile.tiempoApproach,
							"ios-speedometer",
							FunctionSetPhase.getPhaseApproach
						)}
						{mostrarPuntuacion(
							"Putt",
							userProfile.handicap,
							userProfile.tiempoPutt,
							"ios-trophy",
							FunctionSetPhase.getPhasePutt
						)}
					</List>
				: <><Text>Cargando</Text></> }
			</Content>
		</Container> 
	)
}
export default PerfilUsuarioScreen;


// Styles
const stylesPage = StyleSheet.create({
	// Header profile
	header_container: {
		height: 160
	},
	header_background: {
		flex: 1, 
		width: null, 
		justifyContent: "center"
	},
	text_header: {
		color: "white"
	},
	//Seccion de puntuaciones
	puntuacionContainer: {
		marginTop: 20 
	},
	puntuacionLeftIcon: {
		marginRight: 5,
		color: Colors.tintColor,
		marginTop: 5
	}
});




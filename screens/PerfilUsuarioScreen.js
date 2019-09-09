/* =========== LIBRERIAS ============= */
import React from "react";
import { StyleSheet, ImageBackground, TouchableOpacity, Platform } from "react-native"; // React-native
import { connect } from 'react-redux'; // Redux
import { Container, Content, Left, Body, Right, View, List, ListItem, Thumbnail } from "native-base"; // Native-Base
import { ImagePicker } from "expo"; // Expo
import { Ionicons } from '@expo/vector-icons'; // Expo
/* ========== PROPIOS ================ */
import Text from '../components/CustomText';
import Strings from '../constants/Strings'; // Strings
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import { AUTH } from '../services/firebase'; // Firebase
import functionGetPermission from '../lib/functions/functionGetPermission'; // Funciones Lib
import FunctionSetPhase from '../lib/functions/functionFaseClase'; // Funciones Lib
import { actionGetUserProfile, actionSetImageProfile } from '../store/actions/userProfileAction' //Actions
import Colors from '../constants/Colors'; // Styles 


class PerfilUsuarioScreen extends React.Component {
	constructor(props) {
		super(props);
		this.user = AUTH.currentUser;
	}

	componentDidMount() {
		this.props.getUserProfile(this.user.uid);
	}

	render() {
		const { userProfile, imageProfile } = this.props;

		return (
			<Container>
				{/* Header Page */}
				<DetailScreenHeader
					navigation={this.props.navigation} 
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
										onPress={this.obtenerPermisoCamaraRoll}
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
									<Text note>{userProfile.email}</Text>
								</Body>
							</ListItem>
						</List>
					</ImageBackground>
				</View>

				{/* tiempos */}
				<Content style={stylesPage.puntuacionContainer}>
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
				</Content>
			</Container>
		)
	}

	obtenerPermisoCamaraRoll = async () => {
		if(Platform.OS === 'ios') {
			const status = await functionGetPermission.getPermissionLibrary();
			if (status === "granted") {
				this.obtenerImagenProfileGaleria();
			}else {
				throw new Error("Permiso denegado");
			}
		}else {
			this.obtenerImagenProfileGaleria();
		}
	};

	obtenerImagenProfileGaleria = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});
		if (!result.cancelled) {
			this.props.setImageDB(result.uri, this.user.uid);
		}
	};

}

// Muestra cada item de la lista de abilidades
const	mostrarPuntuacion = (avilidad, handicap, puntuacion, icon, func) => {
	return (
		<ListItem avatar>
			<Left>
				<Ionicons style={stylesPage.puntuacionLeftIcon}
					name={icon} 
					size={24}
				/>
			</Left>
			<Body>
				<Text>{avilidad}</Text>
				<Text note>Estas en fase {func(puntuacion, handicap)}</Text>
			</Body>
			<Right>
				<Text note> {puntuacion} pts</Text>
			</Right>
		</ListItem>
	);
};


// Redux
const mapStateToProps = (state) => ({

	userProfile: state.UserProfileReducer.userProfile,
	imageProfile: state.UserProfileReducer.imageProfile
	
})

const mapDispatchToProps = dispatch => ({
	
	getUserProfile: (userId) => {
		dispatch(actionGetUserProfile(userId))
	},

	setImageDB: (uri, name) => {
		dispatch(actionSetImageProfile(uri, name))
	}

})

export default connect(mapStateToProps, mapDispatchToProps)(PerfilUsuarioScreen)


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




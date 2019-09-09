import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

// Screen
import IQScreen from "../IQScreen";
import PostDetailScreen from '../PostDetailScreen'
// import PerfilUsuarioScreen from "../PerfilUsuarioScreen";
import PerfilFisicoUsuarioScreen from "../PerfilFisicoUsuarioScreen";
import PerfilJuegoUsuarioScreen from "../PerfilJuegoUsuarioScreen";
import SuscripcionesScreen from "../SuscripcionesScreen";


const IQ = createStackNavigator(
	{
		IQ: {
			screen: IQScreen
		},
		PostDetail: {
			screen: PostDetailScreen
		},
		// PerfilUsuario: {
		// 	screen: PerfilUsuarioScreen
		// },
		PerfilJuego: {
			screen: PerfilJuegoUsuarioScreen
		},
		PerfilFisico: {
			screen: PerfilFisicoUsuarioScreen
		},
		Suscripciones: {
			screen: SuscripcionesScreen
		}
	},
	{
		headerMode: "none"
	}
);

const StackIQ = createAppContainer(IQ);

export default StackIQ;

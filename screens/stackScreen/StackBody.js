import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import BodyScreen from "../BodyScreen";
import BodyDetailScreen from "../BodyDetailScreen";

import SingUp from "../RegisterScreen";
// import PerfilUsuarioScreen from "../PerfilUsuarioScreen";
import PerfilFisicoUsuarioScreen from "../PerfilFisicoUsuarioScreen";
import PerfilJuegoUsuarioScreen from "../PerfilJuegoUsuarioScreen";
import SuscripcionesScreen from "../SuscripcionesScreen";

const Body = createStackNavigator(
	{
		Body: {
			screen: BodyScreen
		},
		BodyDetail: {
			screen: BodyDetailScreen
		},
		SingUp: {
			screen: SingUp
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

const StackBody = createAppContainer(Body);

export default StackBody;

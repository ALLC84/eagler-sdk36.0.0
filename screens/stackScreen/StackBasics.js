import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import BasicsScreen from "../BasicsScreen";

//Screen
import BasicsDetailScreen from "../BasicsDetailScreen";
import SingIn from "../LoginScreen";
import SingUp from "../RegisterScreen";
import PerfilUsuarioScreen from "../PerfilUsuarioScreen";
import PerfilFisicoUsuarioScreen from "../PerfilFisicoUsuarioScreen";
import PerfilJuegoUsuarioScreen from "../PerfilJuegoUsuarioScreen";
import SuscripcionesScreen from "../SuscripcionesScreen";
import TheMethodScreen from '../theMethodScreen';


const Basics = createStackNavigator(
	{
		Basics: {
			screen: BasicsScreen
		},
		BasicsDetail: {
			screen: BasicsDetailScreen
		},
		SingIn: {
			screen: SingIn
		},
		SingUp: {
			screen: SingUp
		},
		PerfilUsuario: {
			screen: PerfilUsuarioScreen
		},
		PerfilJuego: {
			screen: PerfilJuegoUsuarioScreen
		},
		PerfilFisico: {
			screen: PerfilFisicoUsuarioScreen
		},
		Suscripciones: {
			screen: SuscripcionesScreen
		},
		TheMethod: {
			screen: TheMethodScreen
		}
	},
	{
		headerMode: "none"
	}
);

const StackBasics = createAppContainer(Basics);
export default StackBasics;

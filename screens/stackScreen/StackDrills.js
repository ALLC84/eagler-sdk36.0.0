import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import DrillsScreen from "../DrillsScreen";
import DrillDetailScreen from "../DrillDetailScreen"
import PerfilUsuarioScreen from "../PerfilUsuarioScreen";
import PerfilFisicoUsuarioScreen from "../PerfilFisicoUsuarioScreen";
import PerfilJuegoUsuarioScreen from "../PerfilJuegoUsuarioScreen";
import SuscripcionesScreen from "../SuscripcionesScreen";
import TheMethodScreen from '../theMethodScreen';


const Drills = createStackNavigator(
	{
		Drills: {
         screen: DrillsScreen
		},
		DrillDetail: {
         screen: DrillDetailScreen,
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

const StackDrills = createAppContainer(Drills);

export default StackDrills;

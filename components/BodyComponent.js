/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from 'react-native'; // React Native
import { Content } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import Strings from '../constants/Strings'; // Strings
import CardBodyComponent from "./CardBodyComponent";


const imgs = [
	require("../assets/images/portadaBody/img-mueve-cuerda.jpg"),
	require("../assets/images/portadaBody/img-sentadillas.jpg"),
	require("../assets/images/portadaBody/kettlebell.jpeg"),
];


const BodyComponent = props => {
	const { navigation } = props;

	const crearCardClase = (key, title, subtitle, img) => 
		<CardBodyComponent
			key={key}
			title={title}
			subtitle={subtitle}
			img={img}
			navigation={navigation}
		/>

	return (
		<Content padder>
			{crearCardClase(1, Strings.ST34, Strings.ST35, imgs[0])}
			{crearCardClase(2, Strings.ST36, Strings.ST37, imgs[1])}
			{crearCardClase(3, Strings.ST38, Strings.ST39, imgs[2])}
		</Content>
	);			
}
export default BodyComponent;

// Styles del Componente
const stylesPage = StyleSheet.create({});


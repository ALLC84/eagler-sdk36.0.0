/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from 'react-native'; // React Native
import { Content } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import Strings from '../constants/Strings'; // Strings
import CardBodyComponent from "./CardBodyComponent";


const imgs = [
	"https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/Body%2Fbody%20img%2Flevel_1516827226.jpg?alt=media&token=5f322133-78ac-4f46-9b03-3fca2252474d",
	"https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/Body%2Fbody%20img%2Flevel_1516827206.jpg?alt=media&token=1e2a2794-c497-4e73-a57d-4a9c1e9a35c3",
	"https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/Body%2Fbody%20img%2Fimages.jpeg?alt=media&token=509110df-7956-42b9-8076-6a6452240da7"
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


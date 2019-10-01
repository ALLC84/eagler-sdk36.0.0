/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from 'react-native'; // React Native
import { Content } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import Strings from '../constants/Strings'; // Strings
import CardBodyComponent from "./CardBodyComponent";


const imgs = [
	"https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/Body%2Fbody%20img%2Fportada%2Fimg-mueve-cuerda.jpg?alt=media&token=d523e8f2-e126-4a5c-929a-3a8fa2c9be17",
	"https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/Body%2Fbody%20img%2Fportada%2Fimg-sentadillas.jpg?alt=media&token=5dabf6e4-a0ae-4288-97bf-d9fbba4678bc",
	"https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/Body%2Fbody%20img%2Fportada%2Fimg-kettlebell.jpeg?alt=media&token=f40548b6-fd5c-4b20-9a5e-535ffeef95c2"
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


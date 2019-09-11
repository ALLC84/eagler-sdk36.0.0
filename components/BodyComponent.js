/* =========== LIBRERIAS ============= */
import React, { useEffect } from "react"; // React
import { StyleSheet } from 'react-native'; // React Native
import { connect } from 'react-redux'; // Redux
import { Content, Spinner } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import CardBodyComponent from "./CardBodyComponent";
import Colors from '../constants/Colors' // Styles
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux' // React-Redux
import { actionGetSeccionClase } from '../store/actions/bodyAction'; // Actions

const imgs = [
	"https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/Body%2Fbody%20img%2Flevel_1516827226.jpg?alt=media&token=5f322133-78ac-4f46-9b03-3fca2252474d",
	"https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/Body%2Fbody%20img%2Flevel_1516827206.jpg?alt=media&token=1e2a2794-c497-4e73-a57d-4a9c1e9a35c3",
	"https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/Body%2Fbody%20img%2Fimages.jpeg?alt=media&token=509110df-7956-42b9-8076-6a6452240da7"
];

const sessionMovements = ["session1", "session2"];
const sessionWorkouts = ["session1"];
const sessionWarmups = ["session1", "session2"];

//========== RANDOM
const getRadnom = ref => {
	random = 0;
	switch (ref) {
		case "movements":
			return (random = Math.floor(
				Math.random() * sessionMovements.length
			));
		case "workouts":
			return (random = Math.floor(
				Math.random() * sessionWorkouts.length
			));

		case "warmups":
			return (random = Math.floor(Math.random() * sessionWarmups.length));

		default:
			return random;
	}
};

const BodyComponent = props => {
	const { navigation } = props;
	// REDUX
	const { clase }= useSelector(state => state.body)
	// Dispatchs
	const dispatch = useDispatch()
	const getClase = (movements, workouts, warmups) => dispatch(actionGetSeccionClase(movements, workouts, warmups))
	
	useEffect(() => {
		getClase(
			sessionMovements[getRadnom("movements")],
			sessionWorkouts[getRadnom("workouts")],
			sessionWarmups[getRadnom("warmups")]
		)
	}, [])

	const crearCardClase = (key, clase, title, subtitle, img) => 
		<CardBodyComponent
			key={key}
			body={clase}
			title={title}
			subtitle={subtitle}
			img={img}
			navigation={navigation}
		/>

	return (
		clase.length == 0
		?
		<>
			<Spinner color={Colors.tintColor}/>
			<Text style={stylesPage.snipperText}>
					{Strings.ST33_1}
			</Text>
		</>
		:
		<Content padder>
			{crearCardClase(1, clase, Strings.ST34, Strings.ST35, imgs[0])}
			{crearCardClase(2, clase, Strings.ST36, Strings.ST37, imgs[1])}
			{crearCardClase(3, clase, Strings.ST38, Strings.ST39, imgs[2])}
		</Content>
	);			
}
export default BodyComponent;

// Styles del Componente
const stylesPage = StyleSheet.create({
	snipperText: {
		textAlign: 'center', 
		color: Colors.tintColor
	},
});

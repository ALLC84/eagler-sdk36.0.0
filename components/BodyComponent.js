/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { StyleSheet } from 'react-native'; // React Native
import { connect } from 'react-redux'; // Redux
import { Content, Spinner } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import CardBodyComponent from "./CardBodyComponent";
import {
	actionGetSeccionClase
} from '../store/actions/bodyAction'; // Actions
import Colors from '../constants/Colors'

const imgs = [
	"https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/Body%2Fbody%20img%2Flevel_1516827226.jpg?alt=media&token=5f322133-78ac-4f46-9b03-3fca2252474d",
	"https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/Body%2Fbody%20img%2Flevel_1516827206.jpg?alt=media&token=1e2a2794-c497-4e73-a57d-4a9c1e9a35c3",
	"https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/Body%2Fbody%20img%2Fimages.jpeg?alt=media&token=509110df-7956-42b9-8076-6a6452240da7"
];

const sessionMovements = ["session1", "session2"];
const sessionWorkouts = ["session1"];
const sessionWarmups = ["session1", "session2"];

class BodyComponent extends Component {

	componentDidMount() {

		this.props.getClase(
			sessionMovements[this.getRadnom("movements")],
			sessionWorkouts[this.getRadnom("workouts")],
			sessionWarmups[this.getRadnom("warmups")]
		);

	}

	render() {
		const {clase} = this.props;

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
				{this.crearCardClase(1, clase, Strings.ST34, Strings.ST35, imgs[0])}
				{this.crearCardClase(2, clase, Strings.ST36, Strings.ST37, imgs[1])}
				{this.crearCardClase(3, clase, Strings.ST38, Strings.ST39, imgs[2])}
			</Content>
		);			
	}

	crearCardClase = (key, clase, title, subtitle, img) => 
		<CardBodyComponent
			key={key}
			body={clase}
			title={title}
			subtitle={subtitle}
			img={img}
			navigation={this.props.navigation}
		/>

	//========== RANDOM
	getRadnom = ref => {
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

}

const mapStateToProps = (state) => ({

	clase: state.BodyReducer.clase
	
})

const mapDispatchToProps = dispatch => ({
	
	getClase: (movements, workouts, warmups) => {
		dispatch(actionGetSeccionClase(movements, workouts, warmups))
	}

})

export default connect(mapStateToProps, mapDispatchToProps)(BodyComponent);

// Styles del Componente
const stylesPage = StyleSheet.create({
	snipperText: {
		textAlign: 'center', 
		color: Colors.tintColor
	},
});

/* =========== LIBRERIAS ============= */
import React, { useEffect } from "react"; // React
import { StyleSheet, FlatList } from 'react-native'; // React Native
import { connect } from 'react-redux'; // Redux
import { Content, Spinner, Text } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
// import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import CardDrillComponent from "./CardDrillComponent"; // Card 
import Colors from '../constants/Colors' // Style
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux'
import { actionGetDrills } from '../store/actions/drillAction'; // Actions


const DrillsComponent = props => {
	const { navigation } = props;
	// REDUX
	const { drills } = useSelector(state => state.drills)
	// Dispatchs
	const dispatch = useDispatch()
	const getDrills = () => dispatch(actionGetDrills())
	
	useEffect(() => {
		getDrills();
	}, [])

	const crearCardDrills = (drills) => 
		drills.map((drill, i) => (
			<CardDrillComponent
				key={i}
				drill={drill}
				navigation={navigation}
			/>
		))

	return (
		drills.length == 0
		? 
		<>
			<Spinner color={Colors.tintColor}/>
			<Text style={stylesPage.snipperText}>
				{Strings.ST33_2}
			</Text>
		</>
		:
		<Content padder>
			{crearCardDrills(drills)}
		</Content>
	);	
}
export default DrillsComponent;

// Styles del Componente
const stylesPage = StyleSheet.create({
	snipperText: {
		textAlign: 'center', 
		color: Colors.tintColor
	},
});

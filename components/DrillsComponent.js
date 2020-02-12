/* =========== LIBRERIAS ============= */
import React, { useEffect, useState } from "react"; // React
import { StyleSheet, ScrollView } from 'react-native'; // React Native
import { Spinner, Text } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
// import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import CardDrillComponent from "./CardDrillComponent"; // Card 
import Colors from '../constants/Colors' // Style
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux'
import { actionGetDrills } from '../store/actions/drillAction'; // Actions


const DrillsComponent = props => {
	// @refresh reset
	const { navigation } = props;
	const [cargando, setCargando] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	// REDUX
	const { drills, totalPages } = useSelector(state => state.drillsData)
	// Dispatchs
	const dispatch = useDispatch()
	const getDrills = (page) => dispatch(actionGetDrills(page))
	
	useEffect(() => {
		getDrills(1);
	}, [])

	const crearCardDrills = (drills) => 
		drills.map((drill, i) => (
			<CardDrillComponent
				key={i}
				drill={drill}
				navigation={navigation}
			/>
		))

	// HANDLE SCROLL Y
	const handleScroll = async (event) => {
		if(currentPage == 1 || currentPage < totalPages) {

			setCargando(true)
			setCurrentPage(currentPage + 1)
			
			await getDrills(2)
	
			setTimeout(() => {
				setCargando(false)
			}, 1500);
		}
	}

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
		<ScrollView style={stylesPage.content}
			onMomentumScrollEnd={handleScroll}
		>
			{crearCardDrills(drills)}
			{ cargando ? <Spinner color={Colors.tintColor}/> : null}
		</ScrollView>
	);	
}
export default DrillsComponent;

// Styles del Componente
const stylesPage = StyleSheet.create({
	content: {
		paddingHorizontal: 10,
		paddingBottom: 20
	},
	snipperText: {
		textAlign: 'center', 
		color: Colors.tintColor
	},
});

/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { StyleSheet } from 'react-native'; // React Native
import { connect } from 'react-redux'; // Redux
import { Content, Spinner } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import CardDrillComponent from "./CardDrillComponent"; // Card 
import { actionGetDrills } from '../store/actions/drillAction'; // Actions
import Colors from '../constants/Colors' // Style

class DrillsComponent extends Component {
	
	componentDidMount() {
		this.props.getDrills();
	}

	render() {
		const {drills} = this.props;

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
				{ this.crearCardDrills(drills) }
			</Content>
		);
	}

	crearCardDrills = (drills) => 
		drills.map((drill, i) => (
			<CardDrillComponent
				key={i}
				drill={drill}
				navigation={this.props.navigation}
			/>
		))
}

const mapStateToProps = (state) => ({
	
	drills: state.DrillReducer.drills

})

const mapDispatchToProps = dispatch => ({
	
	getDrills: () => {
		dispatch(actionGetDrills());
	}
	
})


export default connect(mapStateToProps, mapDispatchToProps)(DrillsComponent);

// Styles del Componente
const stylesPage = StyleSheet.create({
	snipperText: {
		textAlign: 'center', 
		color: Colors.tintColor
	},
});

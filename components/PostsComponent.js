/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { StyleSheet } from 'react-native'; // React Native
import { connect } from 'react-redux'; // Redux
import { Content, Spinner } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import CardPostComponent from "./CardPostComponent"; // Card Post IQ
import {actionGetIQ} from '../store/actions/IQAction' // Actions
import Colors from '../constants/Colors' // Styles

class CardImageExample extends Component {
	
	componentDidMount() {
		this.props.getIQ();
	}

	render() {
		const {IQ} = this.props.IQ

		

		return (
			IQ.length == 0
			?
			<>
				<Spinner color={Colors.tintColor}/>
				<Text style={stylesPage.snipperText}>
					{Strings.ST33_3}
				</Text>
			</>
			:
			<Content padder>
				{ this.crearCardPost(IQ) }
			</Content>

			
		);
	}

	crearCardPost = (IQ) => 
		IQ.map((post, i) => (
			<CardPostComponent
				key={i}
				post={post}
				navigation={this.props.navigation}
			/>
		))

}

const mapStateToProps = (state) => ({
	
	IQ: state.IQReducer

})

const mapDispatchToProps = dispatch => ({
	
	getIQ: () => {
		dispatch(actionGetIQ());
	}
	
})


export default connect(mapStateToProps, mapDispatchToProps)(CardImageExample);

// Styles del Componente
const stylesPage = StyleSheet.create({
	snipperText: {
		textAlign: 'center', 
		color: Colors.tintColor
	},
});

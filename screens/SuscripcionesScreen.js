/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { StyleSheet } from "react-native"; // React-native
/* ========== PROPIOS ================ */
import Text from '../components/CustomText';
import Strings from '../constants/Strings'; // Strings
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header

class Suscripciones extends Component {
	constructor(props){
		super(props)
	}
	render() {
		return (
			<>
				{/* Header Page */}
				<DetailScreenHeader
					navigation={this.props.navigation} 
					title={Strings.ST19}
					page={'SUSCRIPCIONES'}
				/>

				{/* Content Page */}

			</>
		);
	}
}
export default Suscripciones;

// Styles
const styles = StyleSheet.create({

});

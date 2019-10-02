/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from "react-native"; // React-native
/* ========== PROPIOS ================ */
import Strings from '../constants/Strings'; // Strings
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header

const  Suscripciones = props => {

	return (
		<>
			{/* Header Page */}
			<DetailScreenHeader
				navigation={props.navigation} 
				title={Strings.ST19}
				page={'SUSCRIPCIONES'}
			/>

			{/* Content Page */}

		</>
	);
	
}
export default Suscripciones;

// Styles
const stylesPage = StyleSheet.create({

});

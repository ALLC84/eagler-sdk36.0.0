/* =========== LIBRERIAS ============= */
import React, {useEffect} from "react"; // React
import { StyleSheet } from "react-native"; // React-native
import { Container, Content, Form, Toast, Root } from "native-base"; // Native Base

/* ========== PROPIOS ================ */
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import Strings from '../constants/Strings'; // Strings
import SlideMethod from '../components/SlideMethod';



const TheMethodScreen = props => {
	const { navigation } = props;

	return (
		<Root>
			<Container>
				{/* Header Page */}
				<DetailScreenHeader
					navigation={navigation} 
					title={Strings.ST16_1}
				/>

				{/* Content Page */}
				<Content>
                    <SlideMethod />
				</Content>
			</Container>
		</Root>
	);
}
export default TheMethodScreen;

// Styles
const stylesPage = StyleSheet.create({
	//Seccion de puntuaciones
	form_style: {
		paddingRight: 20 
	},
});

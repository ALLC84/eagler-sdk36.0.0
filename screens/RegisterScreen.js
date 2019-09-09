/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { View, Image, StyleSheet } from "react-native"; // React Native
import { Container, Button, } from "native-base"; // Native Base
import { connect } from 'react-redux'; // Redux
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // Scroll View
/* ========== PROPIOS ================ */
import Text from '../components/CustomText';
import Strings from '../constants/Strings'; // Strings
import SingUpForm from '../navigation/noAutenticados/forms/SingUpForm'; // Form
import { actionRegistroUsuario } from '../store/actions/registerAction'; // Actions
import globalStyles from "../constants/styles/GlobalStyles"; // Styles

class SingUp extends Component {

	render() {
		const { navigation } = this.props;

		return (
			<Container>
				<KeyboardAwareScrollView>
					<View style={stylesPage.view_container} >
						<Image
							source={require("../assets/images/1LAz.png")}
							style={globalStyles.logo_start}
							resizeMode="contain"
						/>

						<SingUpForm registroUsuario = {this.registroUsuario}/>

						<Button
							block
							transparent
							onPress={() => {
								navigation.navigate("SingIn");
							}}
						>
							<Text style={globalStyles.text_link}>
								{Strings.ST9}
							</Text>
						</Button>
					</View>
				</KeyboardAwareScrollView>
			</Container>
		);
	}

	registroUsuario = (values) => {
		this.props.registroUsuario(values);
	}
}


const mapStateToProps = (state) => ({

	numero: state.reducerPrueba

});

const mapDispatchToProps = (dispatch) => ({

	registroUsuario: (values) => {
		dispatch(actionRegistroUsuario(values));
	}


});


//export default SingIn;
export default connect( mapStateToProps, mapDispatchToProps )(SingUp);

const stylesPage = StyleSheet.create({
	view_container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		// marginTop: 20
	}
})

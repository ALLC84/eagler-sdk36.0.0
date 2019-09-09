/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"; // React Native
import { connect } from 'react-redux'; // Redux
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // Scroll View
import { Container, Button } from "native-base";
/* ========== PROPIOS ================ */
import Text from '../components/CustomText';
import Strings from "../constants/Strings"; // String
import SingInForm from '../navigation/noAutenticados/forms/SingInForm'; // Form
import { actionLoginUsuario } from '../store/actions/registerAction'; // Actions
import globalStyles from "../constants/styles/GlobalStyles"; // Styles

class SingIn extends React.Component {
	render() {
		//console.log(this.props.numero)
		const { navigation } = this.props;

		return (
			<Container>
				<KeyboardAwareScrollView>
					<View style={stylesPage.view_container}>
						<Image
							source={require("../assets/images/SimboloAz.png")}
							style={globalStyles.logo_start}
							resizeMode="contain"
						/>

						<SingInForm loginUsuario = {this.loginUsuario}/> 

						<TouchableOpacity style={globalStyles.text_auth}
							// onPress={this.forgetpass.bind(this)}
							activeOpacity={1}
						>
							<Text>
								{Strings.ST5}
							</Text>
						</TouchableOpacity>

						<Button
							block
							transparent
							onPress={() => {
								navigation.navigate("SingUp");
							}}
						>
							<Text style={globalStyles.text_link}>
								{Strings.ST6}
							</Text>
						</Button>

					</View>
				</KeyboardAwareScrollView>
			</Container>
		);
	}

	loginUsuario = (values) => {
		this.props.loginUsuario(values);
	}
}


const mapStateToProps = (state) => ({

		numero: state.reducerPrueba
	
});

const mapDispatchToProps = (dispatch) => ({
	
		loginUsuario: (values) => {
			dispatch(actionLoginUsuario(values))
		}
	
	
});


//export default SingIn;
export default connect( mapStateToProps, mapDispatchToProps )(SingIn);

// Styles del Componente
const stylesPage = StyleSheet.create({
	view_container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		marginTop: 50
	}
});
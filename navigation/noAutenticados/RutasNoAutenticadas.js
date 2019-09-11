import { createStackNavigator, createAppContainer } from "react-navigation";

//Screen
import SingIn from '../../screens/LoginScreen'
import SingUp from '../../screens/RegisterScreen'



const RutasNoAutenticadas = createStackNavigator(
	{
		SingIn: {
			screen: SingIn
		},

		SingUp: {
			screen: SingUp
		}
	},
	{
		headerMode: 'none'
	}
);

const NoAutenticadas = createAppContainer(RutasNoAutenticadas);

export default NoAutenticadas;

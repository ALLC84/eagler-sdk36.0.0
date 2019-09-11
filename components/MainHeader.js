/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { Platform, StyleSheet, Image } from "react-native"; // React Native
import { Header, Left, Right, Button, Icon } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
//import Text from './CustomText' // Custom Text ( Font ) and Styles
//import Strings from '../constants/Strings'; // Strings
import Colors from '../constants/Colors'; // Styles

const  MainHeader = props => {
	const { openDrawer } = props;

	return (
		<Header style={stylesPage.header}>
			<Left>
				{/* <Text style={stylesPage.name_app_header}>
					{Strings.ST0}
				</Text> */}
				<Button transparent style={{width: 80}}>
					<Image style={{flex: 1}}
						source={require("../assets/images/eagler.png")}
					/>
				</Button>
			</Left>
			
			<Right>
				<Button transparent onPress={() => openDrawer()}>
				{Platform.OS === "ios"
					? <Icon name="more" style={stylesPage.icon_menu_heade} />
					: <Icon name="menu" style={stylesPage.icon_menu_heade} />
				}
				</Button>
			</Right>
		</Header>
	);
}
export default MainHeader;

// Styles del Componente
const stylesPage = StyleSheet.create({
	header: {
		backgroundColor: '#FFFFFF'
	},
	name_app_header: {
		fontSize: 24, 
		color: Colors.tintColor,
	},
	icon_menu_heade: {
		color: Colors.tintColor
	}
});

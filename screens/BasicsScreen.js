/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from "react-native"; // React native
import { Root, Drawer } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import MainHeader from "../components/MainHeader"; // Main Header
import BasicComponent from "../components/BasicComponent";
import ProfileUser from '../components/ProfileUser'

const BasicsScreen = props => {
	const { navigation } = props;
	const navigationOptions = {
		header: null
		// title: 'Basics'
	};
	//Drawer
	const closeDrawer = () => {
		this._drawer._root.close();
	};
	const openDrawer = () => {
		this._drawer._root.open();
	};

	return (
		<Root style={stylesPage.container}>
			<Drawer
				ref={ref => {
					_drawer = ref;
				}}
				content={
					<ProfileUser 
						navigation={navigation} 
						closeDrawer={closeDrawer}
					/>
				}
			>
			<MainHeader openDrawer={openDrawer}/>

			<BasicComponent navigation={props}/>

			</Drawer>
		</Root>
	);
}

export default BasicsScreen;

const stylesPage = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center"
	}
});

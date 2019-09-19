/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Root, Drawer } from "native-base";
/* ========== PROPIOS ================ */
import MainHeader from "../components/MainHeader";
import DrillsComponent from "../components/DrillsComponent";
import ProfileUser from '../components/ProfileUser'

const DrillsScreen = props => {
	const { navigation } = props;
	const navigationOptions = {
		header: null
	};

	//Drawer
	closeDrawer = () => {
		_drawer._root.close();
	};
	openDrawer = () => {
		_drawer._root.open();
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
			<MainHeader openDrawer={openDrawer} />

			
			<DrillsComponent 
				navigation= {props}
			/>
		

			</Drawer>
		</Root>
	);
}

export default DrillsScreen;

const stylesPage = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center"
	}
});


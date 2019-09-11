/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Root, Drawer } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import MainHeader from "../components/MainHeader";
import ProfileUser from '../components/ProfileUser'
import PostsComponent from "../components/PostsComponent";

const IQScreen = props => {
	const { navigation } = props;
	const navigationOptions = {
		header: null
	};
	//Drawer
	const closeDrawer = () => {
		_drawer._root.close();
	};
	const openDrawer = () => {
		_drawer._root.open();
	};

	return (
		<Root style={stylesPage.container}>
			<Drawer
				ref={ref => {
					_drawer = ref;
				}}
				content={<ProfileUser navigation={navigation} />}
				onClouse={() => closeDrawer()}
			>
				<MainHeader openDrawer={openDrawer} />

				<PostsComponent navigation={navigation} />
			</Drawer>
		</Root>
	);
}
export default IQScreen;

const stylesPage = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center"
	},
});

/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from "react-native";  // React Native
import { Root, Drawer } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import MainHeader from "../components/MainHeader";
import BodyComponent from "../components/BodyComponent";
import ProfileUser from "../components/ProfileUser";

const BodyScreen = props => {
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
		<Root style={styles.container}>
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

				<BodyComponent navigation={props} />
			</Drawer>
		</Root>
		// <Container>
		// 	<BodyComponent navigation={this.props} />
		// </Container>
	);
}
export default BodyScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center"
	}
});

/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { StyleSheet } from "react-native";  // React Native
import { Root, Drawer } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import MainHeader from "../components/MainHeader";
import BodyComponent from "../components/BodyComponent";
import ProfileUser from "../components/ProfileUser";

class BodyScreen extends Component {
	static navigationOptions = {
		header: null
	};

	render() {
		const { navigation } = this.props;
		return (
			<Root style={styles.container}>
				<Drawer
					ref={ref => {
						this._drawer = ref;
					}}
					content={<ProfileUser navigation={navigation} />}
					onClouse={() => this.closeDrawer()}
				>
					<MainHeader openDrawer={this.openDrawer} />

					<BodyComponent navigation={this.props} />
				</Drawer>
			</Root>
			// <Container>
			// 	<BodyComponent navigation={this.props} />
			// </Container>
		);
	}

	//Drawer
	closeDrawer = () => {
		this._drawer._root.close();
	};
	openDrawer = () => {
		this._drawer._root.open();
	};
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

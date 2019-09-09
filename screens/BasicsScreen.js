/* =========== LIBRERIAS ============= */
import React, { Component} from "react"; // React
import { StyleSheet  } from "react-native"; // React native
import { Root, Drawer } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import MainHeader from "../components/MainHeader"; // Main Header
import BasicComponent from "../components/BasicComponent";
import ProfileUser from '../components/ProfileUser'

class BasicsScreen extends Component {
	static navigationOptions = {
		header: null
		// title: 'Basics'
	};

	render() {
		const { navigation } = this.props;
		//console.log(navigation)

		return (
			<Root style={stylesPage.container}>
				<Drawer
					ref={ref => {
						this._drawer = ref;
					}}
					content={<ProfileUser navigation={navigation}/>}
					onClouse={() => this.closeDrawer()}
					
				>
				<MainHeader openDrawer={this.openDrawer} />

				<BasicComponent navigation={this.props} />

				</Drawer>
			</Root>
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

export default BasicsScreen;

const stylesPage = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center"
	}
});

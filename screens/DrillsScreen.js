/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Root, Drawer } from "native-base";
/* ========== PROPIOS ================ */
import MainHeader from "../components/MainHeader";
import DrillsComponent from "../components/DrillsComponent";
import ProfileUser from '../components/ProfileUser'

class DrillsScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	render() {
		const { navigation } = this.props;

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

				
				<DrillsComponent 
					navigation= {this.props}
				/>
			

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

export default DrillsScreen;

const stylesPage = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center"
	}
});


/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { createStackNavigator, createBottomTabNavigator } from "react-navigation"; // React
import { Platform, Image, StyleSheet } from "react-native"; // React Native
/* ========== PROPIOS ================ */
import strings from '../../constants/Strings';
// import TabBarIcon from "../../components/TabBarIcon"; // Iconos personalizados

// Stack Screen
import StackBasics from "../../screens/stackScreen/StackBasics";
import StackBody from "../../screens/stackScreen/StackBody";
import StackDrills from "../../screens/stackScreen/StackDrills";
import StackIQ from "../../screens/stackScreen/StackIQ";

// Colores
import Colors from "../../constants/Colors";

// StackBasics
const BasicsStack = createStackNavigator(
	{
		Basics: StackBasics
	},
	{
		defaultNavigationOptions: {
			header: null
		}
	}
);

BasicsStack.navigationOptions = ({ navigation }) => {
	//console.log(props.navigation.state.routes[0].index);
	let tabBarVisible = true;
	if (navigation.state.routes[0].index > 0) {
		tabBarVisible = false;
	}

	return {
		tabBarVisible: tabBarVisible,
		tabBarLabel: strings.ST1,

		tabBarOptions: {
			activeTintColor: Colors.tabBarLabelActive
		},
		tabBarIcon: ({ focused }) => (
			<Image style={stylesPage.tab_icons}
				source={
					focused
						? require("../../assets/images/1BasicsAz.png")
						: require("../../assets/images/1Basics.png")
				}
			/>
			// <TabBarIcon
			// 	focused={focused}
			// 	name={Platform.OS === "ios" ? `ios-play-circle` : "md-play-circle"}
			// />
		)
	};
};

// StackBody
const BodyStack = createStackNavigator(
	{
		Body: StackBody
	},
	{
		defaultNavigationOptions: {
			header: null
		}
	}
);

BodyStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if (navigation.state.routes[0].index > 0) {
		tabBarVisible = false;
	}
	return {
		tabBarVisible: tabBarVisible,
		tabBarLabel: strings.ST2,
		tabBarOptions: {
			activeTintColor: Colors.tabBarLabelActive
		},
		tabBarIcon: ({ focused }) => (
			<Image style={stylesPage.tab_icons}
				source={
					focused
						? require("../../assets/images/1BodyAz.png")
						: require("../../assets/images/1Body.png")
				}
			/>
		)
	};
};

// StackDrils
const DrillsStack = createStackNavigator(
	{
		Drills: StackDrills
	},
	{
		defaultNavigationOptions: {
			header: null
		}
	}
);

DrillsStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if (navigation.state.routes[0].index > 0) {
		tabBarVisible = false;
	}

	return {
		tabBarVisible: tabBarVisible,
		tabBarLabel: strings.ST3,
		tabBarOptions: {
			activeTintColor: Colors.tabBarLabelActive
		},
		tabBarIcon: ({ focused }) => (
			<Image style={stylesPage.tab_icons}
				source={
					focused
						? require("../../assets/images/1DrillsAz.png")
						: require("../../assets/images/1Drills.png")
				}
			/>
		)
	};
};

// StackIQ
const IQStack = createStackNavigator(
	{
		IQ: StackIQ
	},
	{
		defaultNavigationOptions: {
			header: null
		}
	}
);

IQStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if (navigation.state.routes[0].index > 0) {
		tabBarVisible = false;
	}

	return {
		tabBarVisible: tabBarVisible,
		tabBarLabel: strings.ST4,
		tabBarOptions: {
			activeTintColor: Colors.tabBarLabelActive
		},
		tabBarIcon: ({ focused }) => (
			<Image style={stylesPage.tab_icons}
				source={
					focused
						? require("../../assets/images/1IQAz.png")
						: require("../../assets/images/1IQ.png")
				}
			/>
		)
	};
};

export default createBottomTabNavigator({
	BasicsStack,
	BodyStack,
	DrillsStack,
	IQStack
});

// Styles del Componente
const stylesPage = StyleSheet.create({
	tab_icons: {
		width: 25, 
		height: 25
	}
});

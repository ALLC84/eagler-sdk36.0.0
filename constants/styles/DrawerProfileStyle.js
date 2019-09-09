"use strict";

import Colors from "../Colors";
import layout from "../Layout";

const React          = require("react-native");
const { StyleSheet } = React;

const PrimaryColor   = Colors.tintColor;

module.exports = StyleSheet.create({
   container_menu: {
		flex: 1,
		backgroundColor: "#FFF"
	},

	container_image_menu: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFF",
		height: layout.window.height * 0.3,
		marginTop: 30,
		padding: 30
	},

	image_menu: {
		flex: 1, 
		width: 90, 
		height: 90
	},

	item_menu: {
		borderBottomWidth: 0,
		borderBottomColor: "#f7f8f9",
		marginLeft: 0,
		paddingRight: 20,
		paddingLeft: 20
	},

	text_menu: {
		marginTop: 5
	},

	thumbnail_menu: {
		marginRight: 10,
		maxWidth: 40
	},

	icon_menu: {
		fontSize: 20,
		color: "#ddd"
	},
	
	icon_left_menu: {
		fontSize: 24,
		marginRight: 10,
		color: PrimaryColor
	},

	footer_menu: {
		padding: 20,
		paddingBottom: 30,
		alignItems: "center",
		justifyContent: "center",
		alignContent: "center"
	},

	footer_menu_text: {
		color: 'red'
	}
})
"use strict";

import Colors from "../Colors";

const React          = require("react-native");
const { StyleSheet } = React;

const PrimaryColor   = Colors.tintColor;

module.exports = StyleSheet.create({
	button_auth: {
		minWidth: 200,
		backgroundColor: PrimaryColor,
		marginBottom: 8,
		height: 53,
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation: 0,
		shadowOffset: {
			width: 0,
			height: 0
		}
	},
	text_auth: {
		backgroundColor: "transparent",
		textAlign: "center",
		minWidth: 200,
		marginTop: 5,
		color: "#FFF",
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation: 0,
		shadowOffset: {
			width: 0,
			height: 0
		}
	},
})
"use strict";

import Colors from "../Colors";
import layout from "../Layout";

const React          = require("react-native");
const { StyleSheet } = React;

const PrimaryColor   = Colors.tintColor;
const SecondaryColor = Colors.secondaryColor;

module.exports = StyleSheet.create({
	// === GLOBALES ===
	// Background
	background_general: {
		backgroundColor: "#FFF"
	},

	// Links app
	text_link: {
		color: PrimaryColor
	},

	// Padding
	padding_general: {
		padding: 20,
		backgroundColor: "#FFF"
	},
	padding_generalY: {
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: "#FFF"
	},
	padding_generalX: {
		paddingTop: 20,
		paddingBottom: 20,
		backgroundColor: "#FFF"
	},

	// BADGE
	bg_badge_azul: {
		backgroundColor: PrimaryColor
	},
	bg_badge_verde: {
		backgroundColor: SecondaryColor,
		color: PrimaryColor
	},
	color_badge_verde: {
		color: PrimaryColor,
		// paddingHorizontal: 10,
		// paddingVertical: 5
	},

	// START ( LOGIN - REGISTER ) Screen
	logo_start: {
		width: 140,
		height: 140,
		marginTop: 15,
		marginBottom: 20
	},
	button_start: {
		minWidth: 250,
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: PrimaryColor,
		marginBottom: 11,
		height: 53
	},
	
});

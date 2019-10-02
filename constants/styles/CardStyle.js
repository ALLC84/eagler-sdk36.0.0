"use strict";

import Colors from "../Colors";
import window from "../Layout";

const React          = require("react-native");
const { StyleSheet } = React;

const PrimaryColor   = Colors.tintColor;
const SecondaryColor = Colors.secondaryColor;

module.exports = StyleSheet.create({
   card_section: {
		borderRadius: 10
	},
	card_item: {
		borderRadius: 10
   },
   card_item_img: {
		flex: 1,
		height: 200,
		width: null,
		borderRadius: 10
	},
	card_image_cap: {
		flex: 1,
		backgroundColor: 'hsla(360, 100%, 0%, .4)',
		position: 'relative',
		height: 200,
		marginTop: -200,
		borderRadius: 10
	}, // Capa por encima de la imagen => Se utilizara hasta que esten preparadas previamente
	card_item_action_and_text: {
		position: "absolute",
		backgroundColor: "transparent"
	},
	card_title: {
		fontSize: 24,
		color: "#fff"
	},
	card_subtitle: {
		fontSize: 18,
		color: "#fff"
   },
   // Solo tarjetas de IQ
   card_item_buttom: {
      position: "absolute", 
      backgroundColor: "transparent",
      bottom: 0 
   },
   texts_button: {
		color: '#FFF',
		marginLeft: 10,
		marginTop: 5
	}

})
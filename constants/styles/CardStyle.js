"use strict";
import { Platform } from 'react-native'
// console.log(Platform.isPad);// boolean


import Colors from "../Colors";
import window from "../Layout";

const React          = require("react-native");
const { StyleSheet } = React;

const PrimaryColor   = Colors.tintColor;
const SecondaryColor = Colors.secondaryColor;

module.exports = StyleSheet.create({
   card_section: {
		borderRadius: 10,
	},
	card_item: {
		borderRadius: 10
   },
   card_item_img: {
		flex: 1,
		height: !Platform.isPad ? 200 : 400,
		width: null,
		borderRadius: 10,
		backgroundColor: 'hsla(360, 100%, 0%, .2)',
	},
	card_image_cap: {
		flex: 1,
		backgroundColor: 'hsla(360, 100%, 0%, .4)',
		position: 'relative',
		height: !Platform.isPad ? 200 : 400,
		marginTop: !Platform.isPad ? -200 : -400,
		borderRadius: 10,
	}, // Capa por encima de la imagen => Se utilizara hasta que esten preparadas previamente
	card_item_action_and_text: {
		position: "absolute",
		backgroundColor: "transparent",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	card_title: {
		fontSize: !Platform.isPad ? 24 : 32,
		color: "#fff"
	},
	card_subtitle: {
		fontSize: !Platform.isPad ? 18 : 24,
		color: "#fff"
   },
   // Solo tarjetas de IQ
   card_item_buttom: {
      position: "absolute", 
      backgroundColor: "transparent",
      bottom: 0 
   },
   texts_button: {
		fontSize: !Platform.isPad ? 18 : 24,
		color: '#FFF',
		marginLeft: 10,
		marginTop: 5
	}

})
/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { Image, TouchableOpacity, StyleSheet } from "react-native"; // React Native
import { Card, CardItem, Left, Body, Right, } from "native-base"; // Native Base
import { Ionicons } from '@expo/vector-icons'; // Expo
// import moment from "moment"; // Moment
// moment.locale("es");
/* ========== PROPIOS ================ */
import Text from './CustomText'; // Custom Text Styles and Font
import layout from "../constants/Layout"; // Styles
import cardStyles from '../constants/styles/CardStyle' // Styles

class CardBodyComponent extends Component {
	constructor(props) {
		super(props);
	}

	bodyDetailView(body, title) {
		const { navigation } = this.props.navigation;
		navigation.navigate("BodyDetail", { body: body, title: title });
	}

	render() {
		const { img, title, subtitle } = this.props;
		const { navigation } = this.props.navigation;

		// Image.prefetch({ uri: img });
		// { uri: img, cache: "force-cache" }
		return (
			<Card style={cardStyles.card_section}>
				<CardItem style={cardStyles.card_item}
					cardBody
					button onPress={() => this.bodyDetailView(this.props.body, title)}
				>
					<Image style={cardStyles.card_item_img}
						source={{ uri: img }}
						// source={require("../assets/images/publi_ping_play.jpg")}
					/>
				</CardItem>

				{/* Capa por encima de la imagen */}
				<CardItem style={cardStyles.card_image_cap}
					button onPress={() => this.bodyDetailView(this.props.body, title)}
				></CardItem>

				{/* Card Action and Text  */}
				<CardItem style={cardStyles.card_item_action_and_text}>
					<Left>
						<Body>
							<Text type={'semi-bold'} style={cardStyles.card_title}> {title} </Text>
							<Text style={cardStyles.card_subtitle}> {subtitle} </Text>
						</Body>
					</Left>
					<Right>
						<TouchableOpacity
							onPress={() => this.bodyDetailView(this.props.body, title)}
						>
							<Ionicons
								size={40}
								color={"#fff"}
								name={"ios-play-circle"}
							/>
						</TouchableOpacity>
					</Right>
				</CardItem>
			</Card>
		);
	}
}
export default CardBodyComponent;// Styles del Componente
const stylesPage = StyleSheet.create({
	

});



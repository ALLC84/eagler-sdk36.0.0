/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { Image, TouchableOpacity, Platform, StyleSheet } from "react-native"; // React Native
import { Card, CardItem, Left, Body, Right, Spinner, Content } from "native-base"; // Native Base
import { Ionicons } from '@expo/vector-icons'; // Expo
// import moment from "moment";
// moment.locale("es");
/* ========== PROPIOS ================ */
import Text from './CustomText'; // Custom Text Styles and Font
import Colors from '../constants/Colors';
import cardStyles from '../constants/styles/CardStyle' // Styles

class CardDrillComponent extends Component {
	constructor(props) {
		super(props);
		// this.passProps = this.props.router;
		// console.log(props)
	}

	drillDetailView(drill) {
		const { navigation } = this.props.navigation;
		navigation.navigate("DrillDetail", { drill: drill });
	}

	render() {
		const { title, tag, content, img, video } = this.props.drill;
		const { navigation } = this.props.navigation;

		Platform.OS === "ios" ? Image.prefetch({ uri: img }) : null;
		//Image.prefetch({ uri: img });
		return (
			!video
			? // Snipper
			<Card>
				<CardItem cardBody>
					<Content style={stylesPage.snipperContent}>
						<Spinner color={Colors.tintColor}/>
						<Text style={stylesPage.snipperText}> Preparando la clases...</Text>
					</Content>
				</CardItem>
			</Card>
			: // Tarjeta de las secciones 
			<Card style={cardStyles.card_section}>
				{/* Imagen */}
				<CardItem style={cardStyles.card_item}
					cardBody
					button onPress={() => this.drillDetailView(this.props.drill)}
				>
					<Image style={cardStyles.card_item_img}
						source={{ uri: img, cache: "force-cache" }}
					/>
				</CardItem>

				{/* Capa por encima de la imagen */}
				<CardItem style={cardStyles.card_image_cap}
					button onPress={() => this.drillDetailView(this.props.drill)}
					></CardItem>
				
				{/* Card Action and Text  */}
				<CardItem style={cardStyles.card_item_action_and_text}>
					<Left>
						<Body>
							<Text type={'semi-bold'} style={cardStyles.card_title}>
								{title}
							</Text>
							<Text style={cardStyles.card_subtitle}>
								{tag}
							</Text>
						</Body>
					</Left>
					<Right>
						<TouchableOpacity
							onPress={() => this.drillDetailView(this.props.drill)}
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
export default CardDrillComponent;

// Styles
const stylesPage = StyleSheet.create({
	// ====== Snipper =======
	snipperContent: {
		height: 200
	},
	snipperText: {
		color: Colors.tintColor,
		fontSize: 18,
		textAlign: 'center', 
	},
});

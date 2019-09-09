/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { Image, TouchableOpacity, StyleSheet } from "react-native"; // React Native
import { Card, CardItem, Left, Body, Right, Content, Spinner } from "native-base"; // Native Base
import { Ionicons } from '@expo/vector-icons';// Expo
// import moment from "moment"; // Moment 
// moment.locale("es"); // Inicia localidad de moment
/* ========== PROPIOS ================ */
import Text from './CustomText'; // Custom Text Styles and Font
import Colors from '../constants/Colors'; // Styles
import cardStyles from '../constants/styles/CardStyle' // Styles

class CardBasicsComponent extends Component {
	constructor(props) {
		super(props);
	}

	basicsDetailView(body, title) {
		const { navigation } = this.props.navigation;
		navigation.navigate("BasicsDetail", { body: body, title: title });
	}

	render() {
		const { img, title, subtitle } = this.props;
		const { navigation } = this.props.navigation;

		// Image.prefetch({ uri: img });
		// { uri: img, cache: "force-cache" }

		return (
			this.props.body === undefined 
			? // Snipper
			<Card>
				<CardItem cardBody>
					<Content style={stylesPage.snipperContent}>
						<Spinner color={Colors.tintColor}/>
						<Text style={styles.snipperText}> Preparando la clases...</Text>
					</Content>
				</CardItem>
			</Card>
			: // Tarjeta de las secciones 
			<Card style={cardStyles.card_section}>
				{/* Imagen */}
				<CardItem style={cardStyles.card_item}
					cardBody
					button onPress={() => this.basicsDetailView(this.props.body, title)}
				>	
					<Image style={cardStyles.card_item_img}
						source={{ uri: img }}
					/>
				</CardItem>

				{/* Capa por encima de la imagen */}
				<CardItem style={cardStyles.card_image_cap}
					button onPress={() => this.basicsDetailView(this.props.body, title)}
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
							onPress={() => this.basicsDetailView(this.props.body, title)}
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
export default CardBasicsComponent;

// Styles del Componente
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

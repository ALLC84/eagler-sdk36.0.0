/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { Image, TouchableOpacity, StyleSheet } from "react-native"; // React Native
import { Card, CardItem, Left, Body, Right, Text } from "native-base"; // Native Base
import { Ionicons } from '@expo/vector-icons';// Expo
/* ========== PROPIOS ================ */
// import Text from './CustomText'; // Custom Text Styles and Font
import Colors from '../constants/Colors'; // Styles
import cardStyles from '../constants/styles/CardStyle' // Styles

const CardBasicsComponent = props => {
	const { img, title, subtitle } = props;
	const { navigation } = props.navigation;

	const basicsDetailView = (title) => {
		navigation.navigate("BasicsDetail", { title: title });
	}

	// Image.prefetch({ uri: img });
	// { uri: img, cache: "force-cache" }

	return (// Tarjeta de las secciones 
		<Card style={cardStyles.card_section}>
			{/* Imagen */}
			<CardItem style={cardStyles.card_item}
				cardBody
				button onPress={() => basicsDetailView(title)}
			>	
				<Image style={cardStyles.card_item_img}
					source={img}
					// source={{ uri: img }}
				/>
			</CardItem>

			{/* Capa por encima de la imagen */}
			<CardItem style={cardStyles.card_image_cap}
				button onPress={() => basicsDetailView(title)}
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
						onPress={() => basicsDetailView(title)}
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
export default CardBasicsComponent;

// Styles del Componente
const stylesPage = StyleSheet.create({});
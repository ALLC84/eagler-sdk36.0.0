/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { Image, Platform, StyleSheet } from "react-native"; // React Native
import { Card, CardItem, Button, Left, Body, Right, Text } from "native-base"; // Native Base
import { Ionicons } from '@expo/vector-icons';
/* ========== PROPIOS ================ */
// import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import cardStyles from '../constants/styles/CardStyle' // Styles

const CardPostComponent = props => {
	const { post, navigation } = props;
	const { title, tag, img } = post;

	const postDetailView = post => {
		navigation.navigate("PostDetail", { post: post });
	}

	Platform.OS === "ios" ? Image.prefetch({ uri: img }) : null;
	//Image.prefetch({ uri: img });
	return (
		<Card style={cardStyles.card_section}>
			{/* Imagen */}
			<CardItem style={cardStyles.card_item}
				cardBody 
				button onPress={() => postDetailView(post)
			}>
				<Image style={cardStyles.card_item_img}
					source={{ uri: img, cache: "force-cache" }}
				/>
			</CardItem>

		{/* Capa por encima de la imagen */}
			<CardItem style={cardStyles.card_image_cap}
				button 
				onPress={() => postDetailView(post)}
			></CardItem>

			{/* Card Top Text  */}
			<CardItem style={cardStyles.card_item_action_and_text}>
				<Left>
					<Body>
						<Text type={'semi-bold'} style={cardStyles.card_title}> {title} </Text>
						<Text style={cardStyles.card_subtitle}> {tag} </Text>
					</Body>
				</Left>
			</CardItem>

			{/* Card Bottom Text  */}
			<CardItem style={cardStyles.card_item_buttom}>
				<Left>
					<Button transparent>
						<Ionicons
							size={20}
							color={"#FFF"}
							// color={"#240066"}
							name={"ios-thumbs-up"}
						/>
						<Text style={cardStyles.texts_button}>
							12 Likes
						</Text>
					</Button>
				</Left>
				<Right>
					<Button
						transparent
						onPress={() => postDetailView(post)}
					>
						<Text style={cardStyles.texts_button}>
							{Strings.ST39_1}
						</Text>
					</Button>
				</Right>
			</CardItem>
		</Card>
	);
}
export default CardPostComponent;

// Styles del Componente
const stylesPage = StyleSheet.create({


});

/* =========== LIBRERIAS ============= */
import React, {useState} from "react"; // React
import { Image, TouchableOpacity, StyleSheet } from "react-native"; // React Native
import { Card, CardItem, Left, Body, Right, Text, Spinner } from "native-base"; // Native Base
import { Ionicons } from '@expo/vector-icons';// Expo
/* ========== PROPIOS ================ */
// import Text from './CustomText'; // Custom Text Styles and Font
import Colors from '../constants/Colors'; // Styles
import cardStyles from '../constants/styles/CardStyle' // Styles

const CardBasicsComponent = props => {
	const { img, title, subtitle } = props;
	const { navigation } = props.navigation;

	//State
	const [loading, setLoading] = useState(true)

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
					// source={{ uri: img }}
					source={img}
					onLoadEnd={() => setLoading(false)}
				/>

				{loading ? 
					<Spinner color={Colors.tintColor}
						style={{position: 'absolute', left: '45%'}}
					/> 
				: null}
			</CardItem>

			{/* Capa por encima de la imagen */}
			{!loading ?
			<CardItem style={cardStyles.card_image_cap}
				button onPress={() => basicsDetailView(title)}
			></CardItem> : null }

			{/* Card Action and Text  */}
			{!loading ?
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
			</CardItem> : null }
		</Card>
	);
}
export default CardBasicsComponent;

// Styles del Componente
const stylesPage = StyleSheet.create({});
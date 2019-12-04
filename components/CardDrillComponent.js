/* =========== LIBRERIAS ============= */
import React, { useState } from "react"; // React
import { Image, TouchableOpacity, Platform, StyleSheet } from "react-native"; // React Native
import { Card, CardItem, Left, Body, Right, Spinner, Content, Text } from "native-base"; // Native Base
import { Ionicons } from '@expo/vector-icons'; // Expo
/* ========== PROPIOS ================ */
// import Text from './CustomText'; // Custom Text Styles and Font
import Colors from '../constants/Colors';
import cardStyles from '../constants/styles/CardStyle' // Styles

const CardDrillComponent = props => {
	const { drill } = props;
	const { title, tag, img } = drill;
	const { navigation } = props.navigation;

	//State
	const [loading, setLoading] = useState(true)

	const drillDetailView = drill => {
		navigation.navigate("DrillDetail", { drill: drill });
	}

	// Platform.OS === "ios" ? Image.prefetch({ uri: img }) : null;
	//Image.prefetch({ uri: img });
	return (
		<Card style={cardStyles.card_section}>
			{/* Imagen */}
			<CardItem style={cardStyles.card_item}
				cardBody
				button onPress={() => drillDetailView(drill)}
			>
				<Image style={cardStyles.card_item_img}
					source={{ uri: img }}
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
				button onPress={() => drillDetailView(drill)}
			></CardItem> : null }
			
			{/* Card Action and Text  */}
			
			{!loading ? <CardItem style={cardStyles.card_item_action_and_text}>
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
						onPress={() => drillDetailView(drill)}
					>
						<Ionicons
							size={40}
							color={"#fff"}
							name={"ios-play-circle"}
						/>
					</TouchableOpacity>
				</Right>
			</CardItem>  : null}
		</Card>
	);
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

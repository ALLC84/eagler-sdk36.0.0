/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Container, Content, View, Badge, Text } from "native-base"; // Native Base
import { Video } from 'expo-av'; // Expo
/* ========== PROPIOS ================ */
// import Text from '../components/CustomText'; // Custom Text Styles and Font
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import layout from "../constants/Layout"; // Styles
import globalStyles from "../constants/styles/GlobalStyles"; // Styles

const DrillDetailScreen = props => {
	const { navigation } = props;
	// PARAMS
	const { title, tag, content, video } = navigation.getParam("drill", "drill");

	// const getContent = () => {
	// 	content.forEach((content, i) => {
	// 		return <Text key={i}>{content}</Text>;
	// 	});
	// };

	return (
		<>
			{/* Header */}
			<DetailScreenHeader
				navigation={navigation}
				title={title}
				page={'DRILL'}
			/>
			
			{/* Content */}
			<Container>
					{/* // TODO: Agregar boton velocidad video (rate) */}
					<View>
						<Video style={stylesPage.video_avtive}
							source={{
								uri: video
							}}
							rate={1.0}
							volume={1.0}
							isMuted={false}
							resizeMode="cover"
							shouldPlay
							isLooping
							useNativeControls={true}
						/>
					</View>
				<Content padder>
					<View >
						<Badge
							style={[{ marginBottom: 20 }, globalStyles.bg_badge_verde]}
						>
							<Text style={[globalStyles.color_badge_verde]}>
								{tag}
							</Text>
						</Badge>

						<Text style={stylesPage.title_view}>
							{title}
						</Text>

						{content.map((content, i) => (
							<Text key={i}>
								{content}
								{"\n"}
							</Text>
						))}
					</View>
				</Content>
			</Container>
		</>
	);
	
}
export default DrillDetailScreen;


// Styles
const stylesPage = StyleSheet.create({
	// Video 
	video_avtive: {
		width: layout.window.width,
		height: layout.window.height / 3
	},
	title_view: {
		fontSize: 18,
		marginBottom: 10,
		fontWeight: "600"
	}
});

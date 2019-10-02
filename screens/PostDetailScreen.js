/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { Image, StyleSheet } from "react-native"; // React Native
import { Container, Content, View, Badge, Text } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
// import Text from '../components/CustomText';
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import globalStyles from "../constants/styles/GlobalStyles"; // Styles

const PostDetailScreen = props => {
	const { navigation } = props;
	// PARAMS
	const { title, tag, content, img, date } = navigation.getParam("post","post");

	// const getContent = () => {
	// 	content.forEach((content, i) => {
	// 		return <Text key={i}>{content}</Text>;
	// 	});
	// };

	return (
		<>
			{/* Header Page */}
			<DetailScreenHeader 
				navigation={navigation}
				title={title}
				page={'IQ'}
			/>
			
			{/* Content Page */}
			<Container>
				<Content>
					<Image style={stylesPage.image}
						source={{ uri: img, cache: "force-cache" }}
					/>

					<View style={stylesPage.content_view}>
						<Badge
							style={[globalStyles.bg_badge_verde, { marginBottom: 20, marginTop: 10}]}
						>
							<Text style={globalStyles.color_badge_verde}>{tag}</Text>
						</Badge>

						<Text type={'semi-bold'} style={stylesPage.title_view}>
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
export default PostDetailScreen;


// Styles
const stylesPage = StyleSheet.create({
	// Video 
	image: {
		height: 300,
		width: null, 
		flex: 1
	},
	content_view: {
		padding: 10
	},
	title_view: {
		fontSize: 18,
		marginBottom: 10,
	},
});

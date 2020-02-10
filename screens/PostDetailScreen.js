/* =========== LIBRERIAS ============= */
import React, {useEffect, useState} from "react"; // React
import { Image, StyleSheet, Platform, Animated, ScrollView } from "react-native"; // React Native

import { View, Badge, Text } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import globalStyles from "../constants/styles/GlobalStyles"; // Styles



// Prueba DATA
//import post from '../dataExample/post'

const PostDetailScreen = props => {
	// const { title, tag, content, img } = post;
	
	const { navigation } = props;
	// PARAMS
	const { title, tag, content, img } = navigation.getParam("post","post");
	// STATE
	const[ topScroll, setTopScroll] = useState(0)
	const [fadeAnim] = useState(new Animated.Value(0))
	const [scrollY] = useState(new Animated.Value(0))
   
	const [changingHeight, setChangingHeight] = useState(300)
	useEffect(() => {
		Animated.timing(
			fadeAnim,
			{
				toValue: 1,
				duration: 700
			}
		).start();
	},[])

	useEffect(() => {
		setChangingHeight(scrollY.interpolate({
            inputRange: [0, 500],
            outputRange: [300, 100],
            extrapolate: "clamp"
        }));
	},[topScroll])

	// IMAGE
	const showAnimatedImage = img => 
		<Animated.View style={{
			opacity: fadeAnim,
			height: changingHeight
		}}>
			<Image style={{height: changingHeight}, stylesPage.image}
				source={{ uri: img, cache: "force-cache" }}
			/>
		</Animated.View>

	// TAG
	const showBadge = tag =>
		<Badge
			style={[globalStyles.bg_badge_verde, { marginBottom: 20, marginTop: 10}]}
		>
			<Text style={globalStyles.color_badge_verde}>{tag}</Text>
		</Badge>

	// TITLE
	const showTitle = title =>
		<Text type={'semi-bold'} style={stylesPage.title}>
			{title}
		</Text>


	// CONTENT
	const showContent = (content) => 
		content.map((content, i) => (
			<Text key={i} style={stylesPage.text_content}>
				{content}
				{"\n"}
			</Text>
		));

	// HANDLE SCROLL Y
	const handleScroll = (event) => {
		setTopScroll(Math.round(event.nativeEvent.contentOffset.y))
	   }


	return (
		<>
			{/* Header Page */}
			<DetailScreenHeader 
				navigation={navigation}
				title={title}
				page={'IQ'}
			/>
			
			{/* Content Page */}
			<ScrollView style={stylesPage.containerView}
				scrollEventThrottle={16}
				onScroll = {Animated.event([
					{
						nativeEvent: {
							contentOffset: {
								y: scrollY
							}
						}
					}
				]/*,{listener: event => handleScroll(event)}*/)}
			>
				{showAnimatedImage(img)}

				<View style={stylesPage.content}>
					
					{showBadge(tag)}

					{showTitle(title)}

					{showContent(content)}

				</View>
			</ScrollView>
		</>
	);
	
}
export default PostDetailScreen;


// Styles
const stylesPage = StyleSheet.create({
	//ScrollView
	containerView: {
		flex: 1,
	},
	// Image
	image: {
		// height: !Platform.isPad ? 300 : 450,
		width: null, 
		flex: 1
	},
	content: {
		padding: 10,
		paddingBottom: 40
	},
	text_content: {
		fontSize: !Platform.isPad ? 14 : 18
	},
	title: {
		fontSize: !Platform.isPad ? 18 : 24,
		marginBottom: 10,
	},
});

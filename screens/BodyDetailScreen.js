/* =========== LIBRERIAS ============= */
import React, {useState} from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Container, Content, Button, Left, Body, Right, View, List, ListItem, Thumbnail } from "native-base"; // Native Base
import { Video } from 'expo-av'; // Expo
import { Ionicons } from '@expo/vector-icons';
/* ========== PROPIOS ================ */
import Text from '../components/CustomText';
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import layout from "../constants/Layout"; // Styles


const BodyDetailScreen = props => {
	const { navigation } = props;
	// PARAMS
	const params = navigation.getParam("body", "body");
	const title = navigation.getParam("title", "title");
	// STATE
	const [contVideo, setContVideo] = useState(0);

	// Obtiene los (PARAMS => proveniente de Body Component)
	// Los guarda en la variable videos listos para utilizar 
	let videos = [];
	(getVideos = () => {
		params.map((e, i) => {
			//console.log(e);
			for (let i in e) {
				//console.log(e[i].video);
				videos.push(e[i]);
			}
		});
	})();

	// Crea la vista del current video 
	const mostrarVideo = e => {
		//console.log(e);
		return (
			<>
				<Video style={stylesPage.video_avtive}
					usePoster={true}
					posterSource={{ uri: e.img }}
					shouldPlay
					source={{
						uri: e.video
					}}
					key={Math.random()}
					rate={1.0}
					volume={0}
					isMuted={true}
					resizeMode="contain"
					isLooping
					useNativeControls={true}
				/>
			</>
		);
	};

	const nextVideo = i => {
		setContVideo(i)
	};

	return (
		<>
			{/* Header Page */}
			<DetailScreenHeader 
				navigation={navigation}
				title={title}
				page={'BODY'}
			/>
			
			{/* Content Page */}
			<Container>
				{/* // TODO: Agregar boton velocidad video (rate) */}
				<View>
					<>
						{videos
							? mostrarVideo(videos[contVideo])
							: null}
					</>
				</View>
				<Content>
					<List style={stylesPage.list_videos}>
						{videos.map((video, i) => (
							<ListItem thumbnail key={i}>
								<Left>
									{video.img && video.img !== '' ? (
										<Thumbnail
											square
											source={{ uri: video.img }}
										/>
									) : (
										<Thumbnail
											square
											source={require("../assets/images/1Basics.png")}
										/>
									)}
								</Left>
								<Body>
									<Text>{video.title}</Text>
									<Text note numberOfLines={1}>
										Incluiremos descripción...
									</Text>
								</Body>
								<Right>
									<Button transparent onPress={() => nextVideo(i)}>
										<Ionicons
											name="ios-play-circle"
											size={26}
											color={"#240066"}
										/>
									</Button>
								</Right>
							</ListItem>
						))}
					</List>
				</Content>
			</Container>
		</>
	);
}
export default BodyDetailScreen;

// Styles
const stylesPage = StyleSheet.create({
	// Video 
	video_avtive: {
		width: layout.window.width,
		height: layout.window.height / 3
	},
	list_videos: {
		marginTop: 10
	}
});

// (controlarVideos = e => {
// 	setInterval(() => {
// 		nextVideo();
// 	}, 10000);
// })();




// const nextVideo = (i) => {
// 	if (this.state.contVideo < videos.length - 1) {
// 		this.setState(
// 			{
// 				contVideo: this.state.contVideo + 1
// 			},
// 			() => console.log(this.state.contVideo + 1, videos.length)
// 		);
// 	}
// };
/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Container, Content, Button, Left, Body, Right, View, List, ListItem, Thumbnail } from "native-base"; // Native Base
import { Audio, Video} from "expo"; // Expo
import { Ionicons } from '@expo/vector-icons';
/* ========== PROPIOS ================ */
import Text from '../components/CustomText';
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import layout from "../constants/Layout"; // Styles


class BodyDetailScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			contVideo: 0,
			title: ""
		};
	}

	render() {
		const params = this.props.navigation.getParam("body", "body");
		const title = this.props.navigation.getParam("title", "title");
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
			this.setState({
				contVideo: i
			});
		};

		const backVideo = () => {
			if (this.state.contVideo > 0) {
				this.setState(
					{
						contVideo: this.state.contVideo - 1
					},
					() => console.log(this.state.contVideo + 1, videos.length)
				);
			}
		};

		return (
			<>
				{/* Header Page */}
				<DetailScreenHeader 
					navigation={this.props.navigation}
					title={title}
					page={'BODY'}
				/>
				
				{/* Content Page */}
				<Container>
					{/* // TODO: Agregar boton velocidad video (rate) */}
					<View>
						<>
							{videos
								? mostrarVideo(videos[this.state.contVideo])
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
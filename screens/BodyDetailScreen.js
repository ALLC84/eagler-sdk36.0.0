/* =========== LIBRERIAS ============= */
import React, {useState, useEffect} from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Container, Content, Button, Left, Body, Right, View, List, ListItem, Thumbnail, Spinner, Text } from "native-base"; // Native Base
import { Video } from 'expo-av'; // Expo
import { Ionicons } from '@expo/vector-icons';
/* ========== REDUX ================== */
import { useDispatch, useSelector  } from 'react-redux' // React-Redux
import { actionGetSeccionBase } from '../store/actions/bodyAction'; // Actions
/* ========== PROPIOS ================ */
import Strings from '../constants/Strings'; // Strings
// import Text from '../components/CustomText';
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import layout from "../constants/Layout"; // Styles
import Colors from '../constants/Colors' // Styles

// Una referencia de las secciones de clase que hay en la base de datos
const sessionMovements = ["session1", "session2"];
const sessionWorkouts = ["session1"];
const sessionWarmups = ["session1", "session2"];

//========== RANDOM
const getRadnom = ref => {
	random = 0;
	switch (ref) {
		case "movements":
			return (random = Math.floor(
				Math.random() * sessionMovements.length
			));
		case "workouts":
			return (random = Math.floor(
				Math.random() * sessionWorkouts.length
			));
		case "warmups":
			return (random = Math.floor(Math.random() * sessionWarmups.length));
		default:
			return random;
	}
};


const BodyDetailScreen = props => {
	const { navigation } = props;
	// PARAMS
	const title = navigation.getParam("title", "title");
	// STATE
	const [contVideo, setContVideo] = useState(0);
	// REDUX
	const { claseBase }= useSelector(state => state.body)
	// Dispatchs
	const dispatch = useDispatch()
	const getClaseBase = (movements, workouts, warmups) => dispatch(actionGetSeccionBase(movements, workouts, warmups))
	
	useEffect(() => {
		switch (title) {
			case 'All':
				getClaseBase(
					'1',
					'1',
					'1'
				)
				// getClaseBase(
				// 	sessionMovements[getRadnom("movements")],
				// 	sessionWorkouts[getRadnom("workouts")],
				// 	sessionWarmups[getRadnom("warmups")]
				// )
				break;
			default:
				getClaseBase(
					'1',
					'1',
					'1'
				)
				// getClaseBase(
				// 	sessionMovements[getRadnom("movements")],
				// 	sessionWorkouts[getRadnom("workouts")],
				// 	sessionWarmups[getRadnom("warmups")]
				// )
				break;
		}
	}, [])

	
	let videos = [];
	(getVideos = () => {
		claseBase.map((e, i) => {
			videos.push(e.fields);
		});
	})();
	
	// Crea la vista del current video 
	const mostrarVideo = e => {
		return (
			<>
				<Video style={stylesPage.video_avtive}
					// usePoster={true}
					// posterSource={{ uri: e.img }}
					shouldPlay
					source={{
						uri: e.video.stringValue
					}}
					key={Math.random()}
					rate={1.0}
					volume={0}
					isMuted={true}
					resizeMode="cover"
					isLooping
					useNativeControls={true}
				/>
			</>
		);
	};

	// Crea lista de reproduccion de videos
	const mostrarListaVideos = videos => {
		return (
			<List style={stylesPage.list_videos}>
			{videos.map((video, i) => (
				<ListItem thumbnail key={i} onPress = {() => nextVideo(i)}>
					<Left>
						{video.img && video.img.stringValue !== '' ? (
							<Thumbnail
								square
								source={{ uri: video.img.stringValue }}
							/>
						) : (
							<Thumbnail
								square
								source={require("../assets/images/1Basics.png")}
							/>
						)}
					</Left>
					<Body>
						<Text>{video.title ? video.title.stringValue : 'Titulo del video'}</Text>
						<Text note numberOfLines={1}>
							Duración: {video.duration.integerValue} mts
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
		)
	}

	const nextVideo = i => {
		setContVideo(i)
	};

	return (
		<>
			{/* ==================== HEADER PAGE =================*/}
			<DetailScreenHeader 
				navigation={navigation}
				title={title}
				page={'BODY'}
			/>
			

			{/* ==================== CONTENT PAGE =================*/}
			{videos.length > 0 
			?
			<Container>
				<View>
					{mostrarVideo(videos[contVideo])} 
				</View>

				<Content>
					{mostrarListaVideos(videos)}
				</Content>
			</Container>
			:
			<>
				<Spinner color={Colors.tintColor}/>
				<Text style={stylesPage.snipperText}>
						{Strings.ST33_1}
				</Text>
			</>}
		</>
	);
}
export default BodyDetailScreen;

// Styles
const stylesPage = StyleSheet.create({
	snipperText: {
		textAlign: 'center', 
		color: Colors.tintColor
	},
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

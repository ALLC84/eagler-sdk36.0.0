/* =========== LIBRERIAS ============= */
import React, {useState, useEffect, useRef} from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Container, Content, Button, Left, Body, Right, View, List, ListItem, Thumbnail, Spinner, Text } from "native-base"; // Native Base
import { Video } from 'expo-av'; // Expo
import { Ionicons } from '@expo/vector-icons';
import { Root } from 'popup-ui'
/* ========== REDUX ================== */
import { useDispatch, useSelector  } from 'react-redux' // React-Redux
import { 
	actionGetSeccionBase,
	actionGuardarWarmupsStore,
	actionGuardarWorkoutsStore,
	actionGuardarMovementsStore
} from '../store/actions/bodyAction'; // Actions
/* ========== PROPIOS ================ */
import Strings from '../constants/Strings'; // Strings
// import Text from '../components/CustomText';
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import layout from "../constants/Layout"; // Styles
import Colors from '../constants/Colors' // Styles
import CounterBody from '../components/CounterBody'; // Contador tiempo ejercicios

// Una referencia de las secciones de clase que hay en la base de datos
const sessionWarmups = [1, 2, 3, 4];
const sessionWorkouts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sessionMovements = [1, 2, 3, 4];

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
	// REDUX
	const { warmups, workouts, movements }= useSelector(state => state.body)
	// Dispatchs
	const dispatch = useDispatch()
	const getClaseBase = (movements, workouts, warmups) => dispatch(actionGetSeccionBase(movements, workouts, warmups))
	const clearWarmups = () => dispatch(actionGuardarWarmupsStore([]))
	const clearWorkouts = () => dispatch(actionGuardarWorkoutsStore([]))
	const clearMovements = () => dispatch(actionGuardarMovementsStore([]))
	// STATE
	const [currentSection, setCurrentSection] = useState([]);
	const [currentVideo, setCurrentVideo] = useState('')
	const [contVideo, setContVideo] = useState(0);
	//CHILD REF
	const contadorRef = useRef();
	
	useEffect(() => {
		switch (title) {
			case 'All':
				getClaseBase(
					sessionMovements[getRadnom("movements")],
					sessionWorkouts[getRadnom("workouts")],
					sessionWarmups[getRadnom("warmups")]
				)
				break;
			default:
				getClaseBase(
					'1',
					'1',
					'1'
				)
				break;
		}

		return () => {
			clearWarmups();
			clearWorkouts();
			clearMovements();
		}
	}, [])

	useEffect(() => {
		if (warmups.length != 0){
			setCurrentSection(warmups)
			setCurrentVideo(warmups[0].fields.video.stringValue)
		}
	}, [warmups])

	// Crea la vista del current video 
	const mostrarVideo = (section, i) => {
		return (
			<>
				<Video style={stylesPage.video_avtive}
					// usePoster={true}
					// posterSource={{ uri: section[i].fields.img.stringValue }}
					shouldPlay
					source={{
						uri: section.length != 0 ? section[i].fields.video.stringValue : ''
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
	const mostrarListaVideos = (section, videos) => {
		return (
			<List>
				<ListItem itemDivider first style={stylesPage.headerSection}>
					<Text>{section}</Text>
            </ListItem>
			{videos.map((video, i) => (
				<CounterBody  ref={contadorRef}
					currentVideo = {currentVideo}
					videos = {videos}
					video = {video}
					index = {i}
					key= {i}
					start = {false} 
					duracao = {1}
					secons = {video.fields.duration.integerValue ? parseInt(video.fields.duration.integerValue) : parseInt(video.fields.duration.stringValue)}
					nextVideo = {nextVideo}
				/>
			))}
			</List>
		)
	}

	const nextVideo = async (section, i) => {
		await setCurrentSection(section)
		await setCurrentVideo(section.length != 0 ? section[i].fields.video.stringValue: '')
		setContVideo(i)
	};

	return (
		<Root>
			{/* ==================== HEADER PAGE =================*/}
			<DetailScreenHeader 
				navigation={navigation}
				title={title}
				page={'BODY'}
			/>
			

			{/* ==================== CONTENT PAGE =================*/}
			{warmups.length > 0 && workouts.length > 0 && movements.length > 0
			?
			<Container>
				<View>
					{/* {mostrarVideo(videos[contVideo])} */}
					{mostrarVideo( currentSection, contVideo )}
				</View>

				<Content>
					{mostrarListaVideos('CALENTAMIENTO', warmups)}
					{mostrarListaVideos('EJERCICIOS', workouts)}
					{mostrarListaVideos('ESTIRAMIENTOS', movements)}
				</Content>
			</Container>
			:
			<>
				<Spinner color={Colors.tintColor}/>
				<Text style={stylesPage.snipperText}>
						{Strings.ST33_1}
				</Text>
			</>}
		</Root>
	);
}
export default BodyDetailScreen;

// Styles
const stylesPage = StyleSheet.create({
	snipperText: {
		textAlign: 'center', 
		color: Colors.tintColor
	},
	// Video Active
	video_avtive: {
		width: layout.window.width,
		height: layout.window.height / 3
	},
	// Header Section List
	headerSection: {
		color: Colors.tintColor,
		backgroundColor: Colors.secondaryColor,
		fontWeight: 'bold'
	},
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

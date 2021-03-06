/* =========== LIBRERIAS ============= */
import React, {useState, useEffect, useRef} from "react"; // React
import { StyleSheet, Platform } from "react-native"; // React Native
import { Container, Content, Button, Left, Body, Right, View, List, ListItem, Thumbnail, Spinner, Text } from "native-base"; // Native Base
import { Video } from 'expo-av'; // Expo
import { Ionicons } from '@expo/vector-icons';
import { Root, Popup } from 'popup-ui'
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
	const [isPrimerEjercicio, setIsPrimerEjercicio] = useState(false);
	const [currentSection, setCurrentSection] = useState([]);
	const [currentSectionTitle, setCurrentSectionTitle] = useState('CALENTAMIENTO');
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

	useEffect(() => {
		if (currentSectionTitle === 'EJERCICIOS' && contVideo >= 0 && !isPrimerEjercicio){
			setIsPrimerEjercicio(true)
			mostrarPopupInicioEjercicios()
		}
	}, [currentSectionTitle, contVideo])

	// Muestra PopUp al finalizar la clase
	const arrayInfo = [
		info = [
			{stringValue: 'Has terminado la clase Body!'},
			{stringValue: 'Se sumaran los puntos adquiridos a la diferentes habilidades'},
			{stringValue: 'Te esperamos para la siguiente clase'},
		],
		info = [
			{stringValue: 'Eres un animal salvaje del Body!'},
			{stringValue: 'Tiger se te queda pequeño'},
			{stringValue: 'Sique adelante!'},
		],
	]
	const mostrarPopupFinClase = (info) => {
		// console.log(Math.floor(Math.random() * arrayInfo.length))
		const title = 'Felicitaciones!'
		Popup.show({
			type: 'Eagler',
			title: title,
			button: false,
			textBody: info,
			buttontext: 'Ok',
			callback: () => {
				Popup.hide()
				navigation.goBack()
			}
		})
	}
	const mostrarPopupInicioEjercicios = (info) => {
		Popup.show({
			type: 'Eagler',
			title: 'Ejercicios Físicos',
			button: false,
			textBody: 'Estas listo para empezar?',
			buttontext: 'Ok',
			callback: () => {
				Popup.hide()
			}
		})
	}

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
						titleSection = {section}
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

	const nextVideo = async (titleSection, section, i) => {
		setCurrentSectionTitle(titleSection)
		await setCurrentSection(section)
		await setCurrentVideo(section.length != 0 ? section[i].fields.video.stringValue : '')
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
					{mostrarVideo( currentSection, contVideo )}
				</View>

				<Content>
					{mostrarListaVideos('CALENTAMIENTO', warmups)}
					{mostrarListaVideos('EJERCICIOS', workouts)}
					{mostrarListaVideos('ESTIRAMIENTOS', movements)}

					<Button style={stylesPage.button_form}
						block
						onPress={() => mostrarPopupFinClase(arrayInfo[Math.floor(Math.random() * arrayInfo.length)])}>
						<Text>Finalizar</Text>
					</Button>
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
		height: !Platform.isPad ? layout.window.height / 3 : layout.window.height / 2
	},
	// Header Section List
	headerSection: {
		color: Colors.tintColor,
		backgroundColor: Colors.secondaryColor,
		fontWeight: 'bold'
	},
	button_form: {
		margin: 20,
		marginTop: 50,
		backgroundColor: "#240066"

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

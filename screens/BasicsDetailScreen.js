/* =========== LIBRERIAS ============= */
import React, { useEffect, useState, useRef } from "react"; // React
import { StyleSheet, Modal } from "react-native"; // React-native
import { Content, Button, Left, Body, Right, View, List, ListItem, Thumbnail, Spinner, Text, Fab, Icon } from "native-base"; // Native Base
import { Video } from 'expo-av'; // Expo
import { Ionicons } from '@expo/vector-icons';
// import { StyleSheet, TouchableOpacity } from "react-native";
import { Root, Popup } from 'popup-ui'
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux'; // React-Redux
import { 
	actionGetClaseCombinada, 
	actionGetClaseSeccionMedia,
	actionGetClaseSeccionCorta 
} from '../store/actions/basicAction';
/* ========== PROPIOS ================ */
// import Text from '../components/CustomText';
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import CounterClass from '../components/CounterClass'; // Contador tiempo clase
import ModalTiempoClase from "../components/ModalTiempoClase"; // Modal
import Strings from '../constants/Strings'; // Strings
import layout from "../constants/Layout"; // Styles
import Colors from '../constants/Colors'; // Styles


const  BasicsDetailScreen = props => {
	const { navigation } = props;
	// PARAMS
	const title = navigation.getParam("title", "title");
	// STATE
	const [ videos, setVideos ] = useState([])
	const [ currentVideo, setCurrentVideo] = useState('')
	const [ contVideo, setContVideo ] = useState(0)
	const [ visibleModalTiempo, setVisibleModalTiempo ] = useState(true);
	const [ tiempoClase, setTiempoClase ] = useState(0)
	const [ tiempoEjercicio, setTiempoEjercicio ] = useState(0)
	// const [ unoMas, setUnoMas ] = useState(false)
	// REDUX
	const { claseCombinada, claseSeccionMedia, claseSeccionCorta, fases }= useSelector(state => state.basic)
	// Dispatchs
	const dispatch = useDispatch()
	const getClaseCombinada = (fases) => dispatch(actionGetClaseCombinada(fases))
	const getClaseSeccionMedia = (fases) => dispatch(actionGetClaseSeccionMedia(fases))
	const getClaseSeccionCorta = (fases) => dispatch(actionGetClaseSeccionCorta(fases))
	//CHILD REF
	const contadorRef = useRef();
	

	/** Funcion que utilizo para verificar los campor y mostrar en consola */
	// const logVideos = (videos) => {
	// 	videos.map( video => {
	// 		console.log('TCL: ------------------')
	// 		console.log('TCL: videos', video.info.arrayValue.values)
	// 		console.log('TCL: ------------------')
	// 	})
	// }
	// useEffect(( ) => {
	// 	logVideos(videos)
	// }, [videos])

	//Bbtiene las clases de Golf
	useEffect(() => {
		if(fases && !visibleModalTiempo) {
			switch (title) {
				case 'Combinada':
					getClaseCombinada(fases)
					break;
				case 'Media':
					getClaseSeccionMedia(fases)
					break;
				case 'Corta':
					getClaseSeccionCorta(fases)
					break;
				default:
					getClaseCombinada(fases)
					break;
			}
		}
	}, [fases])

	//Cuando llegan los datos de los ejercicios guardamos los videos en una videos
	useEffect(() => {
		switch (title) {
			case 'Combinada':
				if(claseCombinada.length > 0){
					let videos = [];
					claseCombinada.map((e, i) => {
						videos.push(e.fields);
					});
					setVideos(videos)
					setCurrentVideo(videos[0].video.stringValue)
				}
				break
			case 'Media':
				if(claseSeccionMedia.length > 0){
					let videos = [];
					claseSeccionMedia.map((e, i) => {
						videos.push(e.fields);
					});
					setVideos(videos)
					setCurrentVideo(videos[0].video.stringValue)
				}
				break
			case 'Corta':
				if(claseSeccionCorta.length > 0){
					let videos = [];
					claseSeccionCorta.map((e, i) => {
						videos.push(e.fields);
					});
					setVideos(videos)
					setCurrentVideo(videos[0].video.stringValue)
				}
				break
			}

	},[claseCombinada, claseSeccionMedia, claseSeccionCorta])

	// Muestra PopUp al finalizar la clase
	const arrayInfo = [
		info = [
			{stringValue: 'Has terminado la clase!'},
			{stringValue: 'Se sumaran los puntos adquiridos a la diferentes habilidades'},
			{stringValue: 'Te esperamos para la siguiente clase'},
		],
		info = [
			{stringValue: 'Eres un animal!'},
			{stringValue: 'Tiger se te queda pequeño'},
			{stringValue: 'Sique adelante!'},
		],
	]
	const mostrarPopupFinClase = (info) => {
		console.log(Math.floor(Math.random() * arrayInfo.length))
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

	// Crea la vista del current video 
	const mostrarVideo = e => {
		return (
			<View>
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
			</View>
		);
	}

	// Crea barra con el contador y botones ( <    30:59    > )
	const mostrarSeparadorBar = () => {
		return (
			<View style={stylesPage.action_bar}>
				<Text style={{textTransform: "uppercase"}}>Sección técnica {title}</Text>
			</View>
		)
	}


	// Crea lista de reproduccion de videos
	const mostrarListaVideos = videos => {
		return (
			<List style={stylesPage.list_videos}>
			{videos.map((video, i) => (
				<CounterClass  ref={contadorRef}
					currentVideo = {currentVideo}
					videos = {videos}
					video = {video}
					index = {i}
					key= {i}
					start = {false} 
					duracao = {calculaTiempoEjercicios(title, tiempoClase, i)}
					nextVideo = {nextVideo}
			/>
			))}
			</List>
		)
	}

	// Crea tiempo de clase y cierra el modal
	const crearTiempoClase = tiempoClase => {
		setTiempoClase(tiempoClase);
		setVisibleModalTiempo(false);
		setTiempoEjercicio(calculaTiempoEjercicios(tiempoClase, 0));
		// setCounterVisible(true);
	};

	const calculaTiempoEjercicios = (abilidad, tiempo, i) => {
		switch (abilidad) {
			case 'Combinada': 
			switch (i) {
				case 0: return Math.floor(parseInt(tiempo * .15));
				case 1: return Math.floor(parseInt(tiempo * .15));
				case 2: return Math.floor(parseInt(tiempo * .10));
				case 3: return Math.floor(parseInt(tiempo * .10));
				case 4: return Math.floor(parseInt(tiempo * .25));
				case 5: return Math.floor(parseInt(tiempo * .25));
				default:
					break;
			}
			case 'Media': 
			switch (i) {
				case 0: return Math.floor(parseInt(tiempo * .25));
				case 1: return Math.floor(parseInt(tiempo * .25));
				case 2: return Math.floor(parseInt(tiempo * .30));
				case 3: return Math.floor(parseInt(tiempo * .20));
				default:
					break;
			}
			case 'Corta': 
			switch (i) {
				case 0: return Math.floor(parseInt(tiempo * .50));
				case 1: return Math.floor(parseInt(tiempo * .25));
				case 2: return Math.floor(parseInt(tiempo * .25));
				default:
					break;
			}
			default: break;
		}
	}

	const nextVideo = async  i => {
		if(contVideo !== i) {
			await setContVideo(i)
			setCurrentVideo(videos[i].video.stringValue)
		}
	}

	// ================== RETURN - RENDER ================== 
	if (visibleModalTiempo) {
		// Muestra modal donde obtenemos el tiempo de clase
		return <ModalTiempoClase 
			crearTiempoClase={crearTiempoClase}
			navigation={navigation}
		/>;
	} else {
		return (
			<Root>
				{/* Header Page */}
				<DetailScreenHeader 
					navigation={navigation}
					title={title}
				/>
				{
				tiempoClase > 0 && videos.length > 0 ?
				<>
					{/* ================== CURRENT VIDEO ================== */}
					{mostrarVideo(videos[contVideo])}
					
					{/* ================== BARRA SEPARADOR TITLE ================== */}
					{mostrarSeparadorBar()}

					{/* ==================== LISTADO VIDEOS ================= */}
					<Content> 
						{videos.length > 0 ? mostrarListaVideos(videos) : null}

						<Button style={stylesPage.button_form}
							block
							onPress={() => mostrarPopupFinClase(arrayInfo[Math.floor(Math.random() * arrayInfo.length)])}>
							<Text>Finalizar</Text>
						</Button>
					</Content>
				</>
				:
				<Content style={stylesPage.snipperContent}>
					<Spinner color={Colors.tintColor}/>
					<Text style={stylesPage.snipperText}> Preparando la clases...</Text>
				</Content>
				}
			</Root>
		)
	}
}
export default BasicsDetailScreen;

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
	// Video 
	video_avtive: {
		width: layout.window.width,
		height: layout.window.height / 3
	},
	action_bar: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		backgroundColor: Colors.secondaryColor,
		color: Colors.tintColor,

	},
	list_videos: {
		marginTop: 10
	},
	button_form: {
		margin: 20,
		marginTop: 50,
		backgroundColor: "#240066"

	},

});

// Cambia al siguiende video cuando (unoMas) es true
//--------------------------------------------------
// useEffect(() => {
// 	if(unoMas) {
// 		changeVideo( (contVideo + 1) , 'mas')
// 	}
// }, [unoMas])


// Se utiliza para next y back del listado de videos
//--------------------------------------------------
// const changeVideo = (i, pasarVideo) => {
// 	if(contVideo === 0 && pasarVideo === 'menos' )return;
// 	if(contVideo == videos.length - 1 && pasarVideo === 'mas') return;
// 	if(unoMas){
// 		setUnoMas(false)
// 	}
// 	setContVideo(i)
// 	contadorRef.current.nextVideo(calculaTiempoEjercicios(tiempoClase,i))
// };


/* <Button small transparent
					onPress={() => changeVideo(parseInt(contVideo) - 1, 'menos')}
				>
					<Ionicons
						name="ios-arrow-back"
						size={20}
						color={"#240066"}
					/>
				</Button> */


/* <Button small transparent
					onPress={() => changeVideo(parseInt(contVideo) + 1, 'mas')}
				>
					<Ionicons
						name="ios-arrow-forward"
						size={20}
						color={"#240066"}
					/>
				</Button> */



// ===== ITEMS LIST VIDEOS ==========

				// <ListItem thumbnail key={i} onPress = {() => nextVideo(i)}>
				// 	<Left>
				// 		{video.img && video.img.stringValue !== '' && video.img.stringValue !== 'img' ? (
				// 			<Thumbnail
				// 				square
				// 				source={{ uri: video.img.stringValue }}
				// 				style={{borderRadius: 5}}
				// 			/>
				// 		) : (
				// 			<Thumbnail
				// 				square
				// 				source={require("../assets/images/no_image.png")}
				// 				style={{borderRadius: 5}}
				// 			/>
				// 		)}
				// 	</Left>
				// 	<Body>
				// 		{/* <Text>Titulo del video</Text> */}
				// 		<Text>{video.category && video.tag ? `${video.category.stringValue} | ${video.tag.stringValue}` : 'Categoria'}</Text>
				// 		<Text style={{fontWeight: video.video && video.video.stringValue == videos[contVideo].video.stringValue ? 'bold' : 'normal'}}>{video.title ? video.title.stringValue : 'Titulo del video'}</Text>
						
				// 		<Text note numberOfLines={1}>
				// 			{Strings.ST22} {calculaTiempoEjercicios(title, tiempoClase, i)} minutos
				// 		</Text>
				// 	</Body>
				// 	<Right>
				// 		<Button
				// 			transparent
				// 			onPress={() => {
				// 				if(video.video.stringValue == videos[contVideo].video.stringValue){
				// 					const title = video.title ? video.title.stringValue : 'Titulo del video'
				// 					const info = video.info ? video.info.arrayValue.values : 'Proximamente información sobre el ejercicio'
				// 					Popup.show({
				// 						type: 'Eagler',
				// 						title: title,
				// 						button: false,
				// 						textBody: info,
				// 						callback: () => Popup.hide()
				// 					})
				// 				}
				// 			}}
				// 		>
				// 			<Ionicons
				// 				name="ios-information-circle-outline"
				// 				size={28}
				// 				color={video.video && video.video.stringValue == videos[contVideo].video.stringValue ? "#240066" : '#ccc'}
				// 			/>
				// 		</Button>
				// 	</Right>
				// </ListItem>


// ====== BARA ACTION ======

	// Crea barra con el contador y botones ( <    30:59    > )
	// const mostrarContadorActionBar = () => {
		
	// 	return (
	// 		<View style={stylesPage.action_bar}>

	// 			<View></View>

	// 			{/* CONTADOR */}
	// 			{/* =========================================== */}

	// 			{counterVisible ?
	// 				<Button transparent
	// 					onPress={() => setCounterVisible(false)}
	// 				>
	// 					<Text style={{color: '#240066', fontWeight: '600'}}>COMENZAR</Text>
	// 				</Button>
	// 			:
	// 				<CounterClass ref={contadorRef}
	// 					start = {false} 
	// 					duracao = {parseInt(tiempoEjercicio)}
	// 					// setUnoMas= {setUnoMas}
	// 				/>
	// 			}
				
	// 			{/* Play / Pause */}
	// 			{/* ===========================================  */}
	// 			<Button transparent
	// 				onPress={() => {
	// 					if(contadorRef.current != undefined) {
	// 						contadorRef.current.handlePlay();
	// 						// setIsPlay(!isPlay);
	// 					}
	// 				}}
	// 			>	
	// 				<Ionicons
	// 					name="ios-play"
	// 					size={28}
	// 					color={"#240066"}
	// 				/>
	// 			</Button>
	// 		</View>
	// 	)
	// }
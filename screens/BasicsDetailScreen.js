/* =========== LIBRERIAS ============= */
import React, { useEffect, useState } from "react"; // React
import { StyleSheet } from "react-native"; // React-native
import { Content, Button, Left, Body, Right, View, List, ListItem, Thumbnail, Spinner } from "native-base"; // Native Base
import { Video } from 'expo-av'; // Expo
import { Ionicons } from '@expo/vector-icons';
// import { StyleSheet, TouchableOpacity } from "react-native";
/* ========== PROPIOS ================ */
import Text from '../components/CustomText';
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import CounterClass from '../components/CounterClass'; // Contador tiempo clase
import ModalTiempoClase from "../components/ModalTiempoClase"; // Modal
import Strings from '../constants/Strings'; // Strings
import layout from "../constants/Layout"; // Styles
import Colors from '../constants/Colors'; // Styles


const  BasicsDetailScreen = props => {
	const { navigation } = props;
	// PARAMS
	const params = navigation.getParam("body", "body");
	const title = navigation.getParam("title", "title");
	// STATE
	const [ visibleModalTiempo, setVisibleModalTiempo ] = useState(true);
	const [ counterVisible, setCounterVisible ] = useState(false);
	const [ tiempoClase, setTiempoClase ] = useState(0)
	const [ contVideo, setContVideo ] = useState(0)

	// Obtiene los (PARAMS => proveniente de Basic Component)
	// Los guarda en la variable videos listos para utilizar 
	let videos = [];
	(getVideos = () => {
		params.map((e, i) => {
			videos.push(e.fields);
			// console.log('VIDEO ===> ' + i + ': ', e.fields);
		});
	})();

	const crearTiempoClase = tiempoClase => {
		//console.log(tiempoClase);
		setTiempoClase(tiempoClase);
		setVisibleModalTiempo(false)
		setCounterVisible(true);
	};

	// Crea la vista del current video 
	const mostrarVideo = e => {
		// console.log(e);
		return (
			<>
				<Video style={stylesPage.video_avtive}
					// usePoster={true}
					// posterSource={{ uri: e.img }}
					//shouldPlay
					source={{
						uri: e.video.stringValue
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

	// Se utiliza para next y back del listado de videos
	const changeVideo = (i, pasarVideo) => {
		if(contVideo === 0 && pasarVideo === 'menos' )return;
		if(contVideo == videos.length - 1 && pasarVideo === 'mas') return;

		setContVideo(i)
	};

	const nextVideo = i => {
		setContVideo(i)
	}

	if (visibleModalTiempo) {
		// Muestra modal donde optenemos el tiempo de clase
		return <ModalTiempoClase 
			crearTiempoClase={crearTiempoClase}
			navigation={navigation}
		/>;

	} else if (tiempoClase > 0){
		return (
			<>
				{/* Header Page */}
				<DetailScreenHeader 
					navigation={navigation}
					setStateConunter= {setCounterVisible}
					counterVisible={counterVisible}
					title={title}
					page={'BASICS'}
				/>

				{/* Video */}
				<View>
					<>
						{videos
							? mostrarVideo(videos[contVideo])
							: null}
					</>
				</View>

				{/* Barra Contados y botones <  > */}
				{
				<View style={stylesPage.action_bar}>
					<Button small transparent
						onPress={() => changeVideo(parseInt(contVideo) - 1, 'menos')}
					>
						<Ionicons
							name="ios-arrow-back"
							size={20}
							color={"#240066"}
						/>
					</Button>

					{/* CONTADOR */}
					{/* =========================================== */ }

					<CounterClass 
						start = {counterVisible} 
						duracao = {parseInt(tiempoClase)}
					/>

					{/* =========================================== */ }


					<Button small transparent
						onPress={() => changeVideo(parseInt(contVideo) + 1, 'mas')}
					>
						<Ionicons
							name="ios-arrow-forward"
							size={20}
							color={"#240066"}
						/>
					</Button>
				</View>	
				}

				{/* Lista de siguientes videos */}
				<Content> 
					<List style={stylesPage.list_videos}>
						{videos.map((video, i) => (
							<ListItem thumbnail key={i}>
								<Left>
									{video.img && video.img !== '' ? (
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
									<Text>{video.title.stringValue}</Text>
									
									<Text note numberOfLines={1}>
										{Strings.ST22} {tiempoClase * 0.3} mts
									</Text>
								</Body>
								<Right>
									<Button
										transparent
										onPress={() => nextVideo(i)}
									>
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
			</>
		);
	} else {
		return (
			<Spinner color={Colors.tintColor}/>
		)
	}
}
export default BasicsDetailScreen;

// Styles
const stylesPage = StyleSheet.create({
	// Video 
	video_avtive: {
		width: layout.window.width,
		height: layout.window.height / 3
	},
	action_bar: {
		display: 'flex', 
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		paddingHorizontal: 15,
		paddingVertical: 10,
		backgroundColor: Colors.secondaryColor,
		color: Colors.tintColor,
	},
	list_videos: {
		marginTop: 10
	}

});

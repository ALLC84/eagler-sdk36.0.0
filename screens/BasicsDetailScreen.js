/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from "react-native"; // React-native
import { connect } from 'react-redux'; // Redux
import { Content, Button, Left, Body, Right, View, List, ListItem, Thumbnail, Spinner } from "native-base"; // Native Base
import { Audio, Video} from "expo"; // Expo
import { Ionicons } from '@expo/vector-icons';
// import { StyleSheet, TouchableOpacity } from "react-native";
/* ========== PROPIOS ================ */
import Text from '../components/CustomText';
import { 
	actionGetInitialState,
	actionSetTiempoClase,
	actionSetStateConunter,
	actionSetCountVideo
} from '../store/actions/basicAction'; // Actions
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import CounterClass from '../components/CounterClass'; // Contador tiempo clase
import ModalTiempoClase from "../components/ModalTiempoClase"; // Modal
import Strings from '../constants/Strings'; // Strings
import layout from "../constants/Layout"; // Styles
import Colors from '../constants/Colors'; // Styles

class BasicsDetailScreen extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			visibleModalTiempo: true
		}
	}

	componentDidMount() {
		this.props.getInitialState();
	}

	render() {
		const params = this.props.navigation.getParam("body", "body");
		const title = this.props.navigation.getParam("title", "title");
		let videos = [];

		//console.log(this.props.counterVisible);
		//console.log(parseInt(this.props.tiempoClase));

		//console.log('Params ===> ', params);

		(getVideos = () => {
			params.map((e, i) => {
				videos.push(e.fields);
				//console.log('VIDEO ===> ' + i + ': ', e.fields);
			});
		})();

		const mostrarVideo = e => {
			//console.log(e);
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

		const nextVideo = (i, pasarVideo) => {
			if(this.props.contVideo === 0 && pasarVideo === 'menos' )return;
			if(this.props.contVideo == videos.length - 1 && pasarVideo === 'mas') return;

			this.props.setCountVideo(i)
		};

		const backVideo = () => {
			if (this.state.contVideo > 0) {
				this.props.setCountVideo(this.props.contVideo -1)
			}
		};

		if (this.state.visibleModalTiempo) {
			// Muestra modal donde optenemos el tiempo de clase
			return <ModalTiempoClase 
				crearTiempoClase={this.crearTiempoClase}
				navigation={this.props.navigation}
			/>;

		} else if (this.props.tiempoClase > 0){
			return (
				<>
					{/* Header Page */}
					<DetailScreenHeader 
						navigation={this.props.navigation}
						setStateConunter= {this.props.setStateConunter}
						counterVisible={this.props.counterVisible}
						title={title}
						page={'BASICS'}
					/>

					{/* Video */}
					<View>
						<>
							{videos
								? mostrarVideo(videos[this.props.contVideo])
								: null}
						</>
					</View>

					{/* Barra Contados y botones <  > */}
					{
					<View style={stylesPage.action_bar}>
						<Button small transparent
							onPress={() => nextVideo(parseInt(this.props.contVideo) - 1, 'menos')}
						>
							<Ionicons
								name="ios-arrow-back"
								size={20}
								color={"#240066"}
							/>
						</Button>

						{/* CONTADOR */}
						{/* =========================================== */}

						<CounterClass 
							start = {this.props.counterVisible} 
							duracao = {parseInt(this.props.tiempoClase)}
						/>

						{/* =========================================== */}


						<Button small transparent
							onPress={() => nextVideo(parseInt(this.props.contVideo) + 1, 'mas')}
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
											{Strings.ST22} {this.props.tiempoClase * 0.3} mts
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

	crearTiempoClase = async tiempoClase => {
		//console.log(tiempoClase);
		this.props.setTiempoClase(tiempoClase);
		await this.setState({
			visibleModalTiempo: false
		});
		this.props.setStateConunter(true);
	};
}

const mapStateToProps = (state) => ({

	tiempoClase        : state.BasicReducer.tiempoClase,
	counterVisible     : state.BasicReducer.counterVisible,
	contVideo          : state.BasicReducer.contVideo
	
});


const mapDispatchToProps = dispatch => ({

	getInitialState: () => {
		dispatch(actionGetInitialState())
	},

	setTiempoClase: (tiempo) => {
		dispatch(actionSetTiempoClase(tiempo))
	},

	setStateConunter: (value) => {
		dispatch(actionSetStateConunter(value))
	},

	setCountVideo: (value) => {
		dispatch(actionSetCountVideo(value))
	},

});

export default connect(mapStateToProps, mapDispatchToProps)(BasicsDetailScreen);

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

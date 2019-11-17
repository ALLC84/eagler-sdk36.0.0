/* =========== LIBRERIAS ============= */
import React, {useState, useEffect} from "react"; // React
import { StyleSheet } from "react-native"; // React-native
import { AUTH } from "../services/firebase"; // Firebase
import { Container, Content, Card, Text, Spinner, Button, Segment, StyleProvider} from 'native-base';
import { View, ImageBackground } from 'react-native';
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux'; // React-Redux
import {actionGetIsPremium, actionSetPremium, actionUpdatePremium} from '../store/actions/subscriptionsAction';
/* ========== THEME PERSONALIZADO NATIVE BASE ================ */
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
/* ========== PROPIOS ================ */
import Strings from '../constants/Strings'; // Strings
import DetailScreenHeader from '../components/DetailScreenHeader'; // Header
import Colors from "../constants/Colors"; // Color Style


const imgs = [
	require("../assets/images/splash/Splash-06.png")
	// require("../assets/images/portadaBasics/driveMacllroy.jpg")
 ];

const  Suscripciones = props => {
	const user = AUTH.currentUser;
	//State
	const [loadingImg, setLoading] = useState(true)
	const [segment, setSegment] = useState('free')
	// REDUX
	const { premium, loading }= useSelector(state => state.subscriptions);
	// Dispatchs
	const dispatch = useDispatch()
	const isPremium = (userId) => dispatch(actionGetIsPremium(userId))
	const setPremium = (userId, value) => dispatch(actionSetPremium(userId, value))
	const updateLocalPremium = (value) => dispatch(actionUpdatePremium(value))

	useEffect(() => {
		if(user) {
			isPremium(user.uid)
		}
	 }, [])

	const handleSegment = (segment) => {
		switch (segment) {
			case 'free': return(cardFreeSuscription())
			case 'premium': return(cardPremiumSuscription())
			case 'ultimate': return(cardUltimateSuscription())
			default: return(cardFreeSuscription())
		}
	}

	const tabSegment = () => {
		return (
			<StyleProvider style={getTheme(platform)}>
			<Segment>
				<Button first active={segment == 'free' ? true : null}
					onPress={() => setSegment('free')}
				>
					<Text>FREE</Text>
				</Button>

				<Button active={segment == 'premium' ? true : null}
					onPress={() => setSegment('premium')}
				>
					<Text>PREMIUM</Text>
				</Button>

				<Button last active={segment == 'ultimate' ? true : null}
					onPress={() => setSegment('ultimate')}
				>
					<Text>ULTIMATE</Text>
				</Button>
			</Segment>
			</StyleProvider>
		)
	}

	// onLoadEnd={() => setLoading(false)}
	const cardFreeSuscription = () => {
		return (
			<Card style={{borderRadius: 10, width: '80%', maxWidth: 350, marginRight: 'auto', marginLeft: 'auto'}}>
				<ImageBackground source={imgs[0]} style={{minHeight: 500, width: '100%', display: 'flex', alignItems: 'center'}}
					onLoadEnd={() => setLoading(false)}
				>

					{loadingImg ? 
						<Spinner color={Colors.tintColor}
							style={{position: 'absolute', left: '45%'}}
						/> 
					: null}


					<View style={{
						display: 'flex', 
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'rgba(68,138,255 ,1)',
						borderRadius: 100,
						padding: 20,
						height: 150,
						width: 150,
						marginTop: 50
					}}>
						<Text style={{fontWeight: 'bold', fontSize: 28, color: '#ccc'}}>0€</Text>
						<Text style={{color: '#ccc'}}>Mes</Text>
					</View>

					<Text style={{fontSize: 20, marginVertical: 20, fontWeight: 'bold'}}>GRATIS</Text>

					<View>
						<Text>Clases limitadas</Text>
						<Text>Ejercicios limitados</Text>
					</View>

					{premium != 'FREE' ? <Button style={stylesPage.button_form}
						block
						onPress={() => {setPremium(user.uid, 'FREE'), updateLocalPremium('FREE')}}
					>
						<Text>GRATIS</Text>
					</Button> : null}
					

				</ImageBackground>
			</Card>
		)
	}
	const cardPremiumSuscription = () => {
		return (
			<Card style={{borderRadius: 10, width: '80%', maxWidth: 350, marginRight: 'auto', marginLeft: 'auto'}}>
				<ImageBackground source={imgs[0]} style={{minHeight: 500, width: '100%', display: 'flex', alignItems: 'center'}}
					onLoadEnd={() => setLoading(false)}
				>

					{loading ? 
						<Spinner color={Colors.tintColor}
							style={{position: 'absolute', left: '45%'}}
						/> 
					: null}


					<View style={{
						display: 'flex', 
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'rgba(48,79,254 ,1)',
						borderRadius: 100,
						padding: 20,
						height: 150,
						width: 150,
						marginTop: 50
					}}>
						<Text style={{fontWeight: 'bold', fontSize: 28, color: '#ccc'}}>0,00€</Text>
						<Text style={{color: '#ccc'}}>Mes</Text>
					</View>

					<Text style={{fontSize: 20, marginVertical: 20, fontWeight: 'bold'}}>PREMIUM</Text>

					<View>
						<Text>Clases ilimitadas</Text>
						<Text>Ejercicios ilimitados</Text>
					</View>

					{premium != 'PREMIUM' ? <Button style={stylesPage.button_form}
						block
						onPress={() => {setPremium(user.uid, 'PREMIUM'), updateLocalPremium('PREMIUM')}}
					>
						<Text>PASATE A PREMIUM</Text>
					</Button> : null}
					

				</ImageBackground>
			</Card>
		)
	}
	const cardUltimateSuscription = () => {
		return (
			<Card style={{borderRadius: 10, width: '80%', maxWidth: 350, marginRight: 'auto', marginLeft: 'auto'}}>
				<ImageBackground source={imgs[0]} style={{minHeight: 500, width: '100%', display: 'flex', alignItems: 'center'}}
					onLoadEnd={() => setLoading(false)}
				>

					{loadingImg ? 
						<Spinner color={Colors.tintColor}
							style={{position: 'absolute', left: '45%'}}
						/> 
					: null}


					<View style={{
						display: 'flex', 
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'rgba(101,31,255 ,1)',
						borderRadius: 100,
						padding: 20,
						height: 150,
						width: 150,
						marginTop: 50
					}}>
						<Text style={{fontWeight: 'bold', fontSize: 28, color: '#ccc'}}>00,00€</Text>
						<Text style={{color: '#ccc'}}>Mes</Text>
					</View>

					<Text style={{fontSize: 20, marginVertical: 20, fontWeight: 'bold'}}>ULTIMATE</Text>

					<View>
						<Text>Clases ilimitadas</Text>
						<Text>Ejercicios ilimitados</Text>
						<Text>1 clase en grupo semestral</Text>
					</View>

					{premium != 'ULTIMATE' ? <Button style={stylesPage.button_form}
						block
						onPress={() => {setPremium(user.uid, 'ULTIMATE'), updateLocalPremium('ULTIMATE')}}
					>
						<Text>PASATE A ULTIMATE</Text>
					</Button> : null}
					

				</ImageBackground>
			</Card>
		)
	}

	return (
		<>
			{/* Header Page */}
			<DetailScreenHeader
				navigation={props.navigation} 
				title={Strings.ST19}
				page={'SUSCRIPCIONES'}
			/>

			{/* Content Page */}
			{!loading ?
				<Container>
					
					<View style={{marginTop: 10}}>
						{tabSegment()}
					</View>

					<Content padder>
						{handleSegment(segment)}
					</Content>
					
				</Container>
				: 
				<Container>
					<Spinner color={Colors.tintColor}
						style={{position: 'absolute', left: '45%'}}
					/> 
				</Container>
			}

		</>
	);
	
}
export default Suscripciones;

// Styles
const stylesPage = StyleSheet.create({
	button_form: {
		margin: 20,
		marginTop: 30,
		backgroundColor: "#240066",
		height: 40
	},
});


{/* <CardItem cardBody
	style={{height: 200, borderRadius: 10,}}
>
		<Thumbnail
			square
			source={imgs[0]}
			onLoadEnd={() => setLoading(false)}
			style={{height: 200, flex: 1}}
		/>

		{loading ? 
			<Spinner color={Colors.tintColor}
				style={{position: 'absolute', left: '45%'}}
			/> 
		: null}
</CardItem> */}


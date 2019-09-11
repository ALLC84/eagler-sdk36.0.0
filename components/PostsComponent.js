/* =========== LIBRERIAS ============= */
import React, { useEffect } from "react"; // React
import { StyleSheet } from 'react-native'; // React Native
import { Content, Spinner } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import CardPostComponent from "./CardPostComponent"; // Card Post IQ
import Colors from '../constants/Colors' // Styles
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux'
import { actionGetIQ } from '../store/actions/IQAction'


const PostsComponent = props => {
	const { navigation } = props;
	// REDUX
	const { posts }= useSelector(state => state.posts)
	// Dispatchs
	const dispatch = useDispatch()
	const getIQ = () => dispatch(actionGetIQ())
	
	useEffect(() => {
		getIQ();
	}, [])

	const crearCardPost = posts => 
		posts.map((post, i) => (
			<CardPostComponent
				key={i}
				post={post}
				navigation={navigation}
			/>
		))

	return (
		posts.length === 0
		?
		<>
			<Spinner color={Colors.tintColor}/>
			<Text style={stylesPage.snipperText}>
				{Strings.ST33_3}
			</Text>
		</>
		:
		<Content padder>
			{ crearCardPost(posts) }
		</Content>
	);
}
export default PostsComponent;

// Styles del Componente
const stylesPage = StyleSheet.create({
	snipperText: {
		textAlign: 'center', 
		color: Colors.tintColor
	},
});

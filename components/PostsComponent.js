/* =========== LIBRERIAS ============= */
import React, { useEffect, useState } from "react"; // React
import { StyleSheet, ScrollView } from 'react-native'; // React Native
import { Spinner, Text } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
// import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import CardPostComponent from "./CardPostComponent"; // Card Post IQ
import Colors from '../constants/Colors' // Styles
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux'
import { actionGetIQ } from '../store/actions/IQAction'

const PostsComponent = props => {
	// @refresh reset
	const { navigation } = props;
	const [cargando, setCargando] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	// REDUX
	const { posts, totalPages }= useSelector(state => state.postsData);
	// Dispatchs
	const dispatch = useDispatch()
	const getIQ = (page) => dispatch(actionGetIQ(page))
	
	useEffect(() => {
		getIQ(1);
	}, [])

	const crearCardPost = posts => 
		posts.map((post, i) => (
			<CardPostComponent
				key={i}
				post={post}
				navigation={navigation}
			/>
		))

	// HANDLE SCROLL Y
	const handleScroll = async (event) => {
		if(currentPage == 1 || currentPage < totalPages) {

			setCargando(true)
			setCurrentPage(currentPage + 1)
			
			await getIQ(2)
	
			setTimeout(() => {
				setCargando(false)
			}, 1500);
		}
	}

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
		<ScrollView style={stylesPage.content}
			onMomentumScrollEnd={handleScroll}
		>
			{ crearCardPost(posts) }
			{ cargando ? <Spinner color={Colors.tintColor}/> : null}
		</ScrollView>
	);
}
export default PostsComponent;

// Styles del Componente
const stylesPage = StyleSheet.create({
	content: {
		paddingHorizontal: 10,
		paddingBottom: 20
	},
	snipperText: {
		textAlign: 'center', 
		color: Colors.tintColor
	},
});

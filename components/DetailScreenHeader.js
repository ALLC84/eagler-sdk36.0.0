/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Header, Left, Right, Button, Body, Title } from "native-base"; // Native Base
import { Ionicons } from '@expo/vector-icons'; // Expo
/* ========== PROPIOS ================ */
import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import Colors from '../constants/Colors'; // Styles

const DetailScreenHeader = props => {
   const {title, page, setStateConunter, counterVisible, navigation} = props

   return (
      <Header style={{backgroundColor: '#ffffff'}}>
         <Left>
            <Button
               transparent
               onPress={() => {
                  switch(page) {
                     case 'BASICS':
                        return (() => {
                           setStateConunter(false);
                           !counterVisible ? navigation.goBack() : null;
                        })(); 
                     default: return navigation.goBack();
                  }
               }}
            >
               
               <Ionicons style={stylesPage.nabbar_icon}
                  name="ios-arrow-back"
                  size={24}
               />
               <Text style={stylesPage.nabbar_btn_text}>
                  {Strings.ST17}
               </Text>
            </Button>
         </Left>
         <Body>
            <Title style={stylesPage.nabbar_text}>
               {title}
            </Title>
         </Body>
         <Right />
      </Header>
   );
	
}
export default DetailScreenHeader;

// Styles del Componente
const stylesPage = StyleSheet.create({
   nabbar_icon: {
		marginRight: 5,
		color: Colors.tintColor,
		marginTop: -3
	},
	nabbar_btn_text: {
      color: Colors.tintColor,
	},
	nabbar_text: {
		color: "grey",
		fontFamily: 'gilroy-regular'
   },

});

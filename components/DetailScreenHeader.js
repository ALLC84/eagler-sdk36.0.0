/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Header, Left, Right, Button, Body, Title, Text, Icon } from "native-base"; // Native Base
// import { Ionicons } from '@expo/vector-icons'; // Expo
/* ========== PROPIOS ================ */
import Strings from '../constants/Strings'; // Strings
import Colors from '../constants/Colors'; // Styles

const DetailScreenHeader = props => {
   const {title, navigation} = props

   return (
      <Header style={stylesPage.header}>
         <Left>
            <Button
               transparent
               onPress={() => navigation.goBack()}
            >
               <Icon style={stylesPage.nabbar_icon} name='arrow-back' />
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
   header: {
      backgroundColor: '#ffffff'
   },
   nabbar_icon: {
		color: Colors.tintColor,
	},
	nabbar_btn_text: {
      color: Colors.tintColor,
	},
	nabbar_text: {
		color: "grey",
   },

});

/* <Ionicons style={stylesPage.nabbar_icon}
   name="ios-arrow-back"
   size={24}
/> */

/* =========== LIBRERIAS ============= */
import React from "react"; // React
import { ScrollView, View, Image, TouchableOpacity } from "react-native"; // React Native
import { ListItem, Left, Right, Text } from "native-base"; // Native Base
import { Ionicons } from '@expo/vector-icons'; // Expo
/* ========== PROPIOS ================ */
// import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import { AUTH } from '../services/firebase'; // Firebase Auth
import stylesDrawer from "../constants/styles/DrawerProfileStyle"; // Styles

const  ProfileUser = props => {
	const { navigation, closeDrawer } = props;

	return (
		<View style={stylesDrawer.container_menu}>
			<View
				style={stylesDrawer.container_image_menu}
			>
				<Image
					source={require("../assets/images/SimboloAz.png")}
					style={stylesDrawer.image_menu}
					resizeMode="contain"
				/>
			</View>

			<ScrollView>
				<ListItem
					style={stylesDrawer.item_menu}
					onPress={() => {
						closeDrawer()
						navigation.navigate("PerfilUsuario");
					}}
				>
					<Left>
						<View style={{width: 30}}>
							<Ionicons
								name="ios-contact"
								style={stylesDrawer.icon_left_menu}
							/>
						</View>
						<Text style={stylesDrawer.text_menu}>
							{Strings.ST11}
						</Text>
					</Left>
					<Right>
						<Ionicons
							name="ios-arrow-forward"
							style={stylesDrawer.icon_menu}
						/>
					</Right>
				</ListItem>

				<ListItem
					style={stylesDrawer.item_menu}
					onPress={() => {
						closeDrawer()
						navigation.navigate("PerfilJuego");
					}}
				>
					<Left>
						<View style={{width: 30}}>
							<Ionicons
								name="ios-flag"
								style={stylesDrawer.icon_left_menu}
							/>
						</View>
						<Text style={stylesDrawer.text_menu}>
							{Strings.ST12}
						</Text>
					</Left>
					<Right>
						<Ionicons
							name="ios-arrow-forward"
							style={stylesDrawer.icon_menu}
						/>
					</Right>
				</ListItem>

				<ListItem
					style={stylesDrawer.item_menu}
					onPress={() => {
						closeDrawer()
						navigation.navigate("PerfilFisico");
					}}
				>
					<Left>
						<View style={{width: 30}}>
							<Ionicons
								name="ios-man"
								style={stylesDrawer.icon_left_menu}
							/>
						</View>
						<Text style={stylesDrawer.text_menu}>
							{Strings.ST13}
						</Text>
					</Left>
					<Right>
						<Ionicons
							name="ios-arrow-forward"
							style={stylesDrawer.icon_menu}
						/>
					</Right>
				</ListItem>

				<ListItem
					style={stylesDrawer.item_menu}
					onPress={() => {
						closeDrawer()
						navigation.navigate("Suscripciones");
					}}
				>
					<Left>
						<View style={{width: 30}}>
							<Ionicons
								name="ios-card"
								style={stylesDrawer.icon_left_menu}
							/>
						</View>
						<Text style={stylesDrawer.text_menu}>
							{Strings.ST14}
						</Text>
					</Left>
					<Right>
						<Ionicons
							name="ios-arrow-forward"
							style={stylesDrawer.icon_menu}
						/>
					</Right>
				</ListItem>

				<ListItem
					style={stylesDrawer.item_menu}
					onPress={ () => {
						closeDrawer()
						// this.navigateToScreen("QuotesScreen")
					}}
				>
					<Left>
						<View style={{width: 30}}>
							<Ionicons
								name="ios-share"
								style={stylesDrawer.icon_left_menu}
							/>
						</View>
						<Text style={stylesDrawer.text_menu}>
							{Strings.ST15}
						</Text>
					</Left>
					<Right>
						<Ionicons
							name="ios-arrow-forward"
							style={stylesDrawer.icon_menu}
						/>
					</Right>
				</ListItem>
			</ScrollView>

			<View style={stylesDrawer.footer_menu}>
				<TouchableOpacity
					onPress={() => {
						AUTH.signOut();
					}}
				>
					<Text style={stylesDrawer.footer_menu_text}>
						{Strings.ST16}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
export default ProfileUser;

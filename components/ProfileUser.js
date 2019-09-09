/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { ScrollView, View, Image, TouchableOpacity } from "react-native"; // React Native
import { ListItem, Left, Right } from "native-base"; // Native Base
import { Ionicons } from '@expo/vector-icons'; // Expo
/* ========== PROPIOS ================ */
import Text from './CustomText'; // Custom Text Styles and Font
import Strings from '../constants/Strings'; // Strings
import { AUTH } from '../services/firebase'; // Firebase Auth
import stylesDrawer from "../constants/styles/DrawerProfileStyle"; // Styles

export default class ProfileUser extends Component {
	render() {
		const { navigation } = this.props;
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
							navigation.navigate("PerfilUsuario");
						}}
					>
						<Left>
							<Ionicons
								name="ios-contact"
								style={stylesDrawer.icon_left_menu}
							/>
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
							navigation.navigate("PerfilJuego");
						}}
					>
						<Left>
							<Ionicons
								name="ios-flag"
								style={stylesDrawer.icon_left_menu}
							/>
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
							navigation.navigate("PerfilFisico");
						}}
					>
						<Left>
							<Ionicons
								name="ios-man"
								style={stylesDrawer.icon_left_menu}
							/>
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
							navigation.navigate("Suscripciones");
						}}
					>
						<Left>
							<Ionicons
								name="ios-card"
								style={stylesDrawer.icon_left_menu}
							/>
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
						// onPress={this.navigateToScreen("QuotesScreen")}
					>
						<Left>
							<Ionicons
								name="ios-share"
								style={stylesDrawer.icon_left_menu}
							/>
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
}

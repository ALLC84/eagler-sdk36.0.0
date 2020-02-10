// ============================================
// DE MOMENTO NO SE ESTA USANDO ESTE COMPONENTE
// ============================================
import React, { Component } from "react";
import { View, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import Swiper from "react-native-swiper";
import { Text } from "native-base";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const SliderInfo = props => {
  	return (
		<>
			<Image style={styles.image} source={props.uri} />

			<View style={{ padding: 20 }}>
				<Text style={styles.title}> {props.title} </Text>
				<Text style={styles.description}> {props.description} </Text>
			</View>
		</>
  	);
};

export default class SliderMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSlider: [
        require("../assets/images/portadaBasics/koepkaHierros.jpg"),
        require("../assets/images/portadaBody/img-mueve-cuerda.jpg"),
        require("../assets/images/portadaBasics/puttSpieth.jpg"),
        require("../assets/images/introApp/Golf-Pre-Shot-Routine.jpg"),
        require("../assets/images/introApp/Celebrating.jpg")
      ]
    };
  }

  render() {
    return (
          <Swiper
            containerStyle={styles.container}
            loop={false}
            activeDotColor={"#240066"}
            // autoplay
            //height={240}
          >
            <ScrollView>
              <SliderInfo
                uri={this.state.imageSlider[0]}
                title={"Basics"}
                description={
                  "Aqui tendras sesiones personalizadas de entrenamientos por niveles desde le Putt hasta el Drive Pincha en la sesiones, introduce el tiempo que quieras dedicar y empieza a mejorar!"
                }
              />
            </ScrollView>
            <ScrollView>
              <SliderInfo
                uri={this.state.imageSlider[1]}
                title={"Body"}
                description={
                  "Para que los entrenamiento técnicos mejoren más rápido, deberemos entrenar la movilidad de nuestro cuerpo. Te presentamos las combinaciones más eficientes para tu nivel."
                }
              />
            </ScrollView>

            <ScrollView>
              <SliderInfo
                uri={this.state.imageSlider[4]}
                title={"Gracias!"}
                description={
                  "Para que los ejercicios Técnicos y entrenamientos físicos se adapten a ti, necesitamos que introduzcas algunos datos sencillos"
                }
              />
            </ScrollView>
          </Swiper>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		height: height - 100
	},
	imageContainer: {
		height: height / 3
	},
	image: {
		height: height / 3,
		width
		// resizeMode: "stretch"
	},
	description: {
		// textAlign: "center",
		marginTop: 40,
		// color: 'white',
		fontSize: 20
	},
	title: {
		textAlign: "center",
		fontSize: 26,
		fontWeight: "600"
	}
});

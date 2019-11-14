/* =========== LIBRERIAS ============= */
import React, { useEffect, useState } from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Content, Toast, Root, Spinner, Text , Button} from "native-base"; // NativeBase
import { AUTH } from "../services/firebase"; // Firebase
/* ========== PROPIOS ================ */
// import Text from "./CustomText"; // Custom Text Styles and Font
import Strings from "../constants/Strings"; // Strings
import ModalPerfilJuego from "./ModalPerfilJuego"; // Modal con formulario derfil de juego
import CardBasicsComponent from "./CardBasicsComponent"; // Card de las diferentes clases
import Colors from "../constants/Colors"; // Color Style
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux' // React-Redux
import { actionGetFase } from "../store/actions/basicAction"; //Actions Redux

const imgs = [
  // "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fportada%2FseveBunker.jpeg?alt=media&token=d115d0c5-a727-4d3c-ae7b-cd186c0082cc"
  require("../assets/images/portadaBasics/seveBunker.jpeg"),
  // "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fportada%2FdriveMacllroy.jpg?alt=media&token=386dd092-73de-4222-9d52-b12422f5ec39",
  require("../assets/images/portadaBasics/driveMacllroy.jpg"),
  // "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fportada%2FkoepkaHierros.jpg?alt=media&token=ce2be166-68a4-4013-8929-3fa22a5fab94",
  require("../assets/images/portadaBasics/koepkaHierros.jpg"),
  // "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fportada%2FtigerApproach.jpg?alt=media&token=e639e073-2b5d-46a2-b9d9-bfe7b2891150",
  require("../assets/images/portadaBasics/tigerApproach.jpg"),
  // "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fportada%2FputtSpieth.jpg?alt=media&token=4b424291-a9e2-46f7-9094-a50edc8148cd"
  require("../assets/images/portadaBasics/puttSpieth.jpg"),
];

const BasicComponent = props => {
  const user = AUTH.currentUser;
  const { navigation } = props;
  // STATE
  const [visibleModalPerfilJuego, setVisibleModalPerfilJuego] = useState(false);
	// REDUX
  const { premium, fase, loading }= useSelector(state => state.basic);
	// Dispatchs
	const dispatch = useDispatch()
  const getFase = (userId) => dispatch(actionGetFase(userId))
  

  // FUNCTIONS
  const cerrarModal = () => setVisibleModalPerfilJuego(false)


  useEffect(() => {
    if(user) {
      getFase(user.uid)
    }
  }, [])

  useEffect(() => {
    if(fase === undefined) {
      setVisibleModalPerfilJuego(true)
    }
  }, [fase])
  
  const mostrarToast = message => {
    return Toast.show({
      text: message,
      textStyle: { textAlign: "center" },
      duration: 3000,
      position: "bottom"
    });
  };

  if ( fase === null && visibleModalPerfilJuego === false) {
    return (
      <Root>
        <Spinner color={Colors.tintColor} />
        <Text style={stylesPage.snipperText}>Validando perfil!!</Text>
      </Root>
    );
  } else if (fase === undefined || visibleModalPerfilJuego === true && loading === false) {
    return (
      <Root>
        <ModalPerfilJuego
          getFase={getFase}
          cerrarModal={cerrarModal}
          mostrarToast={mostrarToast}
        />
      </Root>
    );
  } else {
    return (
      <Root>
        {premium === true ?
        <Content padder>
          <CardBasicsComponent
            key={"1"}
            title={Strings.ST23}
            subtitle={Strings.ST24}
            img={imgs[0]}
            navigation={navigation}
          />
          <CardBasicsComponent
            key={"2"}
            title={Strings.ST25}
            subtitle={Strings.ST26}
            img={imgs[1]}
            navigation={navigation}
          />
          <CardBasicsComponent
            key={"3"}
            title={Strings.ST27}
            subtitle={Strings.ST28}
            img={imgs[2]}
            navigation={navigation}
          />
          <CardBasicsComponent
            key={"4"}
            title={Strings.ST29}
            subtitle={Strings.ST30}
            img={imgs[3]}
            navigation={navigation}
          />
          <CardBasicsComponent
            key={"5"}
            title={Strings.ST31}
            subtitle={Strings.ST32}
            img={imgs[4]}
            navigation={navigation}
          />
        </Content>
        :
        <Content padder>
          <CardBasicsComponent
            key={"1"}
            title={'Gratis'}
            subtitle={'Clase de prueba'}
            img={imgs[0]}
            navigation={navigation}
          />

          <Button style={stylesPage.button_form}
            block
            onPress={() => {
              navigation.navigation.navigate("Suscripciones")
            }}
          >
            <Text>PASATE A PREMIUM</Text>
          </Button>
        </Content>
        }
      </Root>
    );
  }
}
export default BasicComponent;

// Styles del Componente
const stylesPage = StyleSheet.create({
  snipperText: {
    textAlign: "center",
    color: Colors.tintColor
  },
  button_form: {
    marginTop: 50,
    backgroundColor: "#240066"
 },
});

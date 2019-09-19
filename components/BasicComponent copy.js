/* =========== LIBRERIAS ============= */
import React, { useEffect, useState } from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Content, Toast, Root, Spinner } from "native-base"; // NativeBase
import { AUTH } from "../services/firebase"; // Firebase
/* ========== PROPIOS ================ */
import Text from "./CustomText"; // Custom Text Styles and Font
import Strings from "../constants/Strings"; // Strings
import ModalPerfilJuego from "./ModalPerfilJuego"; // Modal con formulario derfil de juego
import CardBasicsComponent from "./CardBasicsComponent"; // Card de las diferentes clases
import Colors from "../constants/Colors"; // Color Style
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux' // React-Redux
import { actionGetFase } from "../store/actions/basicAction"; //Actions Redux

const imgs = [
  "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fimages%2FseveBunker.jpeg?alt=media&token=81d97819-192f-44dc-89ed-68e321adbbf9",
  "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fimages%2FdriveMacllroy.jpg?alt=media&token=6061c146-c61b-4b35-a25e-e066963cdd6a",
  "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fimages%2FkoepkaHierros.jpg?alt=media&token=a205be3c-9d7e-44fc-92a5-191d282cb9cb",
  "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fimages%2FtigerApproach.jpg?alt=media&token=dfabdd4f-2379-4806-a12e-6c31d36dc069",
  "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fimages%2FputtSpieth.jpg?alt=media&token=39f81cbb-ed77-4740-856d-03caf093a69c"
];

const BasicComponent = props => {
  const user = AUTH.currentUser;
  const { navigation } = props;
  // STATE
  const [visibleModalPerfilJuego, setVisibleModalPerfilJuego] = useState(false)
	// REDUX
  const { clases, fase }= useSelector(state => state.basic)
	// Dispatchs
	const dispatch = useDispatch()
  const getFase = (userId) => dispatch(actionGetFase(userId))

  // FUNCTIONS
  const cerrarModal = () => setVisibleModalPerfilJuego(false)


  useEffect(() => {
		// getFase(user.uid)
  }, [])

  useEffect(() => {
    if(!fase) {
      // setVisibleModalPerfilJuego(true)
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

  if (
    (fase === undefined && visibleModalPerfilJuego === false) ||
    clases.length == 0
  ) {
    return (
      <Root>
        <Spinner color={Colors.tintColor} />
        <Text style={stylesPage.snipperText}>{Strings.ST33}</Text>
      </Root>
    );
  } else if (fase === undefined || visibleModalPerfilJuego) {
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
        <Content padder>
          <CardBasicsComponent
            key={"1"}
            body={clases}
            title={Strings.ST23}
            subtitle={Strings.ST24}
            img={imgs[0]}
            navigation={navigation}
          />
          {/* <CardBasicsComponent
            key={"2"}
            body={clases}
            title={Strings.ST25}
            subtitle={Strings.ST26}
            img={imgs[1]}
            navigation={navigation}
          />
          <CardBasicsComponent
            key={"3"}
            body={clases}
            title={Strings.ST27}
            subtitle={Strings.ST28}
            img={imgs[2]}
            navigation={navigation}
          />
          <CardBasicsComponent
            key={"4"}
            body={clases}
            title={Strings.ST29}
            subtitle={Strings.ST30}
            img={imgs[3]}
            navigation={navigation}
          />
          <CardBasicsComponent
            key={"5"}
            body={clases}
            title={Strings.ST31}
            subtitle={Strings.ST32}
            img={imgs[4]}
            navigation={navigation}
          /> */}
        </Content>
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
  }
});

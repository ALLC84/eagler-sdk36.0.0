/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Content, Toast, Root, Spinner } from "native-base"; // NativeBase
import { connect } from "react-redux"; //Redux
import { AUTH } from "../services/firebase"; // Firebase
/* ========== PROPIOS ================ */
import Text from "./CustomText"; // Custom Text Styles and Font
import Strings from "../constants/Strings"; // Strings
import {
  actionGetFase,
  actionGetClase,
  actionMostrarModal,
  actionCerrarModal
} from "../store/actions/basicAction"; //Actions Redux
import ModalPerfilJuego from "./ModalPerfilJuego"; // Modal con formulario derfil de juego
import CardBasicsComponent from "./CardBasicsComponent"; // Card de las diferentes clases
import Colors from "../constants/Colors"; // Color Style

const imgs = [
  "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fimages%2FseveBunker.jpeg?alt=media&token=81d97819-192f-44dc-89ed-68e321adbbf9",
  "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fimages%2FdriveMacllroy.jpg?alt=media&token=6061c146-c61b-4b35-a25e-e066963cdd6a",
  "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fimages%2FkoepkaHierros.jpg?alt=media&token=a205be3c-9d7e-44fc-92a5-191d282cb9cb",
  "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fimages%2FtigerApproach.jpg?alt=media&token=dfabdd4f-2379-4806-a12e-6c31d36dc069",
  "https://firebasestorage.googleapis.com/v0/b/eaglerclub-4f815.appspot.com/o/basics%2Fimages%2FputtSpieth.jpg?alt=media&token=39f81cbb-ed77-4740-856d-03caf093a69c"
];

class BasicComponent extends Component {
  constructor(props) {
    super(props);
    this.user = AUTH.currentUser;
  }

  async componentDidMount() {
    await this.props.getFase(this.user.uid);
  }

  render() {
    const { fase, clases } = this.props;

    if (
      (fase === undefined && !this.props.visibleModal) ||
      clases.length == 0
    ) {
      return (
        <Root>
          <Spinner color={Colors.tintColor} />
          <Text style={stylesPage.snipperText}>{Strings.ST33}</Text>
        </Root>
      );
    } else if (fase === undefined || this.props.visibleModal) {
      return (
        <Root>
          <ModalPerfilJuego
            getFase={this.props.getFase}
            cerrarModal={this.props.cerrarModal}
            mostrarToast={this.mostrarToast}
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
              navigation={this.props.navigation}
            />
            <CardBasicsComponent
              key={"2"}
              body={clases}
              title={Strings.ST25}
              subtitle={Strings.ST26}
              img={imgs[1]}
              navigation={this.props.navigation}
            />
            <CardBasicsComponent
              key={"3"}
              body={clases}
              title={Strings.ST27}
              subtitle={Strings.ST28}
              img={imgs[2]}
              navigation={this.props.navigation}
            />
            <CardBasicsComponent
              key={"4"}
              body={clases}
              title={Strings.ST29}
              subtitle={Strings.ST30}
              img={imgs[3]}
              navigation={this.props.navigation}
            />
            <CardBasicsComponent
              key={"5"}
              body={clases}
              title={Strings.ST31}
              subtitle={Strings.ST32}
              img={imgs[4]}
              navigation={this.props.navigation}
            />
          </Content>
        </Root>
      );
    }
  }

  mostrarToast = message => {
    return Toast.show({
      text: message,
      textStyle: { textAlign: "center" },
      duration: 3000,
      position: "bottom"
    });
  };
}

const mapStateToProps = state => ({
  fases: state.BasicReducer.fases,
  fase: state.BasicReducer.fase,
  clases: state.BasicReducer.clases,
  visibleModal: state.BasicReducer.visibleModal
});

const mapDispatchToProps = dispatch => ({
  getFase: userId => {
    dispatch(actionGetFase(userId));
  },

  getClase: () => {
    dispatch(actionGetClase());
  },

  mostrarModal: () => {
    dispatch(actionMostrarModal());
  },

  cerrarModal: () => {
    dispatch(actionCerrarModal());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicComponent);

// Styles del Componente
const stylesPage = StyleSheet.create({
  snipperText: {
    textAlign: "center",
    color: Colors.tintColor
  }
});

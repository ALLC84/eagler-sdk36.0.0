import React from 'react';
import { Text } from 'react-native';

class CustomText extends React.Component {
  constructor(){
    super();
  }

  render() {
    const font     = this.setFontType(this.props.type ? this.props.type : 'normal');
    const style    = [{fontFamily: font, fontSize: 16}, this.props.style || {}];
    const allProps = Object.assign({}, this.props, {style: style});

    return (
      <Text {...allProps}>
        {this.props.children}
      </Text>
    );
    // return <Text {...this.props} style={[this.props.style, { fontFamily: 'gilroy-regular' }]} />;
  }

  setFontType = (type) => {
    switch(type) {
      case 'light':
        return 'gilroy-light';
      case 'semi-bold':
        return 'gilroy-semibold';
      case 'bold':
        return 'gilroy-bold';
      default:
        return 'gilroy-regular'
    }
  }

}

export default CustomText;



// Tenemos que importar el ( Text ) de esta clase y no de react-native ó native-base,
// para poder utilizar la fuente Gilroy que hemos cargado en app.js previamente.

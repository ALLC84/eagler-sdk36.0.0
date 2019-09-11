import React from 'react';
import { Text } from 'react-native';

const CustomText = props => {
    const {type, style, children} = props;

    const font     = setFontType(type ? type : 'normal');
    const styles   = [{fontFamily: font, fontSize: 16}, style || {}];
    const allProps = Object.assign({}, props, {style: styles});

    return (
      <Text {...allProps}>
        {children}
      </Text>
    );
    // return <Text {...this.props} style={[this.props.style, { fontFamily: 'gilroy-regular' }]} />;
  }

const  setFontType = type => {
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

export default CustomText;



// Tenemos que importar el ( Text ) de esta clase y no de react-native ó native-base,
// para poder utilizar la fuente Gilroy que hemos cargado en app.js previamente.


'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

//var AppRegistry = React.AppRegistry;
//var StyleSheet = React.StyleSheet;
//var Text = React.Text;
//var View = React.View;
//var Image = React.Image;

var demo4 = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>欢迎来到React Native的世界</Text>
        <Image style={{width:50,height:50, resizeMode: Image.resizeMode.contain}}
               source={{uri:'https://facebook.github.io/react-native/img/header_logo.png'}}>
        </Image>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#05A5D1',
  },
  welcome: {
    fontSize: 20,
    color:'#fff'
  },
});

AppRegistry.registerComponent('demo4', () => demo4);

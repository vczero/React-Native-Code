var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text
} = React;

var Header = React.createClass({
  render: function(){
    return (
      <View style={styles.flex}>
        <Text style={styles.font}>
          <Text style={styles.font_1}>網易</Text>
          <Text style={styles.font_2}>新闻</Text>
          <Text>有态度°</Text>
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  flex:{
    marginTop:25,
    height:50,
    borderBottomWidth:3/React.PixelRatio.get(),
    borderBottomColor:'#EF2D36',
    alignItems:'center' /* 使Text组件水平居中*/
  },
  font:{
    fontSize:25,
    fontWeight: 'bold',
    textAlign:'center' /*使文字在Text组件中居中*/
  },
  font_1:{
    color:'#CD1D1C'
  },
  font_2:{
    color:'#FFF',
    backgroundColor:'#CD1D1C',
  }
});

module.exports = Header;
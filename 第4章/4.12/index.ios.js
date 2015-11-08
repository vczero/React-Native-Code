var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var App = React.createClass({
  render: function(){
    return(
      <View>
        <Text onPress={this._doXMLHttpRequest} style=
          {styles.btn}>XMLHttpRequest请求数据</Text>

        <Text onPress={this._doFetch} style={styles.btn}>Fetch请求数据</Text>
      </View>
    );
  },
  _doXMLHttpRequest: function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        console.log('success', request.responseText);
      } else {
        console.warn('error');
      }
    };

    request.open('GET', 'http://www.baidu.com/');
    request.send();
  },

  _doFetch: function(){
    fetch('http://www.baidu.com/')
    .then(function(data){
      return data.text();
    })
    .then((responseText) => {
      console.log(responseText);
    })
    .catch((error) => {
      console.warn(error);
    });
  }
});

var styles = StyleSheet.create({
  btn:{
    marginTop:50,
    marginLeft:10,
    marginRight:10,
    height:35,
    backgroundColor:'#3BC1FF',
    color:'#fff',
    lineHeight:24,
    fontWeight:'bold',
    textAlign:'center'
  }
});
AppRegistry.registerComponent('App', () => App);
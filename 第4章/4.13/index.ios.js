var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var TimerMixin = require('react-timer-mixin');
var timeoutID = setTimeout(function(){
  var geo = require('Geolocation');
  geo.getCurrentPosition(function(data){
    alert(JSON.stringify(data));
  }, function(e){
    alert(JSON.stringify(e));
  });
  if(timeoutID){
    clearTimeout(timeoutID);
  }
}, 5000); 

setImmediate(function(){
  console.log('发送数据');
});

var App = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function(){
    return{
      width: 10
    };
  },
  render: function(){
    var css = [];
    css.push(styles.progress);
    if(this.state.width){
      css.push({width: this.state.width});
    }
    return(
      <View>
        <Text onPress={this._setInterval} style={styles.btn}>setInterval</Text>
        <View style={css}></View>
      </View>
    );
  },
  _setInterval: function(){
    this.setInterval(function(){
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
      }, 5000);
  },
  componentDidMount: function(){
    var _that = this;
    function doAnimated(){
      _that.setState({
        width: _that.state.width + 10
      });
      if(_that.state.width < 290){
        requestAnimationFrame(doAnimated);
      }
    }
    requestAnimationFrame(doAnimated);
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
  },
  progress:{
    height:10,
    width:10, 
    marginLeft:10,
    backgroundColor:'#E72D00', 
    marginTop:10
  }
});

AppRegistry.registerComponent('App', () => App);
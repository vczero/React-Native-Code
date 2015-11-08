var React = require('react-native');
var {
  StyleSheet,
  Text,
  AppRegistry,
  View,
  Image,
  TouchableOpacity,
} = React;

var imgs = [
  'http://vczero.github.io/ctrip/hua2.png',
  'http://vczero.github.io/ctrip/nian2.png',
  'http://vczero.github.io/me/img/xiaoxue.png'
];
var MyImage = React.createClass({
  getInitialState: function(){
    var imgs = this.props.imgs;
    return {
      imgs: imgs,
      count: 0
    };
  },
  goNext: function(){
    var count = this.state.count;
    count ++;
    if(count < imgs.length){
      this.setState({
        count: count
      });
    }
  },
  goPreview: function(){
    var count = this.state.count;
    count --;
    if(count >= 0){
      this.setState({
        count: count
      });
    }
  },
  render: function(){
    return(
      <View style={[styles.flex]}>
        <View style={styles.image}>
          <Image style={styles.img} 
            source={{uri: this.state.imgs[this.state.count]}}
            resizeMode="contain"
          />
        </View>
        <View style={styles.btns}>
          <TouchableOpacity onPress={this.goPreview}>
            <View style={styles.btn}>
               <Text>上一张</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goNext}>
            <View style={styles.btn}>
               <Text>下一张</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

var App = React.createClass({
  render: function(){
    return(
      <View style={[styles.flex, {marginTop:40}]}>
        <MyImage imgs={imgs}></MyImage>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  flex:{
    flex: 1,
    alignItems:'center'
  },
  image:{
    borderWidth:1,
    width:300,
    height:200,
    borderRadius:5,
    borderColor:'#ccc'
  },
  img:{
    height:200,
    width:300,
  },
  btns:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:20
  },
  btn:{
    width:60,
    height:30,
    borderColor: '#0089FF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:3,
    marginRight:20,
  },
});

AppRegistry.registerComponent('APP', () => App);
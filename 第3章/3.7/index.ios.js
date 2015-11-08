var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  StyleSheet,
  Text,
  AppRegistry,
  View,
  Image,
  ScrollView,
  TabBarIOS,
} = React;

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height - 70;
var App = React.createClass({
  getInitialState: function(){
    return {
      tab: 'message'
    };
  },
  select: function(tabName){
    this.setState({
      tab: tabName
    });
  },
  render: function(){
    return(
      <TabBarIOS style={styles.flex}>
        <TabBarIOS.Item
          title="消息"
          icon={require("image!message")}
          onPress={this.select.bind(this, 'message')}
          selected={this.state.tab === 'message'}>
          <ScrollView>
            <View style={styles.message}>
              <Text style={styles.message_title}>南山南</Text>
              <Text>
              他不再和谁谈论相逢的孤岛，因为心里早已荒芜人烟
              他的心里再装不下一个家，做一个只对自己说谎的哑巴，他说
              你任何为人称道的美丽，不及他第一次遇见你
              时光苟延残喘无可奈何
              如果所有土地连在一起，走上一生只为去拥抱你
              喝醉了他的梦，晚安
              有天他听见有人唱着古老的歌，唱着今天还在远方发生的
              像在她眼睛里看到的孤岛，没有悲伤但也没有花朵
              你在南方的艳阳里大雪纷飞，我在北方的寒夜里四季如春
              如果天黑之前来得及，我要忘了你的眼睛
              穷极一生做不完一场梦
              大梦初醒荒唐了这一生
              南山南，北秋悲
              南山有谷堆
              南风喃 ，北海北
              北海有墓碑
              </Text>
            </View>
          </ScrollView>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="联系人"
          icon={require("image!phone")}
          onPress={this.select.bind(this, 'phonelist')}
          selected={this.state.tab === 'phonelist'}>
          <ScrollView>
            <Text style={styles.list}>
              <Text>唐三藏</Text>
              <Text>131-8904-9077</Text>
            </Text>
            <Text style={styles.list}>
              <Text>孙悟空</Text>
              <Text>131-8904-9078</Text>
            </Text>
            <Text style={styles.list}>
              <Text>猪八戒</Text>
              <Text>131-8904-9079</Text>
            </Text>
            <Text style={styles.list}>
              <Text>沙和尚</Text>
              <Text>131-8904-9080</Text>
            </Text>
          </ScrollView>          
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="动态"
          icon={require("image!star")}
          onPress={this.select.bind(this, 'star')}
          selected={this.state.tab === 'star'}>
          <ScrollView style={styles.flex}>
            <Image style={{width:width, height:height}} 
            source={{uri:'http://vczero.github.io/ctrip/star_page.jpg'}}/>            
          </ScrollView>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  flex:{
    flex: 1,
  },
  message:{
    alignItems:'center',
    marginLeft:5,
    marginRight:5,
  },
  message_title:{
    fontSize:18,
    color: '#18B5FF',
    marginBottom:5,
  },
  list:{
    height:30,
    fontSize:15,
    marginLeft:10,
    marginTop:10,
  }
});

AppRegistry.registerComponent('APP', () => App);
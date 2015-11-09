/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var DeviceManager = require('react-native-device-extension');

console.log(require('NativeModules'));

var PieChart = require('react-native-xypiechart');

var handler = function(body) {
  console.log(body.NativeEvent);
}

var chartData = [{'label':'Chrome',value:36,color:'#008800'},
          {'label':'IE8.0',value:22,color:'#0044bb'},
          {'label':'Other',value:42,color:'#444444'}]

var RNDemo = React.createClass({

    getInitialState: function() {
      return { orientation: 'unknown' };
    },

  viewDidOrientation: function(event) {
    this.state.orientation = event.Orientation;
  },
  componentDidMount: function() {
    DeviceManager.addLisener(DeviceManager.events.DEVICE_ORIENTATION_EVENT, this.viewDidOrientation);


  },
  componentWillUnmount: function() {
    DeviceManager.removeLisener(DeviceManager.events.DEVICE_ORIENTATION_EVENT, this.viewDidOrientation);
  },
  render: function() {

    return (
      <View style={styles.container}>

        <PieChart style={styles.chart} 
        chartData={chartData}
        showPercentage={true}
        onChange={(handler)}
        />

      </View>
    );

  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  chart: {
    width:200,
    height:200,
  }
});




AppRegistry.registerComponent('RNDemo', () => RNDemo);

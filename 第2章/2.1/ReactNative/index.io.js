'use strict';
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;
var BoxStyles = StyleSheet.create({
  "height50": {
    height: 50,
  },
  "height400": {
    height: 400,
  },
  "height300": {
    height: 300,
  },
  "height200": {
    height: 200,
  },
  "height100": {
    height: 100,
  },
  "width400": {
    width: 400,
  },
  "width300": {
    width: 300,
  },
  "width200": {
    width: 200,
  },
  "width100": {
    width: 100,
  },
  "bgred": {
    backgroundColor: "#6AC5AC",
  },
  "bggreen": {
    backgroundColor: "#414142",
  },
  "bgyellow": {
    backgroundColor: "#D64078",
  },
  "box": {
    flexDirection: "column",
    flex: 1,
    position: "relative",
  },
  "label": {
    top: 0,
    left: 0,
    paddingTop: 0,
    paddingRight: 3,
    paddingBottom: 3,
    paddingLeft: 0,
    position: "absolute",
    backgroundColor: "#FDC72F",
  },
  "top": {
    justifyContent: "center",
    alignItems: "center",
  },
  "bottom": {
    justifyContent: "center",
    alignItems: "center",
  },
  "right": {
    width: 50,
    justifyContent: "space-around",
    alignItems: "center",
  },
  "left": {
    width: 50,
    justifyContent: "space-around",
    alignItems: "center",
  },
  "heightdashed": {
    bottom: 0,
    top: 0,
    right: 20,
    borderLeftWidth: 1,
    position: "absolute",
    borderLeftColor: "#FDC72F"
  },
  "widthdashed": {
    bottom: 25,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    position: "absolute",
    borderTopColor: "#FDC72F"
  },
  "yellow": {
    color: "#FDC72F",
    fontWeight:"900",
  },
  "white": {
    color: "white",
    fontWeight:"900",
  },
  "margginBox":{
    "position": "absolute",
    "top": 100,
    "paddingLeft":7,
    "paddingRight":7,
  },
  "borderBox":{
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  "paddingBox":{
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  "elementBox":{
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  "measureBox":{
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems:"flex-end"
  }
})
var BoxContainer =  React.createClass({
  render:function(){
    return (
      <View style={[BoxStyles.margginBox]}  ref="lab1">
        <View style={[BoxStyles.box,BoxStyles.height400,BoxStyles.width400]}>
          <View style={[BoxStyles.top,BoxStyles.height50,BoxStyles.bgred]}>
            <Text style={BoxStyles.yellow}>top</Text></View>
          <View style={[BoxStyles.borderBox]}>
            <View style={[BoxStyles.left,BoxStyles.bgred]} >
              <Text style={BoxStyles.yellow}>left</Text></View>
            <View style={[BoxStyles.box,BoxStyles.height300]}>
              <View style={[BoxStyles.top,BoxStyles.height50,BoxStyles.bggreen]}>
                <Text style={BoxStyles.yellow}>top</Text></View>
              <View style={[BoxStyles.paddingBox]}>
                <View style={[BoxStyles.left,BoxStyles.bggreen]} >
                  <Text style={BoxStyles.yellow}>left</Text></View>
                <View style={[BoxStyles.box,BoxStyles.height200]}>
                  <View style={[BoxStyles.top,BoxStyles.height50,BoxStyles.bgyellow]}>
                    <Text style={BoxStyles.yellow}>top</Text></View>
                  <View style={[BoxStyles.elementBox]}>
                    <View style={[BoxStyles.left,BoxStyles.bgyellow]} >
                      <Text style={BoxStyles.yellow}>left</Text></View>
                    <View style={[BoxStyles.box,BoxStyles.height100]}>
                      <View  style={[BoxStyles.label]}>
                        <Text style={BoxStyles.white}>element</Text></View>
                      <View style={[BoxStyles.widthdashed]} ></View>
                      <View style={[BoxStyles.heightdashed]} ></View>
                      <View style={[BoxStyles.measureBox]} >
                        <View style={[BoxStyles.right]}>
                          <Text style={[BoxStyles.yellow]}>height</Text></View>
                      </View>
                      <View style={[BoxStyles.bottom,BoxStyles.height50]}>
                        <Text style={BoxStyles.yellow}>width</Text></View>
                    </View>
                    <View style={[BoxStyles.right,BoxStyles.bgyellow]}><Text style={BoxStyles.yellow}>right</Text></View>
                  </View>
                  <View style={[BoxStyles.bottom,BoxStyles.height50,BoxStyles.bgyellow]}>
                    <Text style={BoxStyles.yellow}>bottom</Text></View>
                  <View style={[BoxStyles.label]}>
                    <Text style={BoxStyles.white}>padding</Text></View>
                </View>
                <View style={[BoxStyles.right,BoxStyles.bggreen]}><Text style={BoxStyles.yellow}>right</Text></View>
              </View>
              <View style={[BoxStyles.bottom,BoxStyles.height50,BoxStyles.bggreen]}>
                <Text style={BoxStyles.yellow}>bottom</Text></View>
              <View style={[BoxStyles.label]}><Text style={BoxStyles.white}>border</Text></View>
            </View>
            <View style={[BoxStyles.right,BoxStyles.bgred]}>
              <Text style={BoxStyles.yellow}>right</Text></View>
          </View>
          <View style={[BoxStyles.bottom,BoxStyles.height50,BoxStyles.bgred]}>
            <Text style={BoxStyles.yellow}>bottom</Text></View>
          <View style={[BoxStyles.label]} ><Text style={BoxStyles.white}>margin</Text></View>
        </View>
      </View>
    )
  }
})
AppRegistry.registerComponent('Box', () => BoxContainer);

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
var Box = React.createClass({
  render:function(){
    return (
      <View style={[BoxStyles.box,BoxStyles[this.props.width],BoxStyles[this.props.height]]}>
        <View  style={[BoxStyles.top,BoxStyles.height50,BoxStyles[this.props.classBg]]}><Text>top</Text></View>
        <View style={[BoxStyles[this.props.childName]]}>
          <View style={[BoxStyles.left,BoxStyles[this.props.classBg]]}><Text>left</Text></View>
            {this.props.children}
          <View style={[BoxStyles.right,BoxStyles[this.props.classBg]]}><Text>right</Text></View>
        </View>
        <View style={[BoxStyles.bottom,BoxStyles.height50,BoxStyles[this.props.classBg]]}><Text>bottom</Text></View>
        <View style={[BoxStyles.label]}><Text>{this.props.boxName}</Text></View>
      </View>
    )
  }
})
var MargginBox = React.createClass({
  render:function(){
    return (
      <View style={[BoxStyles.margginBox]}>
        <Box  childName="borderBox"  height="height400" width="width400" boxName="margin" classBg="bgred">{this.props.children}</Box>
      </View>
    )
  }
})
var BorderBox = React.createClass({
  render:function(){
    return (
      <Box childName="paddingBox"  height="height300" width="width300" boxName="border" classBg="bggreen" >{this.props.children}</Box>
    )
  }
})
var PaddingBox = React.createClass({
  render:function(){
    return (
      <Box childName="elementBox"  height="height200" width="width200" boxName="padding" classBg="bgyellow" >{this.props.children}</Box>
    )
  }
})
var ElementBox = React.createClass({
  render:function(){
    return (
      <View style={[BoxStyles.box,BoxStyles.height100]}>
        <View style={[BoxStyles.measureBox]}>
          <View style={[BoxStyles.right]}><Text>height</Text></View>
        </View>
        <View style={[BoxStyles.bottom,BoxStyles.height50]} ><Text>width</Text></View>
        <View style={[BoxStyles.label]}><Text>element</Text></View>
        <View style={[BoxStyles.widthdashed]}></View>
        <View style={[BoxStyles.heightdashed]}></View>
      </View>
    )
  }
})
var BoxContainer = React.createClass({
  render:function(){
    return (
      <MargginBox>
        <BorderBox>
          <PaddingBox>
            <ElementBox>
            </ElementBox>
          </PaddingBox>
        </BorderBox>
      </MargginBox>
    )
  }
})
AppRegistry.registerComponent('Box', () => BoxContainer);

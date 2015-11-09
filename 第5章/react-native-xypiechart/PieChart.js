'use strict';

var { requireNativeComponent, } = require('react-native');
var XYPieChart = requireNativeComponent('XYPieChart', null);

module.exports = XYPieChart;


// 'use strict';

// var React = require('react-native');
// var { requireNativeComponent } = React;

// var RCTUIManager = require('NativeModules').UIManager;

// var RCT_PIECHART_REF = 'piechart';


// var XYPieChart = requireNativeComponent('XYPieChart', null);

// var PieChart = React.createClass ({

// 	_onChange: function(event: Event) {
//     	if (!this.props.onSelected) {
//       		return;
//     	}
//     	this.props.onSelected(event.nativeEvent.data);
//   	},
//   	reload: function(data) {
//     	RCTWebViewManager.reload(this.getReactTag());
//   	},

//   	getReactTag: function():any { 
//   		return React.findNodeHandle(this.refs[RCT_PIECHART_REF]);
//   	},

//   	render: function() {


//   		return (
//   			<XYPieChart
//   				ref={RCT_PIECHART_REF} 
//   				showPercentage={this.props.showPercentage}
//   				labelFont={this.props.labelFont}
//   				labelColor={this.props.labelColor}
//   				onSelected={this.props.onSelected} />):

//   	}

// });

// PieChart.propTypes = {
  
//   //注释...
//   showPercentage: React.PropTypes.bool,

//   labelFont: React.PropTypes.string,

//   labelColor: React.PropTypes.string,

//   onSelected: React.PropTypes.func

// };

// module.exports = PieChart

import { Spinner } from 'spin.js';
import refs from './refs';

var opts = {
  lines: 12, // The number of lines to draw
  length: 25, // The length of each line
  width: 18, // The line thickness
  radius: 55, // The radius of the inner circle
  scale: 0.85, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1.3, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-shrink', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000000', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '60%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
//   zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
//   position: 'absolute', // Element positioning
};


var spinner = new Spinner(opts).spin(refs.main);
export default spinner;
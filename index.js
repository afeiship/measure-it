/*

measureIt(){
  let root = this.refs.root;
  this.refs.root.style.display='block';
  this.refs.root.style.visibility='hidden';
  console.log(getMartixString(this.refs.root));
  console.log(getComputedStyle(this.refs.root).transform);
  // this.refs.root.style.transform='scale(1)';
  console.log(this.refs.root.getBoundingClientRect());
  setTimeout(()=>{
    this.refs.root.style.display = null;
    this.refs.root.style.visibility=null;
    // this.refs.root.style.transform=null;
  })
}
*/

var calcMatrix = require('calc-matrix');

function setMeasureable(el) {
  el.style.display = 'block';
  el.style.visibility = 'hidden';
  el.style.position = 'absolute';
  el.style.zIndex = -10;
}

function setDefault(el,obj) {
  var key;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      el.style[key]=obj[key];
    }
  }
}



module.exports = function(inElement){
  var style = inElement.style;
  var computedStyle = getComputedStyle(inElement);
  var _display = style.display;
  var _visibility = style.visibility;
  var _position = style.position;
  var _zIndex = style.zIndex;
  var _transform = computedStyle.transform || computedStyle.webkitTransform || computedStyle.mozTransform;
  var _martrix = calcMatrix(_transform);
  var _bound = null;

  setMeasureable(inElement);

  _bound=inElement.getBoundingClientRect();

  setDefault(inElement,{
    display:_display,
    visibility:_visibility,
    position:_position,
    zIndex:_zIndex,
  });

  return {
    width:_bound.width / _martrix.scaleX,
    height:_bound.height / _martrix.scaleY
  }
};

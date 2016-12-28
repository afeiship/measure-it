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
var isReady = false;
var forEach = Array.prototype.forEach;

function setMeasureable(el) {
  el.style.display = 'block';
  el.style.visibility = 'hidden';
  el.style.position = 'absolute';
  el.style.zIndex = -10;
}

function setDefault(el,cssText) {
  el.removeAttribute(el,'style');
  el.style.cssText = cssText;
}

function getTransfromString(inElement) {
  var computedStyle = getComputedStyle(inElement);
  return computedStyle.transform || computedStyle.webkitTransform || computedStyle.mozTransform;
}


function listenImgsLoad(inElement,inCallback){
  var images = inElement.querySelectorAll('img');
  var counter = 0;

  function _imageLoad(){
    counter++;
    if (counter == images.length) {
      inCallback.call();
    }
  }

  function _iterator(image) {
    image.addEventListener('load', _imageLoad, false);
  }

  forEach.call(images, _iterator);
}

function imageReady(inElement,inDefaultStyle,inCallback) {
  var _martrix = calcMatrix( getTransfromString (inElement));
  var _bound=inElement.getBoundingClientRect();
  setDefault(inElement,inDefaultStyle);
  inCallback.call(null,{
    width:_bound.width / _martrix.scaleX,
    height:_bound.height / _martrix.scaleY
  });
}


module.exports = function(inElement,inCallback){
  var style = inElement.style;
  var _defaultStyle = style.cssText;

  setMeasureable(inElement);
  if(!isReady){
    listenImgsLoad(inElement,function(){
      isReady = true;
      imageReady(inElement,_defaultStyle,inCallback);
    });
  }else{
    imageReady(inElement,_defaultStyle,inCallback);
  }
};

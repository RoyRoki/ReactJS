// Make the video container draggable
Draggable.create("#videoContainer", {
  type: "x,y",
  edgeResistance: 0.65,
  bounds: "body",
  inertia: true
});

// Resizing logic for the right handle
let rightHandle = document.querySelector('.right');
let bottomHandle = document.querySelector('.bottom');
let bottomRightHandle = document.querySelector('.bottomRight');
let videoContainer = document.getElementById('videoContainer');

// Track mouse movements for resizing
rightHandle.addEventListener('mousedown', function(e) {
  document.onmousemove = function(e) {
    videoContainer.style.width = (e.pageX - videoContainer.offsetLeft) + 'px';
  }
  document.onmouseup = function() {
    document.onmousemove = null;
  }
});

bottomHandle.addEventListener('mousedown', function(e) {
  document.onmousemove = function(e) {
    videoContainer.style.height = (e.pageY - videoContainer.offsetTop) + 'px';
  }
  document.onmouseup = function() {
    document.onmousemove = null;
  }
});

bottomRightHandle.addEventListener('mousedown', function(e) {
  document.onmousemove = function(e) {
    videoContainer.style.width = (e.pageX - videoContainer.offsetLeft) + 'px';
    videoContainer.style.height = (e.pageY - videoContainer.offsetTop) + 'px';
  }
  document.onmouseup = function() {
    document.onmousemove = null;
  }
});

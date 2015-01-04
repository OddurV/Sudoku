// ==============
// MOUSE HANDLING
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var g_mouseX = -1,
    g_mouseY = -1,
    g_isMouseDown = false;

function handleMouseMove(evt) {
    
    // Renew mouse positions
    g_mouseX = evt.clientX - g_canvas.offsetLeft;
    g_mouseY = evt.clientY - g_canvas.offsetTop;
}
    
function handleMouseDown(evt) {
    
    // Set mouseDown
    g_isMouseDown = true;
}

function handleMouseUp(evt) {
    
    // Set mouseDown to false
    g_isMouseDown = false;
}

// Handle "up", "down" and "move" events separately.
window.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("mouseup", handleMouseUp);
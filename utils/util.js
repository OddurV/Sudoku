// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {


// RANGES
// ======

clampRange: function(value, lowBound, highBound) {
    if (value < lowBound) {
	value = lowBound;
    } else if (value > highBound) {
	value = highBound;
    }
    return value;
},

wrapRange: function(value, lowBound, highBound) {
    while (value < lowBound) {
	value += (highBound - lowBound);
    }
    while (value > highBound) {
	value -= (highBound - lowBound);
    }
    return value;
},

isBetween: function(value, lowBound, highBound) {
    if (value < lowBound) { return false; }
    if (value > highBound) { return false; }
    return true;
},


// RANDOMNESS
// ==========

randRange: function(min, max) {
    return (min + Math.random() * (max - min));
},


// MISC
// ====

square: function(x) {
    return x*x;
},

mouseover: function(x, y, w, h) {
    return  x < g_mouseX &&
            x + w > g_mouseX &&
            y < g_mouseY &&
            y + h > g_mouseY;
},

// DISTANCES
// =========

distSq: function(x1, y1, x2, y2) {
    return this.square(x2-x1) + this.square(y2-y1);
},

wrappedDistSq: function(x1, y1, x2, y2, xWrap, yWrap) {
    var dx = Math.abs(x2-x1),
	dy = Math.abs(y2-y1);
    if (dx > xWrap/2) {
	dx = xWrap - dx;
    };
    if (dy > yWrap/2) {
	dy = yWrap - dy;
    }
    return this.square(dx) + this.square(dy);
},


// CANVAS OPS
// ==========

clearCanvas: function (ctx) {
    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;

    // Main separator lines
    ctx.save();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.moveTo(g_canvas.width/3, 0);
    ctx.lineTo(g_canvas.width/3, g_canvas.height);
    ctx.moveTo(2*g_canvas.width/3, 0);
    ctx.lineTo(2*g_canvas.width/3, g_canvas.height);
    ctx.moveTo(0, g_canvas.height/3);
    ctx.lineTo(g_canvas.width, g_canvas.height/3);
    ctx.moveTo(0, 2*g_canvas.height/3);
    ctx.lineTo(g_canvas.width, 2*g_canvas.height/3);
    ctx.stroke();
    ctx.restore();
},

strokeCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
},

fillCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
},

fillBox: function (ctx, x, y, w, h, style) {
    if (style === undefined) {
        ctx.fillRect(x, y, w, h);
        return;
    }
    
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
},

strokeBox: function (ctx, x, y, w, h, style) {
    if (style === undefined) {
        ctx.strokeRect(x, y, w, h);
        return;
    }

    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = style;
    ctx.strokeRect(x, y, w, h);
    ctx.strokeStyle = oldStyle;
}

};

/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_cells   : [[],[],[],[],[],[],[],[],[]],

// "PRIVATE" METHODS

_generateCells : function() {
    var descr;
    for (var j = 0; j < 9; j++) {
        for (var i = 0; i < 9; i++) {
            descr = {
                        x : i * g_canvas.width / 9,
                        y : j * g_canvas.height / 9
                    };
            this._cells[j].push(new Cell(descr));
        }
    }
},

// PUBLIC METHODS

init: function() {
    this._generateCells();
},

unhighlight : function () {
    for (var j = 0; j < this._cells.length; j++) {
        for (var i = 0; i < this._cells[j].length; i++) {
            this._cells[j][i].unhighlight();            
        };
    }
},

unselect : function () {
    for (var j = 0; j < this._cells.length; j++) {
        for (var i = 0; i < this._cells[j].length; i++) {
            this._cells[j][i].unselect();            
        };
    }
},

setNum : function (num) {
    for (var j = 0; j < this._cells.length; j++) {
        for (var i = 0; i < this._cells[j].length; i++) {
            if (this._cells[j][i].isSelected) this._cells[j][i].setMain(num);
        }
    }
},

update: function(du) {

    var x = Math.floor(g_mouseX/(g_canvas.width/9));
    var y = Math.floor(g_mouseY/(g_canvas.height/9));
    //console.log("x:",x,"y:",y);
    this.unhighlight();
    if (x > -1 && x < 9 && y > -1 && y < 9) {
        this._cells[y][x].highlight();
        if (g_isMouseDown) {
            this.unselect();
            this._cells[y][x].update(du);
        }
    }

//console.log(keys);
//console.log(util.hasTrue(keys));
//if (util.hasTrue(keys)) {console.log("It's working!")};

    /*for (var j = 0; j < this._cells.length; j++) {
        for (var i = 0; i < this._cells[j].length; i++) {
            this._cells[j][i].update(du);
        };
    }*/ 
},

render: function(ctx) {

    for (var j = 0; j < this._cells.length; j++) {
        for (var i = 0; i < this._cells[j].length; i++) {
            this._cells[j][i].render(ctx);
        };
    } 
}

};
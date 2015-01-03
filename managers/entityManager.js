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

_cells   : [],

// "PRIVATE" METHODS

_generateCells : function() {
    var descr;
    for (var j = 0; j < 9; j++) {
        for (var i = 0; i < 9; i++) {
            descr = {
                        x : i * g_canvas.width / 9,
                        y : j * g_canvas.height / 9
                    };
            this._cells.push(new Cell(descr));
        }
    }
},


_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._cells];
},

init: function() {
    this._generateCells();
},

unselect : function () {
    for (var i = 0; i < this._cells.length; i++) {
        this._cells[i].unselect();
    }
},

setNum : function (num) {
  for (var i = 0; i < this._cells.length; i++) {
        if (this._cells[i].isSelected) this._cells[i].setMain(num);
    }  
},

update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {

            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }
},

render: function(ctx) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);

        }
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();


// ====
// CELL
// ====
/*

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
 0        1         2         3         4         5         6         7         8
 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 */

 function Cell(descr) {
    /*
    // Diagnostics to check inheritance stuff
    this._entityProperty = true;
    console.dir(this);
    */
    this.setup(descr);
};

Cell.prototype.setup = function (descr) {

    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }
};

Cell.prototype.width = g_canvas.width / 9;
Cell.prototype.height = g_canvas.height / 9;
Cell.prototype.isSelected = false;
Cell.prototype.isHighlighted = false;
Cell.prototype.main = 0;

Cell.prototype.unselect = function () {
    this.isSelected = false;
};

Cell.prototype.select = function () {
    this.isSelected = true;
};

Cell.prototype.unhighlight = function () {
    this.isHighlighted = false;
};

Cell.prototype.highlight = function () {
    this.isHighlighted = true;
}

Cell.prototype.setMain = function (num) {
    this.main = num;
};

Cell.prototype.update = function (du) {
    this.select();
    
    /*if (util.mouseover(this.x, this.y, this.width, this.height)) {
        this.isHighlighted = true;
        if (g_isMouseDown) {
            entityManager.unselect();
            this.isSelected = true;
        }
    }
    else this.isHighlighted = false;*/
};

Cell.prototype.render = function (ctx) {
    ctx.save();
    if (this.isHighlighted) util.fillBox(ctx, this.x, this.y, this.width, this.height, "pink");
    if (this.isSelected) util.fillBox(ctx, this.x, this.y, this.width, this.height, "yellow");
    util.strokeBox(ctx, this.x, this.y, this.width, this.height, "black");
    

    ctx.linewidth = 1;
    var d = this.width/6;
    //util.strokeBox(ctx, this.x+d, this.y+d, this.width-2*d, this.height-2*d);
    ctx.textAlign = "center";
    ctx.font = "60px sans-serif";
    if (this.main !== 0) ctx.fillText(""+this.main, this.width/2+this.x, this.y+5*this.height/6);
    ctx.restore();
};
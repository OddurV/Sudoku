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
Cell.prototype.highlightState = 0;
Cell.prototype.state = 0;

// state numbers
//_____________
//|1|2| | |4|5|
//|3| | | | | |
//| | | | | | |
//| | | | | | |
//| | | | | | |
//|6|7|8| | | |

Cell.prototype.value1 = 0;
Cell.prototype.value2 = false;
Cell.prototype.value3 = false;
Cell.prototype.value4 = 0;
Cell.prototype.value5 = 0;
Cell.prototype.value6 = 0;
Cell.prototype.value7 = 0;
Cell.prototype.value8 = 0;

Cell.prototype.unselect = function () {
    this.isSelected = false;
};

Cell.prototype.select = function () {
    this.isSelected = true;
};

Cell.prototype.unhighlight = function () {
    this.isHighlighted = false;
    this.highlightState = 0;
};

Cell.prototype.highlight = function () {
    this.isHighlighted = true;
}

Cell.prototype.setNum = function (num) {

    switch (true) {
        case this.state === 0:
            this.main = num;
            break;
        case this.state === 1:
            this.value1 = num;
            break;
        case this.state === 4:
            this.value4 = num;
            break;
        case this.state === 5:
            this.value5 = num;
            break;
        case this.state === 6:
            this.value6 = num;
            break;
        case this.state === 7:
            this.value7 = num;
            break;
        case this.state === 8:
            this.value8 = num;
            break;
    }
};

Cell.prototype.update = function (du) {
    this.highlight();
    var oldState = this.state;
    this.state = 0;

    switch (true) {
        case g_mouseY > this.y + 5*this.height/6:
            if (g_mouseX < this.x + this.width/2) this.state = 8;
            if (g_mouseX < this.x + 2*this.width/6) this.state = 7;
            if (g_mouseX < this.x + this.width/6) this.state = 6;
            break;
        case g_mouseY < this.y + this.height/6:
            if (g_mouseX < this.x + 2*this.width/6) this.state = 2;
            if (g_mouseX < this.x + this.width/6) this.state = 1;
            if (g_mouseX > this.x + 4*this.width/6) this.state = 4;
            if (g_mouseX > this.x + 5*this.width/6) this.state = 5;
            break;
        case g_mouseY < this.y + 2*this.height/6:
            if (g_mouseX < this.x + this.width/6) this.state = 3;
            break;
    }

    if (this.state > 0) this.unhighlight();
    this.highlightState = this.state;

    if (g_isMouseDown) {
        
        // "eat" the mouse event
        g_isMouseDown = false;

        entityManager.unselectAll();
        this.select();
        if (this.state === 2) {
            this.value2 = !this.value2;
            this.value3 = false;
        }
        if (this.state === 3) {
            this.value2 = false;
            this.value3 = !this.value3;
        }
    }else{
        this.state = oldState;
    }
    
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
    // color the cell parts
    if (this.isHighlighted) util.fillBox(ctx, this.x, this.y, this.width, this.height, "pink");
    if (this.isSelected && this.state === 0) util.fillBox(ctx, this.x, this.y, this.width, this.height, "yellow");
    
    if (this.state > 0 || this.highlightState > 0) {
        //console.log("state:",this.state);
        var color = "pink";
        if (this.isSelected) color = "yellow";
        switch (true){
            case this.state === 1 || this.highlightState === 1:
                util.fillBox(ctx, this.x, this.y, this.width/6, this.height/6, color);
                break;
            case this.state === 2 || this.highlightState === 2:
                util.fillBox(ctx, this.x + this.width/6, this.y, this.width/6, this.height/6, color);
                break;
            case this.state === 3 || this.highlightState === 3:
                util.fillBox(ctx, this.x, this.y + this.height/6, this.width/6, this.height/6, color);
                break;
            case this.state === 4 || this.highlightState === 4:
                util.fillBox(ctx, this.x + 4*this.width/6, this.y, this.width/6, this.height/6, color);
                break;
            case this.state === 5 || this.highlightState === 5:
                util.fillBox(ctx, this.x + 5*this.width/6, this.y, this.width/6, this.height/6, color);
                break;
            case this.state === 6 || this.highlightState === 6:
                util.fillBox(ctx, this.x, this.y + 5*this.height/6, this.width/6, this.height/6, color);
                break;
            case this.state === 7 || this.highlightState === 7:
                util.fillBox(ctx, this.x + this.width/6, this.y + 5*this.height/6, this.width/6, this.height/6, color);
                break;
            case this.state === 8 || this.highlightState === 8:
                util.fillBox(ctx, this.x + 2*this.width/6, this.y + 5*this.height/6, this.width/6, this.height/6, color);
                break;
        }
    }

    // draw text
    ctx.linewidth = 1;
    var d = this.width/6;
    //util.strokeBox(ctx, this.x+d, this.y+d, this.width-2*d, this.height-2*d);
    ctx.textAlign = "center";
    ctx.font = "60px sans-serif";
    if (this.main !== 0) ctx.fillText(""+this.main, this.width/2+this.x, this.y+5*this.height/6);

    ctx.font = "10px sans-serif";
    if (this.value1) {
        ctx.fillText(this.value1, this.x+this.width/12, this.y+this.height/6);
    }
    if (this.value2) {
        ctx.fillText(">", this.x+3*this.width/12, this.y+this.height/6);
    }
    if (this.value3) {
        ctx.fillText("v", this.x+this.width/12, this.y+2*this.height/6);
    }
    if (this.value4) {
        ctx.fillText(this.value4, this.x+9*this.width/12, this.y+this.height/6);
    }
    if (this.value5) {
        ctx.fillText(this.value5, this.x+11*this.width/12, this.y+this.height/6);
    }
    if (this.value6) {
        ctx.fillText(this.value6, this.x+this.width/12, this.y+this.height);
    }
    if (this.value7) {
        ctx.fillText(this.value7, this.x+3*this.width/12, this.y+this.height);
    }
    if (this.value8) {
        ctx.fillText(this.value8, this.x+5*this.width/12, this.y+this.height);
    }

    // draw cell border
    util.strokeBox(ctx, this.x, this.y, this.width, this.height, "black");
    ctx.restore();
};
// ======
// SUDOKU
// ======
/*

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
//this is repeated in the globals file
var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
*/

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// =============
// GATHER INPUTS
// =============



function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    
    entityManager.update(du);

}

// GAME-SPECIFIC DIAGNOSTICS

var KEY_0 = keyCode('0');
var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');
var KEY_3 = keyCode('3');
var KEY_4 = keyCode('4');
var KEY_5 = keyCode('5');
var KEY_6 = keyCode('6');
var KEY_7 = keyCode('7');
var KEY_8 = keyCode('8');
var KEY_9 = keyCode('9');
var KEY_Numpad0 = 96;
var KEY_Numpad1 = 97;
var KEY_Numpad2 = 98;
var KEY_Numpad3 = 99;
var KEY_Numpad4 = 100;
var KEY_Numpad5 = 101;
var KEY_Numpad6 = 102;
var KEY_Numpad7 = 103;
var KEY_Numpad8 = 104;
var KEY_Numpad9 = 105;
var KEY_BACKSPACE = 8;
var KEY_TAB = 9;

function processDiagnostics() {
    var num = -1;
    if (eatKey(KEY_0) || eatKey(KEY_Numpad0) || eatKey(KEY_BACKSPACE)) num = 0;
    if (eatKey(KEY_1) || eatKey(KEY_Numpad1)) num = 1;
    if (eatKey(KEY_2) || eatKey(KEY_Numpad2)) num = 2;
    if (eatKey(KEY_3) || eatKey(KEY_Numpad3)) num = 3;
    if (eatKey(KEY_4) || eatKey(KEY_Numpad4)) num = 4;
    if (eatKey(KEY_5) || eatKey(KEY_Numpad5)) num = 5;
    if (eatKey(KEY_6) || eatKey(KEY_Numpad6)) num = 6;
    if (eatKey(KEY_7) || eatKey(KEY_Numpad7)) num = 7;
    if (eatKey(KEY_8) || eatKey(KEY_Numpad8)) num = 8;
    if (eatKey(KEY_9) || eatKey(KEY_Numpad9)) num = 9;

    if (num > -1) {
        entityManager.setNum(num);
        console.log(num);
    }
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    entityManager.render(ctx);
}

// Kick it off
entityManager.init();
main.init();
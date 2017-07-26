"use strict";
var css = [];
var settings = [];
var state = [];

var socket = io();

$(document).ready(function() {
    $("#buttonMenu").html(getSVG('menu'));

    socket.on("pairStatus", function(payload) {
        var pairEnabled = payload.pairEnabled;

        if (pairEnabled === true ) {
            showSection('nowPlaying');
        } else {
            showSection('pairDisabled');
        }
    });

});

function showSection(sectionName) {
    switch (sectionName) {
        case "nowPlaying":
        $("#buttonMenu").show();
        // Show Now Playing screen
        $("#nowPlaying").slideDown('fast', () => {
        });
        // Hide inactive sections
        $("#pairDisabled").hide();
        $("#libraryBrowser").hide();
        $('#overlayMainMenu').hide();
            break;
        case "libraryBrowser":
        $("#buttonMenu").show();
        // Show libraryBrowser
        $("#libraryBrowser").slideDown('fast', () => {
        });
        // Hide inactive sections
        $("#pairDisabled").hide();
        $("#nowPlaying").hide();
        $('#overlayMainMenu').hide();
            break;
        case "pairDisabled":
        // Show pairDisabled section
        $("#pairDisabled").show();
        // Hide everthing else
        $("#buttonMenu").hide();
        $("#libraryBrowser").hide();
        $("#nowPlaying").hide();
            $("#pageLoading").hide();
            break;
        default:
            break;
        }
    var t = setTimeout(function (){
        $("#pageLoading").hide();
    }, 250);
}

function getSVG(cmd) {
    switch (cmd) {
        case "menu":
            return "<svg viewBox=\"0 0 512 512\"><path d=\"M64 128h384v42.667H64V128m0 106.667h384v42.666H64v-42.666m0 106.666h384V384H64v-42.667z\"/></svg>";
        default:
            break;
    }
}

function setTheme(theme) {
    var nowplaying = $("#nowPlayingFrame").contents();

    settings.theme = readCookie('settings[\'theme\']');
    settings.theme = theme;
    state.themeShowing = undefined;
    setCookie('settings[\'theme\']', theme);

    if (theme == "dark" || theme === undefined) {
        css.backgroundColor = "#232629";
        css.foregroundColor = "#eff0f1";
        css.trackSeek = "rgba(239, 240, 241, 0.33)";

        nowplaying.find("#coverBackground").hide();
        nowplaying.find("#colorBackground").hide();
    }
    else if (theme == "cover") {
        css.backgroundColor = "#232629";
        css.foregroundColor = "#eff0f1";
        css.trackSeek = "rgba(239, 240, 241, 0.33)";

        nowplaying.find("#coverBackground").show();
        nowplaying.find("#colorBackground").hide();
    }
    else if (theme == "color") {
        state.image_key = undefined;
        nowplaying.find("#coverBackground").hide();
        nowplaying.find("#colorBackground").show();
    }
    if (settings.theme == "color"){
        var colorThief = new ColorThief();
        colorThief.getColorAsync(readCookie('state[\'imgUrl\']'), function(color){
            var r = color[0];
            var g = color[1];
            var b = color[2];
            css.colorBackground = "rgb(" + color +")";

            var yiq = ((r*299)+(g*587)+(b*114))/1000;
            if (yiq >= 128) {
                css.backgroundColor = "#eff0f1";
                css.foregroundColor = "#232629";
                css.trackSeek = "rgba(35, 38, 41, 0.33)";
            } else {
                css.backgroundColor = "#232629";
                css.foregroundColor = "#eff0f1";
                css.trackSeek = "rgba(239, 240, 241, 0.33)";
            }
            nowplaying.find("#colorBackground").show();
        });
    }
    showTheme(theme);

    socket.emit("getZone", true);
}

function showTheme(theme) {
    var nowplaying = $("#nowPlayingFrame").contents();

    nowplaying.find("body").css("background-color", css.backgroundColor).css("color", css.foregroundColor);
    nowplaying.find(".colorChange").css("color", css.foregroundColor);
    nowplaying.find("#colorBackground").css("background-color", css.colorBackground);
    nowplaying.find(".buttonAvailable").css("color", css.foregroundColor);
    nowplaying.find(".buttonInactive").css("color", css.foregroundColor);
    nowplaying.find("#trackSeek").css("background-color", css.trackSeek);
    nowplaying.find("#controlPrev, #controlPlayPauseStop, #controlNext").css("color", css.foregroundColor);

    socket.emit("getZone", true);
}

function readCookie(name){
    return Cookies.get(name);
}

function setCookie(name, value){
    Cookies.set(name, value, { expires: 7 });
}
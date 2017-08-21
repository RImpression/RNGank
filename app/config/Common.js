'use strict';

let React = require('react-native');
let Platform = require('Platform');

let {
    Dimensions,
    PixelRatio,
} = React;

let width = require('Dimensions').get('window').width;

// let statusBarHeight=Platform.OS === 'android'?window.Bridge.StatusBarHeight/PixelRatio.get():20;
let barTop = Platform.OS === 'android'?44:64;
let navBarHeight = Platform.OS === 'android'?barTop:(barTop);


let height = Platform.OS === 'android'? require('Dimensions').get('window').height: require('Dimensions').get('window').height;
let contentHeight = Platform.OS === 'android'? height-navBarHeight: height-navBarHeight;

let size = {
    width: width,
    height: height,
    /*StateBar+NavBar 高度*/
    barTop:barTop,
    navBarHeight:navBarHeight,
    /*把bar排除在外的content高度*/
    contentHeight:contentHeight,
};

module.exports = {
    size:size,
};
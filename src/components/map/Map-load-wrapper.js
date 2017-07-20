import React from 'react';
import Map from './map';
import makeAsyncScriptLoader from 'react-async-script';

const callbackName = "onloadcallback";
const URL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDITCsGciE8bzPBGAuYIIIZh0_6JtyuipI&callback=${callbackName}`;
const globalName = "grecaptcha";

export default makeAsyncScriptLoader(Map, URL, {
  callbackName: callbackName,
  globalName: globalName,
});

/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.ts ***!
  \********************************************/
console.log('in content script')

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "start" ) {
            start();
        }
    }
);

function start(){
   console.log('got it')
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'save_comments_data') {
       
        const videoId = message.payload.videoId;
        const data = message.payload.data
        console.log('will save comments data', data, videoId)
        localStorage.setItem('videoId',videoId)
        localStorage.setItem('data', JSON.stringify(data))
    }
});
/******/ })()
;
//# sourceMappingURL=contentScript.js.map
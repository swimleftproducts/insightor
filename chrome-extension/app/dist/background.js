/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/background.ts":
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
/***/ (function() {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('from background script');
chrome.runtime.onMessage.addListener((message) => __awaiter(this, void 0, void 0, function* () {
    if (message.type === 'get_comments') {
        console.log('got message');
        const videoId = message.payload.videoId;
        // run the specified function with the provided arguments
        const data = yield getComments(videoId);
        //save results to local storage
        sendMessageToContentScript(data, videoId);
    }
}));
const API_URL = 'https://sbk957ltol.execute-api.us-east-1.amazonaws.com/test/getanalysis';
const getComments = (videoId) => __awaiter(this, void 0, void 0, function* () {
    const fullURL = `${API_URL}?videoid=${videoId}&maxcomments=250`;
    let data;
    try {
        const res = yield fetch(fullURL);
        if (res.ok) {
            data = yield res.json();
            console.log('data from worker', data);
        }
        else {
            console.log(res);
        }
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
const sendMessageToContentScript = (data, videoId) => {
    const message = {
        type: 'save_comments_data',
        payload: {
            videoId,
            data
        }
    };
    console.log('data in sent to content', data);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/background/background.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=background.js.map
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
console.log('from background script')

chrome.runtime.onMessage.addListener(async (message) => {
    if (message.type === 'get_comments') {
        console.log('got message')
        const videoId = message.payload.videoId;
        // run the specified function with the provided arguments
        const data = await getComments(videoId)
        //save results to local storage
        sendMessageToContentScript(data,videoId)
    }
  });

const API_URL = 'https://sbk957ltol.execute-api.us-east-1.amazonaws.com/test/getanalysis'


const getComments = async (videoId) => {
    const fullURL = `${API_URL}?videoid=${videoId}&maxcomments=250`
    let data
    try {
        const res = await fetch(fullURL)
        if (res.ok) {
            data = await res.json()
            console.log('data from worker', data)
        } else {
            console.log(res)
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

const sendMessageToContentScript = (data,videoId) => {
    const message = {
        type: 'save_comments_data',
        payload: {
            videoId,
            data
        }
    }
    console.log('data in sent to content', data)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, message);  
    });
}
/******/ })()
;
//# sourceMappingURL=background.js.map
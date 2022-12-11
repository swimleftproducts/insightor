/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/popup/components/comment-tagger/comment-box.tsx":
/*!*************************************************************!*\
  !*** ./src/popup/components/comment-tagger/comment-box.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");


const ContentBox = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    width: 400px;
    background: lightgrey;
    height: 100px;
    padding:  15px;
    font-size: 16px;
    overflow-y: scroll;
`;
const CommentBox = ({ comment }) => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ContentBox, null, comment));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentBox);


/***/ }),

/***/ "./src/popup/components/comment-tagger/comment-tagger-container.tsx":
/*!**************************************************************************!*\
  !*** ./src/popup/components/comment-tagger/comment-tagger-container.tsx ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _comment_tagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment-tagger */ "./src/popup/components/comment-tagger/comment-tagger.tsx");
/* harmony import */ var _services_getComments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/getComments */ "./src/popup/services/getComments.ts");
/* harmony import */ var _services_getVideoMetaData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/getVideoMetaData */ "./src/popup/services/getVideoMetaData.ts");
/* harmony import */ var _services_uploadTaggedComment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/uploadTaggedComment */ "./src/popup/services/uploadTaggedComment.ts");
/* harmony import */ var _utils_tag_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/tag-list */ "./src/popup/utils/tag-list.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






const CommentTaggerContainer = ({ name }) => {
    const [videoId, setVideoId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [videoMetaData, setVideoMetaData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [commentList, setCommentList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [nextPageToken, setNextPageToken] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    // {video_title, comment_id, like_count, total_reply_count, comment, label_primary, label_secondary}
    const onTagClick = (taggedCommentData) => __awaiter(void 0, void 0, void 0, function* () {
        // handle skip click and also when there is no comment 
        if (taggedCommentData.label_primary === 'skip' || taggedCommentData.label_secondary === 'skip' || !taggedCommentData.comment) {
            const [, ...newCommentList] = commentList;
            //remove first element from comment list
            setCommentList(newCommentList);
            //update cache
            localStorage.setItem('tagging_comment_list', JSON.stringify(newCommentList));
            return;
        }
        // sent labeled data to be stored in s3
        const s3UploadData = Object.assign({ "video_id": videoId, "video_title": videoMetaData.items[0].snippet.title, "video_category": videoMetaData.items[0].snippet.categoryId, "video_description": videoMetaData.items[0].snippet.description, "tagger": name }, taggedCommentData);
        try {
            yield (0,_services_uploadTaggedComment__WEBPACK_IMPORTED_MODULE_4__.uploadTaggedComment)(s3UploadData);
        }
        catch (err) {
            console.log('upload failed');
            return;
        }
        const [, ...newCommentList] = commentList;
        //remove first element from comment list
        setCommentList(newCommentList);
        //update cache
        localStorage.setItem('tagging_comment_list', JSON.stringify(newCommentList));
    });
    const uploadAndSaveComments = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (localStorage.getItem('endOfComments'))
                return;
            const { items, nextPageToken: newNextPageToken } = yield (0,_services_getComments__WEBPACK_IMPORTED_MODULE_2__.getComments)(nextPageToken, videoId);
            console.log(items);
            setCommentList(items);
            setNextPageToken(newNextPageToken);
            localStorage.setItem('tagging_videoId', videoId);
            localStorage.setItem('tagging_comment_list', JSON.stringify(items));
            if (newNextPageToken) {
                localStorage.setItem('tagging_nextPageToken', newNextPageToken);
            }
            else {
                localStorage.setItem('endOfComments', 'true');
            }
        }
        catch (err) {
            console.log(err);
        }
    });
    const getVideoMetaData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield (0,_services_getVideoMetaData__WEBPACK_IMPORTED_MODULE_3__.getVideoDetail)(videoId);
            setVideoMetaData(data);
        }
        catch (err) {
            console.log(err);
        }
    });
    const checkAndUseCache = () => {
        const cacheVideoId = localStorage.getItem('tagging_videoId');
        if (cacheVideoId === videoId) {
            setCommentList(JSON.parse(localStorage.getItem('tagging_comment_list')));
            setNextPageToken(localStorage.getItem('tagging_nextPageToken'));
            return true;
        }
        else {
            localStorage.removeItem('endOfComments');
        }
        return false;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (!videoId)
            return;
        getVideoMetaData();
        if (checkAndUseCache())
            return;
        uploadAndSaveComments();
    }, [videoId]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const getURL = () => __awaiter(void 0, void 0, void 0, function* () {
            let videoId;
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                const url = new URL(tabs[0].url);
                const params = new URLSearchParams(url.search);
                videoId = params.get('v');
                if (videoId) {
                    setVideoId(videoId);
                }
            });
        });
        getURL();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (!commentList.length && videoId) {
            //get more comments
            uploadAndSaveComments();
        }
    }, [commentList]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_comment_tagger__WEBPACK_IMPORTED_MODULE_1__["default"], { comment: (commentList.length ? commentList[0] : null), categories: _utils_tag_list__WEBPACK_IMPORTED_MODULE_5__.TAG_LIST, categoriesNonVariable: _utils_tag_list__WEBPACK_IMPORTED_MODULE_5__.NON_VARIABLE_TAG_LIST, onTagClick: onTagClick })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentTaggerContainer);


/***/ }),

/***/ "./src/popup/components/comment-tagger/comment-tagger.tsx":
/*!****************************************************************!*\
  !*** ./src/popup/components/comment-tagger/comment-tagger.tsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _comment_box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment-box */ "./src/popup/components/comment-tagger/comment-box.tsx");
/* harmony import */ var _pill_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pill-button */ "./src/popup/components/comment-tagger/pill-button.tsx");




const Container = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    color: black;
    background: white;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    display: flex;
    padding: 0px;
    margin: 5px 0 5px 15px;
    height: 180px;
    width: 98%;
`;
const PillContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    cursor:pointer;
    color: black;
    background: white;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 0px;
    margin: 5px;
    height: 180px;
    width: 280px;
`;
const Flex = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 95%;
`;
const NonVariablePillContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    cursor:pointer;
    color: black;
    background: white;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 0px;
    margin: 0;
    height: 75x;
    width: 100%;   
`;
const TitleContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
`;
const CategoryTitle = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    width: 100%;
    text-align: center;
`;
const CommentTagger = ({ categories, categoriesNonVariable, onTagClick, comment }) => {
    const [primaryTag, setPrimaryTag] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const s3UploadData = {
        comment_id: comment === null || comment === void 0 ? void 0 : comment.id,
        like_count: comment === null || comment === void 0 ? void 0 : comment.snippet.topLevelComment.snippet.likeCount,
        total_reply_count: comment === null || comment === void 0 ? void 0 : comment.snippet.totalReplyCount,
        comment: comment === null || comment === void 0 ? void 0 : comment.snippet.topLevelComment.snippet.textDisplay,
    };
    const handlePillClick = (e, value) => {
        //if ctrl was held story the value of click
        if (value === primaryTag) {
            setPrimaryTag('');
            return;
        }
        if (e.ctrlKey && !primaryTag) {
            setPrimaryTag(value);
        }
        else {
            if (primaryTag) {
                onTagClick(Object.assign({ label_primary: primaryTag, label_secondary: value }, s3UploadData));
                setPrimaryTag('');
            }
            else {
                onTagClick(Object.assign({ label_primary: value, label_secondary: null }, s3UploadData));
                setPrimaryTag('');
            }
        }
    };
    const renderVariablePills = () => {
        return categories.map((category, idx) => {
            return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pill_button__WEBPACK_IMPORTED_MODULE_2__["default"], { wide: true, active: primaryTag === category.value, key: idx, color: category === null || category === void 0 ? void 0 : category.color, text: category.label, onClick: (e) => handlePillClick(e, category.value) }));
        });
    };
    const renderNonVariablePills = () => {
        return categoriesNonVariable.map((category, idx) => {
            let wide = true;
            let narrow = false;
            if (category.label === 'Spam' || category.label === 'Skip') {
                narrow = true;
                wide = false;
            }
            return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pill_button__WEBPACK_IMPORTED_MODULE_2__["default"], { wide: wide, narrow: narrow, active: primaryTag === category.value, key: idx, color: category === null || category === void 0 ? void 0 : category.color, text: category.label, onClick: (e) => handlePillClick(e, category.value) }));
        });
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Container, null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Flex, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_comment_box__WEBPACK_IMPORTED_MODULE_1__["default"], { comment: comment === null || comment === void 0 ? void 0 : comment.snippet.topLevelComment.snippet.textOriginal }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NonVariablePillContainer, null, renderNonVariablePills())),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Flex, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TitleContainer, null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CategoryTitle, null, "Positive"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CategoryTitle, null, "Neutral"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CategoryTitle, null, "Negative")),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PillContainer, null, renderVariablePills()))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentTagger);


/***/ }),

/***/ "./src/popup/components/comment-tagger/pill-button.tsx":
/*!*************************************************************!*\
  !*** ./src/popup/components/comment-tagger/pill-button.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");


const StyledButton = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    width: ${props => props.wide ? '85' : '110'}px;
    width: ${props => props.narrow && '45'}px;
    height: 32px;
    border-radius: 16px;
    font-size: 10px;
    line-height: 10px;
    margin: 3px 3px;
    text-align: center;
    border: 1px lightgrey solid;
    ${props => props.active && styled_components__WEBPACK_IMPORTED_MODULE_1__.css `
      border: 1px solid black;
    `}
    background: lightgrey;
    background: ${props => props.color && props.color};
    opactiy: .8;
    &:hover {
        filter: opacity(75%);
    }
`;
const Container = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;
const PillButton = ({ text, wide, narrow, onClick, color, active }) => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledButton, { wide: wide, narrow: narrow, active: active, onClick: onClick, color: color },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Container, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, text))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PillButton);


/***/ }),

/***/ "./src/popup/components/pin-input.tsx":
/*!********************************************!*\
  !*** ./src/popup/components/pin-input.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _title__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./title */ "./src/popup/components/title.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth */ "./src/popup/services/auth.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const StyledInput = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].input `
    height: 28px;
    margin-left: 12px;
    font-size: 28px;
    width: 75px;
    text-align: center;
    ${props => props.error && 'background: red;'}
`;
const StyledSpan = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].span `
    fontSize: 28px;
`;
const Container = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    border: 1px solid grey;
    padding: 15px;
    margin: 15px;
`;
const Content = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    margin-bottom: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
const Submit = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].button `
    line-height: 28px;
    margin-left: 12px;
    background: teal;
`;
const PinInput = ({ handleSuccessAuth }) => {
    const [pinValue, setPinValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const handleChange = (e) => {
        setPinValue(e.target.value);
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        //see if pin is valid, call up to main function
        if (pinValue.length === 4) {
            console.log('called');
            try {
                const { auth } = yield (0,_services_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)(pinValue);
                if (auth) {
                    //save to local storage for future in and out
                    localStorage.setItem('tagger_name', auth);
                    handleSuccessAuth(auth);
                }
                else {
                    setError(true);
                }
            }
            catch (err) {
                console.log('error occurred');
            }
        }
    });
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const name = localStorage.getItem('tagger_name');
        if (name) {
            handleSuccessAuth(name);
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setError(false);
    }, [pinValue]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Container, null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_title__WEBPACK_IMPORTED_MODULE_1__["default"], { title: `Insightor data labeling` }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Content, null, " Thank you for helping out!"),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Content, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledSpan, null, "Please enter your pin"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledInput, { error: error, maxLength: 4, value: pinValue, onChange: handleChange }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Submit, { onClick: handleSubmit }, "Submit"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PinInput);


/***/ }),

/***/ "./src/popup/components/title.tsx":
/*!****************************************!*\
  !*** ./src/popup/components/title.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");


const StyledH1 = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].h1 `
    width: 100%;
    display: block;
    font-size: 24px;
    text-align: center;
`;
const Title = ({ title }) => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledH1, null, title));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Title);


/***/ }),

/***/ "./src/popup/popup.tsx":
/*!*****************************!*\
  !*** ./src/popup/popup.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _components_pin_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/pin-input */ "./src/popup/components/pin-input.tsx");
/* harmony import */ var _components_comment_tagger_comment_tagger_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/comment-tagger/comment-tagger-container */ "./src/popup/components/comment-tagger/comment-tagger-container.tsx");





const Container = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div `
    html {
    margin: 0;
    padding: 0;
    }
    color: black;
    background: white;
    flex-direction: column;
    display: flex;
    width: 750px;
    padding: 0px;
    margin: 0px;
`;
const StyledText = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div `
    text-align: center;
    font-size: 24px;
    padding: 0px 18px 18px;
`;
const App = () => {
    const [showAuth, setShowAuth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const handleSuccessAuth = (name) => {
        setShowAuth(false);
        setName(name);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Container, null,
        showAuth && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_pin_input__WEBPACK_IMPORTED_MODULE_2__["default"], { handleSuccessAuth: handleSuccessAuth })),
        name && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_comment_tagger_comment_tagger_container__WEBPACK_IMPORTED_MODULE_3__["default"], { name: name })));
};
const body = document.body;
body.style.margin = "0";
const container = document.createElement('div');
document.body.appendChild(container);
const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
root.render(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, null));


/***/ }),

/***/ "./src/popup/services/auth.ts":
/*!************************************!*\
  !*** ./src/popup/services/auth.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAuth": () => (/* binding */ getAuth)
/* harmony export */ });
const axios = __webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs")

const API_URL = 'https://i4ns42rneavinn3qsclc3i6y340icbtd.lambda-url.us-east-1.on.aws/'


const getAuth = async (userPin) => {
   try{         
        const {data, status} = await axios.get(API_URL,{
            params: {user_pin: userPin}
        })
        return data
    }catch (error) {
        throw new Error(error)
    }
}




/***/ }),

/***/ "./src/popup/services/getComments.ts":
/*!*******************************************!*\
  !*** ./src/popup/services/getComments.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getComments": () => (/* binding */ getComments)
/* harmony export */ });
const axios = __webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs")

const API_URL = `https://www.googleapis.com/youtube/v3/commentThreads`

const getComments = async (nextPageToken, videoId) => {    
    const {data, status} = await axios.get(API_URL,{
        params: {
            pageToken: nextPageToken,
            key: "AIzaSyB8kyLq0dG94QpudqfDeNlIppFuNF4RkmA",
            videoId,
            part: 'snippet',
            textFormat: 'plaintext'
        }
    })
    return data
}




/***/ }),

/***/ "./src/popup/services/getVideoMetaData.ts":
/*!************************************************!*\
  !*** ./src/popup/services/getVideoMetaData.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getVideoDetail": () => (/* binding */ getVideoDetail)
/* harmony export */ });
const axios = __webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs")

const API_URL = `https://www.googleapis.com/youtube/v3/videos`

const getVideoDetail = async (videoId) => {      
    const {data, status} = await axios.get(API_URL,{
        params: {
            key: "AIzaSyB8kyLq0dG94QpudqfDeNlIppFuNF4RkmA",
            id:videoId,
            part: 'snippet',
        }
    })
    return data
}




/***/ }),

/***/ "./src/popup/services/uploadTaggedComment.ts":
/*!***************************************************!*\
  !*** ./src/popup/services/uploadTaggedComment.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uploadTaggedComment": () => (/* binding */ uploadTaggedComment)
/* harmony export */ });
const axios = __webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs")

const API_URL = `https://sbk957ltol.execute-api.us-east-1.amazonaws.com/test/upload-tagged`

const uploadTaggedComment = async (taggedComment) => {      
    const {data, status} = await axios.post(API_URL,{
        ...taggedComment
    })
    return data
}




/***/ }),

/***/ "./src/popup/utils/tag-list.ts":
/*!*************************************!*\
  !*** ./src/popup/utils/tag-list.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NON_VARIABLE_TAG_LIST": () => (/* binding */ NON_VARIABLE_TAG_LIST),
/* harmony export */   "TAG_LIST": () => (/* binding */ TAG_LIST)
/* harmony export */ });
const POS_COLOR = ' linear-gradient(180deg, #4BD980 0%, #3CB067 100%);'
const NEUTRAL_COLOR = 'linear-gradient(180deg, #F2C287 0%, #D8AB73 100%);'
const NEG_COLOR = 'linear-gradient(180deg, #F36161 0%, #CC4E4E 100%);'

const NON_VARIABLE_TAG_LIST = [
    {
        label: 'Information',
        value: 'information',
        color: 'linear-gradient(180deg, #AAAAAA 0%, #8B8B8B 100%);'
    },
    {
        label: 'Advice give or ask',
        value: 'advice',
        color: 'linear-gradient(180deg, #469EAE 0%, #468894 100%);'
    },
    {
        label: 'Video content description',
        value: 'video_content_description',
        color: 'linear-gradient(180deg, #FD6BB4 0%, #DB5C9B 100%);'
    },
    {
        label: 'Spam',
        value: 'spam',
        color: 'linear-gradient(180deg, #FFED47 0%, #DBCB39 100%);'
    },
    {
        label: 'Skip',
        value: 'skip',
        color: 'white'
    }
]

const TAG_LIST =[
    {
        label: 'Impression',
        value: 'impression_pos',
        color: POS_COLOR
        
    },
    {
        label: 'Impression',
        value: 'impression_neutral',
        color: NEUTRAL_COLOR
    },
    {
        label: 'Impression',
        value: 'impression_neg',
        color: NEG_COLOR
    },
    {
        label: 'General Conv. ',
        value: 'general_conversation_pos',
        color: POS_COLOR
    },
    {
        label: 'General Conv.',
        value: 'general_conversation_neutral',
        color: NEUTRAL_COLOR
    },
    {
        label: 'General Conv.',
        value: 'general_conversation_neg',
        color: NEG_COLOR
    },
    {
        label: 'Opinion',
        value: 'opinion_pos',
        color: POS_COLOR
    },
    {
        label: 'Opinion',
        value: 'opinion_neutral',
        color: NEUTRAL_COLOR
    },
    {
        label: 'Opinion',
        value: 'opinion_neg',
        color: NEG_COLOR
    },
    {
        label: 'Personal Feels',
        value: 'personal_feelings_pos',
        color: POS_COLOR
    },
    {
        label: 'Personal Feels ',
        value: 'personal_feelings_neutral',
        color: NEUTRAL_COLOR
    },
    {
        label: 'Personal Feels',
        value: 'personal_feelings_neg',
        color: NEG_COLOR
    },
]



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"popup": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkapp"] = self["webpackChunkapp"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_react-dom_client_js-node_modules_styled-components_dist_styled-component-830dfd","vendors-node_modules_axios_dist_browser_axios_cjs"], () => (__webpack_require__("./src/popup/popup.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=popup.js.map
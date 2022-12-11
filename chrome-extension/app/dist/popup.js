/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/popup/components/sentiment-display/sentiment-comment-display.tsx":
/*!******************************************************************************!*\
  !*** ./src/popup/components/sentiment-display/sentiment-comment-display.tsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");


const Container = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    display: flex;
    flex-direction: column;
    max-height: 250px;
    padding: 20px ;
    overflow-y: auto;
    overflow-x: hidden;
`;
const Row = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    display: flex;
    flex-direction: row;
    width: 400px;
    justify-content: start;
    align-items: center;
    margin: 6px 0px;
`;
const Sentiment = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    font-size: 18px;
    color: darkgrey;
    width: 60px;
`;
const Comment = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    margin-left: 20 px;
    width: 320px;
`;
const SentimentCommentDisplay = ({ comments, setShowSentimentComments }) => {
    const renderComments = () => {
        comments = comments.slice(0, 3);
        return comments.map((comment, idx) => {
            return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Row, { key: idx, onClick: () => setShowSentimentComments(false) },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Sentiment, null, comment[1].toString().slice(0, 4)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Comment, null, comment[0])));
        });
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Container, null, renderComments()));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SentimentCommentDisplay);


/***/ }),

/***/ "./src/popup/components/sentiment-display/sentiment-display-container.tsx":
/*!********************************************************************************!*\
  !*** ./src/popup/components/sentiment-display/sentiment-display-container.tsx ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _sentiment_display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sentiment-display */ "./src/popup/components/sentiment-display/sentiment-display.tsx");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3 */ "./node_modules/d3/src/index.js");
/* harmony import */ var _sentiment_comment_display__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sentiment-comment-display */ "./src/popup/components/sentiment-display/sentiment-comment-display.tsx");





const Container = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div `
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    height: 120px;
    margin: 5px 0 10px 0;
    
`;
const BINS = 20;
const SentimentDisplayContainer = ({ sentiments, comments, setShowSentimentComments, showSentimentComments }) => {
    const [histogramData, setHistogramData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [sentimentComments, setSentimentComments] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const handleGraphClick = (binIdx, low, high) => {
        // find sentiments in range by location
        const commentsToFind = [];
        const commentsFound = [];
        sentiments.map((item, idx) => {
            if (item < high && item > low) {
                commentsToFind.push([idx, item]);
            }
        });
        commentsToFind.map((binnedComment) => {
            commentsFound.push([comments[binnedComment[0]], binnedComment[1]]);
        });
        setShowSentimentComments(true);
        setSentimentComments(commentsFound);
    };
    const binSentiments = (sentiments, bins) => {
        // bin from -1 to 1 in <bin> bins
        let binGenerator = d3__WEBPACK_IMPORTED_MODULE_2__.bin().domain([-1, 1]).thresholds(bins);
        let binned = binGenerator(sentiments);
        let histogramData = binned;
        return histogramData;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (!sentiments)
            return;
        const zeroRemovedSentiment = sentiments.filter((value) => value !== 0);
        let histogramData = binSentiments(zeroRemovedSentiment, BINS);
        setHistogramData(histogramData);
    }, [sentiments]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        showSentimentComments && sentimentComments && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_sentiment_comment_display__WEBPACK_IMPORTED_MODULE_3__["default"], { comments: sentimentComments, setShowSentimentComments: setShowSentimentComments }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Container, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_sentiment_display__WEBPACK_IMPORTED_MODULE_1__["default"], { sentiments: histogramData, handleGraphClick: handleGraphClick }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SentimentDisplayContainer);


/***/ }),

/***/ "./src/popup/components/sentiment-display/sentiment-display.tsx":
/*!**********************************************************************!*\
  !*** ./src/popup/components/sentiment-display/sentiment-display.tsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");


const Container = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: end;
    width: 350px;
    height: 120px;
  
`;
const Bar = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background: ${({ totalBins, position }) => `rgb(${(255 * position) / totalBins},0,${(255 * (totalBins - position)) / totalBins})`};
`;
const SentimentDisplay = ({ sentiments, handleGraphClick }) => {
    const MAX_BAR_HEIGHT = 120;
    const WIDTH = 300;
    const CreateBar = (position, value, bins, maxValue) => {
        let total = value.length;
        const height = total / maxValue * MAX_BAR_HEIGHT;
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Bar, { height: height, position: position, totalBins: bins, key: position, width: WIDTH / sentiments.length, onClick: () => handleGraphClick(position, value.x0, value.x1) }));
    };
    const makeBars = () => {
        if (!sentiments)
            return;
        const onlyTotals = sentiments.map((item) => item.length);
        let maxValue = Math.max(...onlyTotals);
        let totalBins = sentiments.length;
        const bars = sentiments.map((value, idx) => {
            return CreateBar(idx, value, totalBins, maxValue);
        });
        return bars;
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Container, null, makeBars()));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SentimentDisplay);


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

/***/ "./src/popup/components/word-bubble/word-bubble-detail.tsx":
/*!*****************************************************************!*\
  !*** ./src/popup/components/word-bubble/word-bubble-detail.tsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");


const COLOR_MAP = {
    ADJ: 'yellow',
    ADP: 'teal',
    ADV: 'pink',
    AUX: 'grey',
    CCONJ: 'grey',
    DET: 'beige',
    INTJ: 'red',
    NOUN: 'blue',
    NUM: 'coral',
    PART: 'white',
    PRON: 'orange',
    PROPN: 'darkturquoise',
    PUNCT: 'white',
    SCONJ: 'darkgrey',
    SYM: 'hotpink',
    VERB: 'green',
    X: 'white'
};
const Container = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    background: ${props => COLOR_MAP[props.pos]};
    border-radius: 18px;
    margin: 3px 3px;
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const Text = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].span `
    font-size: 16px;
`;
const Occurrence = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].span `
    padding-left:12px;
    font-size: 16px;
`;
const Comments = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    background: white;
    margin-bottom: 8px;
    border-radius: 0 0 8px 8px;
    padding: 0px 8px;
`;
const WordBubbleDetail = ({ word, comments }) => {
    const handleClick = (e) => {
        e.stopPropagation();
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Container, { onClick: handleClick, pos: word[1] },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Text, null, word[0]),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Occurrence, null, word[2])),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Comments, null, comments.map((comment, idx) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", { key: idx }, comment))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WordBubbleDetail);


/***/ }),

/***/ "./src/popup/components/word-bubble/word-bubblev2.tsx":
/*!************************************************************!*\
  !*** ./src/popup/components/word-bubble/word-bubblev2.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");


const COLOR_MAP = {
    // Yellow
    ADJ: { bgColor: "linear-gradient(180deg, #FFED47 0%, #DBCB39 100%);", textColor: "black" },
    // Teal
    ADP: { bgColor: "linear-gradient(180deg, #08B7B7 0%, #029393 100%);", textColor: "white" },
    // Hot Pink
    ADV: { bgColor: "linear-gradient(180deg, #FD6BB4 0%, #DB5C9B 100%);", textColor: "white" },
    // Grey
    AUX: { bgColor: "linear-gradient(180deg, #CFCFCF 0%, #B0B0B0 100%);", textColor: "black" },
    CCONJ: { bgColor: "linear-gradient(180deg, #CFCFCF 0%, #B0B0B0 100%);", textColor: "black" },
    // Red
    DET: { bgColor: "linear-gradient(180deg, #F36161 0%, #CC4E4E 100%);, ", textColor: "white" },
    // Coral
    INTJ: { bgColr: "linear-gradient(180deg, #469EAE 0%, #468894 100%);", textColor: "white" },
    // Blue
    NOUN: { bgColor: "linear-gradient(180deg, #72ABFA 0%, #467ECB 100%);", textColor: "white" },
    // Beige
    NUM: { bgColor: "linear-gradient(180deg, #F2C287 0%, #D8AB73 100%);", textColor: "black" },
    // White
    PART: { bgColor: "linear-gradient(180deg, #FDFDFD 0%, #E7E7E7 100%);", textColor: "black" },
    // Orange
    PRON: { bgColor: "linear-gradient(180deg, #FF9F7B 0%, #CD7E61 100%);", textColor: "white" },
    // Teal
    PROPN: { bgColor: "linear-gradient(180deg, #08B7B7 0%, #029393 100%);", textColor: "white" },
    // White
    PUNCT: { bgColor: "linear-gradient(180deg, #FDFDFD 0%, #E7E7E7 100%);", textColor: "black" },
    // Dark Grey
    SCONJ: { bgColor: "linear-gradient(180deg, #AAAAAA 0%, #8B8B8B 100%);", textColor: "white" },
    // Pink
    SYM: { bgColor: "linear-gradient(180deg, #FFA7D3 0%, #D390B2 100%);, ", textColor: "black" },
    // Green
    VERB: { bgColor: "linear-gradient(180deg, #4BD980 0%, #3CB067 100%);, ", textColor: "black" },
    // White
    X: { bgColor: "linear-gradient(180deg, #FDFDFD 0%, #E7E7E7 100%);, ", textColor: "black" },
};
/*
const COLOR_MAP = {
    ADJ: 'yellow',
    ADP: 'teal',
    ADV: 'pink',
    AUX: 'grey',
    CCONJ: 'grey',
    DET: 'beige',
    INTJ: 'red',
    NOUN: 'blue',
    NUM: 'coral',
    PART: 'white',
    PRON: 'orange',
    PROPN: 'darkturquoise',
    PUNCT: 'white',
    SCONJ: 'darkgrey',
    SYM: 'hotpink',
    VERB: 'green',
    X: 'white'
}
*/
const Container = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
    display: inline-flex;
    align-items: center;
    background: ${(props) => COLOR_MAP[props.pos].bgColor};
    color: ${(props) => COLOR_MAP[props.pos].textColor};
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 72px;
    gap: 8px;
    padding: 6px 6px 6px 14px;
    &:hover{
        opacity: .7;
    }
`;
const Text = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
	font-size: 16px;
`;
const Occurrence = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div `
	width: 12px;
	height: 12px;
	background: white;
	text-align: center;
	border: 1px solid rgba(0, 0, 0, 0.08);
	font-size: 14px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 6px;
	border-radius: 50%;
	color: black;
`;
const WordBubble = ({ word, handleBubbleClick }) => {
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleBubbleClick(word[0]);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Container, { pos: word[1], onClick: handleClick },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Text, null, word[0]),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Occurrence, null, word[2])));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WordBubble);


/***/ }),

/***/ "./src/popup/components/word-display/word-display-container.tsx":
/*!**********************************************************************!*\
  !*** ./src/popup/components/word-display/word-display-container.tsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _word_display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./word-display */ "./src/popup/components/word-display/word-display.tsx");



const LONG_WORD_LENGTH = 10;
const Container = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div `
    display: flex;
    flex-direction: column;
    max-height: 550px;
    margin: 0px 16px;
`;
const Loading = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div `
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    color: darkgrey;
`;
const WordDisplayContainer = ({ commentData, setHideSentimentAnalysis }) => {
    const [detailWord, setDetailWord] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [words, setWords] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const handleBubbleClick = (word) => {
        // hide sentiment on clicking a bubble
        setHideSentimentAnalysis(true);
        // search for word in comments. return first three
        const searchResults = commentData.comments.filter((comment, idx) => {
            return comment.toLocaleLowerCase().includes(word.toLowerCase());
        });
        //todo: I should just use ellipsies in the display
        const reducedWordCountComments = searchResults.slice(0, 3).map((comment) => {
            let shortComment = comment.slice(0, 150);
            return shortComment += '...';
        });
        setDetailWord({
            word: word,
            comments: reducedWordCountComments
        });
    };
    const clearBubbleDetail = () => {
        setDetailWord(null);
        setHideSentimentAnalysis(false);
    };
    const findLongWords = (words) => {
        const wordsToPull = 3;
        let foundWords = 0;
        const results = [];
        for (let index = 0; index < words.length; index++) {
            const element = words[index];
            if (element[0].length > LONG_WORD_LENGTH) {
                const regex = /[.,:!?]/;
                if (!regex.test(element[0])) {
                    foundWords++;
                    results.push(element);
                }
            }
            if (foundWords === wordsToPull)
                break;
        }
        return results;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (commentData) {
            const words = commentData === null || commentData === void 0 ? void 0 : commentData.words.slice(0, 15);
            //create array of long words
            const longWords = findLongWords(commentData === null || commentData === void 0 ? void 0 : commentData.words);
            longWords.map(longWord => {
                //check if longword is in words
                let isPresent = false;
                words.map(word => {
                    if (word[0] === longWord[0]) {
                        isPresent = true;
                    }
                });
                if (!isPresent)
                    words.unshift(longWord);
            });
            setWords(words);
        }
    }, [commentData]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Container, null, words ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_word_display__WEBPACK_IMPORTED_MODULE_1__["default"], { onClick: clearBubbleDetail, words: words.slice(0, 15), detailWord: detailWord, handleBubbleClick: handleBubbleClick }) : react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Loading, null, "Loading")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WordDisplayContainer);


/***/ }),

/***/ "./src/popup/components/word-display/word-display.tsx":
/*!************************************************************!*\
  !*** ./src/popup/components/word-display/word-display.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _word_bubble_word_bubblev2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../word-bubble/word-bubblev2 */ "./src/popup/components/word-bubble/word-bubblev2.tsx");
/* harmony import */ var _word_bubble_word_bubble_detail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../word-bubble/word-bubble-detail */ "./src/popup/components/word-bubble/word-bubble-detail.tsx");




const Container = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    display: flex;
    justify-content: start;
    align-items: center;
    flex-flow: row wrap;
    gap: 8px;
    height: 190px;
    ${props => props.allowExpandY && styled_components__WEBPACK_IMPORTED_MODULE_3__.css `
        height: unset;
    `}
    overflow: scroll;
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
`;
const Title = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
	display: flex;
	justify-content: start;
	width: 100%;
	font-size: 1rem;
	font-weight: bold;
	margin-bottom: 8px;
`;
const WordDisplay = ({ words, detailWord, handleBubbleClick, onClick }) => {
    const bubbles = words.map((word, idx) => {
        if (word[0] !== (detailWord === null || detailWord === void 0 ? void 0 : detailWord.word))
            return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_word_bubble_word_bubblev2__WEBPACK_IMPORTED_MODULE_1__["default"], { key: idx, word: word, handleBubbleClick: handleBubbleClick });
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_word_bubble_word_bubble_detail__WEBPACK_IMPORTED_MODULE_2__["default"], { key: idx, word: word, comments: detailWord === null || detailWord === void 0 ? void 0 : detailWord.comments });
    });
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Title, null, "Common words"),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Container, { onClick: onClick, allowExpandY: !!detailWord }, bubbles)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WordDisplay);


/***/ }),

/***/ "./src/popup/popup.tsx":
/*!*****************************!*\
  !*** ./src/popup/popup.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _components_title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/title */ "./src/popup/components/title.tsx");
/* harmony import */ var _components_word_display_word_display_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/word-display/word-display-container */ "./src/popup/components/word-display/word-display-container.tsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _components_sentiment_display_sentiment_display_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/sentiment-display/sentiment-display-container */ "./src/popup/components/sentiment-display/sentiment-display-container.tsx");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const Container = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div `
    html {
    margin: 0;
    padding: 0;
    background: none;
    border-radius: 25px;
    }
    color: black;
    background: white;
    flex-direction: column;
    display: flex;
    width: 450px;
    padding: 0px;
    margin: 0px;
`;
const StyledText = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div `
    text-align: center;
    font-size: 24px;
    padding: 0px 18px 18px;
`;
const App = () => {
    const [videoId, setVideoId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [isYouTube, setIsYouTube] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const [commentData, setCommentData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [showSentimentComments, setShowSentimentComments] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [hideSentimentAnalysis, setHideSentimentAnalysis] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
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
                else {
                    setIsYouTube(false);
                }
            });
        });
        getURL();
    }, []);
    const API_URL = 'https://sbk957ltol.execute-api.us-east-1.amazonaws.com/test/getanalysis';
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (!videoId)
            return;
        // still working on this
        // const message = {
        //     type: 'get_comments',
        //     payload: {
        //         videoId
        //     }
        // }
        // chrome.runtime.sendMessage(message);
        const getData = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log('video id is', videoId);
                console.log('videoid in local is', localStorage.getItem('videoId'));
                if (localStorage.getItem('videoId') !== videoId) {
                    const { data, status } = yield axios__WEBPACK_IMPORTED_MODULE_6__["default"].get(API_URL, {
                        params: { videoid: videoId, maxcomments: 250 },
                    });
                    setCommentData(data);
                    localStorage.setItem('videoId', videoId);
                    localStorage.setItem('data', JSON.stringify(data));
                }
                else {
                    let data = JSON.parse(localStorage.getItem('data'));
                    setCommentData(data);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        getData(videoId);
    }, [videoId]);
    if (!isYouTube) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Container, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_title__WEBPACK_IMPORTED_MODULE_2__["default"], { title: `Insightor: no video` }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledText, null, "Navigate to a youtube video then relaunch the extension to get comment insights")));
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Container, null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_title__WEBPACK_IMPORTED_MODULE_2__["default"], { title: `Insightor2: ${videoId}` }),
        (!showSentimentComments) && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_word_display_word_display_container__WEBPACK_IMPORTED_MODULE_3__["default"], { setHideSentimentAnalysis: setHideSentimentAnalysis, commentData: commentData }),
        (!hideSentimentAnalysis) && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_sentiment_display_sentiment_display_container__WEBPACK_IMPORTED_MODULE_4__["default"], { sentiments: commentData === null || commentData === void 0 ? void 0 : commentData.sentiments, comments: commentData === null || commentData === void 0 ? void 0 : commentData.comments, setShowSentimentComments: setShowSentimentComments, showSentimentComments: showSentimentComments })));
};
const body = document.body;
body.style.margin = "0";
const container = document.createElement('div');
document.body.appendChild(container);
const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
root.render(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, null));


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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_react-dom_client_js-node_modules_styled-components_dist_styled-component-830dfd","vendors-node_modules_axios_lib_axios_js-node_modules_d3_src_index_js"], () => (__webpack_require__("./src/popup/popup.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=popup.js.map
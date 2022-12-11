import React from "react";
import styled from "styled-components";

interface WordBubbleProps {
	word: singleWord;
	handleBubbleClick: (word: string) => void;
}
type singleWord = [string, string, number];

const COLOR_MAP = {
	// Yellow
	ADJ: { bgColor: "linear-gradient(180deg, #FFED47 0%, #DBCB39 100%);", textColor: "black" },
	// Teal
	ADP: {bgColor: "linear-gradient(180deg, #08B7B7 0%, #029393 100%);", textColor: "white" },
	// Hot Pink
	ADV: {bgColor: "linear-gradient(180deg, #FD6BB4 0%, #DB5C9B 100%);", textColor: "white" },
	// Grey
	AUX: {bgColor:"linear-gradient(180deg, #CFCFCF 0%, #B0B0B0 100%);", textColor: "black"},
	CCONJ: {bgColor:"linear-gradient(180deg, #CFCFCF 0%, #B0B0B0 100%);", textColor: "black"},
	// Red
	DET: {bgColor: "linear-gradient(180deg, #F36161 0%, #CC4E4E 100%);, ", textColor: "white"},
	// Coral
	INTJ: {bgColr:"linear-gradient(180deg, #469EAE 0%, #468894 100%);", textColor: "white"},
	// Blue
	NOUN: {bgColor: "linear-gradient(180deg, #72ABFA 0%, #467ECB 100%);", textColor: "white"},
	// Beige
	NUM: {bgColor: "linear-gradient(180deg, #F2C287 0%, #D8AB73 100%);" , textColor: "black"},
	// White
	PART: {bgColor: "linear-gradient(180deg, #FDFDFD 0%, #E7E7E7 100%);", textColor: "black"},
	// Orange
	PRON: {bgColor: "linear-gradient(180deg, #FF9F7B 0%, #CD7E61 100%);" , textColor: "white"},
	// Teal
	PROPN: {bgColor: "linear-gradient(180deg, #08B7B7 0%, #029393 100%);", textColor: "white"},
	// White
	PUNCT: {bgColor: "linear-gradient(180deg, #FDFDFD 0%, #E7E7E7 100%);", textColor: "black"},
	// Dark Grey
	SCONJ: {bgColor: "linear-gradient(180deg, #AAAAAA 0%, #8B8B8B 100%);", textColor: "white"},
	// Pink
	SYM: {bgColor: "linear-gradient(180deg, #FFA7D3 0%, #D390B2 100%);, ", textColor: "black"},
	// Green
	VERB: {bgColor: "linear-gradient(180deg, #4BD980 0%, #3CB067 100%);, ", textColor: "black"},
	// White
	X: {bgColor: "linear-gradient(180deg, #FDFDFD 0%, #E7E7E7 100%);, ", textColor: "black"},
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
const Container = styled.div`
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
const Text = styled.div`
	font-size: 16px;
`;
const Occurrence = styled.div`
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

const WordBubble = ({ word, handleBubbleClick }: WordBubbleProps) => {
	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		handleBubbleClick(word[0]);
	};
	return (
		<Container pos={word[1]} onClick={handleClick}>
			<Text>{word[0]}</Text>
			<Occurrence>{word[2]}</Occurrence>
		</Container>
	);
};

export default WordBubble;

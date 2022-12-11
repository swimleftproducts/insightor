import React from "react";
import styled from "styled-components";
import COLOR_MAP from "../../utils/color-map";

interface WordBubbleProps {
	word: singleWord;
	handleBubbleClick: (word: string) => void;
}
type singleWord = [string, string, number];


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

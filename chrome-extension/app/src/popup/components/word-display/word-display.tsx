import React from 'react'
import styled from 'styled-components'
import WordBubble from '../word-bubble/word-bubblev2'
import WordBubbleDetail from '../word-bubble/word-bubble-detail'

interface WordDisplayProps {
    onClick: () => void,
    words: singleWord[],
    detailWord?: any,
    handleBubbleClick: (word: string) => void,
}

type singleWord = [
    string, string, number
]
    
const Container = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-flow: row wrap;
    gap: 8px;
    height: 190px;
    overflow: hidden;
`
const Title = styled.div`
    display: flex;
    justify-content: start;
    width: 100%;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 8px;
`

const WordDisplay = ({words, detailWord, handleBubbleClick, onClick}: WordDisplayProps) => {

    const bubbles = words.map((word,idx) => {
        if (word[0] !== detailWord?.word) return (
            <WordBubble key={idx} word={word} handleBubbleClick={handleBubbleClick} />
        )
        return (
            <WordBubbleDetail key={idx} word={word} comments={detailWord?.comments}/>
        )
    })

    return (
        <>
        <Title>Title</Title>
        <Container onClick={onClick}>
            {bubbles}
        </Container>
        
        </>
        
    )
}

export default WordDisplay
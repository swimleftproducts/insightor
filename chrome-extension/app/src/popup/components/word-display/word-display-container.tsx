import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import WordDisplay from './word-display'


type  detailWordType =  {
    word: string,
    comments: string[]
}
interface WordDisplayContainerProps {
    commentData: {
        comments: string[],
        sentiments: number[],
        words: [string, string, number][]
    },
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 250px;
    max-height: 4250px;
`
const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    color: darkgrey;
`

const WordDisplayContainer = ({commentData}: WordDisplayContainerProps) => {
    const [detailWord, setDetailWord] = useState<detailWordType | null>(null)
    const [words, setWords] = useState<any>('')
    
  
    

    const handleBubbleClick = (word: string) => {
        console.log('word clicked is', word)
        setDetailWord({
            word: word,
            comments: [
                'this is one',
                'this is another',
                'this is a last one'
            ]
        })
    }
    const clearBubbleDetail = () => setDetailWord(null)

    useEffect(()=>{
        if(commentData){
            setWords(commentData?.words)
        }
    },[commentData])

    return (
        <Container>
                {words ? <WordDisplay onClick={clearBubbleDetail} words={words.slice(0,20)} detailWord={detailWord} handleBubbleClick={handleBubbleClick}/> : <Loading>Loading</Loading>}
                
        </Container>
    )
}

export default WordDisplayContainer
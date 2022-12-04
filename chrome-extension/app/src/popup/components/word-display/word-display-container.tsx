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
    max-height: 425px;
    margin: 0px 16px;
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
        // serach for word in comments. return first three
        const searchResults = commentData.comments.filter((comment, idx) =>{
            return comment.toLocaleLowerCase().includes(word.toLowerCase())
        })
        
        //todo: I should just use ellipsies in the display
        const reducedWordCountComments = searchResults.slice(0,3).map((comment) => {
            let shortComment = comment.slice(0, 150) 
           return shortComment += '...'
        })

        setDetailWord({
            word: word,
            comments: reducedWordCountComments
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
                {words ? <WordDisplay onClick={clearBubbleDetail} words={words.slice(0,15)} detailWord={detailWord} handleBubbleClick={handleBubbleClick}/> : <Loading>Loading</Loading>}
        </Container>
    )
}

export default WordDisplayContainer
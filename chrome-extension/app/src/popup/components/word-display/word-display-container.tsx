import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import WordDisplay from './word-display'

const LONG_WORD_LENGTH = 10

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
    setHideSentimentAnalysis: (showOrHide: boolean) => void,
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 550px;
    margin: 0px 16px;
`
const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    color: darkgrey;
`

const WordDisplayContainer = ({commentData, setHideSentimentAnalysis}: WordDisplayContainerProps) => {
    const [detailWord, setDetailWord] = useState<detailWordType | null>(null)
    const [words, setWords] = useState<any>('')

    const handleBubbleClick = (word: string) => {
        // hide sentiment on clicking a bubble
        setHideSentimentAnalysis(true)
        // search for word in comments. return first three
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
    const clearBubbleDetail = () => {
        setDetailWord(null)
        setHideSentimentAnalysis(false)
    }
    
    const findLongWords = (words:[string,string,number][]) => {
        const wordsToPull = 3
        let foundWords = 0
        const results = []
        for (let index = 0; index < words.length; index++) {
            const element = words[index];
            if (element[0].length > LONG_WORD_LENGTH) {
                const regex = /[.,:!?]/
                if (!regex.test(element[0])){
                    foundWords++
                    results.push(element)
                }
            }

            if (foundWords === wordsToPull)  break
        }
        return  results
    }

    useEffect(()=>{
        if(commentData){
            const words = commentData?.words.slice(0,15)
            //create array of long words
            const longWords = findLongWords(commentData?.words)
            longWords.map(longWord => {
                //check if longword is in words
                let isPresent=false
                words.map(word => {
                    if (word[0]===longWord[0]){
                        isPresent = true
                    }
                })
                if (!isPresent) words.unshift(longWord)
            })
            setWords(words)
        }
    },[commentData])

    return (
        <Container>
                {words ? <WordDisplay onClick={clearBubbleDetail} words={words.slice(0,15)} detailWord={detailWord} handleBubbleClick={handleBubbleClick}/> : <Loading>Loading</Loading>}
        </Container>
    )
}

export default WordDisplayContainer
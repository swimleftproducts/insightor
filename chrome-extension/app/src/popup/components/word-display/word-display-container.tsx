import React, { useState } from 'react'
import styled from 'styled-components'
import WordDisplay from './word-display'

type singleWord = [
    string, string, number
]
type  detailWordType =  {
    word: string,
    comments: string[]
}
interface WordDisplayContainerProps {
    commentData: any,
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 250px;
`

const words: singleWord[] = [['apple', 'PROPN' ,3], ['be','AUX' ,3],['look','VERB',5],['buy','VERB',1],
['very','ADJ',8],['girl','NOUN',5],['woah','INTJ',7],['tomorrow','ADV',2],
['interesting','ADJ',7], ['hardware','NOUN',16],['awesome','ADJ',8],['technology','NOUN',9]
]


const WordDisplayContainer = ({commentData}: WordDisplayContainerProps) => {
    const [detailWord, setDetailWord] = useState<detailWordType | null>(null)
    
    




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

    return (
        <Container>
                <WordDisplay onClick={clearBubbleDetail} words={words} detailWord={detailWord} handleBubbleClick={handleBubbleClick}/>
        </Container>
    )
}

export default WordDisplayContainer
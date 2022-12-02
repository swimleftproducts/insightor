import React from 'react'
import styled from 'styled-components'

interface WordBubbleProps {
    word: singleWord,
    handleBubbleClick: (word:string) => void,
}
type singleWord = [
    string, string, number
]

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


const Container = styled.div`
    display: inline-block;
    background: ${props => COLOR_MAP[props.pos]};
    border: 1px solid grey;
    display: inline-block;
    border-radius: 18px;
    margin: 3px 3px;
    padding: 6px 12px;
    &:hover{
        opacity: .7;
    }
`
const Text = styled.span`
    font-size: 16px;
`
const Occurrence = styled.span`
    padding-left:12px;
    font-size: 16px;
`

const WordBubble = ({word, handleBubbleClick}: WordBubbleProps) => {

    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        handleBubbleClick(word[0])
    }  
     return (
            <Container pos={word[1]}  onClick={handleClick}>
                <Text>
                    {word[0]}
                </Text>
                <Occurrence>
                    {word[2]}
                </Occurrence>
            </Container>
  )
}

export default WordBubble
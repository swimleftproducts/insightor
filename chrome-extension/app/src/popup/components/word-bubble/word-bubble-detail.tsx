import React from 'react'
import styled from 'styled-components'

interface WordBubbleProps {
    word: singleWord,
    comments: any,
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
    background: ${props => COLOR_MAP[props.pos]};
    border-radius: 18px;
    margin: 3px 3px;
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    width: 100%;
`
const Text = styled.span`
    font-size: 16px;
`
const Occurrence = styled.span`
    padding-left:12px;
    font-size: 16px;
`
const Comments = styled.div`
    background: white;
    margin-bottom: 8px;
    border-radius: 0 0 8px 8px;
    padding: 0px 8px;
`

const WordBubbleDetail = ({word, comments}: WordBubbleProps) => {
    const handleClick = (e) => {
        e.stopPropagation()
    }

    return (
        <Container onClick={handleClick} pos={word[1]}>
            <div>
                <Text>
                    {word[0]}
                </Text>
                <Occurrence>
                    {word[2]}
                </Occurrence>
            </div>
            <Comments>
                {comments.map((comment, idx) => (
                    <p key={idx}>{comment}</p>
                ))}
            </Comments>
        </Container>
  )
}

export default WordBubbleDetail
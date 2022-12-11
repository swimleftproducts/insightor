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
    ADJ: 'linear-gradient(180deg, #FFED47 0%, #DBCB39 100%);',
    ADP: 'linear-gradient(180deg, #08B7B7 0%, #029393 100%);',
    ADV: 'linear-gradient(180deg, #FD6BB4 0%, #DB5C9B 100%);',
    AUX: 'linear-gradient(180deg, #CFCFCF 0%, #B0B0B0 100%);',
    CCONJ: 'linear-gradient(180deg, #CFCFCF 0%, #B0B0B0 100%);',
    DET: 'linear-gradient(180deg, #F36161 0%, #CC4E4E 100%);',
    INTJ: ' linear-gradient(180deg, #469EAE 0%, #468894 100%);',
    NOUN: 'linear-gradient(180deg, #72ABFA 0%, #467ECB 100%);',
    NUM: 'linear-gradient(180deg, #F2C287 0%, #D8AB73 100%);',
    PART: 'linear-gradient(180deg, #FDFDFD 0%, #E7E7E7 100%);',
    PRON: 'linear-gradient(180deg, #FF9F7B 0%, #CD7E61 100%);',
    PROPN: 'linear-gradient(180deg, #08B7B7 0%, #029393 100%);',
    PUNCT: 'linear-gradient(180deg, #FDFDFD 0%, #E7E7E7 100%);',
    SCONJ: 'linear-gradient(180deg, #AAAAAA 0%, #8B8B8B 100%);',
    SYM: 'linear-gradient(180deg, #FFA7D3 0%, #D390B2 100%);',
    VERB: 'linear-gradient(180deg, #4BD980 0%, #3CB067 100%);',
    X: 'linear-gradient(180deg, #FDFDFD 0%, #E7E7E7 100%);'
}


const Container = styled.div`
    display: inline-flex;
    align-items: center;
    background: ${props => COLOR_MAP[props.pos]}
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 72px;
    gap: 8px;
    padding: 6px 6px 6px 14px;
    &:hover{
        opacity: .7;
    }
`
const Text = styled.div`
    font-size: 16px;
`
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
`

const WordBubble = ({word, handleBubbleClick}: WordBubbleProps) => {
    const postNegOrNuetral = (word) =>{

    }
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
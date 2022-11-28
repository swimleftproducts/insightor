import React from 'react'
import styled from 'styled-components'


interface SentimentDisplayProps {
    sentiments: number[],
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: end;
    width: 350px;
    height: 200px;
  
`
const Bar = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background: ${props => `rgb(${props.red},0,0)`};
`

const SentimentDisplay = ({ sentiments }: SentimentDisplayProps) => {
    const MAX_BAR_HEIGHT=150
    const WIDTH = 300;

    const CreateBar = (position, value) => {
        let maxValue = Math.max(...sentiments)
        console.log(maxValue)
        const height = value / maxValue * MAX_BAR_HEIGHT
        return (
            <Bar height={height} red={255} key={position} width={WIDTH/sentiments.length}/>
        )
    }

    const makeBars = () => {
        if(!sentiments) return
        const bars = sentiments.map((bin, idx)=> {
            return CreateBar(idx, bin)
        })
        return bars
    }

    return (
        <Container>
            {makeBars()}
        </Container>
    )
}

export default SentimentDisplay
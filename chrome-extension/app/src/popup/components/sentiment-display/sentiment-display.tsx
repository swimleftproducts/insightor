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
    height: 180px;
  
`
const Bar = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background: ${({totalBins, position}) => `rgb(${(255*position)/totalBins},0,${(255*(totalBins-position))/totalBins})`};
`

const SentimentDisplay = ({ sentiments }: SentimentDisplayProps) => {
    const MAX_BAR_HEIGHT=150
    const WIDTH = 300;

    const CreateBar = (position, value, bins) => {
        let maxValue = Math.max(...sentiments)
        console.log(maxValue)
        const height = value / maxValue * MAX_BAR_HEIGHT
        return (
            <Bar height={height}  position={position} totalBins={bins} key={position} width={WIDTH/sentiments.length}/>
        )
    }

    const makeBars = () => {
        if(!sentiments) return
        let totalBins = sentiments.length
        const bars = sentiments.map((value, idx)=> {
            return CreateBar(idx, value, totalBins)
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
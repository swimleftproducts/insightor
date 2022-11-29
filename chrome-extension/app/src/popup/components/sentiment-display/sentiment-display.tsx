import React from 'react'
import styled from 'styled-components'


interface SentimentDisplayProps {
    sentiments: any,
    handleGraphClick: (binIdx:number, low:number, high:number) => void,
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

const SentimentDisplay = ({ sentiments, handleGraphClick }: SentimentDisplayProps) => {
    const MAX_BAR_HEIGHT=150
    const WIDTH = 300;

    const CreateBar = (position, value, bins, maxValue) => {
        let total = value.length
        const height = total / maxValue * MAX_BAR_HEIGHT
        return (
            <Bar height={height}  position={position} totalBins={bins} key={position} width={WIDTH/sentiments.length} onClick={() => handleGraphClick(position, value.x0, value.x1)}/>
        )
    }

    const makeBars = () => {
        if(!sentiments) return
        const onlyTotals= sentiments.map((item) => item.length)
        let maxValue = Math.max(...onlyTotals)
        console.log('array of totals', onlyTotals)
        let totalBins = sentiments.length
        const bars = sentiments.map((value, idx)=> {
            return CreateBar(idx, value, totalBins, maxValue)
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
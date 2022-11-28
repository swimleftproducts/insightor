import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SentimentDisplay from './sentiment-display'
import * as d3 from "d3";


interface SentimentDisplayContainerProps {
    sentiments: number[],
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    height: 180px;
    width: 100%;
    border: 1px solid grey;
    margin: 5px;
`
const BINS = 20
const SentimentDisplayContainer = ({sentiments}: SentimentDisplayContainerProps) => {
    const [histogramData, setHistogramData] = useState(null)

    const binSentiments = (sentiments, bins) => {
        // bin from -1 to 1 in <bin> bins
        let binGenerator = d3.bin().domain([-1,1]).thresholds(bins)
        let binned = binGenerator(sentiments)
        console.log('binned', binned)
        let histogramData = binned.map((item)=>{
            return item.length
        })
        console.log('data',histogramData)
        return histogramData
    }

    useEffect(() => {
        if(!sentiments) return
        const zeroRemovedSentiment = sentiments.filter((value) => value!==0)
        let histogramData = binSentiments(zeroRemovedSentiment, BINS)
        setHistogramData(histogramData)
    },[sentiments])

    return (
        <Container>
            <SentimentDisplay sentiments={histogramData} />
            <div>
                Sentiment analysis
            </div>

        </Container>
    )
    }

export default SentimentDisplayContainer
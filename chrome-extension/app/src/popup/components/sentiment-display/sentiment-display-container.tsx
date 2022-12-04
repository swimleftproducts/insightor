import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SentimentDisplay from './sentiment-display'
import * as d3 from "d3";
import SentimentCommentDisplay from './sentiment-comment-display';


interface SentimentDisplayContainerProps {
    sentiments: number[],
    comments: any[],
    setShowSentimentComments: (value: boolean) => void,
    showSentimentComments: boolean,
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    height: 120px;
    margin: 5px 0 10px 0;
    
`
const BINS = 20
const SentimentDisplayContainer = ({sentiments, comments, setShowSentimentComments, showSentimentComments}: SentimentDisplayContainerProps) => {
    const [histogramData, setHistogramData] = useState(null)
    const [sentimentComments, setSentimentComments] = useState<any>(null)

    const handleGraphClick = (binIdx, low, high) => {
        // find sentiments in range by location
        const commentsToFind = []
        const commentsFound =[]
        sentiments.map((item, idx) => {
            if(item <high && item > low){
               commentsToFind.push( [idx, item])
            }
        })
        commentsToFind.map((binnedComment) => {
           commentsFound.push([comments[binnedComment[0]],binnedComment[1]])
        })
        setShowSentimentComments(true)
        setSentimentComments(commentsFound)
    }

    const binSentiments = (sentiments, bins) => {
        // bin from -1 to 1 in <bin> bins
        let binGenerator = d3.bin().domain([-1,1]).thresholds(bins)
        let binned = binGenerator(sentiments)
        let histogramData = binned
        return histogramData
    }

    useEffect(() => {
        if(!sentiments) return
        const zeroRemovedSentiment = sentiments.filter((value) => value!==0)
        let histogramData = binSentiments(zeroRemovedSentiment, BINS)
        setHistogramData(histogramData)
    },[sentiments])

    return (
        <>
            {showSentimentComments && sentimentComments && <SentimentCommentDisplay comments={sentimentComments}  setShowSentimentComments={setShowSentimentComments}/>}
            <Container>
                <SentimentDisplay sentiments={histogramData} handleGraphClick={handleGraphClick} />
            </Container>
        </>
       
    )
    }

export default SentimentDisplayContainer
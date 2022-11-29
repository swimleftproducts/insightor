import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {createRoot} from 'react-dom/client'
import Title from './components/title'
import WordDisplayContainer from './components/word-display/word-display-container'
import getAnalysis from './services/analysis'
import axios from 'axios'
import SentimentDisplayContainer from './components/sentiment-display/sentiment-display-container'

const Container = styled.div`
    html {
    margin: 0;
    padding: 0;
    }
    color: black;
    background: white;
    flex-direction: column;
    display: flex;
    width: 450px;
    padding: 0px;
    margin: 0px;
`

const StyledText = styled.div`
    text-align: center;
    font-size: 24px;
    padding: 0px 18px 18px;
`

const App = () => {
    const [videoId, setVideoId] = useState<null|string>(null)
    const [isYouTube, setIsYouTube] = useState(true)
    const [commentData, setCommentData] = useState<any>(null)
    const [showSentimentComments, setShowSentimentComments] = useState(false)

   
    useEffect(()=>{
        const getURL = async () => {
            let videoId
            chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
                const url = new URL(tabs[0].url);
                const params = new URLSearchParams(url.search)
                videoId = params.get('v')
                if (videoId) {
                    setVideoId(videoId)
                }else{
                    setIsYouTube(false)
                }
            });
        }
        getURL()
    },[])
    const API_URL = 'https://sbk957ltol.execute-api.us-east-1.amazonaws.com/test/getanalysis'
    
    useEffect(()=> {
        if (!videoId) return
        const getData = async (videoId) => {
            try{
                if (localStorage.getItem('videoId') !== videoId){
                    const {data, status} = await axios.get(API_URL,{
                        params: {videoid: videoId, maxcomments: 250},
                    })
                    setCommentData(data)
                    localStorage.setItem('videoId',videoId)
                    localStorage.setItem('data', JSON.stringify(data))
                } else{
                    let data = JSON.parse(localStorage.getItem('data'))
                    setCommentData(data)
                }
           }catch (error) {
                console.log(error)
           }
        }
        getData(videoId)
    },[videoId])

    if(!isYouTube){
        return (
            <Container>
            <Title title={`Insightor: no video`}/>
            <StyledText>
                Navigate to a youtube video then relaunch the extension to get comment insights
            </StyledText>
        </Container>
        )
    }

    return (
        <Container>
            <Title title={`Insightor: ${videoId}`}/>
            {(!showSentimentComments) && <WordDisplayContainer commentData={commentData}/>}
            <SentimentDisplayContainer 
                sentiments={commentData?.sentiments} 
                comments={commentData?.comments} 
                setShowSentimentComments={setShowSentimentComments} 
                showSentimentComments={showSentimentComments}/>
        </Container>
    )
}

const body = document.body 
body.style.margin = "0"

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
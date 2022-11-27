import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {createRoot} from 'react-dom/client'
import Title from './components/title'
import WordDisplayContainer from './components/word-display/word-display-container'
import getAnalysis from './services/analysis'
import axios from 'axios'

const Container = styled.div`
    html {
    margin: 0;
    padding: 0;
    }
    color: black;
    background: white;
    flex-direction: column;
    display: flex;
    width: 400px;
    padding: 0px;
    margin: 0px;
`

const App = () => {
    const [videoId, setVideoId] = useState<null|string>(null)
    const [commentData, setCommentData] = useState<any>(null)
   
    useEffect(()=>{
        console.log('getting url')
        const getURL = async () => {
            let videoId
            chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
                const url = new URL(tabs[0].url);
                const params = new URLSearchParams(url.search)
                videoId = params.get('v')
                if (videoId) {
                    setVideoId(videoId)
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
                const {data, status} = await axios.get(API_URL,{
                    params: {videoid: videoId, maxcomments: 250},
                })
                setCommentData(data)
           }catch (error) {
                console.log(error)
           }
        }
        getData(videoId)
    },[videoId])

    return (
        <Container>
            <Title title={`Insightor: ${videoId}`}/>
            <WordDisplayContainer commentData={commentData}/>
        </Container>
    )
}


const body = document.body 
body.style.margin = "0"

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
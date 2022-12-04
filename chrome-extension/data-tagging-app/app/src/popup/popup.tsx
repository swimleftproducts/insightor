import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {createRoot} from 'react-dom/client'
import PinInput from './components/pin-input'
import CommentTaggerContainer from './components/comment-tagger/comment-tagger-container'


const Container = styled.div`
    html {
    margin: 0;
    padding: 0;
    }
    color: black;
    background: white;
    flex-direction: column;
    display: flex;
    width: 750px;
    padding: 0px;
    margin: 0px;
`

const StyledText = styled.div`
    text-align: center;
    font-size: 24px;
    padding: 0px 18px 18px;
`

const App = () => {
    const [showAuth, setShowAuth] = useState(true)
    const [name, setName] = useState<string | null>(null)

    const handleSuccessAuth = (name:string) => {
        setShowAuth(false)
        setName(name)
    }


    return (
        <Container>
            {showAuth && (<PinInput handleSuccessAuth={handleSuccessAuth}/>)}
            {name && <CommentTaggerContainer name={name} />}
        </Container>
    )
}

const body = document.body 
body.style.margin = "0"

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
import React from 'react'
import styled from 'styled-components'
import {createRoot} from 'react-dom/client'
import TechIcon from '../static/tech_icon.png'

const Container = styled.div`
    * {
    margin: 0;
    padding: 0;
    }
    color: HotPink;
    background: black;
    width: 400px;
    height: 450px;
    padding: 0px;
    margin: 0px;
`

const App = () => {
    return (
        <Container>
            <h1>INSIGHTOR</h1>
            <img src={TechIcon}/>
        </Container>
    )
}


const body = document.body 
body.style.margin = "0"

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
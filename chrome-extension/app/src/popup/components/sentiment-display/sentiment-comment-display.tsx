import React from 'react'
import styled from 'styled-components'

interface SentimentCommentDisplayProps {
    comments: any,
    setShowSentimentComments: (value: boolean) => void,
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 250px;
    padding: 20px ;
    overflow-y: auto;
    overflow-x: hidden;
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 400px;
    justify-content: start;
    align-items: center;
    margin: 6px 0px;
`
const Sentiment = styled.div`
    font-size: 18px;
    color: darkgrey;
`
const Comment = styled.div`
    margin-left: 12px;
`

const SentimentCommentDisplay = ({ comments, setShowSentimentComments }) => {

    const renderComments = () => {
        comments = comments.slice(0,3)
        return comments.map((comment, idx) =>{
            return(
                <Row key={idx} onClick={()=> setShowSentimentComments(false)}>
                    <Sentiment>
                        {comment[1]}
                    </Sentiment>
                    <Comment>
                        {comment[0]}
                    </Comment>
                </Row>
            )
        })
    }

    return (
        <Container>
           {renderComments()}
        </Container>
    )
}

export default SentimentCommentDisplay
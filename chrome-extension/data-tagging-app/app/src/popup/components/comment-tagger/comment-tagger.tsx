import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import CommentBox from './comment-box'
import PillButton from './pill-button'

const Container = styled.div`
    color: black;
    background: white;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    display: flex;
    padding: 0px;
    margin: 15px;
    height: 180px;
    width: 100%;
`
const PillContainer = styled.div`
    color: black;
    background: white;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 0px;
    margin: 5px;
    height: 200px;
    width: 300px;
    border: 1px solid black;
`

interface CommentTaggerProps {
    comment: {
        snippet:{
            topLevelComment:{
                snippet:{
                    textOriginal: string
                }
            }
        }
    },
    categories: any,
    onTagClick: (value: string) => void
}

const CommentTagger = ({categories, onTagClick, comment}: CommentTaggerProps) => {


    const handlePillClick = (e:any, value) =>{
        console.log(e)
        console.log(value)
    }
    
    const renderPills = () => {
        return categories.map((category, idx)=>{
            return (
                <PillButton key={idx} color={category?.color} text={category.label} onClick={(e)=> handlePillClick(e, category.value)}/>
            )
        })

    }
    console.log(comment)
    return (
        <Container>
            <CommentBox comment={comment?.snippet.topLevelComment.snippet.textOriginal}/>
            <PillContainer>
               {renderPills()} 
            </PillContainer>
            
        </Container>

    )
}

export default CommentTagger
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
    margin: 5px 0 5px 15px;
    height: 180px;
    width: 98%;
`
const PillContainer = styled.div`
    cursor:pointer;
    color: black;
    background: white;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 0px;
    margin: 5px;
    height: 180px;
    width: 280px;
`
const Flex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 95%;
`
const NonVariablePillContainer = styled.div`
    cursor:pointer;
    color: black;
    background: white;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 0px;
    margin: 0;
    height: 75x;
    width: 100%;   
`
const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
`
const CategoryTitle = styled.div`
    width: 100%;
    text-align: center;
`

interface CommentTaggerProps {
    comment: any,
    categories: any,
    categoriesNonVariable: any,
    onTagClick: (data: {}) => void
}

const CommentTagger = ({categories, categoriesNonVariable, onTagClick, comment}: CommentTaggerProps) => {
    const [primaryTag, setPrimaryTag] = useState('')
    

    const s3UploadData = {
        comment_id: comment?.id,
        like_count: comment?.snippet.topLevelComment.snippet.likeCount,
        total_reply_count: comment?.snippet.totalReplyCount, 
        comment:  comment?.snippet.topLevelComment.snippet.textDisplay,
    }

    const handlePillClick = (e:any, value) =>{
        //if ctrl was held story the value of click
        if (value === primaryTag){
            setPrimaryTag('')
            return
        }
        if (e.ctrlKey && !primaryTag){
            setPrimaryTag(value)
        } else {
            if (primaryTag){
                onTagClick({label_primary: primaryTag, label_secondary: value, ...s3UploadData })
                setPrimaryTag('')
            } else{
                onTagClick({label_primary: value, label_secondary: null, ...s3UploadData})
                setPrimaryTag('')
            }
        }
    }
    

    const renderVariablePills = () => {
        return categories.map((category, idx)=>{
           
            return (
                <PillButton wide active={primaryTag===category.value}key={idx} color={category?.color} text={category.label} onClick={(e)=> handlePillClick(e, category.value)}/>
            )
        })
    }
    const renderNonVariablePills = () => {
        return categoriesNonVariable.map((category, idx)=>{
            let wide = true;
            let narrow = false;
            if (category.label === 'Spam' || category.label === 'Skip'){
                narrow = true
                wide = false
            }
            return (
                <PillButton wide={wide} narrow={narrow} active={primaryTag===category.value} key={idx} color={category?.color} text={category.label} onClick={(e)=> handlePillClick(e, category.value)}/>
            )
        })
    }
   
    return (
        <Container>
            <Flex>
                <CommentBox comment={comment?.snippet.topLevelComment.snippet.textOriginal}/>
                <NonVariablePillContainer>
                    {renderNonVariablePills()} 
                </NonVariablePillContainer>
            </Flex>
            <Flex>
                <TitleContainer>
                    <CategoryTitle>Positive</CategoryTitle> 
                    <CategoryTitle>Neutral</CategoryTitle>
                    <CategoryTitle>Negative</CategoryTitle>
                </TitleContainer>
                <PillContainer>
                    {renderVariablePills()} 
                </PillContainer>
            </Flex>
        </Container>

    )
}

export default CommentTagger
import React from 'react'
import styled from 'styled-components'

const ContentBox = styled.div`
    width: 400px;
    background: lightgrey;
    height: 100px;
    padding:  15px;
    font-size: 16px;
    overflow-y: scroll;
`
interface CommentBoxProps {
    comment: string,
}

const CommentBox = ({comment}:CommentBoxProps) => {
  return (
    <ContentBox>
        {comment}
    </ContentBox>
  )
}

export default CommentBox
import React from 'react'
import styled from 'styled-components'

const ContentBox = styled.div`
    width: 225px;
    background: grey;
    height: 95%;
    padding:  15px;
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
import React from 'react'
import styled from 'styled-components'

interface TitleProps {
    title: string,
}

const StyledH1 = styled.h1`
    width: 100%;
    display: block;
    font-size: 24px;
    text-align: center;
`

const Title = ({title}: TitleProps) => {
  return (
    <StyledH1>
        {title}
    </StyledH1>
  )
}

export default Title
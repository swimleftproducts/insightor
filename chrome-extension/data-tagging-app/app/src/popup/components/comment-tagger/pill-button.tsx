import React from 'react'
import styled from 'styled-components'

interface PillButtonProps {
    text: string,
    color: string,
    onClick: (value: string) => void
}

const StyledButton = styled.div`
    width: 85px;
    height: 32px;
    border-radius: 16px;
    font-size: 8px;
    line-height: 8px;
    margin: 2px 3px;
    text-align: center;
    background: lightgrey;
    background: ${props => props.color && props.color};
    &:hover {
        filter: opacity(75%);
    }
`
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%
`

const PillButton = ({text, onClick, color}: PillButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      <Container>
        <div>{text}
          </div>
      </Container>
    </StyledButton>
  )
}

export default PillButton
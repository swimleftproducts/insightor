import React from 'react'
import styled, {css} from 'styled-components'

interface PillButtonProps {
    text: string,
    color: string,
    wide?: boolean;
    active: boolean,
    onClick: (value: string) => void
}

const StyledButton = styled.div`
    width: ${props => props.wide ? '85' : '100'}px;
    height: 32px;
    border-radius: 16px;
    font-size: 10px;
    line-height: 10px;
    margin: 3px 3px;
    text-align: center;
    ${props => props.active && css`
      border: 2px solid black;
    `}
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

const PillButton = ({text, wide, onClick, color, active}: PillButtonProps) => {
  return (
    <StyledButton wide={wide} active={active} onClick={onClick}>
      <Container>
        <div>{text}
          </div>
      </Container>
    </StyledButton>
  )
}

export default PillButton
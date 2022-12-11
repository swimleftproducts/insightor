import React from 'react'
import styled, {css} from 'styled-components'

interface PillButtonProps {
    text: string,
    color: string,
    wide?: boolean;
    narrow?: boolean;
    active: boolean,
    onClick: (value: string) => void
}

const StyledButton = styled.div`
    width: ${props => props.wide ? '85' : '110'}px;
    width: ${props => props.narrow && '45'}px;
    height: 32px;
    border-radius: 16px;
    font-size: 10px;
    line-height: 10px;
    margin: 3px 3px;
    text-align: center;
    border: 1px lightgrey solid;
    ${props => props.active && css`
      border: 1px solid black;
    `}
    background: lightgrey;
    background: ${props => props.color && props.color};
    opactiy: .8;
    &:hover {
        filter: opacity(75%);
    }
`
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const PillButton = ({text, wide, narrow, onClick, color, active}: PillButtonProps) => {
  return (
    <StyledButton wide={wide} narrow={narrow} active={active} onClick={onClick} color={color}>
      <Container>
        <div>{text}
          </div>
      </Container>
    </StyledButton>
  )
}

export default PillButton
import React,{useState,useEffect} from 'react'
import Title from './title'
import styled from 'styled-components'
import { getAuth } from '../services/auth'


const StyledInput = styled.input`
    height: 28px;
    margin-left: 12px;
    font-size: 28px;
    width: 75px;
    text-align: center;
    ${props => props.error && 'background: red;'}
`
const StyledSpan = styled.span`
    fontSize: 28px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    border: 1px solid grey;
    padding: 15px;
    margin: 15px;
`
const Content = styled.div`
    margin-bottom: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const Submit = styled.button`
    line-height: 28px;
    margin-left: 12px;
    background: teal;
`
interface PinInputProps {
    handleSuccessAuth: (name: string) => void,
}

const PinInput = ({handleSuccessAuth}: PinInputProps) => {
    const [pinValue, setPinValue] = useState('')
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        setPinValue(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //see if pin is valid, call up to main function
        if(pinValue.length === 4){
            console.log('called')
            try {
                const {auth} = await getAuth(pinValue)  
                if(auth){
                    //save to local storage for future in and out
                    localStorage.setItem('tagger_name',auth)
                    handleSuccessAuth(auth)
                }else{
                    setError(true)
                }
            } catch(err){
                console.log('error occurred')
            }
        }
    }

    useEffect(()=> {
        const name = localStorage.getItem('tagger_name')
        if(name){
            handleSuccessAuth(name)
        }
    },[])

    useEffect(()=> {
       setError(false)
    },[pinValue])

    return (
        <Container>
            <Title title={`Insightor data labeling`}/>
            <Content> Thank you for helping out!</Content>
            <Content>
               <StyledSpan>Please enter your pin</StyledSpan>
                <StyledInput error={error} maxLength={4} value={pinValue} onChange={handleChange}/> 
                <Submit onClick={handleSubmit}>Submit</Submit>
            </Content>
            
        </Container>
        
    )
}

export default PinInput
import styled from 'styled-components'

export const HeaderContainer = styled.main`
flex: 1;

display : flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100%;

form {

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;

}

`

export const BaseCountdownButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
border: 0;
gap: 0.5rem;
width: 100%;

height: 4rem;
border-radius: 8px;
font-weight: 700;
font-size: 1rem;
color: ${props => props.theme['gray-100']};

&:disabled {
opacity:0.7;
cursor: not-allowed;
}

`

export const StartCountdownButton = styled(BaseCountdownButton)`
background-color: ${props => props.theme['green-500']};

&:not(:disabled):hover {
    background-color: ${props => props.theme['green-700']};
}

`
export const StopCountdownButton = styled(BaseCountdownButton)`
background-color: ${props => props.theme['red-500']};

&:not(:disabled):hover {
    background-color: ${props => props.theme['red-700']};
}

`

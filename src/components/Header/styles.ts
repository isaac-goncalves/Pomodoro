import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

    nav {
       display: flex;
       gap: 0.5rem;
    }

    a {

        width: 3rem;
        height: 3rem;
        
        display: flex;
        justify-content: center;
        align-items: center;

        color: ${(props) => props.theme['gray-100']};
        border-bottom: 3px solid transparent; 

        &:hover {
            border-bottom: 3px solid ${(props) => props.theme['gray-500']};
        }
    }

  `

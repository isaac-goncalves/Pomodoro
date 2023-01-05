import { Play } from 'phosphor-react'
import React from 'react'

import { CountdownContainer, FormContainer, HeaderContainer } from './styles'

export function Home(): any {
  return (
    <HeaderContainer>
      <FormContainer>
        <label htmlFor=''>Vou trabalharr em </label>
        <input
          placeholder='Dê um nome para sua tarefa'
          type='text'
          name='task'
        />
        <label>
          durante
        </label>
        <input
          placeholder="-"
          type="number"
          id="minutesAmount"
        />
        <span>minutos</span>
      </FormContainer>

      <CountdownContainer >
        <span>
          0
        </span>
        <span>
          0
        </span>
        <span>
          :
        </span>
        <span>
          0
        </span>
        <span>
          0
        </span>
      </CountdownContainer>
      <button
        type="submit"
      >
        <Play size={24} />
        Começar</button>
    </HeaderContainer>
  )
}

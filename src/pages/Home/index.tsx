import { Play } from 'phosphor-react'
import React from 'react'

import { CountdownContainer, FormContainer, HeaderContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './styles'

export function Home (): any {
  return (
    <HeaderContainer>
      <form
        action="submit"
      >
        <FormContainer>
          <label htmlFor=''>Vou trabalhar em </label>
          <TaskInput
            placeholder='Dê um nome para sua tarefa'
            type='text'
            name='task'
            list='task-suggestion'
          />
          <datalist id="task-suggestion">
            <option value="Estudar" />
            <option value="Trabalhar" />
            <option value="Ler" />
            <option value="Fazer exercícios" />
            <option value="Banana" />
          </datalist>
          <label>
            durante
          </label>
          <MinutesAmountInput
            placeholder="00"
            type="number"
            id="minutesAmount"
            step={5}
            min={0}
            max={60}
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
          <Separator>
            :
          </Separator>
          <span>
            0
          </span>
          <span>
            0
          </span>
        </CountdownContainer>
        <StartCountdownButton
          type="submit"
          disabled
        >
          <Play size={24} />
          Começar</StartCountdownButton>
      </form>
    </HeaderContainer>
  )
}

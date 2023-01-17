import React, { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

import { CyclesContext } from '../../index'

export function NewCycleForm (): any {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor=''>Vou trabalhar em </label>
      <TaskInput
        placeholder='Dê um nome para sua tarefa'
        type='text'
        disabled={!(activeCycle == null)}
        {
        ...register('task')
        }
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
        min={1}
        disabled={!(activeCycle == null)}
        // max={60}
        {
        ...register('minutesAmount', { valueAsNumber: true })
        }
      />
      <span>minutos</span>
    </FormContainer>
  )
}

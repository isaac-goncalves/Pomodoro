import React, { useState, createContext } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'

import { HandPalm, Play } from 'phosphor-react'

import { NewCycleForm } from './components/NewCycleForm'

import { FormProvider, useForm } from 'react-hook-form'

import * as zod from 'zod'

import {
  HeaderContainer,
  StartCountdownButton,
  StopCountdownButton
} from './styles'

import { Countdown } from './components/Countdown'

interface Cycle { // quais as informaçoes que eu vou receber
  id: string
  task: string
  minutesAmount: number
  startDate?: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType { // quais as informaçoes que eu vou receber
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({ // validação do formulario
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O intervalo precisa ser de no max 60 minutos e no minimo 5')
    .max(60, 'O intervalo precisa ser de no max 60')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // inferir o tipo de dados que eu vou receber

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Home () {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({ // validação do formulario
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: { 
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, reset, watch } = newCycleForm  

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)  

  function setSecondsPassed (seconds: number): void { // função para setar o tempo
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished (): any { // função para marcar o ciclo como finalizado
    setCycles(state =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle, finishedDate: new Date()
          }
        } else {
          return cycle
        }
      }
      )
    )
  }

  function handleCreateNewCycle (data: NewCycleFormData): any { // função para criar um novo ciclo
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle (): any { // função para interromper o ciclo
    setCycles((state) => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return {
          ...cycle, interruptedDate: new Date()
        }
      } else {
        return cycle
      }
    }
    )
    )
    return setActiveCycleId(null)
  }

  const task = watch('task') //

  const isSubmitDisabled = task.length === 0

  return ( // JSX
    <HeaderContainer>
      <form
        action="submit"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleCreateNewCycle)}
      >
        <CyclesContext.Provider value={{
          activeCycle,
          activeCycleId,
          amountSecondsPassed,
          markCurrentCycleAsFinished,
          setSecondsPassed
        }}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm/>
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>
        {
          (activeCycle != null)
            ? (
              <StopCountdownButton onClick={handleInterruptCycle} type="submit">
                <HandPalm size={24} />
                Interromper
              </StopCountdownButton>
              )
            : (
              <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                <Play size={24} />
                Começar
              </StartCountdownButton>
              )

        }
      </form>
    </HeaderContainer>
  )
}

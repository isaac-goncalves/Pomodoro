import { differenceInSeconds } from 'date-fns'
import React, { createContext, useEffect, useReducer, useState } from 'react'

import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType { // quais as informaçoes que eu vou receber
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: React.ReactNode
}

export function CyclesContextProvider ({ children }: CyclesContextProviderProps): any {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  },
  () => {
    const stateJSON = localStorage.getItem('@isaac-pomodoro:cycles-state-1.0.0')

    console.log('stored state =' + stateJSON)

    if (stateJSON != null) {
      return JSON.parse(stateJSON)
    }
  }
  )

  // write use state that will store in local storage

  useEffect(() => {
    console.log('cycles state changed')
    console.log(cyclesState)
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@isaac-pomodoro:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle: Cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle != null) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate ?? new Date())
      )
    }
    return 0
  }
  )

  function setSecondsPassed (seconds: number): void { // função para setar o tempo
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished (): any { // função para marcar o ciclo como finalizado
    dispatch(
      markCurrentCycleAsFinishedAction()
    )
  }

  function createNewCycle (data: CreateCycleData): any { // função para criar um novo ciclo
    console.log('teste')
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle (): any { // função para interromper o ciclo
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider value={{
      cycles,
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      markCurrentCycleAsFinished,
      setSecondsPassed,
      createNewCycle,
      interruptCurrentCycle
    }}>
      {children}
    </CyclesContext.Provider>
  )
}

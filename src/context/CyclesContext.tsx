import { createContext, useReducer, useState } from 'react'
import { addNewCycleAction } from '../reducers/cycles/actions'
import { ActionTypes, Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType { // quais as informaçoes que eu vou receber
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: React.ReactNode
}



export function CyclesContextProvider({ children }: CyclesContextProviderProps): any {

  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  })



  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number): void { // função para setar o tempo
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished(): any { // função para marcar o ciclo como finalizado
    dispatch(
      {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
        payload: {
          activeCycleId
        }
      }
    )
  }

  function createNewCycle(data: CreateCycleData): any { // função para criar um novo ciclo
    console.log('teste')
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction)

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle(): any { // função para interromper o ciclo
    dispatch(
      {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
        payload: {
          activeCycleId
        }
      }
    )
    return (
      <CyclesContext.Provider value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        CreateNewCycle,
        InterruptCurrentCycle
      }}>
        {children}
      </CyclesContext.Provider>
    )
  }

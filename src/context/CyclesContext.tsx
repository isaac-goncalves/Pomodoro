/* eslint-disable react/react-in-jsx-scope */
import { createContext, ReactNode, useState, useReducer } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle { // quais as informaçoes que eu vou receber
  id: string
  task: string
  minutesAmount: number
  startDate?: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]// quais as informaçoes que eu vou receber
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
  children: ReactNode
}

interface CirclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps): any {
  const [cyclesState, dispatch] = useReducer(
    (state: CirclesState[], action: any) => {
      console.log(state)
      console.log(action)
      if (action.type === 'ADD_NEW_CYCLE') {
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id
        }
      }

      if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            } else {
              return cycle
            }
          }
          ),
          activeCycleId: null
        }
      }

      return state
    }, [{
      cycles: [],
      activeCycleId: null
    }])

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number): void { // função para setar o tempo
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished(): any { // função para marcar o ciclo como finalizado
    dispatch(
      {
        type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
        payload: {
          activeCycleId
        }
      }
    )
    // setCycles(state =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return {
    //         ...cycle, finishedDate: new Date()
    //       }
    //     } else {
    //       return cycle
    //     }
    //   }
    //   )
    // )
  }

  function createNewCycle(data: CreateCycleData): any { // função para criar um novo ciclo
    console.log('teste')
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch(
      {
        type: 'ADD_NEW_CYCLE',
        payload: {
          newCycle
        }
      }
    )

    // setCycles((state) => [...state, newCycle])

    setAmountSecondsPassed(0)

    // reset()
  }

  function interruptCurrentCycle(): any { // função para interromper o ciclo
    dispatch(
      {
        type: 'INTERRUPT_CURRENT_CYCLE',
        payload: {
          activeCycleId
        }
      }
    )
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

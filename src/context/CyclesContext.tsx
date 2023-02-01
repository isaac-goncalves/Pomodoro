import { createContext, useState } from 'react'

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

export function CyclesContextProvider ({ children }: CyclesContextProviderProps): any {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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

  function CreateNewCycle (data: CreateCycleData): any { // função para criar um novo ciclo
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    // reset()
  }

  function InterruptCurrentCycle (): any { // função para interromper o ciclo
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

import { HandPalm, Play } from 'phosphor-react'
import { useState, createContext, React } from 'react'

import { NewCycleForm } from './components/NewCycleForm'

import { watch } from  

import {
  HeaderContainer,
  StartCountdownButton,
  StopCountdownButton

} from './styles'
import { Countdown } from './components/Countdown'

interface Cycle {
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
  markCurrentCycleAsFinished

}
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const CyclesContext = createContext({} as CyclesContextType)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Home () {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // console.log(cycles)
  // console.log(activeCycleId)

  function markCurrentCycleAsFinished (): any {
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

  function handleInterruptCycle (): any {
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

  return (
    <HeaderContainer>
      <form
        action="submit"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        // onSubmit={handleSubmit(handleCreateNewCycle)}
      >
        <CyclesContext.Provider value={{ // Context
          activeCycle,
          activeCycleId,
          markCurrentCycleAsFinished
        }}>
          {/* <NewCycleForm register={undefined} activeCycle={undefined} /> */}
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

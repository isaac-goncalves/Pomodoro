import { HandPalm, Play } from 'phosphor-react'
import { useState, createContext } from 'react'

import { NewCycleForm } from './components/NewCycleForm'

import { NumericKeys } from 'react-hook-form/dist/types/path/common'

import { useForm } from 'react-hook-form'

import * as zod from 'zod'

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

// import { watch } from

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
  markCurrentCycleAsFinished: () => void
}
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O intervalo precisa ser de no max 60 minutos e no minimo 5')
    .max(60, 'O intervalo precisa ser de no max 60')
})


  

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    
    const { register, handleSubmit, reset, watch } = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0
      }
    })
    
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
   
    function markCurrentCycleAsFinished(): any {
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

    function handleCreateNewCycle(data: NewCycleFormData): any {
      
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

    function handleInterruptCycle(): any {
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
          onSubmit={handleSubmit(handleCreateNewCycle)}
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

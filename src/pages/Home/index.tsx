import { HandPalm, Play } from 'phosphor-react'
import { useState, React, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'

import * as zod from 'zod'

import { useForm } from 'react-hook-form'

import {
  CountdownContainer,
  FormContainer,
  HeaderContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O intervalo precisa ser de no max 60 minutos e no minimo 5')
    .max(60, 'O intervalo precisa ser de no max 60')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate?: Date
  interruptedDate?: Date
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Home () {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    if (activeCycle != null) {
      setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate)
        )
        console.log('passou 1 segundo')
      }, 1000)
    } else {
      console.log('não tem ciclo ativo')
    }
  }, [activeCycle])

  console.log(cycles)
  console.log(activeCycleId)

  function handleCreateNewCycle (data: NewCycleFormData): any {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    reset()
  }

  function handleInterruptCycle (): any {
    setCycles(
      cycles.map((cycle) => {
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

  const totalSeconds = (activeCycle != null) ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = (activeCycle != null) ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)

  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')

  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')

  const isSubmitDisabled = task.length === 0

  return (
    <HeaderContainer>
      <form
        action="submit"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleCreateNewCycle)}
      >
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
            min={5}
            disabled={!(activeCycle == null)}
            // max={60}
            {
            ...register('minutesAmount', { valueAsNumber: true })
            }
          />
          <span>minutos</span>
        </FormContainer>

        <CountdownContainer >
          <span>
            {minutes[0]}
          </span>
          <span>
            {minutes[1]}
          </span>
          <Separator>
            :
          </Separator>
          <span>
            {seconds[0]}
          </span>
          <span>
            {seconds[1]}
          </span>
        </CountdownContainer>
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

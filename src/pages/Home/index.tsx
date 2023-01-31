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
import { CyclesContext } from '../../context/CyclesContext'
import { useContext } from 'react'

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
  const {
    activeCycle,
    InterruptCurrentCycle,
    CreateNewCycle
  } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({ // validação do formulario
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch } = newCycleForm

  const task = watch('task') //

  const isSubmitDisabled = task.length === 0

  return ( // JSX
    // eslint-disable-next-line react/react-in-jsx-scope
    <>
      <HeaderContainer>
        <form
          action="submit"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(CreateNewCycle)}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
          {
            (activeCycle != null)
              ? (
                <StopCountdownButton onClick={InterruptCurrentCycle} type="submit">
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
    </>
  )
}

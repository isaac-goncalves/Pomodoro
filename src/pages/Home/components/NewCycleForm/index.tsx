import React from 'react'
import { useForm } from 'react-hook-form'

import { NumericKeys } from 'react-hook-form/dist/types/path/common'

import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

import * as zod from 'zod'

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O intervalo precisa ser de no max 60 minutos e no minimo 5')
    .max(60, 'O intervalo precisa ser de no max 60')
})

export function NewCycleForm ({ register, activeCycle }) {
   const { register, handleSubmit, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

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

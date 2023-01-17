import React, { useEffect, useState } from 'react'

import { CountdownContainer, Separator } from './styles'

import { differenceInSeconds } from 'date-fns'

import { CyclesContext } from '../../index'

export function Countdown (): any {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } = React.useContext(CyclesContext)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const totalSeconds = (activeCycle != null) ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    console.log(activeCycle)
    if (activeCycle != null) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate ?? new Date()
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          clearInterval(interval)
          setAmountSecondsPassed(totalSeconds)
          // setActiveCycleId(null)
          console.log('finished')
        } else {
          setAmountSecondsPassed(secondsDifference)
          console.log(' not finished yet ')
        }
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        console.log(secondsDifference + ' total ' + totalSeconds)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

  const currentSeconds = (activeCycle != null) ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)

  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')

  const seconds = String(secondsAmount).padStart(2, '0')

  return (
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
  )
}

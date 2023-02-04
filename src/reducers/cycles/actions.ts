import { Cycle } from './reducer'

export enum ActionTypes {

  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleAction (newCycle: Cycle): any {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle
    }
  }
}

export function interruptCurrentCycleAction (): any {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE
  }
}

export function markCurrentCycleAsFinishedAction (): any {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED
  }
}

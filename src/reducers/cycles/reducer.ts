
export interface Cycle { // quais as informaçoes que eu vou receber
  id: string
  task: string
  minutesAmount: number
  startDate?: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CirclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}



export function cyclesReducer (state: CirclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
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
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }
        ),
        activeCycleId: null
      }
    default:
  }

  console.log(state)
  console.log(action)

  return state
}

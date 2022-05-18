/* eslint-disable import/no-internal-modules, functional/no-expression-statement, functional/immutable-data, functional/no-conditional-statement */
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { isDefined } from 'ts-is-defined'

import { createElmishRootComponent, ElmishProps } from '@ts-elmish/react'
import { Effect } from '@ts-elmish/basic-effects'
type State = {
  readonly count: number
}

type Action = 
  'increment' 
  | 'decrement'
  | 'load-data'

type Command = readonly [State, Effect<Action>]
const init = (): Command => {
  return [{ count: 0 }, Effect.from({ action: 'load-data' })]
}

const f = (dispatch:(action:Action)=> undefined) => 
  dispatch('decrement')

const update = ({ count }: State, action: Action) : Command => {
  switch (action) {
    case 'increment':
      return [{ count: count + 1 }, [(dispatch) => f(dispatch)]];
    case 'decrement':
      return [{ count: count - 2 }, Effect.none()]
    case 'load-data':
      return [{ count: count + 1 }, Effect.none()]
    
  }
}

export const Main: React.FunctionComponent<ElmishProps<State, Action>> = 
React.memo(
  
  function Main({ dispatch, ...state }) {
   
    return (
      <div>
      <div>{state.count}</div>
      <button onClick={_ => dispatch('increment')}>+</button>
      <button onClick={_ => dispatch('decrement')}>-</button>
      </div>
    )
  });


export const App = createElmishRootComponent({
  init: init,
  update: update,
  view: Main
})
const errorHandler: OnErrorEventHandlerNonNull = (event) => {
  console.log(event)
}

window.onerror = errorHandler

window.onunhandledrejection = errorHandler

const container = document.getElementById('app')

if (isDefined(container)) {
  createRoot(container).render(<App />)
} else {
  console.log("can't find DOM element with 'app' id")
}

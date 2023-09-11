//Core
import { useState } from 'react'

export default function useUpdatableState<T>(initial_value: T): [
    state: T,
    updateState: (updated_state: Partial<T>) => void,
    setState: (new_state: T) => void
] {

    const [_state, _setState] = useState<T>(initial_value)
  
    const updateState = (updated_state: Partial<T>) => {
      const new_state: T = {..._state, ...updated_state}
  
      _setState(new_state)
    }
  
    return [_state, updateState, _setState]
}
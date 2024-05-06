import { TypedUseSelectorHook, useSelector as useOriginalSelector } from 'react-redux'
import { RootState } from 'store'

const useSelector: TypedUseSelectorHook<RootState> = useOriginalSelector

export default useSelector

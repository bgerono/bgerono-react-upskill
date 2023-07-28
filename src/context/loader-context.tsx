import { createContext } from 'react'

export interface ILoaderContext {
  loader: boolean
  // eslint-disable-next-line no-unused-vars
  setLoader: (loader: boolean) => void
}

export const LoaderContext = createContext<ILoaderContext | null>(null)

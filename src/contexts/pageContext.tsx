import React, { createContext, ReactNode, useState } from 'react'

type Props = {
  children: ReactNode
}
interface IPageContextValue {
  title: string
  updateTitle: (_title: string) => void
}
const PageContext = createContext({
  title: '',
  updateTitle: (_title: string) => {}
})
export const PageProvider = (props: Props) => {
  const [title, setTitle] = useState('Clinical Portal')
  const updateTitle = (_title: string): void => {
    setTitle(_title)
  }
  return (
    <PageContext.Provider value={{ title, updateTitle } as IPageContextValue}>
      {props.children}
    </PageContext.Provider>
  )
}

export const PageConsumer = PageContext.Consumer
export default PageContext

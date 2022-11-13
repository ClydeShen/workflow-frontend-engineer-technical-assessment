import { Box, BoxProps } from '@mui/material'
import React, { ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import { PageConsumer, PageProvider } from '../contexts/pageContext'

type Props = {
  children: ReactNode
}
const Page = (props: Props | BoxProps) => {
  const { children, ...boxProps } = props
  return (
    <PageProvider>
      <PageConsumer>
        {({ title }) => {
          return (
            <Box component='main' {...boxProps}>
              <Helmet>
                <title>{title}</title>
              </Helmet>
              {props.children}
            </Box>
          )
        }}
      </PageConsumer>
    </PageProvider>
  )
}
export default Page

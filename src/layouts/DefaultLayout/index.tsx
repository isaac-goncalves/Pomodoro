import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContainer } from './styles'

export function DefaultLayout (): any {
  return (
    <>
        teste
      <LayoutContainer>
        <Header />
        <Outlet />
      </LayoutContainer>
    </>
  )
}

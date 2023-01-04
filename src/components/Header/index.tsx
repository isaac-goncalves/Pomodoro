import React from 'react'

import { HeaderContainer } from './styles'

import { Timer, Scroll } from 'phosphor-react'

import logo from '../../assets/logo-pomodoro.svg'

export function Header (): any {
  return (
    <HeaderContainer>
      <img src={logo} alt='' />
      <nav>
        <a href=''>
          <Timer size={24} />
        </a>
        <a href=''>
          <Scroll size={24} />
        </a>
      </nav>
    </HeaderContainer>
  )
}

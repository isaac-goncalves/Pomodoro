import React from 'react'

import { HeaderContainer } from './styles'

import { Timer, Scroll } from 'phosphor-react'

import logo from '../../assets/logo-pomodoro.svg'

import { NavLink } from 'react-router-dom'

export function Header (): any {
  return (
    <HeaderContainer>
      <img src={logo} alt='' />
      <nav>
        <NavLink to='/'>
          <Timer size={24} />
        </NavLink>
        <NavLink to='/history'>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}

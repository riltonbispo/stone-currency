'use client'

import React, { useEffect, useState } from 'react'
import { ToggleTheme } from './toggle-theme'
import logo from '@/public/images/main-logo.png'
import Image from 'next/image'

const Header = () => {
  const [dateState, setDateState] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => setDateState(new Date()), 30000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <header className="flex gap-3 items-center justify-between mb-11">
      <div className="flex gap-4 items-center">
        <Image
          src={logo}
          height={100}
          width={100}
          alt="logo stone currency"
        ></Image>
        <div>
          <div>
            <span>{dateState.toLocaleDateString('pt-BR')} | </span>
            <span>
              {dateState.toLocaleString('pt-BR', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              })}
            </span>
          </div>
          <p className="text-muted-foreground">
            Dados de câmbio disponibilizados pela Morningstar.
          </p>
        </div>
      </div>
      <ToggleTheme />
    </header>
  )
}

export default Header

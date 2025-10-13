'use client'

import styles from './switch.module.css'
import { memo, useEffect, useState } from 'react'
import Script from 'next/script' // ✅ 追加

declare global {
  interface Window {
    updateDOM: () => void
  }
}

type ColorSchemePreference = 'system' | 'dark' | 'light'
const STORAGE_KEY = 'nextjs-blog-starter-theme'
const modes: ColorSchemePreference[] = ['system', 'dark', 'light']

/** Script to avoid FOUC (Flash of Unstyled Content) */
export const NoFOUCScript = (storageKey: string) => {
  const [SYSTEM, DARK, LIGHT] = ['system', 'dark', 'light']

  const modifyTransition = () => {
    const css = document.createElement('style')
    css.textContent = '*,*:after,*:before{transition:none !important;}'
    document.head.appendChild(css)
    return () => {
      getComputedStyle(document.body)
      setTimeout(() => document.head.removeChild(css), 1)
    }
  }

  const media = matchMedia(`(prefers-color-scheme: ${DARK})`)

  window.updateDOM = () => {
    const restoreTransitions = modifyTransition()
    const mode = localStorage.getItem(storageKey) ?? SYSTEM
    const systemMode = media.matches ? DARK : LIGHT
    const resolvedMode = mode === SYSTEM ? systemMode : mode
    const classList = document.documentElement.classList

    if (resolvedMode === DARK) classList.add(DARK)
    else classList.remove(DARK)

    document.documentElement.setAttribute('data-mode', mode)
    restoreTransitions()
  }

  window.updateDOM()
  media.addEventListener('change', window.updateDOM)
}

let updateDOM: () => void = () => {}

const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(() => {
    if (typeof localStorage === 'undefined') return 'system'
    return (
      (localStorage.getItem(STORAGE_KEY) as ColorSchemePreference) || 'system'
    )
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.updateDOM === 'function') {
      updateDOM = window.updateDOM
    } else {
      updateDOM = () => {
        const root = document.documentElement
        if (mode === 'dark') root.classList.add('dark')
        else root.classList.remove('dark')
      }
    }

    const syncTabs = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue)
        setMode(e.newValue as ColorSchemePreference)
    }
    window.addEventListener('storage', syncTabs)
    return () => window.removeEventListener('storage', syncTabs)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode)
    updateDOM()
  }, [mode])

  const handleModeSwitch = () => {
    const index = modes.indexOf(mode)
    setMode(modes[(index + 1) % modes.length])
  }

  return (
    <button
      suppressHydrationWarning
      className={styles.switch}
      onClick={handleModeSwitch}
    />
  )
}

/** Injected script to avoid FOUC */
const ScriptInit = memo(() => (
  <Script id="theme-init" strategy="beforeInteractive">
    {`(${NoFOUCScript.toString()})('${STORAGE_KEY}')`}
  </Script>
))

/** ThemeSwitcher component */
export const ThemeSwitcher = () => {
  return (
    <>
      <ScriptInit />
      <Switch />
    </>
  )
}

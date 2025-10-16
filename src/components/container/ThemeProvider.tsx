import { createContext, ReactNode } from 'react'
import { useTheme } from '@/hooks/useTheme'

const ThemeContext = createContext<ReturnType<typeof useTheme> | null>(null)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const theme = useTheme()

    return <ThemeContext.Provider value={{ ...theme }}>{children}</ThemeContext.Provider>
}

import { createContext, useState } from 'react'

// Crea el contexto
export const Theme = createContext();

// Crea el componente que provee al contexto
const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState("light")

  return (
    <Theme.Provider value={{ theme, setTheme }}>
      {children}
    </Theme.Provider>
  )
}

export default ThemeProvider
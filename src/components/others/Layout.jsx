import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useContext } from 'react'
import { Theme } from '../../context/ThemeProvider'

const Layout = ({ children }) => {

    //! Theme: light / dark
    const { theme } = useContext(Theme);

    return (
        <>
            <Header />
            <div className={`layout-container-${theme ? "light" : "dark"}`}>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout
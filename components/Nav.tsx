import { useState, useEffect } from "react"
import { Spin as Hamburger } from 'hamburger-react'
import { useRouter } from "next/router"
import Head from "next/head"
import { getUserToken, logout } from "../lib/user/user"

const Nav = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const handleToggle = (route?: string) => {
        console.log(isOpen)
        if (route) {
            router.push(route)
            setIsOpen(false)
        } else {
            setIsOpen(!isOpen)
        }
    }

    const handleLogout = () => {
        logout()
        router.push('/')
        setIsOpen(false)
    }
    const [themeState, setThemeState] = useState(false);

    const handleChange = () => {
        if (themeState) {
        localStorage.setItem('Theme', 'light');
        document.body.classList.remove('dark-mode');
        } else {
        localStorage.setItem('Theme', 'dark');
        document.body.classList.add('dark-mode');
        }
        setThemeState(!themeState);
    };
    useEffect(() => {
        const getTheme = localStorage.getItem('Theme');
        if (getTheme === 'dark') {
        setThemeState(true);
        document.body.classList.add('dark-mode')
        }
        else {
        setThemeState(false);
        return document.body.classList.remove('dark-mode');
        }
    });

    return (
        <>
            <Head>
                <meta name="theme-color" content={isOpen ? "#445F5F" : ""}></meta>
            </Head>
        <nav className="nav" style={isOpen ? {backgroundColor: 'transparent'} : {}}>
                <div onClick={() => handleToggle('/')}>
                    <h1>PODIO</h1>
                </div>
                <div>
                    <Hamburger direction="right" toggled={isOpen} toggle={() => handleToggle()} />
                </div>
                
            </nav>
            {isOpen && (
                <div className="nav-menu">
                <div className="nav-menu-items">
                    <h3>Buscar Conferencias</h3>
                        {getUserToken() ? (
                            <>
                                <h3 onClick={() => handleToggle('/profile')}>Mi Perfil</h3>
                                <h3 onClick={handleLogout}>Cerrar Sesion</h3>
                            </>
                        ) :
                        (
                            <>
                                <h3 onClick={() => handleToggle('/login')}>Login</h3>
                                <h3 onClick={() => handleToggle('/register')}>Registro</h3>
                            </>
                        ) 
                        }    
                    
                    <h3 onClick={handleChange}>{themeState ? 'Light Mode' : 'Dark Mode'}</h3>
                </div>
            </div>
            )}
            
        </>
    )
}

export default Nav
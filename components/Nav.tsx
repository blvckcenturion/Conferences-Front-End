import { useState } from "react"
import { Spin as Hamburger } from 'hamburger-react'
const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleToggle = () => {
        setIsOpen(!isOpen)
        console.log(isOpen)
    }

    return (
        <nav className="nav">
            <div>
                <h1>PODIO</h1>
            </div>
            
            <div>
                <Hamburger direction="right" toggled={isOpen} toggle={handleToggle} />
            </div>
            
        </nav>
    )
}

export default Nav
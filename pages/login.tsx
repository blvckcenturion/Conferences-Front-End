import React from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useState } from 'react'
import { Login } from '../lib/user/user'

const login: NextPage = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (e: { preventDefault: any }) => { 
        e.preventDefault()
        const response = await Login({
            email,
            password
        })
        if (response) {
            router.push('/profile')
        } else {
            alert('Error al iniciar sesión')
        }
    }

  return (
    <div className='login'>
          <form className="form" onSubmit={handleLogin}>
              <div className="form-heading">
                  <h2>Inicia Sesion.</h2>
              </div>
              <div className="form-body">
                  <div className="form-input">
                        <label htmlFor="email">Email</label>
                      <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-input">
                        <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                  </div>
              </div>
              <div className="form-action">
                <button>
                    Iniciar Sesion      
                </button>
              </div>
              <div className="form-redirect" onClick={() => router.push('/register')}>
                  <p>Registrate</p>
              </div>
        </form>
    </div>
  )
}

export default login
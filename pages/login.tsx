import React from 'react'

const login = () => {
    const handleLogin = (e: { preventDefault: any }) => { 
        e.preventDefault()
        console.log('login')
    }
  return (
    <div className='login'>
          <form className="form" onSubmit={handleLogin}>
              <div className="form-heading">
                  <h2>Inicia Sesion.</h2>
              </div>
              <div className="form-body">
                  <div className="form-input">
                        <label htmlFor="">Email</label>
                        <input type="text" id="email" name="email" />
                  </div>
                  <div className="form-input">
                        <label htmlFor="">Password</label>
                        <input type="text" id="name" name="name" />
                  </div>
              </div>
              <div className="form-action">
                <button>
                    Registrarse      
                </button>
              </div>
              <div className="form-redirect">
                  <p>Inicia Sesion</p>
              </div>
        </form>
    </div>
  )
}

export default login
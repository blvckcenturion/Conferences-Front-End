import { useRouter } from 'next/router'

const register = () => {
    const router = useRouter();
    const handleRegister = (e: { preventDefault: any }) => {
        e.preventDefault()
        console.log('register')
    }

  return (
    <div className="register">
        <form className="form" onSubmit={handleRegister}>
              <div className="form-heading">
                  <h2>Registrate.</h2>
              </div>
              <div className="form-body">
                <div className="form-input">
                        <label htmlFor="">Nombres</label>
                        <input type="text" id="names" name="names" />
                  </div>
                  <div className="form-input">
                        <label htmlFor="">Apellidos</label>
                        <input type="text" id="lastnames" name="lastnames" />
                  </div>
                  <div className="form-input">
                        <label htmlFor="">Email</label>
                        <input type="email" id="email" name="email" />
                  </div>
                  <div className="form-input">
                        <label htmlFor="">Telefono</label>
                        <input type="phone" id="phone" name="phone" />
                  </div>
                  <div className="form-input">
                        <label htmlFor="">Password</label>
                        <input type="password" id="name" name="name" />
                  </div>
              </div>
              <div className="form-action">
                <button>
                    Registrarse      
                </button>
              </div>
              <div className="form-redirect" onClick={() => router.push('/login')}>
                  <p>Inicia Sesion</p>
              </div>
        </form>
    </div>
  )
}

export default register
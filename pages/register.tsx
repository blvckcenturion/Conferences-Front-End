import { NextPage } from 'next';
import { useRouter } from 'next/router'
import { createUser } from '../lib/user/user';
import { useState } from 'react';

const register : NextPage = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = async (e: { preventDefault: any }) => {
        e.preventDefault();
        const response = await createUser({
            firstName,
            lastName,
            email,
            password,
            phone
        });
        if (response && response >= 200 && response < 300) { 
            router.push('/login');
        }
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
                        <input type="text" id="names" name="names" value={firstName} onChange={(e) =>setFirstName(e.target.value)}/>
                  </div>
                  <div className="form-input">
                        <label htmlFor="">Apellidos</label>
                        <input type="text" id="lastnames" name="lastnames" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                  </div>
                  <div className="form-input">
                        <label htmlFor="">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div className="form-input">
                        <label htmlFor="">Telefono</label>
                        <input type="phone" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                  </div>
                  <div className="form-input">
                        <label htmlFor="">Password</label>
                        <input type="password" id="name" name="name" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
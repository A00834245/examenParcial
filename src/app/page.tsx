'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMembers } from './api/members';
import { useUser } from '../app/context/UserContext';
import './login.css';

export default function LoginPage() {
  const router = useRouter();
  const { member, setMember } = useUser();

  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (member) {
      router.replace('/homepage');
    }
  }, [member, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const members = await getMembers();
    const found = members.find(
      m => m.usuario === usuario && m.contraseña === contraseña
    );

    if (found) {
      setMember({
        nombreCompleto: found.nombreCompleto,
        numeroMembresia: found.numeroMembresia,
      });
      router.push('/homepage');
    } else {
      setError('Usuario o contraseña incorrectos. Volver a intentar.');
    }
  };

  if (member) return null;

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-header">Café Aurora</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={e => setContraseña(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
}

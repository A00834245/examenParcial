'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';
import './homepage.css';

export default function HomePage() {
  const router = useRouter();
  const { member, setMember } = useUser();

  useEffect(() => {
    if (!member) {
      router.replace('/');
    }
  }, [member, router]);

  if (!member) return null;

  const handleLogout = () => {
    setMember(null);
    router.push('/');
  };

  return (
    <div className="homepage-container">
      <div className="homepage-box">
        <h1 className="homepage-header">¡Hola, {member.nombreCompleto}!</h1>
        <p className="homepage-text">
          Numero de membresia: <strong>{member.numeroMembresia}</strong>.
        </p>
        <p className="homepage-text">Gracias por ser parte de Café Aurora.</p>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

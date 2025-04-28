'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MemberData {
  nombreCompleto: string;
  numeroMembresia: number;
}

interface UserContextType {
  member: MemberData | null;
  setMember: (member: MemberData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [member, setMemberState] = useState<MemberData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cafeAuroraMember');
    if (stored) setMemberState(JSON.parse(stored));
  }, []);

  const setMember = (member: MemberData | null) => {
    setMemberState(member);
    if (member) {
      localStorage.setItem('cafeAuroraMember', JSON.stringify(member));
    } else {
      localStorage.removeItem('cafeAuroraMember');
    }
  };

  return (
    <UserContext.Provider value={{ member, setMember }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}

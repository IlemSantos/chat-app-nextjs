import { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/router'

import { api } from "../services/api";

type User = {
  name: string
  email: string
  image: string
}

type SignInData = {
  email: string;
  password: string;
}

type SignUpData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user;

  useEffect(() => {
    async function getUserAccount() {
      try {
        const { 'nextauth.access_token': access_token } = parseCookies()

        if (access_token) {
          const response = await api.get('/auth/user');
          setUser(response.data.user);
        }
      } catch (error) {
        console.error(error);
      }
    }
    
    getUserAccount()
  }, [])

  async function signIn({ email, password }: SignInData) {
    const res = await fetch("http://localhost:4000/auth/signinwithpassword", {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    const { user, access_token, error } = await res.json()

    if (!res.ok && error) {
      return ({ error })
    }

    // If no error and we have user data, return it
    if (res.ok && user) {

      setCookie(undefined, 'nextauth.access_token', access_token, {
        maxAge: 60 * 60 * 1, // 1 hour
        path: '/',
      })

      api.defaults.headers['Authorization'] = `Bearer ${access_token}`;

      setUser(user)

      router.push('/')
      return user
    }

    // Return null if user data could not be retrieved
    return null
  }

  async function signUp({ email, password }: SignUpData) {
    const res = await fetch("http://localhost:4000/auth/signup", {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    const { user, access_token, error } = await res.json()

    if (!res.ok && error) {
      return ({ error })
    }

    // If no error and we have user data, return it
    if (res.ok && user) {

      setCookie(undefined, 'nextauth.access_token', access_token, {
        maxAge: 60 * 60 * 1, // 1 hour
        path: '/',
      })

      api.defaults.headers['Authorization'] = `Bearer ${access_token}`;

      setUser(user)

      router.push('/')
      return user
    }

    // Return null if user data could not be retrieved
    return null
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
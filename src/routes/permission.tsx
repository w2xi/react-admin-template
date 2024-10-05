import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useUserStore from '@/stores/user'
import type { FC, ReactElement } from 'react'

interface RouteGuardProps {
  title?: string
  children?: React.ReactNode
}

const RouteGuard: FC<RouteGuardProps> = props => {
  const location = useLocation()
  const navigate = useNavigate()
  const userInfo = useUserStore(state => state.userInfo)

  const element = props.children
  const isLogged = !!userInfo
  const { pathname } = location

  useEffect(() => {
    if (!isLogged) {
      if (pathname !== '/login') {
        navigate('/login', { replace: true })
      }
    } else if (pathname === '/login') {
      navigate('/', { replace: true })
    }
  }, [pathname])

  if (isLogged) {
    if (pathname === '/login') {
      return null
    } else {
      return element as ReactElement
    }
  } else {
    return pathname === '/login' ? (element as ReactElement) : null
  }
}

export default RouteGuard

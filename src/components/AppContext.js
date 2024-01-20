"use client"
import {SessionProvider} from "next-auth/react"


const AppContext = ({children}) => {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  )
}

export default AppContext

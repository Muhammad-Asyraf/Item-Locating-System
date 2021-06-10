import React, { useContext, createContext } from 'react'

const NavigationContext = createContext()

export function useNavigationContext() {
    return(useContext(NavigationContext))
}

export default function ContextProvider({children,value}) {

    return(
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    )
}
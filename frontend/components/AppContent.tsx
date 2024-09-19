"use client"

import { AppWrapper } from './AppWrapper'

const AppContent = ({user, children}:{user?: string, children:any})=>{
    
    return (
        <>
            <AppWrapper user={user? user : '!'}>
                {children}
            </AppWrapper>
        </>
    )
}

export default AppContent
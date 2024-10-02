"use client"

import { AppWrapper } from './AppWrapper'

const AppContent = ({user, children, backendUrl}:{user?: string, children:any, backendUrl:string})=>{
    
    return (
        <>
            <AppWrapper user={user? user : '!'} backendUrl={backendUrl}>
                {children}
            </AppWrapper>
        </>
    )
}

export default AppContent
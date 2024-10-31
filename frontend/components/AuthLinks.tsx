import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default function AuthLinks({type}:{type: 'login'|'logout'}){
  return type === 'login' ? (
    <LoginLink className="hover:translate-y-[2px] transition p-2 px-4 rounded-md bg-white border">
      Login
    </LoginLink>
  ):(
    <LogoutLink className="hover:translate-y-[2px] transition p-2 px-4 rounded-md text-white border font-bold bg-red-400 ">
      Log Out
    </LogoutLink>
  )
}
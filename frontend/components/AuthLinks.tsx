import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function AuthLinks({ type }: { type: "login" | "logout" }) {
  return type === "login" ? (
    <LoginLink
      postLoginRedirectURL="/"
      className="hover:translate-y-[2px] min-w-max transition p-2 px-4 rounded-md bg-white border"
    >
      Login
    </LoginLink>
  ) : (
    <RegisterLink
      postLoginRedirectURL="/"
      className="hover:translate-y-[2px] min-w-max transition p-2 px-4 rounded-md text-white border font-bold bg-red-400 "
    >
      Log Out
    </RegisterLink>
  );
}

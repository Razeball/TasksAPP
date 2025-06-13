import { type ReactNode } from "react";

type formHeaderProps = {
  isLogin: boolean;
  children: ReactNode;
};

export default function FormHeader(props: formHeaderProps) {
  const { isLogin, children } = props;
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-6xl mt-20 font-bold">
        {isLogin ? "Welcome Back" : "Welcome To Tasks!"}
      </h1>
      <h3 className="mb-5 text-shadow-white font-light">
        {isLogin
          ? "Sign in to your Task account"
          : "Sign up to create a Task account"}
      </h3>
      {children}
    </div>
  );
}

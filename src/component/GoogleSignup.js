// pages/auth/signin.js
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={() => signIn("google")}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;

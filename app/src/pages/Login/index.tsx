import { ArrowSquareOut } from "@phosphor-icons/react"
import {
  LoginContainer,
  LoginFooter,
  LoginForm,
  LoginTitles,
  LoginWrapper,
} from "./styles"

const Login = () => {
  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginTitles>
          <h1>Login</h1>
          <p>Welcome! SignIn to see your bookmarked films.</p>
        </LoginTitles>

        <LoginForm>
          <label>
            Username
            <input placeholder="Enter your username" type="text" />
          </label>
          <label>
            Password
            <input placeholder="Enter your password" type="password" />
          </label>

          <LoginFooter>
            <a href="#">Forgot password?</a>
            <button>Login</button>

            <span>
              <p>
                Not registered yet?{" "}
                <a>
                  Register now <ArrowSquareOut size={20} />
                </a>
              </p>
            </span>
          </LoginFooter>
        </LoginForm>
      </LoginWrapper>
    </LoginContainer>
  )
}

export default Login

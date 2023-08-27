import { ArrowSquareOut } from "@phosphor-icons/react"
import {
  LoginContainer,
  LoginFooter,
  LoginForm,
  LoginTitles,
  LoginWrapper,
} from "./styles"
import { FormEvent, useState } from "react"
import { useMutation } from "react-query"
import { api } from "../../lib/api"

const Register = () => {
  const [userInformations, setUserInformations] = useState({
    username: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
    confirmPassword: {
      value: "",
      error: false,
    },
  })

  const registerNewUser = useMutation({
    mutationFn: (newUser) => {
      return api.post("/register", { data: newUser })
    },

    onSuccess: () => {},
  })

  const handleChangeInputInformations = (
    inputToChange: string,
    value: string
  ) => {
    setUserInformations((oldValue) => ({
      ...oldValue,
      [inputToChange]: {
        ...oldValue[inputToChange as keyof typeof userInformations],
        value,
      },
    }))
  }

  const handleSubmitRegister = async (e: FormEvent) => {
    e.preventDefault()

    const newUser = {
      username: userInformations.username.value,
      password: userInformations.password.value,
    }

    await registerNewUser.mutateAsync(newUser)
  }

  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginTitles>
          <h1>Register</h1>
          <p>Welcome! SignIn to bookmark films.</p>
        </LoginTitles>

        <LoginForm onSubmit={handleSubmitRegister}>
          <label>
            Username
            <input
              onChange={({ target }) =>
                handleChangeInputInformations("username", target.value)
              }
              placeholder="Enter your username"
              type="text"
            />
          </label>
          <label>
            Password
            <input
              onChange={({ target }) =>
                handleChangeInputInformations("password", target.value)
              }
              placeholder="Enter your password"
              type="password"
            />
          </label>

          <label>
            Confirm password
            <input
              onChange={({ target }) =>
                handleChangeInputInformations("confirmPassword", target.value)
              }
              placeholder="Confirm your password"
              type="password"
            />
          </label>

          <LoginFooter>
            <a href="#">Forgot password?</a>
            <button type="submit">Register</button>

            <span>
              <p>
                Already registered?{" "}
                <a href="/login">
                  Sign In <ArrowSquareOut size={20} />
                </a>
              </p>
            </span>
          </LoginFooter>
        </LoginForm>
      </LoginWrapper>
    </LoginContainer>
  )
}

export default Register

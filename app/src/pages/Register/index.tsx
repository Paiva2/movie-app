import { ArrowSquareOut } from "@phosphor-icons/react"
import {
  ErrorMessage,
  LoginContainer,
  LoginFooter,
  LoginForm,
  LoginTitles,
  LoginWrapper,
} from "./styles"
import { FormEvent, useState } from "react"
import { useMutation } from "react-query"
import { api } from "../../lib/api"
import { Toast } from "../../utils/toast"

type NewUserSchema = {
  username: string
  password: string
}

const registerDefaultSchema = {
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
    matchError: false,
  },
}

const Register = () => {
  const [userInformations, setUserInformations] = useState(
    registerDefaultSchema
  )
  const [sendingRegiter, setSendingRegister] = useState(false)

  const registerNewUser = useMutation({
    mutationFn: async (newUser: NewUserSchema) => {
      setSendingRegister(true)

      const response = await api.post("/register", { data: newUser })

      return response.data
    },

    onError: () => {
      Toast.fire({
        icon: "error",
        title: "There was an error. Try again.",
      })

      setSendingRegister(false)
    },

    onSuccess: () => {
      setUserInformations(registerDefaultSchema)

      Toast.fire({
        icon: "success",
        title: "User created with success!",
      })

      setSendingRegister(false)
    },
  })

  const handleChangeInputInformations = (
    inputToChange: string,
    value: string
  ) => {
    setUserInformations((oldValue) => ({
      ...oldValue,
      [inputToChange]: {
        value,
        error: false,
        matchError: false,
      },
    }))
  }

  const setInputError = (inputWithError: string) => {
    setUserInformations((oldValue) => ({
      ...oldValue,
      [inputWithError]: {
        ...oldValue[inputWithError as keyof typeof userInformations],
        error: true,
        matchError: true,
      },
    }))
  }

  const handleSubmitRegister = async (e: FormEvent) => {
    e.preventDefault()

    const { username, password, confirmPassword } = userInformations

    if (!username.value && !password.value && !confirmPassword.value) {
      setInputError("password")
      setInputError("username")
      setInputError("confirmPassword")

      return
    } else if (!username.value) {
      return setInputError("username")
    } else if (!password.value) {
      return setInputError("password")
    } else if (!confirmPassword.value) {
      return setInputError("confirmPassword")
    } else if (confirmPassword.value !== password.value) {
      return setUserInformations((oldValue) => ({
        ...oldValue,
        confirmPassword: {
          ...oldValue.confirmPassword,
          matchError: true,
        },
      }))
    }

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
              value={userInformations.username.value}
            />
            {userInformations.username.error && (
              <ErrorMessage>Can't be empty.</ErrorMessage>
            )}
          </label>
          <label>
            Password
            <input
              onChange={({ target }) =>
                handleChangeInputInformations("password", target.value)
              }
              placeholder="Enter your password"
              type="password"
              value={userInformations.password.value}
            />
            {userInformations.password.error && (
              <ErrorMessage>Can't be empty.</ErrorMessage>
            )}
          </label>

          <label>
            Confirm password
            <input
              onChange={({ target }) =>
                handleChangeInputInformations("confirmPassword", target.value)
              }
              placeholder="Confirm your password"
              type="password"
              value={userInformations.confirmPassword.value}
            />
            {userInformations.confirmPassword.matchError && (
              <ErrorMessage>Passwords don't match.</ErrorMessage>
            )}
            {userInformations.confirmPassword.error && (
              <ErrorMessage>Can't be empty.</ErrorMessage>
            )}
          </label>

          <LoginFooter>
            <a href="#">Forgot password?</a>
            <button disabled={sendingRegiter} type="submit">
              Register
            </button>

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

import { ArrowSquareOut } from "@phosphor-icons/react"
import {
  ErrorMessage,
  RegisterContainer,
  RegisterFooter,
  RegisterForm,
  RegisterTitles,
  RegisterWrapper,
} from "./styles"
import { FormEvent, useState } from "react"
import { useMutation } from "react-query"
import { api } from "../../lib/api"
import { Toast } from "../../utils/toast"
import { AxiosError } from "axios"

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
    lengthError: false,
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
        lengthError: false,
      },
    }))
  }

  const setInputError = (inputWithError: string, errorType: string) => {
    setUserInformations((oldValue) => ({
      ...oldValue,
      [inputWithError]: {
        ...oldValue[inputWithError as keyof typeof userInformations],
        [errorType]: true,
      },
    }))
  }

  const handleSubmitRegister = async (e: FormEvent) => {
    e.preventDefault()

    const { username, password, confirmPassword } = userInformations

    if (!username.value) {
      setInputError("username", "error")
    } else if (!password.value) {
      setInputError("password", "error")
    } else if (password.value.length < 5) {
      setInputError("password", "lengthError")
    } else if (!confirmPassword.value) {
      setInputError("confirmPassword", "error")
    } else if (confirmPassword.value !== password.value) {
      setInputError("confirmPassword", "matchError")
    } else {
      const newUser = {
        username: userInformations.username.value,
        password: userInformations.password.value,
      }

      try {
        await registerNewUser.mutateAsync(newUser)
      } catch (error) {
        if (error instanceof AxiosError) {
          Toast.fire({
            icon: "error",
            title: error?.response?.data.message,
          })

          setSendingRegister(false)
        }
      }
    }
  }

  return (
    <RegisterContainer>
      <RegisterWrapper>
        <RegisterTitles>
          <h1>Register</h1>
          <p>Welcome! SignIn to bookmark films.</p>
        </RegisterTitles>

        <RegisterForm onSubmit={handleSubmitRegister}>
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
            {userInformations.password.lengthError && (
              <ErrorMessage>
                Password must have at least 5 characters.
              </ErrorMessage>
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

          <RegisterFooter>
            <a href="/forgot-password">Forgot password?</a>
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
          </RegisterFooter>
        </RegisterForm>
      </RegisterWrapper>
    </RegisterContainer>
  )
}

export default Register

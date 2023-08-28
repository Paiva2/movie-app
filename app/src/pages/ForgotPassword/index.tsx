import { ArrowSquareOut } from "@phosphor-icons/react"
import {
  ErrorMessage,
  ForgotPasswordContainer,
  ForgotPasswordFooter,
  ForgotPasswordForm,
  ForgotPasswordTitles,
  ForgotPasswordWrapper,
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

const userDefaultSchema = {
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

const ForgotPassword = () => {
  const [userInformations, setUserInformations] = useState(userDefaultSchema)
  const [sendingChangePassword, setSendingChangePassword] = useState(false)

  const updateUserPassword = useMutation({
    mutationFn: async (newUser: NewUserSchema) => {
      setSendingChangePassword(true)

      const response = await api.patch("/forgot-password", { data: newUser })

      return response.data
    },

    onSuccess: () => {
      setUserInformations(userDefaultSchema)

      Toast.fire({
        icon: "success",
        title: "Password changed with success!",
      })

      setSendingChangePassword(false)
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

  const setInputError = (inputWithError: string, errorType: string) => {
    setUserInformations((oldValue) => ({
      ...oldValue,
      [inputWithError]: {
        ...oldValue[inputWithError as keyof typeof userInformations],
        [errorType]: true,
      },
    }))
  }

  const handleSubmitResetPassword = async (e: FormEvent) => {
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
      const updatedUser = {
        username: userInformations.username.value,
        password: userInformations.password.value,
      }

      try {
        await updateUserPassword.mutateAsync(updatedUser)
      } catch (error) {
        if (error instanceof AxiosError) {
          Toast.fire({
            icon: "error",
            title: error?.response?.data.message,
          })

          setSendingChangePassword(false)
        }
      }
    }
  }

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordWrapper>
        <ForgotPasswordTitles>
          <h1>Forgot Password</h1>
          <p>Change your password!</p>
        </ForgotPasswordTitles>

        <ForgotPasswordForm onSubmit={handleSubmitResetPassword}>
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

          <ForgotPasswordFooter>
            <p>
              Not registered yet?{" "}
              <a href="/register">
                Register now <ArrowSquareOut size={20} />
              </a>
            </p>
            <button disabled={sendingChangePassword} type="submit">
              Confirm
            </button>

            <span>
              <p>
                Already registered?{" "}
                <a href="/login">
                  Sign In <ArrowSquareOut size={20} />
                </a>
              </p>
            </span>
          </ForgotPasswordFooter>
        </ForgotPasswordForm>
      </ForgotPasswordWrapper>
    </ForgotPasswordContainer>
  )
}

export default ForgotPassword

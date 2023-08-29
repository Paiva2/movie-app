import { ArrowSquareOut } from "@phosphor-icons/react"
import {
  ErrorMessage,
  LoginContainer,
  LoginFooter,
  LoginForm,
  LoginTitles,
  LoginWrapper,
} from "./styles"
import { FormEvent, useState, useContext, useEffect } from "react"
import { useMutation } from "react-query"
import { api } from "../../lib/api"
import { Toast } from "../../utils/toast"
import { AxiosError } from "axios"
import Cookies from "js-cookie"
import { AuthContextProvider } from "../../contexts/AuthContext"

type UserLoginSchema = {
  username: string
  password: string
}

const userLoginSchema = {
  username: {
    value: "",
    error: false,
  },
  password: {
    value: "",
    error: false,
  },
}

const Login = () => {
  const [sendingLogin, setSendingLogin] = useState(false)
  const [userInformations, setUserInformations] = useState(userLoginSchema)

  const { userAuthenticated } = useContext(AuthContextProvider)

  useEffect(() => {
    if (userAuthenticated.isUserAuth) {
      return window.location.replace("/home")
    }
  }, [userAuthenticated])

  const loginUser = useMutation({
    mutationFn: async (loginUser: UserLoginSchema) => {
      setSendingLogin(true)

      const response = await api.post("/login", { data: loginUser })

      return response.data
    },

    onSuccess: () => {
      setUserInformations(userLoginSchema)

      setSendingLogin(false)
    },
  })

  const setInputError = (inputWithError: string) => {
    setUserInformations((oldValue) => ({
      ...oldValue,
      [inputWithError]: {
        ...oldValue[inputWithError as keyof typeof userInformations],
        error: true,
      },
    }))
  }

  const handleChangeInputInformations = (
    inputToChange: string,
    value: string
  ) => {
    setUserInformations((oldValue) => ({
      ...oldValue,
      [inputToChange]: {
        value,
        error: false,
      },
    }))
  }

  const handleSubmitLogin = async (e: FormEvent) => {
    e.preventDefault()

    const { username, password } = userInformations

    if (!username.value && !password.value) {
      setInputError("username")
      setInputError("password")

      return
    } else if (!username.value) {
      return setInputError("username")
    } else if (!password.value) {
      return setInputError("password")
    }

    const userToLogin = {
      username: username.value,
      password: password.value,
    }

    try {
      const response = await loginUser.mutateAsync(userToLogin)

      const JWTExpiration = 1000 * 60 * 60 * 24 * 7 // 7 days

      Cookies.set("movie-app-auth", response.token, {
        path: "/",
        expires: JWTExpiration,
      })

      return window.location.replace("/home")
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: error?.response?.data.message,
        })

        setSendingLogin(false)
      }
    }
  }

  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginTitles>
          <h1>Login</h1>
          <p>Welcome! SignIn to see your bookmarked films.</p>
        </LoginTitles>

        <LoginForm onSubmit={handleSubmitLogin}>
          <label>
            Username
            <input
              onChange={({ target }) =>
                handleChangeInputInformations("username", target.value)
              }
              value={userInformations.username.value}
              placeholder="Enter your username"
              type="text"
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
              value={userInformations.password.value}
              placeholder="Enter your password"
              type="password"
            />
            {userInformations.password.error && (
              <ErrorMessage>Can't be empty.</ErrorMessage>
            )}
          </label>

          <LoginFooter>
            <a href="/forgot-password">Forgot password?</a>
            <button disabled={sendingLogin} type="submit">
              Login
            </button>

            <span>
              <p>
                Not registered yet?{" "}
                <a href="/register">
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

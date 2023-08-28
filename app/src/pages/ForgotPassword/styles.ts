import { styled } from "styled-components"

export const ForgotPasswordContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: url("https://i.imgur.com/kQYjzkA.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
`

export const ForgotPasswordWrapper = styled.div`
  background-color: #1f1e1e;
  color: #fff;
  padding: 3.125rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  width: 30%;
`

export const ForgotPasswordTitles = styled.div`
  h1 {
    font-size: 2.25rem;
  }

  p {
    margin-top: 5px;
    font-size: 0.875rem;
    color: gray;
  }
`

export const ForgotPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
    font-weight: 600;
    font-size: 1rem;

    input {
      border: 0;
      border-radius: 8px;
      padding: 0.9375rem;
      background: #0e0d0d;
      color: #fff;
      font-size: 1rem;
      border: 2px solid transparent;

      &:focus {
        border: 2px solid #7c5dfa;
      }
    }
  }
`

export const ForgotPasswordFooter = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.25rem;
  font-size: 1rem;

  p {
    align-self: start;
  }

  a:first-child {
    align-self: start;
  }

  p {
    display: flex;
    align-items: center;
    gap: 0.3125rem;
  }

  a {
    color: #7c5dfa;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.3125rem;
  }

  button {
    border: 0;
    width: 100%;
    padding: 0.9375rem;
    background-color: #7c5dfa;
    cursor: pointer;
    border-radius: 8px;
    font-size: 1rem;
    color: #fff;
    font-weight: 600;
    transition: all 0.2s ease-in-out;

    &:disabled {
      background-color: #121214;
      cursor: default;
    }

    &:hover:not(:disabled) {
      background-color: #9277ff;
    }
  }
`
export const ErrorMessage = styled.p`
  font-size: 0.75rem;
  color: #ff1717cc;
`

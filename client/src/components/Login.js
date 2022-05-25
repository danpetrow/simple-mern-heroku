import React from 'react'

function Login() {
  return (
    <form action="/login" method="post">
    <label>
        Email:
        <input type="email" name="email" />
    </label>
    <label>
        Password:
        <input type="password" name="password" />
    </label>
    <input type="submit" value="Submit" />
    </form>
  )
}

export default Login
import { useRouteError } from 'react-router-dom'
import React, { FC, ReactElement } from 'react'

export const ErrorPage: FC = (): ReactElement => {
  const error = useRouteError()

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

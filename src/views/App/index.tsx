import React, { ReactElement } from 'react'
import Detail from 'views/detail'
import Index from 'views/index'
import { Route, Switch } from 'wouter'

export default function App (): ReactElement {
  return (
    <>
      <Switch>
        <Route path='/' component={Index} />
        <Route path='/t/:id'>
          {(params) => <Detail id={params.id} />}
        </Route>
      </Switch>
    </>
  )
}

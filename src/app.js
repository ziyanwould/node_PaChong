//处理业务逻辑
import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import Routes from './routes'
import 'antd/dist/antd'
import './assets/common.sass'

export default () => (
  <Switch>
    {
      Routes.map(({ name, path, exact = true, component }) => (
        <Route path={path} exact={exact} component={component} key={name} />
      ))
    }
  </Switch>
)

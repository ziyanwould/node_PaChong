//处理业务逻辑
import React from 'react'
import{
    Route,
    Switch
} from 'react-router-dom'
import routes from './routes'
import 'antd/dist/antd'
import './assets/common'
import { Router } from 'express';

export default()=>{
    <Switch>
     {
         routes.map(({name,path,exact=true,component}) =>{
             <Router path={path} exact={exact} component={component} key={name}/>
         })
     }
    </Switch>
}
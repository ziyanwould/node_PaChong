//前端代码最核心部分
import React,{Component} from 'react'

export default   (loadComponent,placeHolder='正在加载中')=>{
    return class AsyncComponent extends Component{
        unmount = false

        constructor(){
            super()
            this.state={
                Child:null
            }
        }

        render(){
            const {Child} = this.state

            return(
                Child
                ?<Child {...this.props}/>
                :placeholder
            )
        }
    }
}
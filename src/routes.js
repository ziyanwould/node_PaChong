import AC from './components/async_load'//加载动态模板
export default[
    {
        name:'首页',
        icon:'home',
        path:'/',
        component:AC(()=>import('./views/home'))
    },
    {
        name:'详情页',
        path:'/detail/:id',
        component:AC(()=>import('./views/movie/detail'))
    }
]
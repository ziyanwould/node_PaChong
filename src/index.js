import './assets/common'
function changeTitle(){
    window.$('#app').html('parcel 打包测试')
}

setTimeout(function(){
    changeTitle()
},2000)
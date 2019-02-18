export const name = 'ziyanwould'
export const getname = () => {
    return name
}

const age = 26
export default age

//批量导出
export {
    name as name2,
    getname as getName2,
    age as age2
}
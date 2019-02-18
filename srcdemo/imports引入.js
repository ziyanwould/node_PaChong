import { name } from './ex'
import { getname } from './ex'
//不通过花括号引入的常量

import age from './ex'
// import { name, getname } from './ex'

import {
    name2 as name3,
    getName2 as getName3,
    age2 as age3
} from './ex'


console.log('name,getname:', name, getname());
console.log('age:', age);

console.log('name3:', name3);
console.log('getName3:', getName3());
console.log('age3:', age3);
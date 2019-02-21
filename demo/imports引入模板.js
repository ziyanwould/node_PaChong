import { promisify } from 'util';
import { resolve as r} from 'path';
import { readFile,writeFileSync as wfs } from 'fs';
const path =paths => r(__dirname,paths);
// console.log('path', path('../package.json'));
promisify(readFile)(path('../package.json'))
.then(data=>{
    data =JSON.parse(data)
    console.log(data.name)
    wfs(path('./name'),String(data.name),'utf8');
    
})

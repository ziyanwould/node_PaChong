'use strict';

var _util = require('util');

var _path = require('path');

var _fs = require('fs');

var path = function path(paths) {
    return (0, _path.resolve)(__dirname, paths);
};
console.log('path', path('../package.json'));
(0, _util.promisify)(_fs.readFile)(path('../package.json')).then(function (data) {
    data = JSON.parse(data);
    console.log(data.name);
    (0, _fs.writeFileSync)(path('./name'), String(data.name), 'utf8');
});
//# sourceMappingURL=import.js.map
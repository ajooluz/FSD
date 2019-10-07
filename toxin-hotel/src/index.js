/*
    auto require all .scss dependencies
    https://webpack.js.org/guides/dependency-management/
*/
const importAll = r => { r.keys().forEach(r); };
importAll(require.context('.', true, /\.scss$/));

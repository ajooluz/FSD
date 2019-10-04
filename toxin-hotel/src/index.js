/*
    auto require all .js and .css dependencies
    https://webpack.js.org/guides/dependency-management/
*/
const importAll = r => { r.keys().forEach(r); };
importAll(require.context('./blocks/', true, /\.js|sass$/));
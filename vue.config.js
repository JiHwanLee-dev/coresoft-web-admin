module.exports = {                              // vue 설정파일.
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    nodeModulesPath: ['../node_modules']
  },
  devServer : {     // eslint 에러 overlay를 꺼준다. 
    overlay : false,

    // proxy설정
    proxy: {
      '/api': {
        target: 'http://localhost:4000'
      }
    }
  }
};

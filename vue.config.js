module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // измените порт на 3001
        ws: true,
        changeOrigin: true
      }
    }
  }
};

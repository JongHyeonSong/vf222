module.exports = {
  transpileDependencies: ["vuetify"],

  // 개발 서버 설정
  devServer: {
    // proxy: "https://firebasestorage.googleapis.com",
    // 프록시 설정
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      "/fb": {
        // 프록시 요청을 보낼 서버의 주소
        target: "https://firebasestorage.googleapis.com",
        changeOrigin: true,
        pathRewrite: { "^/fb": "" },
      },
    },
  },
};

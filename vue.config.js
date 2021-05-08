module.exports = {
  devServer: {
    open:true,
    proxy: {
      '^/api/package': {
        target: 'http://47.102.206.221/medical/', // 线上地址
        pathRewrite: {
          '^/api/package': '/package'
        }
      },
      '^/api/user': {
        target: 'http://47.102.206.221/medical/', // 线上地址
        pathRewrite: {
          '^/api/user': '/user'
        }
      },
      '^/api/lw': {
        target: 'http://vue.api.comcto.com/', // 线上地址
        pathRewrite: {
          '^/api/lw': ''
        }
      },

    }
  }
}

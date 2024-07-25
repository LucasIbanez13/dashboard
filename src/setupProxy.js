const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://script.google.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Elimina el prefijo /api cuando envíes la solicitud al backend
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('origin', 'http://localhost:3000');
      },
      logLevel: 'debug'
    })
  );
};

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://rickandmortyapi.com/api',
        changeOrigin: true,
    }),
);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

import asyncPlugin from 'preact-cli-plugin-fast-async';

export default config => {
    asyncPlugin(config);
    if (process.env.NODE_ENV === 'development') {
        config.devServer.proxy = [
            {
                // proxy requests matching a pattern:
                path: '/api/**',

                // where to proxy to:
                target: 'http://localhost:8000',
                type: 'proxy'
            },
        ];
    }

    if (process.env.NODE_ENV === 'undefined') {
      config.devServer.proxy = [
        {
          path: '/api/**',
          target: 'http://localhost:8000',
          type: 'proxy',
        },
      ];
    }

    if (process.env.NODE_ENV === 'production') {
      config.devServer.proxy = [
        {
          path: '/api/**',
          target: 'https://jidoka-go-iris.herokuapp.com:'+process.env.PORT,
          type: 'proxy',
        },
      ];
    }
};

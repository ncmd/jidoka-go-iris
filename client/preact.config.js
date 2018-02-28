import asyncPlugin from 'preact-cli-plugin-async';

export default config => {
    asyncPlugin(config);
    if (process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV === 'development'){
        config.devServer.proxy = [
            {
                path: '/api/**',
                target: 'http://localhost:8000',
                type: 'proxy'
            }
        ];
    }

    console.log(process.env.NODE_ENV);
};
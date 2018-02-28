export default config => {
    if (process.env.NODE_ENV === 'undefined'){
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
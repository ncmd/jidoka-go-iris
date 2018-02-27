export default config => {
    config.devServer.proxy = [
        {
            path: '/api/**',
            target: 'http://localhost:8000'
        }
    ];
};
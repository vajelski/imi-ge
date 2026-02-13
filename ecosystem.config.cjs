// PM2 — ფრონტენდი 3003-ზე, ბეკენდი 3004-ზე (nginx იყენებს 3003)
module.exports = {
    apps: [
        {
            name: 'imi-frontend',
            cwd: './frontend',
            script: 'npm',
            args: 'run start:prod',
            env: {
                NODE_ENV: 'production',
                BACKEND_URL: 'http://localhost:3004',
            },
        },
        {
            name: 'imi-backend',
            cwd: './backend',
            script: 'server.js',
            interpreter: 'node',
            interpreter_args: '--env-file=.env.local',
            env: {
                NODE_ENV: 'production',
                API_BACKEND_PORT: 3004,
                API_BACKEND_HOST: '0.0.0.0',
            },
        },
    ],
};

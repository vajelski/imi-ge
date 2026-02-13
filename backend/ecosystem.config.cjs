module.exports = {
    apps: [{
        name: "imi_ge_prod",
        script: "./server.js",
        node_args: "--env-file=.env.local",
        cwd: "/home/fullimi/imi_extracted/backend",
        env: {
            NODE_ENV: "production",
            API_BACKEND_PORT: 3004,
            PSI_API_KEY: "AIzaSyC6DNNVkuZNSgTmUh2ZcsAXubHbPbpevBs",
            API_BACKEND_HOST: "0.0.0.0",
            GOOGLE_CLOUD_PROJECT: "gen-lang-client-0881542862",
            GOOGLE_CLOUD_LOCATION: "global"
        }
    }]
}

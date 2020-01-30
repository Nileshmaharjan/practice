let uri = process.env.DB_DRIVER + '://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE;

module.exports = {
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || ' secret key for access token ',
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || ' secret key for refresh token ',
    JWT_ACCESS_TOKEN_LIFE: process.env.JWT_ACCESS_TOKEN_LIFE || new Date().setDate(new Date().getDate()+1), //current time + 1 dat ahead,
    JWT_REFRESH_TOKEN_LIFE: process.env.JWT_REFRESH_TOKEN_LIFE || new Date().setDate(new Date().getDate()+3), //current time + 3 day ahead
    dbConfig: {
        uri: uri,
        options: {
            useNewUrlParser: true,
            useCreateIndex: true,
            // useFindAndModify: false,
            autoIndex: false, // Don't build indexes
            // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            // reconnectInterval: 500, // Reconnect every 500ms
            // poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            // bufferMaxEntries: 0,
            // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            // family: 4 // Use IPv4, skip trying IPv6
        }
    }
};
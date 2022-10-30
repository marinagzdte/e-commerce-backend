export default {
    mongodb: {
        connectionString: 'mongodb+srv://mgzdte:mgzdte@cluster0.i1mz0b1.mongodb.net/?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    log4js: {
        appenders: {
            info: { type: "console" },
            errFile: { type: "file", filename: "error.log" },
            warnFile: { type: "file", filename: "warn.log" },

            log: { type: 'logLevelFilter', appender: 'info', level: 'all' },
            errLog: { type: 'logLevelFilter', appender: 'errFile', level: 'error' },
            warnLog: { type: 'logLevelFilter', appender: 'warnFile', level: 'warn' },
        },
        categories: {
            default: {
                appenders: ['log', 'errLog', 'warnLog'],
                level: 'all'
            }
        }
    }
}
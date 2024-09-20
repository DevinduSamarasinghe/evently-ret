import {createLogger, transports, format} from 'winston'

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message})=> {
            return `${timestamp} ${level}: ${message}`
        })

    ),
    transports: [
        new transports.Console(), // logs in the console
        new transports.File({filename: 'logs/error.log', level:'error'}), //log errors to file
        new  transports.File({filename: 'logs/combined.log'}) //log everything to a combined file 
    ]
});

export default logger;
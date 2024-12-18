const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// 创建日志文件的路径
const logFile = path.join(__dirname, '..', 'access.log');

// 创建一个可写流，用于将日志写入文件
const accessLogStream = fs.createWriteStream(logFile, { flags: 'a' });

// 配置morgan，使用自定义的日志格式，并将日志输出到文件
const logFormat = ':remote-addr - :date[iso] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms'
const logger = morgan(logFormat, { stream: accessLogStream });

module.exports = logger;

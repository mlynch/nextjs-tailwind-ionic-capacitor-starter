import pino from 'pino';
import * as os from 'os';
import stream from 'stream';
import { pinoHttp } from 'pino-http';
import { v4 as uuid4 } from 'uuid';

const PinoLevelToSeverityLookup = {
  trace: 'TRACE',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
};

const baseLogger = pino({
  base: {
    application: 'Travel Tales',
    pid: process.pid,
    hostname: os.hostname(),
  },
  formatters: {
    level(label) {
      return {
        level: PinoLevelToSeverityLookup[label] || PinoLevelToSeverityLookup['info'],
      };
    },
  },
  level: process.env.LOG_LEVEL || 'info',
});

export const logger = baseLogger.child({ platform: 'server' });

export const httpLogger = pinoHttp({
  logger,
  genReqId: uuid4,
  useLevel: <pino.LevelWithSilent>process.env.LOG_LEVEL || 'info',
  autoLogging: false,
  serializers: {
    req: req => {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
        user: req.user,
      };
    },
    err: pino.stdSerializers.err,
    res: pino.stdSerializers.res,
  },
});

export function receiveClientLog(req, res) {
  req.setEncoding('utf8');
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  stream.finished(req, err => {
    if (err) {
      req.log.error({ err });
      return errorResponse(res);
    }
    try {
      const { msgObj = {}, msg, level = 'info' } = JSON.parse(data);
      baseLogger[level]?.(msgObj, msg);
    } catch (err) {
      return errorResponse(res);
    }
    return okResponse(res);
  });
}

function okResponse(res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('message logged on server');
}

function errorResponse(res) {
  res.statusCode = 500;
  res.setHeader('Content-Type', 'text/plain');
  res.end('error occurred when logging on server');
}

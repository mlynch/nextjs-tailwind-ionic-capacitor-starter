import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { logger } from './server-logger';

export function createApiHandler<Req = NextApiRequest, Res = NextApiResponse>() {
  const handler = nextConnect<Req, Res>({
    onError: (error, req, res) => {
      return errorHandler(error, res);
    },
    onNoMatch: (req, res: unknown) =>
      (res as NextApiResponse)
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .send({ message: ReasonPhrases.METHOD_NOT_ALLOWED }),
  });

  //handler.use(jwtExpressMiddleware);

  return handler;
}

export const errorHandler = (err, res) => {
  logger.error({ err }, 'global error handler');
  if (typeof err === 'string') {
    return res.status(StatusCodes.BAD_REQUEST).end(ReasonPhrases.BAD_REQUEST);
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end(ReasonPhrases.INTERNAL_SERVER_ERROR);
};

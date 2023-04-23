import { createApiHandler } from '../../../server/middlewares/api-handler';
import { getAllTales } from '../../../server/services/tales';
import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { TalesResponse } from '../../../types/types';

async function getTales(req: NextApiRequest, res: NextApiResponse<TalesResponse>) {
  const tales = await getAllTales();
  res.status(StatusCodes.OK).send({ tales });
}

export default createApiHandler().get<NextApiRequest, NextApiResponse<TalesResponse>>(getTales);

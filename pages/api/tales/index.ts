import { createApiHandler } from '../../../utils/api-handler';
import { getAllTales } from '../../../server/services/tales';
import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { Trips } from '../../../types/db-schema-definitions';

type TalesResponse = {
  tales: Trips[];
};

async function getTales(req: NextApiRequest, res: NextApiResponse<TalesResponse>) {
  const tales = await getAllTales();
  res.status(StatusCodes.OK).send({ tales });
}

export default createApiHandler().get<NextApiRequest, NextApiResponse<TalesResponse>>(getTales);

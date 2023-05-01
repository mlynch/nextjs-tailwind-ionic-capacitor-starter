import { createApiHandler } from '../../../server/middlewares/api-handler';
import { getAllTales, createNewTale } from '../../../server/services/tales';
import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { TalesResponse,CreateTaleResponse } from '../../../types/types';

async function getTales(req: NextApiRequest, res: NextApiResponse<TalesResponse>) {
  const tales = await getAllTales();
  res.status(StatusCodes.OK).send({ tales });
}

const createTale = async (req: NextApiRequest, res: NextApiResponse<CreateTaleResponse>) => {
  const taleId = await createNewTale(req.body);
  res.status(StatusCodes.CREATED).send(taleId);
}

export default createApiHandler().get<NextApiRequest, NextApiResponse<TalesResponse>>(getTales)
.post<NextApiRequest, NextApiResponse<CreateTaleResponse>>(createTale);







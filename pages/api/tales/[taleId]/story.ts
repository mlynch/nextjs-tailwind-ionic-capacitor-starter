import { createApiHandler } from '../../../../server/middlewares/api-handler';
import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { getTaleStory } from '../../../../server/services/tales';
import { StoryResponse } from '../../../../types/types';

async function getStory(req: NextApiRequest, res: NextApiResponse<StoryResponse>) {
  const taleId = Number(req.query.taleId);
  const tales = await getTaleStory(taleId);

  res.status(StatusCodes.OK).send(tales);
}


export default createApiHandler().get<NextApiRequest, NextApiResponse<StoryResponse>>(getStory);

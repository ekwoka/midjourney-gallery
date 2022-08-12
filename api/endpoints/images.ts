import { formattedReturn, FormattedReturn } from '../utils/';
import { Handler } from '@netlify/functions';
import { API_Options, getImages } from '../midjourney';

export const handler: Handler = async (request): Promise<FormattedReturn> => {
  try {
    const params = (request.queryStringParameters ??
      {}) as unknown as API_Options;
    const images = await getImages(params);
    return formattedReturn(200, images);
  } catch (e) {
    console.error(e);
    return formattedReturn(500, { error: e });
  }
};

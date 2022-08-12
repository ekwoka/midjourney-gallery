import { ENV } from '../utils';
import { fetch } from 'cross-fetch';

const BASE_URL = 'https://www.midjourney.com/api/app/recent-jobs/';

const DEFAULT_API_OPTIONS: API_Options = {
  amount: 100,
  jobType: 'yfcc_upsample',
  orderBy: 'rising',
  jobStatus: 'completed',
  dedupe: true,
  refreshApi: 0,
  prompt: '',
};

const headers = {
  cookie: `__Secure-next-auth.session-token=${ENV.MIDJOURNEY_KEY}`,
};

const fetchOptions = {
  headers,
};

export const getImages = async (options: API_Options = {} as API_Options) => {
  const url = `${BASE_URL}?${new URLSearchParams(
    Object.assign(DEFAULT_API_OPTIONS, options) as unknown as Record<
      string,
      string
    >
  ).toString()}`;
  const response = await fetch(url, fetchOptions);
  const json = (await response.json()) as Job[];
  return json;
};

export type API_Options = {
  amount?: number;
  jobType?:
    | 'yfcc_upsample'
    | 'yfcc_diffusion,cc12m_diffusion,latent_diffusion'
    | null;
  orderBy?: 'rising' | 'new' | 'hot' | 'oldest' | 'top-week' | 'top-all';
  jobStatus?: 'completed';
  dedupe?: true;
  refreshApi?: 0;
  prompt?: string;
};

export type Job = {
  current_status: 'completed';
  enqueue_time: string;
  event: {
    height: number;
    textPrompt: [string];
    imagePrompts?: string;
    width: number;
    batchSize: number;
    seedImageURL: string;
  };
  flagged: boolean;
  followed_by_user: boolean;
  grid_id?: string;
  grid_num?: string;
  guild_id?: string;
  hidden: boolean;
  hot_score: string;
  id: string;
  image_paths: string[];
  is_published: boolean;
  liked_by_user: boolean;
  mod_hidden: boolean;
  platform: 'discord';
  platform_channel?: string;
  platform_channel_id?: string;
  platform_message_id?: string;
  platform_thread_id?: string;
  prompt: string;
  ranked_by_user: boolean;
  ranking_by_user?: number;
  type: string;
  user_id: string;
  user_ranking_count: number;
  user_ranking_score: number;
  username: string;
  full_command: string;
  reference_job_id: string;
  reference_image_num: string;
};

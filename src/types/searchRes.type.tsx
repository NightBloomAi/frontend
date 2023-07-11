type SearchRes = {
  hits: Hit[];
  page: number;
};

type Hit = {
  reference_job_id: string;
  prompt: string;
  full_command: string;
  height: number;
};

export type { SearchRes, Hit };

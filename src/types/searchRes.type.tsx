type SearchRes = {
  hits: SearchResItem[];
  page: number;
};

type SearchResItem = {
  id: string;
  prompt: string;
  full_command: string;
  height: number;
};

export type { SearchRes, SearchResItem };

export interface QueryOptions {
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    filterBy?: string;
    keyword?: string;
  }
  
 export  interface ParsedQueryOptions {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: 1|-1;
    filterBy: string;
    keyword: string |undefined;
  }
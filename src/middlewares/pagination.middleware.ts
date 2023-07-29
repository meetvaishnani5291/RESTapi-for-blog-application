import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/customRequest.interface';
import { QueryOptions, ParsedQueryOptions } from '../interfaces/queryOptions.interface';



const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const sortCriteria =['likes','createdAt'];
const filterCriteria =['tags','author','title'];


const fetchQueryPerameter = (req: CustomRequest, res: Response, next: NextFunction) => {
  try{
    const { page, limit, sortBy, sortOrder, filterBy, keyword }: QueryOptions = req.query;

    // Parse the page and limit parameters
    const parsedPage = Math.abs(parseInt(page as string)) || DEFAULT_PAGE;
    const parsedLimit = Math.abs(parseInt(limit as string)) || DEFAULT_LIMIT;

    // Parse the sortOrder parameter and set the default to 'DESC'
    const parsedSortOrder =  sortOrder?.toUpperCase() === 'ASC' ? 1 : -1;

    // Parse the sortBy parameter and set the default to 'createdAt'
    const parsedSortBy = sortBy && sortCriteria.includes(sortBy) ? sortBy : 'createdAt';

    // Parse the filterBy parameter and set the default to 'ALL'
    const parsedFilterBy =( filterBy && filterCriteria.includes(filterBy)) ? filterBy : 'all';

    const parsedKeyword = typeof keyword === 'string' ? keyword : undefined;
    
    // Attach the blog query options to the request object for use in subsequent middleware or route handlers
    req.blogQueryOptions = {
      page: parsedPage,
      limit: parsedLimit,
      sortBy : parsedSortBy,
      sortOrder: parsedSortOrder,
      filterBy : parsedFilterBy,
      keyword,
    };

    next();
  }catch(err) {
    next(err);
  }
};

export default fetchQueryPerameter;

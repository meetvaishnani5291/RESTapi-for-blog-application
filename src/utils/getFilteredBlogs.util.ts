import { FilterQuery, PipelineStage } from "mongoose";
import Blog, { IBlog } from "../models/blog.model";
import { ParsedQueryOptions } from "../interfaces/queryOptions.interface";

export const getFilteredBlogs = async (
  options: ParsedQueryOptions,
  userId?: string
) => {
  const { page, limit, sortBy, sortOrder, filterBy, keyword } = options;

  const pipeline: PipelineStage[] = [];

  if (keyword !== undefined) {
    if (filterBy === "all") {
      pipeline.push({
        $match: {
          $text: {
            $search: keyword,
          },
        },
      });
    } else if (filterBy === "tags") {
      pipeline.push({
        $match: { tags: { $elemMatch: { $regex: keyword } } },
      });
    } else if (filterBy === "author") {
      pipeline.push(
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "authorData",
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            content: 1,
            tags: 1,
            createdAt: 1,
            likes:1,
            author: { $arrayElemAt: ["$authorData.username", 0] },
          },
        },
        {
          $match: {
            author: {
              $regex: keyword,
              $options: "i",
            },
          },
        }
      );
    } else {
      pipeline.push({
        $match: {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
      });
    }
  }
  if (userId !== undefined) {
    pipeline.push({
      $match: { authorId: userId },
    });
  }
  if (sortBy === "likes") {
    pipeline.push({
      $addFields: {
        likeCount: { $size: "$likes" }, 
      },
    },{
      $sort : {
        likeCount : sortOrder
      }
    });
  } else {
    const sort: { [key: string]: -1 | 1 } = {};
    sort[sortBy] = sortOrder;
    pipeline.push({
      $sort: sort,
    });
  }

  pipeline.push(
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    }
  );
  const blogs: IBlog[] = await Blog.aggregate(pipeline);
  return blogs;
};

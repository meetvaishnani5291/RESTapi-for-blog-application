# Blog Project - Git Documentation

## Introduction

This Git documentation provides an overview and usage instructions for the completed blog project. The project aims to provide a simple RESTful API for managing blog posts, categories, and user information.

## Getting Started

To get started with the blog project, follow these steps:

1. Clone the repository to your local machine using the following command:
$git clone <repository_url>

2. Navigate to the project directory:
$cd blog-project

3. Install the project dependencies using npm or yarn:
$npm install

4. Create a `.env` file in the root of the project and set the required environment variables. Sample contents of `.env`:
```` diff
ENVIRONMENT=development
SERVER_PORT=3002
SERVER_HOST=localhost
DATABASE_HOST=localhost
DATABASE_PORT=27017
DATABASE_NAME=blog-application-database
JWT_SECRET=secret
````

6. Run the application :
$npm run start

7. Access the API at `http://localhost:3002/api` (or the specified `SERVER_PORT` in the `.env` file).

## Dependencies

The blog project utilizes the following main dependencies:

- Node.js (v14+)
- MongoDB (v4.4.7) - Database for storing blog data
- Joi (v17.4.0) - Schema validation for input data

## Routes


### Blog

- **POST /blogs**
  - Description: Create a new blog post.
  - Request Body: JSON object containing blog post data. Must adhere to the `createBlogSchema` validation.
  - Response: JSON object representing the created blog post.


- **PUT /blogs/:id**
  - Description: Update an existing blog post by its ID.
  - Parameters: `id` (string) - ID of the blog post to update.
  - Request Body: JSON object containing updated blog post data. Must adhere to the `updateBlogSchema` validation.
  - Response: JSON object representing the updated blog post.


- **DELETE /blogs/:id**
  - Description: Delete an existing blog post by its ID.
  - Parameters: `id` (string) - ID of the blog post to delete.
  - Response: JSON object with a success message.


- **GET /blogs**
  - Description: Get all blog posts.
  - Response: JSON array containing all blog posts.


- **GET /blogs/:id**
  - Description: Get a specific blog post by its ID.
  - Parameters: `id` (string) - ID of the blog post to retrieve.
  - Response: JSON object representing the specified blog post.

- **GET /blogs/myblogs**
  - Description: Get all blogs from a specific user.
  - Request: No request body required. Supports pagination, sorting, and filtering through query parameters.
  - Query Parameters:
    - `page` (number, default: 1): Represents the page number of the results to retrieve.
    - `limit` (number, default: 10): Specifies the number of records per page.
    - `sortBy` (string, default: 'createdAt'): Represents the field by which the results will be sorted. Valid options are 'likes' and 'createdAt'.
    - `sortOrder` (string, default: 'DESC'): Specifies the sort order, either 'ASC' (ascending) or 'DESC' (descending).
    - `filterBy` (string, default: 'all'): Represents the field by which the results will be filtered. Valid options are 'tags', 'author', and 'title'.
    - `keyword` (string): The keyword to use for filtering based on the chosen filterBy option.
  - Response: JSON array containing the paginated and sorted blog posts based on the query parameters.



### Users

- **POST /users/register**: Register a new user.
- **POST /users/login**: Authenticate and log in a user.
- **GET /users**: Get the authenticated user's profile. (Requires authentication)
  
### Authentication

The blog project uses JWT (JSON Web Tokens) for authentication. To access routes that require authentication (marked as "Requires authentication" above), you need to include the JWT token in the request headers as follows:

Authorization: Bearer <jwt_token>

Replace `<jwt_token>` with the actual JWT token received after successful user login or registration.


## Pagination

Pagination allows you to break down a large set of results into smaller chunks or pages. It prevents the server from returning all records at once, making it more efficient, especially when dealing with large datasets.

In this blog project, pagination is implemented using the following query parameters:

- `page`: Represents the page number of the results to retrieve. It defaults to 1 if not provided.
- `limit`: Specifies the number of records per page. It defaults to 10 if not provided.

### Example Usage:

To fetch the second page of 20 blog records per page, you can make the following request:

**GET /api/blogs?page=2&limit=20**

## Sorting

Sorting allows you to order the results based on a specific field or criteria. The blog project supports the following sorting options:

- `sortBy`: Represents the field by which the results will be sorted. It defaults to 'createdAt' if not provided. The valid options are 'likes' and 'createdAt'.
- `sortOrder`: Specifies the sort order, either 'ASC' (ascending) or 'DESC' (descending). It defaults to 'DESC' if not provided.

### Example Usage:

To fetch blogs sorted by the number of likes in ascending order, you can make the following request:

**GET /api/blogs?sortBy=likes&sortOrder=ASC**

## Filtering

Filtering allows you to retrieve only the records that match specific criteria. The blog project supports the following filtering options:

- `filterBy`: Represents the field by which the results will be filtered. It defaults to 'all' if not provided. The valid options are 'tags', 'author', and 'title'.

### Example Usage:

To fetch blogs that have the tag 'nodejs', you can make the following request:

**GET /api/blogs?filterBy=tags&keyword=nodejs**

## Combining Pagination, Sorting, and Filtering

You can combine pagination, sorting, and filtering in a single request to get more refined results. For example:

**GET /api/blogs?page=2&limit=10&sortBy=createdAt&sortOrder=DESC&filterBy=author&keyword=john**

This request will fetch the second page of 10 blogs per page, sorted by the creation date (newest first), and filtered by the author name 'john'.

By implementing pagination, sorting, and filtering, your blog API becomes more versatile, allowing users to fetch specific subsets of data based on their requirements.


## Conclusion

Congratulations! You have successfully set up and started the blog project. Refer to the provided routes documentation to interact with the API and manage blog posts, categories, and user profiles.

Feel free to explore the codebase and make any improvements or customizations to suit your specific project requirements.

Happy blogging! 🚀


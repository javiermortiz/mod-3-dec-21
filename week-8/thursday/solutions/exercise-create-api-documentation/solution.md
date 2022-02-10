# Exercise: API Endpoints Solution

- Get all the posts
  - `GET /posts`
- Create a new post
  - `POST /posts`
- Edit a post
{
  title: "my pozt",
  body: "hello world!",
  postId: 5
}
  - `PUT /posts/:postId`
{
  title: "my post",
  body: "hello world!"
}
  - `PATCH /posts/:postId`
{
  title: "my post"
}
- Create a new user
  - `POST /users`
- Get the comments for a post
  - `GET /posts/:postId/comments`
- Create a comment for a post
  - `POST /posts/:postId/comments`
Comments
[
1: {
  postId: 1,
  body: "awesome post!",
  commentId: 1
}
]
- Edit a comment for a post
  - `PUT /comments/:commentId`
  - `PATCH /comments/:commentId`
- Delete a comment for a post
  - `DELETE /comments/:commentId`
- Add a like for a post
  - `POST /posts/:postId/like`
  userId: 2
- Remove a like for a post
  - `DELETE /posts/:postId/like`
- Get all the posts of a user
  - `GET /users/:userId/posts`
- Submit a search on posts
  - `GET /posts/search?query=cute+puppies`
  - `POST /posts/search` {query: 'cute puppies'}

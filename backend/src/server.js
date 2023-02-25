require("dotenv").config();
const app = require("./app");
const errorMiddleware = require("./middlewares/error.js");
const UserRoute = require("./routes/user.route");
const FollowRoute = require("./routes/follow.route");
const BlockRoute = require("./routes/block.route");
const PostRoute = require("./routes/post.route");
const PostCommentsRoute = require("./routes/postComments.route");
const PostLikesRoute = require("./routes/postLikes.route");
const PostSavedRoute = require("./routes/postSaved.route");
const PostViewsRoute = require("./routes/postViews.route");
const SearchRoute = require("./routes/search.route");

const port = process.env.API_PORT || 3010;

app.get("/", (_request, response) => {
  response.send();
});

app.use(UserRoute);

app.use(FollowRoute);

app.use(BlockRoute);

app.use(PostRoute);
app.use(PostCommentsRoute);
// app.use(PostLikesRoute);
// app.use(PostSavedRoute);
// app.use(PostViewsRoute);

// app.use(SearchRoute);

app.use(errorMiddleware);

app.listen(port, () => console.log("ouvindo porta", port));

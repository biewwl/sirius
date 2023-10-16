require("dotenv").config();
const app = require("./app");
const errorMiddleware = require("./middlewares/error");
const UserRoute = require("./routes/user.route");
const FollowRoute = require("./routes/follow.route");
const SearchRoute = require("./routes/search.route");
const BlockRoute = require("./routes/block.route");
const PostRoute = require("./routes/post.route");
const StoryRoute = require("./routes/story.route");
const ChatRoute = require("./routes/chats.route");
const FileRoute = require("./routes/file.route");

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://10.0.0.98:3000",
  },
});

const port = process.env.API_PORT || 3010;

const ioMiddleware = (req, _res, next) => {
  req.io = io;
  return next();
};

app.use(ioMiddleware);
app.use(UserRoute);
app.use(FollowRoute);
app.use(BlockRoute);
app.use(SearchRoute);
app.use(PostRoute);
app.use(StoryRoute);
app.use(ChatRoute);
app.use(FileRoute);

app.use(errorMiddleware);

io.on("connection", (socket) => {
  socket.on('chat message', (chatId) => {
    io.emit('chat message', chatId);
  });
  socket.on('chat typing', (typing) => {
    io.emit('chat typing', typing);
  });
});

server.listen(port, () => console.log("ouvindo porta", port));

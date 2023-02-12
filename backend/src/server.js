require('dotenv').config();
const app = require('./app');
const errorMiddleware = require('./middlewares/error');
const UserRoute = require('./routes/user.route');

const port = process.env.API_PORT || 3010;

app.get('/', (_request, response) => {
  response.send();
});

app.use(UserRoute);

app.use(errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));

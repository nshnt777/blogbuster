import { Hono } from 'hono'
import {userRouter} from './routes/user'
import {blogRouter} from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono();

app.use('/api/*', cors())

// any request coming to '/api/v1/user' gets routed here
app.route('/api/v1/user', userRouter);
// any request coming to '/api/v1/blog' gets routed here
app.route('/api/v1/blog', blogRouter);

export default app

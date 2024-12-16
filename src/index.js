import dva from 'dva';
import './utils/flexible';

const app = dva();

app.model(require('./models/leftPage').default);
app.model(require('./models/centerPage').default);
app.model(require('./models/rightPage').default);

app.router(require('./router').default);

app.start('#root');

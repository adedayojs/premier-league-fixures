const rateLimit = require("express-rate-limit");
 
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
 
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message:{error:'Too many Request Please Try again in 5 minutes time'}
});

export default rateLimit
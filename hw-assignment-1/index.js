const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const messages = require('./messages');

const server = http.createServer((req, res) => {
  // Get the URL and parse it
  const parseUrl = url.parse(req.url, true);
  // Get the path
  const path = parseUrl.pathname;
  // character '|' works like and or in regex
  // '^\/' find all that start with and /
  // '/+$' find all that end with and /
  // The "g" flag indicates that the regular expression should be tested against all possible matches in a string.
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  // Get the query string as an object
  const queryStringObject = url.quey;
  // Get the HTTP method
  const method = req.method.toLocaleLowerCase();
  // Get headers as an object
  const headers = req.headers;
  // Get the payload
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();
    // Choose the handler this request should go to
    const chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : router.notFound;
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    };
    chooseHandler(data, (statusCode, payload) => {
      const code = typeof(statusCode) === 'number' ? statusCode : 200;
      const response = typeof(payload) === 'object' ? payload : {};
      // Convert response to String
      const responseInString = JSON.stringify(response);
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(code);
      res.end(responseInString);
    });
  });
});

const router = {
  hello: (data, callback) => {
    // Get random index
    const index = Math.floor(Math.random() * messages.length);
    callback(200, {
      message: messages[index]
    });
  },
  notFound: (data, callback) => {
    callback(404, {
      message: `Resource '${data.trimmedPath}' not found`
    });
  }
};

server.listen(config.port, () => {
  console.log(`Server running at port ${config.port}`);
});

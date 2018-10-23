# Homework Assignment #1

Hello World API. Clone project:

```
git clone git@github.com:pabloanabalonf/pirple-nodejs-class.git
```

Go to `hw-assignment-1` directory and run

```
node index.js
```

To get the response run:

```
curl http://localhost:3000/hello
```

or for a more readable form (using node and bash), run:

```
curl http://localhost:3000/hello | node <<< "var o = $(cat); console.log(JSON.stringify(o, null, 4));"
```
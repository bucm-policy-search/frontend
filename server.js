const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    server.get('*', (req, res) => {
      return handle(req, res);
    });
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    })
  })
  .then(() => {
    const proxy = express()
    const { Client } = require('@elastic/elasticsearch');

    const port = process.env.PORT || 3200
    const client = new Client({
      node: process.env.ELASTIC_URL,
      auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD
      }
    })

    proxy.get('/api/search', async (req, res) => {
      try {
        let { q, page } = req.query || ''
        async function run() {

          const { body } = await client.search({
            index: 'test',
            body: {
              query: {
                "bool": {
                  "must": {
                    "match_phrase": {
                      "article": q
                    }
                  },
                  "should": {
                    "match_phrase": {
                      "title": q
                    }
                  }
                }
              },
              from: (page - 1) * 10,
              highlight: {
                "pre_tags": ["<span style='color:red'>"],
                "post_tags": ["</span>"],
                fields: {
                  article: {}
                }
              }
            }
          })
          return body
        }
        run()
          .then(body => {
            res.set({
              "Access-Control-Allow-Origin": "http://localhost:3000",
              "Access-Control-Allow-Methods": "GET, PUT, PATCH, POST, DELETE",
              "Access-Control-Allow-Headers": "Content-Type, x-requested-with"
            })
            res.send(body)
          }).catch(e => {
            console.log("CORS error:" + e)
          })
      } catch (e) {
        console.log(e)
      }
    })

    proxy.get('/api/article', async (req, res) => {
      try {
        let { q } = req.query || ''
        console.log(`query data = ${q}`)
        async function run() {
          const { body } = await client.search({
            index: 'test',
            body: {
              query: {
                bool: {
                  must: {
                    // must use "match_phrase" instead of "match" or it will cause 
                    // "Uncaught TypeError: First argument must be a string" in some pages.
                    match_phrase: {
                      title: q
                    }
                  }
                }
              }
            }
          })
          return body
        }

        run()
          .then(body => {
            res.set({
              "Access-Control-Allow-Origin": "http://localhost:3000",
              "Access-Control-Allow-Methods": "GET, PUT, PATCH, POST, DELETE",
              "Access-Control-Allow-Headers": "Content-Type, x-requested-with"
            })
            res.send(body)
          }).catch(e => {
            console.log("CORS error:" + e)
          })
      } catch (e) {
        console.log(e)
      }
    })
    proxy.listen(3200, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3200');
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  })
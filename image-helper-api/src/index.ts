// Import the express in typescript file
import express from 'express';
import mcache from 'memory-cache';
import cors from 'cors';
 
// Initialize the express engine
const app: express.Application = express();

var allowedOrigins = ['http://localhost:5173',
                      'https://yourapp.com'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
 
const port: number = 52795;

// Handling '/' Request
app.get('/', (_req, _res) => {
    _res.send("TypeScript With Express");
});
 
// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});

const GOOGLE_API_KEY = 'AIzaSyAWu9Il1_vSVYKz3y7iADLiZlDW5laamyk';
const GOOGLE_SEARCH_ENGINE_CONTEXT = '7361f075b59ee46e1';
const GOOGLE_SEARCH_URL_BASE = `https://customsearch.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_CONTEXT}&searchType=image&q=`

var cache = () => {
    return (req:any, res:any, next:any) => {
        let query = req.query.q;
        if (!query) {
            next()
        } else {
            let cached = mcache.get(query);
            if (cached) {
                console.log('Was cached', query)
                res.end(cached);
                return
            } else {
                console.log('Not cached, retrieving ', query)
                next()
            }
        }
    }
}

app.get('/image', cache(), async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let query = req.query.q;
    if (!query) {
        res.send('Must submit q param.')
        return;
    }
    try {
        const imageSearchResponse = await fetch(GOOGLE_SEARCH_URL_BASE + query);
        let imageSearchResults = (await imageSearchResponse.json())
        let urls = imageSearchResults.items.map((i: any) => i.link)
        let jsonResult = JSON.stringify(urls, null, 3);
        mcache.put(query, jsonResult, 1000 * 60 * 2)
        res.end(jsonResult);
    } catch(err) {
        console.error(err);
    }
});

app.get('/toBase64', cache(), async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let url: string = <string>req.query.url;
    if (!url) {
        res.send('Must submit url param.')
        return;
    }
    try {
        const imageSearchResponse = await fetch(url);
        const buffer = await imageSearchResponse.arrayBuffer();
        const stringifiedBuffer = Buffer.from(buffer).toString('base64');
        const contentType = imageSearchResponse.headers.get('content-type');
        const imageBase64 = `data:${contentType};base64,${stringifiedBuffer}`;
        let jsonResult = JSON.stringify({
            imageData: imageBase64
        })
        mcache.put(url, jsonResult, 1000 * 60 * 2)
        res.end(jsonResult);
    } catch(err) {
        console.error(err);
    }
});
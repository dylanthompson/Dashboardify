/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const GOOGLE_API_KEY = 'AIzaSyAWu9Il1_vSVYKz3y7iADLiZlDW5laamyk';
const GOOGLE_SEARCH_ENGINE_CONTEXT = '7361f075b59ee46e1';
const GOOGLE_SEARCH_URL_BASE = `https://customsearch.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_CONTEXT}&searchType=image&q=`

app.get('/image-helper/image', async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let query = req.query.q;
  if (!query) {
      res.send('Must submit q param.')
      return;
  }
  try {
      const imageSearchResponse = await fetch(GOOGLE_SEARCH_URL_BASE + query);
      let imageSearchResults = (await imageSearchResponse.json())
      let urls = imageSearchResults.items.map((i) => i.link)
      let jsonResult = JSON.stringify(urls, null, 3);
      res.end(jsonResult);
  } catch(err) {
      console.error(err);
  }
});

app.get('/image-helper/toBase64', async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let url = req.query.url;
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
      res.end(jsonResult);
  } catch(err) {
      console.error(err);
  }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app

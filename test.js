var vows = require('vows');  
var apiEasy = require('api-easy');  
var assert = require('assert');  
  
  
var suite = apiEasy.describe('/');  
  
suite.discuss("when visit home page")  
    .discuss('can view blog list and it should response 200 status')  
    .use('localhost', 3000)  
    .setHeader('Content-Type', 'text/html; charset=utf-8')  
    .get()  
        .expect(200)  
        .expect("should respond with x-powered-by",  
            function(err, res, body) {  
                // express  
                assert.include(res.headers, 'x-powered-by');  
            })  
    .export(module);  
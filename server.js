if (process.env.STRONG_APIKEY) {
  require("strong-agent").profile(process.env.STRONG_APIKEY, "plunker-api");
}

require("coffee-script");

//process.env.NODE_ENV = "production";

var nconf = require("nconf")
  , http = require("http")
  , server = require("./index")
  , domain = require("domain")
  , serverDomain = domain.create();


serverDomain.run(function(){
  http.createServer(function(req, res){
    var reqd = domain.create();
    reqd.add(req);
    reqd.add(res);
    
    // On error dispose of the domain
    reqd.on('error', function (error) {
      console.log('[ERR]', error.code, error.message, req.url);
      reqd.dispose();
    });

    // Pass the request to express
    server(req, res);
    
  }).listen(nconf.get("port"), function(){
    console.log("[OK] Server started on " + nconf.get("port"));
  });
  
});

serverDomain.on("error", function (error) {
  console.log('[ERR]', "Server level error", error.code, error.message);
});

process.on('uncaughtException', function(err) {
  console.log("[ERR] Uncaught exception: " + err);
});

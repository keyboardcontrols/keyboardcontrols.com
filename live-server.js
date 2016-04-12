var liveServer = require("live-server");
 
var params = {
    port: 8000, // Set the server port. Defaults to 8080. 
    host: "127.0.0.1", // Set the address to bind to. Defaults to 0.0.0.0. 
    root: "./build", // Set root directory that's being server. Defaults to cwd. 
    open: false, // When false, it won't load your browser by default. 
    ignore: '', // comma-separated string for paths to ignore 
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications) 
    wait: 0, // Waits for all changes, before reloading. Defaults to 0 sec. 
    mount: [] // Mount a directory to a route. 
};

liveServer.start(params);

const nodeStatic = require('node-static');
const server = new nodeStatic.Server();

require('http').createServer(function(request, response) {

    request.addListener('end', () => server.serve(request, response)).resume();

}).listen(process.env.PORT || 8000);
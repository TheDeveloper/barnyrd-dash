var handler = module.exports;

handler.helloWorld = function (request,response) {
  response.send({ok:true});
}
module.exports = function (application) {
    application.get('/', function (req, res) {
        application.app.controllers.Publicacao.receber_publicacao(application, req, res);
    });
     
    application.post('/api', function (req, res) {
        application.app.controllers.Publicacao.postar_publicacao(application, req, res);
    });
}
module.exports.receber_publicacao = function (application, req, res) {
    res.send({ msg: 'dont do this' });
}


module.exports.postar_publicacao = function (application, req, res) {
        
    res.setHeader("Access-Control-Allow-Origin", "*");

    var date = new Date();
    time_stamp = date.getTime();

    var url_imagem = time_stamp + '_' + req.files.arquivo.originalFilename;

    var path_origem = req.files.arquivo.path;
    var path_destino = './uploads/' + url_imagem;


    fs.rename(path_origem, path_destino, function (err) {
        if (err) {
            res.status(500).json({ error: err })
            return;
        }

        var dados = {
            url_imagem: url_imagem,
            titulo: req.body.titulo
        }
        
        var connection = application.config.dbConnection();
        connection.open(function (err, mongoclient) {
            mongoclient.collection('postagens', function (err, collection) {
                collection.insert(dados, function (err, records) {
                    if (err) {
                        res.json({ 'status': 'erro' });
                    } else {
                        res.json({ 'status': 'foi postado com sucesso' });
                    }
                    mongoclient.close();
                })
            })
        })

    })

};

const sequelize = require('sequelize');
const model = require("../models");
const categoria = model.categoria;

module.exports = {
    async create(request, response){ // cadastrando
        try {
            const {
                descricao
            } = request.body

            const categoria = await categoria.create({
                descricao
            });

            return response.json({msg: "Categoria cadastrada com sucesso."});
        } catch (error) {
            return response.json({msg: "Não foi possivel cadastrar a categoria "} )
        }
    },
    async update(request, response){ // atualizando
        try {
            const {id} = request.params;
            const {
                descricao
            } = request.body

            const categoria = await categoria.update({
                descricao
            }, { where: { id }});
            return response.json({msg: "Categoria alterada com sucesso."});

        } catch (error) {
            return response.json({msg: "Não foi possível alterar a categoria." + error});
        }
    },
    async findAll(request, response){ // listando o conteudo, limite de 5 categorias por pagina
        try {
            const {page} = request.params;
            const limit = 5;

            const categoria = await categoria.findAndCountAll({
                order: [
                    ["id", "ASC"]
                ],
                limit:limite,
                attset: parseInt(page)
            });
            return response.json(categoria);
        } catch (error) {
            return response.json("Erro ao listar categorias." + error)
        }
    }
}
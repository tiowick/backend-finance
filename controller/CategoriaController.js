const sequelize = require('sequelize');
const model = require("../models");
const { categoria } = model;

module.exports = {
    async create(request, response){ // cadastrando
        try {
            const {
                descricao
            } = request.body

            const newCategoria = await categoria.create({
                descricao
            });

            return response.json({msg: "Categoria cadastrada com sucesso."});
        } catch (error) {
            return response.json({msg: "Não foi possível cadastrar a categoria."});
        }
    },
    async update(request, response){ // atualizando
        try {
            const { id } = request.params;
            const {
                descricao
            } = request.body

            await categoria.update({
                descricao
            }, { where: { id }});

            return response.json({msg: "Categoria alterada com sucesso."});

        } catch (error) {
            return response.json({msg: "Não foi possível alterar a categoria." + error});
        }
    },
    async findAll(request, response){ // listando o conteudo, limite de 5 categorias por pagina
        try {
            const { page } = request.params;
            const limit = 5;

            const categories = await categoria.findAndCountAll({
                order: [
                    ["id", "ASC"]
                ],
                limit: limit,
                offset: parseInt(page)
            });

            return response.json(categories);
        } catch (error) {
            return response.json("Erro ao listar categorias.")
        }
    },
    async delete(request, response) {
        try {
            const { id } = request.params;
            const deletedCategoria = await categoria.destroy({ where: { id } });
    
            if (deletedCategoria) {
                return response.json({ msg: "Categoria deletada com sucesso." });
            } else {
                return response.json({ msg: "Categoria não encontrada." });
            }
        } catch (error) {
            return response.json({ msg: "Erro ao deletar a categoria." + error });
        }
    }
    
}

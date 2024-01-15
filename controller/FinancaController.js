const sequelize = require('sequelize');
const model = require("../models");
const { financa } = model;
const Op = sequelize.Op;

module.exports = {
    async create(request, response) {
        try {
            const {
                data,
                categoria_id,
                titulo,
                valor
            } = request.body;

            const newFinanca = await financa.create({
                data,
                categoria_id,
                titulo,
                valor
            });

            return response.json({ msg: "Finança cadastrada com sucesso." });
        } catch (error) {
            return response.json({ msg: "Não foi possível cadastrar a finança." });
        }
    },

    async update(request, response) {
        try {
            const { id } = request.params;
            const {
                data,
                categoria_id,
                titulo,
                valor
            } = request.body;

            await financa.update({
                data,
                categoria_id,
                titulo,
                valor
            }, { where: { id }});

            return response.json({ msg: "Finança alterada com sucesso." });

        } catch (error) {
            return response.json({ msg: "Não foi possível alterar a finança." + error });
        }
    },

    async findAll(request, response) {
        try {
            const { page } = request.params;
            const limit = 5;

            const financas = await financa.findAndCountAll({
                order: [
                    ["data", "ASC"]
                ],
                include: {
                    all: true
                },
                limit: limit,
                offset: parseInt(page)
                
            });

            return response.json(financas);
        } catch (error) {
            return response.json("Erro ao listar finanças.");
        }
    },

    async findAllDate(request, response) {
        try {
            const { page, dataInicial, dataFinal } = request.params;
            const limit = 5;

            const financas = await financa.findAndCountAll({
                limit: limit,
                offset: parseInt(page),
                where: {
                    data: {
                        [Op.gte] : dataInicial,
                        [Op.lte] : dataFinal
                    },
                }
            });

            return response.json(financas);
        } catch (error) {
            return response.json("Erro ao listar finanças.");
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;
            const deletedFinanca = await financa.destroy({ where: { id } });

            if (deletedFinanca) {
                return response.json({ msg: "Finança deletada com sucesso." });
            } else {
                return response.json({ msg: "Finança não encontrada." });
            }
        } catch (error) {
            return response.json({ msg: "Erro ao deletar a finança." + error });
        }
    }
};

//https://dev.to/pacheco/designing-a-better-architecture-for-a-node-js-api-24d
export default {
    async find(
        model,
        query,
        projection = { __v: 0 },
        sort = { _id: 1 },
        options = { lean: true }
    ) {
        return model
            .find(query, projection, options)
            .sort(sort)
            .select({ __v: 0 })
            .exec();
    },
    async findById(model, id) {
        return model.findById(id);
    },
    async create(model, data) {
        return model.create(data);
    },
};

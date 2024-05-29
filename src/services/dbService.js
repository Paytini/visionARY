export default {
    async find(model, query, projection = { __v: 0 }, sort = { _id: 1 }, options = { lean: true }) {
        return model.find(query, projection, options).sort(sort).exec();
    },
    async findById(model, id) {
        return model.findById(id);
    },
    async create(model, data) {
        return model.create(data);
    },
    async findByRole(model, role) {
        return model.find({ rol: role });
    },        
    
    async update(model, id, newData) {
        // Utiliza el método findByIdAndUpdate de Mongoose para actualizar el documento
        return model.findByIdAndUpdate(id, newData, { new: true });
    },
    async delete(model, id) {
        // Utiliza el método findByIdAndDelete de Mongoose para eliminar el documento
        return model.findByIdAndDelete(id);
    },async findOne(model, query, projection = { __v: 0 }, options = { lean: true }) {
        return model.findOne(query, projection, options).select({ __v: 0 }).exec();
    },
};

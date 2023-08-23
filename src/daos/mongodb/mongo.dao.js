class MongoDBDao {

    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            return await this.model.find({});
        } catch (error) {
            return error
        }
    }

    async getById(id) {
        try {
            return await this.model.findById(id).lean();  
        } catch (error) {
            return error
        }
    }

    async update(id, obj){
        try {
            return await this.model.findByIdAndUpdate(id, obj, {new: true});
        } catch (error) {
            return error
        }
    }

    async create(obj) {
        try {
            return await this.model.create(obj);
        } catch (error) {
            return error
        }
    }

    async delete(id) {
        try {
            return this.model.findByIdAndDelete(id);
        } catch (error) {
            return error
        }
    }
    
}

module.exports = MongoDBDao;
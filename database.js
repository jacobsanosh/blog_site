const mongoose = require("mongoose")
let blog_table;
exports.Connections = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost:27017/sanosh');
        const BLOG_SCHEMA = new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            note: {
                type: String,
                require: true
            }
        })
        blog_table = new mongoose.model('blog', BLOG_SCHEMA);
        resolve(blog_table);
    })
}

exports.save_to_db = (data) => {
    return new Promise((resolve, reject) => {
        const save_data = new blog_table({ title: data.title, note: data.note })
        save_data.save()
        resolve(save_data);
    })

}

exports.find_all_blog = () => {
    return new Promise((resolve, reject) => {
        blog_table.find({}, (err, data) => {
            if (err) {
                reject(new Error("error on db"))
            } else {
                resolve(data)
            }
        })

    })

}

exports.find_something = (find_data) => {
    return new Promise((resolve, reject) => {
        blog_table.find({ title: find_data }, (err, data) => {
            if (err) {
                reject(new Error("error on fetching value"))
            } else {
                resolve(data)
            }
        })

    })
}
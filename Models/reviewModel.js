const { schema } = require("./ProductModel");

const reviewModel = new schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
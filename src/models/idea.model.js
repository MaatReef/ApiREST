const mongoose = require ('mongoose');
const {Schema} = mongoose;

const IdeaSchema = new Schema({
    idea : {type: String, required: true},
    description : {type: String},
    upvotes: [{type: Boolean}],
    downvvotes: [{type: Boolean}],
    author: { 
        type: Schema.types.ObjectId, 
        ref: "user", 
        required: true, 
        autopopulate: true
    },
    comments:  [
        {
            type: Schema.types.ObjectId, 
            ref: "comment", 
            required: true, 
            autopopulate: true
        }
    ]
});


IdeaSchema.plugin(require("mongoose-autopopulate"));


module.exports = mongoose.model("idea", IdeaSchema);
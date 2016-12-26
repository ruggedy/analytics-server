import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    validated:{ type: Boolean, default: false},
    password: String,
    admin: {type: Boolean, default: false},
    jobDescription: { type: Schema.Types.ObjectId, ref: 'JobDescription' },
    KPI: { type: Schema.Types.ObjectId, ref: 'KPI'},
    profileTest: { type: Schema.Types.ObjectId, ref: 'ProfileTest'}
})


const User = mongoose.model('User', userSchema);

export default User;
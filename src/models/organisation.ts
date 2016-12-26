import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const organisationSchema = new Schema({
    email: String,
    password: String,
    jobDescriptions: [{ type: Schema.Types.ObjectId, ref: 'JobDescription' }]
})


const Organisation = mongoose.model('Organisation', organisationSchema);

export default Organisation;
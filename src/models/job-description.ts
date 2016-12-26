import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const jobDescriptionSchema = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation' }
})

const JobDescription = mongoose.model('JobDescription', jobDescriptionSchema);

export default JobDescription;
import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const numeracySchema = new Schema({
    score: Number
})


export default numeracySchema;
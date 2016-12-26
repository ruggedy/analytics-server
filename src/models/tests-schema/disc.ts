import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const discSchema = new Schema({
    grp3_D: Number,
    grp3_I: Number,
    grp3_S: Number,
    grp3_C: Number
})


export default discSchema;
import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const eqSchema = new Schema({
    empathy_pct: Number,
    self_awareness: Number,
    adaptability: Number,
    stress_tolerance: Number,
})


export default eqSchema;
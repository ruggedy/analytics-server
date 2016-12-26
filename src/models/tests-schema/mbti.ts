import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const mbtiSchema = new Schema({
    introvert_i: Number,
    sensing_s: Number,
    thinking_t: Number,
    judging_j: Number,
    extrovert_e: Number,
    intuition_in: Number,
    feeling_f: Number,
    percieving: Number,
})


export default mbtiSchema;
import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const motivationSchema = new Schema({
    security: Number,
    life_balance: Number,
    philanthropy: Number,
    need_to_belong: Number,
    need_for_relations: Number,
    need_for_variety: Number,
    social_recognition: Number,
    pay: Number,
})


export default motivationSchema;
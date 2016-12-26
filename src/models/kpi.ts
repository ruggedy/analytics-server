import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const kpiSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'}
})


const KPI = mongoose.model('KPI', kpiSchema);

export default KPI;
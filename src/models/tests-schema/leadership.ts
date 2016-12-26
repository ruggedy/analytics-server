import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const leadershipSchema = new Schema({
    ease_in_public: Number,
    opening_up_to_others: Number,
    diplomacy: Number,
    persuasion: Number,
    leadership: Number,
    taking_responsibility: Number,
    organisation: Number,
    vision: Number,
    self_confidence: Number,
    independent_mind: Number,
    stress_management: Number,
    creativity: Number,
    responsiveness: Number,
    patience: Number,
    autonomy: Number,
    respect_of_authority: Number,
    determination: Number,
    ambition: Number,
    work_ethic: Number,
    competitive_spirit: Number
})


export default leadershipSchema;
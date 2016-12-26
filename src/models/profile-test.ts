import * as mongoose from 'mongoose';

const { Schema } = mongoose;

import discSchema from './tests-schema/disc';
import eqSchema from './tests-schema/eq';
import leadershipSchema from './tests-schema/leadership';
import mbtiSchema from './tests-schema/mbti';
import motivationSchema from './tests-schema/motivation';
import numeracySchema from './tests-schema/numeracy';

const profileTestSchema = new Schema({
    DISC: discSchema,
    MBTI: mbtiSchema,
    EQ: eqSchema,
    Numeracy: numeracySchema,
    Motivation: motivationSchema,
    LeaderShip: leadershipSchema
})


const ProfileTest = mongoose.model('ProfileTest', profileTestSchema);

export default ProfileTest;
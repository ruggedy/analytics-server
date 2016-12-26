import * as express from 'express';
const router = express.Router();
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as async from 'async';
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
const saltRounds = 13;
const secret = process.env.SECRET_KEY || 'secret';
import UserSchema from '../models/user';

router.post('/', (req, res, next) => {
    console.log(req.body);

    return res.status(200).json({
        message: 'Successful'
    })
})
export default router;
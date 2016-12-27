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

import * as mailgun from 'mailgun-js';

const apiKey = 'key-f901f4658ef67d227243238bb77271cf';
const domain = 'sandbox96b40d2c7a4e41edb1a7d4a96bae1f38.mailgun.org';
const mailgunAccess = mailgun({ apiKey, domain });

router.post('/', (req, res, next) => {

    const email = req.body.email;

    const user = new UserSchema({ email });

    user.save()
        .then((user) => {

            const doc: any = user;
            let cert = fs.readFileSync(path.join(__dirname, 'private.pem'));
            let token = jwt.sign({ user }, cert, { algorithm: 'RS256', expiresIn: '7d' });
            const data = {
                from: '<postmaster@sandbox96b40d2c7a4e41edb1a7d4a96bae1f38.mailgun.org>',
                to: doc.email,
                subject: 'hello',
                text: 'testing mailgun awesomeness',
                html: '<a href=http://localhost:4200/client/verify/' + token + '/' + doc._id + '>Click here</a>'
            }

            mailgunAccess.messages().send(data, (err, body) => {
                console.log(body);
            })

            return res.status(200).json({
                message: 'Successful'
            })
        })
        .catch((err) => {
            res.status(404).json({
                message: 'An error occured',
                err
            })
        })

})








router.use('/', (req, res, next) => {
    if (req.body.token || req.query.payload) {
        const cert = fs.readFileSync(path.join(__dirname, "public.pem"));
        const token = req.body.token ? req.body.token : req.query.payload ? JSON.parse(req.query.payload).token : null;
        try {
            const decoded = jwt.verify(token, cert);
            next();
        }
        catch (err) {
            res.status(401).json({
                title: 'Invalid user',
                err
            });
        }
    }
    else {
        next();
    }
});

router.post('/password', (req, res, next) => {

    const {password, userId} = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    UserSchema.findByIdAndUpdate(userId, {
        $set: { password: hash, validated: true }
    }).then((doc:any) => {
        const { email, validated } = doc;
        return res.status(200).json({
            message: 'Successfully updated',
            email,
            validated
        })
    }).catch((err) => {
        return res.status(404).json({
            message: 'An Error Occured',
            err
        })
    })
   

})

export default router;
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
import organisationSchema from '../models/organisation';

router.post('/', (req, res, next) => {

    let organisation: any = new organisationSchema({
        email: req.body.email
    });

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            organisation.password = hash;

            organisation.save()
                .then((result) => {
                    let cert = fs.readFileSync(path.join(__dirname, 'private.pem'));
                    let token = jwt.sign({ user: result }, cert, { algorithm: 'RS256', expiresIn: 3000 });
                    return res.status(200).json({
                        message: 'Successfully Created Account',
                        obj: token,
                        userId: result._id
                    });
                })
                .catch((error) => {
                    return res.status(404).json({
                        title: 'An error occured',
                        error: error
                    });
                })
        })
    })
})

router.post('/signin', (req, res, next) => {
    organisationSchema.findOne({ username: req.body.username }, (err, doc: any) => {
        let compare = doc ? bcrypt.compareSync(req.body.password, doc.password) : null;

        if (!doc) {
            return res.status(400).json({
                message: 'Invalid Username/Password'
            })
        }

        if (!compare) {
            return res.status(400).json({
                message: 'Invalid Username/Password'
            })
        }

        let cert = fs.readFileSync(path.join(__dirname, 'private.pem'));
        let token = jwt.sign({ user: doc }, cert, { algorithm: 'RS256', expiresIn: '28d' });
        return res.status(200).json({
            message: 'Successfully signed in',
            obj: token,
            userId: doc._id
        })
    })
})


router.post('/compare', (req, res, next) => {
    organisationSchema.findOne({ username: req.body.value }, (err, doc) => {
        if (doc === null) {
            return res.status(200).json({
                message: 'User does not exist',
                state: true
            });
        }

        return res.status(401).json({
            message: 'User exists',
            state: false
        })
    })
})
export default router;
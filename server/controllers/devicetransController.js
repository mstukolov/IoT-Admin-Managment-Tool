/**
 * Created by MAKS on 25.07.2017.
 */
const Devicetrans = require('../models').Devicetrans;

module.exports = {
    create(req, res) {
        return Devicetrans
                .create({
                    devid: req.query.devid || 'undefined',
                    nparam1: req.query.nparam1 || 0,
                    nparam2: req.query.nparam2 || 0,
                    nparam3: req.query.nparam3 || 0,
                    nparam4: req.query.nparam4 || 0,
                    nparam5: req.query.nparam5 || 0,
                    tparam1: req.query.tparam1 || 'undefined',
                    tparam2: req.query.tparam2 || 'undefined'
                })
                .then(
                    //console.log('Entity success saved');
                    res.status(200).send('Entity success saved')
                    //res.status(404).send({message: 'Entity success saved'})
                )
                .catch(error => res.status(400).send(error));
    },
    listJson(req, res) {
        return Devicetrans
                .all()
                .then(list => res.status(200).send(list))
    .catch(error => res.status(400).send(error));
    }
};
/**
 * Created by MAKS on 03.08.2017.
 */

const Actions = require('../models').Actions;

module.exports = {

    list(req, res) {
        return Actions
                .all()
                .then(list => res.status(200).render('roles', {data : list }))
                .catch(error => res.status(400).send(error));
    },
    listJson(req, res) {
        return Actions.all()
                 .then(list => res.status(200).send(list))
                 .catch(error => res.status(400).send(error));
    }


};

/**
 * Created by MAKS on 06.07.2017.
 */
const Organizations = require('../models').Organizations;

module.exports = {
    create(req, res) {
        return Organizations
                .create({
                    organization: req.query.organization,
                    domen: '1',
                    active: true
                })
        .then(organizations => res.status(201).send(organizations))
        .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Organizations
                .findById(req.query.orgId)
                .then(organization => {
                if (!organization) { return res.status(404).send({
                    message: 'Todo Not Found',
                });
        }
        return organization
                .update({
                    //title: req.body.title || organization.organization,
                    organization: req.query.name || organization.organization,
                })
                .then(() => res.status(200).send(todo))  // Send back the updated todo.
                .catch((error) => res.status(400).send(error));
                })
                .catch((error) => res.status(400).send(error));
    },
    list(req, res) {
        return Organizations
                .all()
                .then(list => res.status(200).send(list))
                .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Organizations
                .findById(req.query.organization)
                .then(organization => {
                if (!organization) {
            return res.status(404).send({
                message: 'Todo Not Found',
            });
        }
        return res.status(200).send(organization);
    })
    .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Organizations
                .findById(req.query.orgId)
                .then(organization => {
                if (!organization) {
                    return res.status(400).send({
                        message: 'Todo Not Found',
                    });
                }
                return organization
                .destroy()
                .then(() => res.status(204).send())
                .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
                }
};

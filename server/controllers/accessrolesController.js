/**
 * Created by MAKS on 24.07.2017.
 */
const Accessroles = require('../models').Accessroles;

module.exports = {
    create(req, res) {
        return Accessroles
                .create({
                    role: req.query.role || ''
                })
                .then(res.redirect('/roles'))
                .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Accessroles
                .findById(req.query.id)
                .then(role => { if (!role) { return res.status(404).send({message: 'Access role Not Found',})}
                        return role.update({role: req.query.role || role.role})
                        .then(res.redirect('/roles'))
                        .catch((error) => res.status(400).send(error));})
        .catch((error) => res.status(400).send(error));
    },

    list(req, res) {
        return Accessroles
                .all()
                .then(accessroles => res.status(200).render('roles', {data : accessroles }))
    .catch(error => res.status(400).send(error));
    },
    listJson(req, res) {
        return Accessroles.all().then(list => res.status(200).send(list))
                .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Accessroles
                .findById(req.query.roleId)
                .then(role => {
                if (!role) {
            return res.status(404).send({
                message: 'Todo Not Found',
            });
        }
        return res.status(200).send(role);
    })
    .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Accessroles
                .findById(req.query.id)
                .then(role => {if (!role) {return res.status(400).send({message: 'Role Not Found',});}
                    return role
                            .destroy()
                            .then(res.redirect('/roles'))
                            .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
    },
    details(req, res) {
        return Accessroles
                .findOne({
                    where: {id: req.query.id}
                })
                .then(role =>
            {if (!role) { return res.status(404).send({message: 'Role Not Found',})}
        return res.status(200).render('role-details', {data : role, statusMessage : '', statusEvent: '' });
    })
    .catch(error => res.status(400).send(error));
    },
};

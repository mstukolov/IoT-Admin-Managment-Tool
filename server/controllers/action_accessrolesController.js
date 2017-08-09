/**
 * Created by MAKS on 03.08.2017.
 */
const Action_accessroles = require('../models').Action_accessroles;
const Actions = require('../models').Actions;
const Accessroles = require('../models').Accessroles;

Action_accessroles.belongsTo(Actions, {as: 'action'});
Action_accessroles.belongsTo(Accessroles, {as: 'role'});
module.exports = {

    list(req, res) {
        return Action_accessroles
                .all()
                .then(list => res.status(200).render('roles', {data : list, user:req.session.username }))
                .catch(error => res.status(400).send(error));
    },
    listJson(req, res) {
        return Action_accessroles.all({
                    include: [{model: Actions, as: 'action'}, {model: Accessroles, as: 'role'}],
                    where: {roleid: req.query.roleid}
                })
                .then(list => res.status(200).send(list))
                .catch(error => res.status(400).send(error));
    },
    findByRole(req, res) {
        return Action_accessroles.all({
                include: [{model: Actions, as: 'action'}, {model: Accessroles, as: 'role'}],
                where: {roleid: req.query.roleid}
                })
                .then(list =>
                    {if (!list) { return res.status(404).send({message: 'Actions Not Found',})}
                        return res.status(200).render('role-details', {data : list, statusMessage : '', statusEvent: '', user:req.session.username, role: req.query.roleid })})
                .catch(error => res.status(400).send(error));
    },
    create(req, res) {
        return Action_accessroles
                .create({
                    roleid: req.query.roleid,
                    actionid: req.query.actionid
                })
                .then(res.redirect('/role-details?roleid=' + req.query.roleid))
                .catch(error => res.status(400).send(error));
    },
    createJoin(role) {
        return Action_accessroles
                .create({
                    roleid: role,
                    actionid: 15
                })
                .then(res.redirect('/role-details?roleid=' + role.roleid))
                .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Action_accessroles
                .findById(req.query.refid)
                .then(reference => {if (!reference) {return res.status(400).send({message: 'Reference Not Found'});}
                return reference
                        .destroy()
                        .then(res.redirect('/role-details?roleid=' + reference.roleid))
                        .catch(error => res.status(400).send(error))})
                        .catch(error => res.status(400).send(error))}
};
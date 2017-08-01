/**
 * Created by MAKS on 31.07.2017.
 */
/**
 * Created by MAKS on 06.07.2017.
 */
const Devices = require('../models').Devices;
const Organizations = require('../models').Organizations;
Devices.belongsTo(Organizations, {as: 'org'});

module.exports = {
    create(req, res) {
        return Devices
                .create({
                    orgid: req.query.organization || '',
                    devid: req.query.devid || '',
                    devtype: req.query.devtype || '',
                    lng: req.query.lng || '',
                    ltd: req.query.ltd || '',
                    email: req.query.email || '',
                    qtyBottle: req.query.qtyBottle || '',
                    name: req.query.name || '',
                    addhour: req.query.addhour || '',
                    address: req.query.address || ''
                })
                .then(res.redirect('/devices'))
                .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Devices
                .findById(req.body.id)
                .then(device => {if (!device) { return res.status(404).send({message: 'device Not Found',});}
                    return device.update({
                            orgid: device.orgid,
                            devid: req.body.devid || device.devid,
                            devtype: req.body.devtype || device.devtype,
                            lng: req.body.lng || device.lng,
                            ltd: req.body.ltd || device.ltd,
                            email: req.body.email || device.email,
                            qtyBottle: req.body.qtyBottle || device.qtyBottle,
                            name: req.body.name || device.name,
                            addhour: req.body.addhour || device.addhour,
                            address: req.body.address || device.address})
                        .then(res.status(200).render('device-details',{data: device, statusMessage : 'Успешно сохранено', statusEvent: 'alert-success' }))
                        .catch((error) => res.status(400).send(error));})
                        .catch((error) => res.status(400).send(error));
    },
    updateOrganization(req, res) {
        return Devices.findById(req.body.id).then(device => {if (!device) { return res.status(404).send({message: 'device Not Found',});}
            return device.update({
                orgid: req.body.orgid || device.orgid
            }).then(res.status(200).redirect('devices')) .catch((error) => res.status(400).send(error));}).catch((error) => res.status(400).send(error));
    },
    list(req, res) {
        return Devices
                .all({
                    include: [
                        {model: Organizations, as: 'org'}
                    ]
                })
                .then(data => res.status(200).render('devices', {data : data }))
    .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Devices
                .findById(req.query.id)
                .then(device =>
            {if (!device) { return res.status(404).send({message: 'device Not Found',});}
        return res.status(200).send(device);
    })
    .catch(error => res.status(400).send(error));
    },
    details(req, res) {
        return Devices
                .findOne({
                    include: [{model: Organizations, as: 'org'}],
                    where: {id: req.query.id}
                })
                .then(device =>
                    {if (!device) { return res.status(404).send({message: 'device Not Found',})}
                    return res.status(200).render('device-details', {data : device, statusMessage : '', statusEvent: '' });
    })
    .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Devices
                .findById(req.query.id)
                .then(device => {
                if (!device) {
            return res.status(400).send({
                message: 'device Not Found',
            });
        }
        return device
                .destroy()
                .then(res.redirect('/devices'))
                .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
    }
};

/**
 * Created by MAKS on 31.07.2017.
 */
/**
 * Created by MAKS on 06.07.2017.
 */
const Devices = require('../models').Devices;

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
        return Organizations
                .findById(req.query.id)
                .then(device => {
                if (!device) { return res.status(404).send({
            message: 'device Not Found',
        });
        }
        return device
                .update({
                    orgid: req.query.organization || device.orgid,
                    devid: req.query.devid || device.devid,
                    devtype: req.query.devtype || device.devtype,
                    lng: req.query.lng || device.lng,
                    ltd: req.query.ltd || device.ltd,
                    email: req.query.email || device.email,
                    qtyBottle: req.query.qtyBottle || device.qtyBottle,
                    name: req.query.name || device.name,
                    addhour: req.query.addhour || device.addhour,
                    address: req.query.address || device.address
                })
                .then(res.redirect('/devices'))
                .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
    },
    list(req, res) {
        return Devices
                .all()
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

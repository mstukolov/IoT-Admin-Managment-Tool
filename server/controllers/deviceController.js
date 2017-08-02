/**
 * Created by MAKS on 31.07.2017.
 */
/**
 * Created by MAKS on 06.07.2017.
 */
//Инициализация IOT-сервиса
var ibmiotf = require("ibmiotf");
var config = {
    "org" : 'kwxqcy',
    "id" : 'a-kwxqcy-app6666777777',
    "domain": "internetofthings.ibmcloud.com",
    "auth-key" : 'a-kwxqcy-1dw7hvzvwk',
    "auth-token" : 'tsM8N(FS@iOc3CId+5'
}
var ibmiotfClient = new ibmiotf.IotfApplication(config);
ibmiotfClient.connect();

const Devices = require('../models').Devices;
const Organizations = require('../models').Organizations;
Devices.belongsTo(Organizations, {as: 'org'});

module.exports = {
    create(req, res) {
        return Devices
                .create({
                    orgid: req.query.organization || 57,
                    devid: req.query.devid || 'SmartCooler',
                    devtype: req.query.devtype || 'SmartCooler',
                    lng: req.query.lng || 0,
                    ltd: req.query.ltd || 0,
                    email: req.query.email || '',
                    qtyBottle: req.query.qtyBottle || 0,
                    name: req.query.name || '',
                    addhour: req.query.addhour || '',
                    address: req.query.address || ''
                })
                .then(device => {
                    device['devid'] = device.devid + device.id;
                    ibmiotfClient.registerDevice(device.devtype, device.devid,"12345678").then (function onSuccess (argument) {
                        console.log("Success"); console.log(argument);
                        res.render('device-details',{data: device, statusMessage : 'Устройство создано', statusEvent: 'alert-success' })
                        }, function onError (argument) {
                        console.log("Fail"); console.log(argument.data);
                    })
                    /*res.render('device-details',{data: device, statusMessage : 'Устройство создано', statusEvent: 'alert-success' })*/
                })
                .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Devices
                .findById(req.body.id)
                .then(device => {if (!device) { return res.status(404).send({message: 'device Not Found',});}
                    return device.update({
                            orgid: req.body.orgid || device.orgid,
                            devid: req.body.devid || device.devid,
                            devtype: req.body.devtype || device.devtype,
                            lng: req.body.lng || device.lng,
                            ltd: req.body.ltd || device.ltd,
                            email: req.body.email || device.email,
                            qtyBottle: req.body.qtyBottle || device.qtyBottle,
                            name: req.body.name || device.name,
                            addhour: req.body.addhour || device.addhour,
                            address: req.body.address || device.address})
                        .then(res.render('device-details',{data: device, statusMessage : 'Успешно сохранено', statusEvent: 'alert-success' }))
                        .catch((error) => res.status(400).send(error));})
                        //.then(res.redirect('\device-details?id='+req.body.id))
                        .catch((error) => res.status(400).send(error));
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
        return Devices.findById(req.query.id).then(device => {if (!device) {return res.status(400).send({message: 'device Not Found'});}
        return device
                .destroy()
                .then(
                    ibmiotfClient.unregisterDevice(device.devtype, device.devid).
                    then (function onSuccess (response) {res.redirect('/devices')},
                            function onError (argument) {console.log("Fail");console.log(argument)}))
                .catch(error => res.status(400).send(error));})
                .catch(error => res.status(400).send(error));
    }
};

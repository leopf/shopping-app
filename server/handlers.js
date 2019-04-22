var knex = require('knex');

var knexDb = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'shoppingapp'
    }
});

module.exports.getItems = function(req, res, config) {
    knexDb("items").where('isUsual', config.isUsual).select({ 'id': 'itemId' }, 'name', 'amount')
        .then((r) => res.send(r))
        .catch(errorHandler(res));
}
module.exports.postItem = function(req, res, config) {
    if (!valReqText(req.body.name) || !valReqText(req.body.amount)) {
        res.sendStatus(400);
        return;
    }

    knexDb("items").insert({ isUsual: config.isUsual, name: req.body.name, itemTmpId: req.body.tmpId, amount: req.body.amount })
        .then((r) => res.send({ tmpId: req.body.tmpId, id: r[0] }))
        .catch(errorHandler(res));
}
module.exports.putItem = function(req, res, config) {
    if (!valReqIds(req.body) || !valReqText(req.body.name)) {
        res.sendStatus(400);
        return;
    }

    var amount = req.body.amount;
    var name = req.body.name;

    if (req.body.id) {
        knexDb("items").where("itemId", req.body.id).update({ "amount": amount, "name": name })
            .then(() => res.sendStatus(200))
            .catch(errorHandler(res));
    }
    else {
        knexDb("items").where("itemTmpId", req.body.tmpId).update({ "amount": amount, "name": name })
            .then(() => res.sendStatus(200))
            .catch(errorHandler(res));
    }
}
module.exports.deleteItem = function(req, res, config) {
    if (!valReqIds(req.body)) {
        res.sendStatus(400);
        return;
    }

    if (req.body.id) {
        knexDb("items").where("itemId", req.body.id).del()
            .then(() => res.sendStatus(200))
            .catch(errorHandler(res));
    }
    else {
        knexDb("items").where("itemTmpId", req.body.tmpId).del()
            .then(() => res.sendStatus(200))
            .catch(errorHandler(res));
    }
}

function valReqIds(body)
{
    return body.id || body.tmpId;
}
function valReqText(text)
{
    return text.length < 255;
}

function errorHandler(res) {
    return (error) => {
        console.log(error);
        res.sendStatus(500);
    };
}
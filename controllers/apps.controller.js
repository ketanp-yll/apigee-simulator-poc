const app = require("../model/apps.model");
const { v4: uuidv4 } = require('uuid');

const insert = function (req, res) {
  const ret = {};
  const appobj = req.body;
  appobj.secret = uuidv4();
  appobj.key = uuidv4();
  const newapp = new app(appobj); //new instance created
  newapp.save().then(() => {
    ret.msg = "App added"
    res.status(201).json(appobj);
  }).catch((err) => {
    ret.msg = err.message;
    res.status(500).json(ret);
  })
}

const findByKey = function (rkey) {
  let obj =  app.findOne({"key": rkey}).exec();
  return obj;
}

module.exports = {
  "insert": insert, "findByKey": findByKey
}

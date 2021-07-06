import { Router } from 'express';
import datastore from '../lib/datastore';
var router = Router();

/* GET data with differety types of sub URLs */
router.get('/', function(req, res, next) {
  // /data/*
  // remove /data/ prefix to really get the supposed key
  var key = req.originalUrl.substring(6);
  var all_data = datastore();
  if(key in all_data) {
    res.json(all_data[key]);
    return;
  }
  next();
});

export default router;

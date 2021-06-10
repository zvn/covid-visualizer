import { Router } from 'express';
import ALLDATA from '../lib/datastore';
var router = Router();

/* GET data with differety types of sub URLs */
router.get('/', function(req, res, next) {
  // /data/*
  // remove /data/ prefix to really get the supposed key
  var key = req.originalUrl.substring(6);
  if(key in ALLDATA) {
    res.json(ALLDATA[key]);
    return;
  }
  next();
});

export default router;

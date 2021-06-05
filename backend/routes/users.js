import { Router } from 'express';
import { Data } from '../lib/datastore';
var router = Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource333');
});

export default router;

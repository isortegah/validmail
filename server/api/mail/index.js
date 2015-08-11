/**
 * Created by ISORTEGAH on 10/08/2015.
 */
'use strict';

var express = require('express');
var controller = require('./mail.controller');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

router.get('/', controller.index);
router.post('/',urlencodedParser, controller.create);
/*router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);*/

module.exports = router;
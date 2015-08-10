/**
 * Created by ISORTEGAH on 10/08/2015.
 */
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /mail              ->  index
 * POST    /mail              ->  create
 * GET     /mail/:id          ->  show
 * PUT     /mail/:id          ->  update
 * DELETE  /mail/:id          ->  destroy
 */
'use strict';



var _ = require('lodash');
//var Mail = require('./mail.model');

// Get list of mails
exports.index = function(req, res) {


    //return res.status(200).json({hola:"prueba correcta"});

};

exports.create = function(req, res) {
    console.log(req.fields)
    console.log(req.files)
    return res.status(200).json(req.body);
}

function handleError(res, err) {
    return res.status(500).send(err);
}
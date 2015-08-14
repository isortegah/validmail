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
var Mail = require('./mail.model');

// Get list of mails
exports.index = function(req, res) {


    //return res.status(200).json({hola:"prueba correcta"});

};

exports.create = function(req, res) {

    var body = req.body;
    var data = {
        tipo : getTipoMail(req.body['body-plain']),
        bodyhtml : req.body['body-html'],
        bodyplain : req.body['body-plain'],
        estado: true
    }
    Mail.create(data, function(err, mail){
        if (err) { return handleError(res, err);}
        console.log(mail);
        return  res.status(201);
    })

}

function getTipoMail (text){
    //console.log(text);
    var tipoMail;
    if(text.indexOf('completar tu registro') > -1 )
        tipoMail = 'registro';
    return tipoMail;

}

function handleError(res, err) {
    console.log(err);
    return res.status(500).send(err);
}
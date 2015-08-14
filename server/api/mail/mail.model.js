/**
 * Created by ISORTEGAH on 13/08/2015.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MailSchema = new Schema({
    tipo        : String,
    bodyhtml    : String,
    bodyplain   : String,
    estado      : Boolean
});

module.exports = mongoose.model('Mail', MailSchema);
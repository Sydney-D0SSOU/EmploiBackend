const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const transporter = nodemailer.createTransport({
  host: 'webmail.telemarketing.africa',
  port: 587,
  secure: false,
  auth: {
    user: 'service@emploipourtous.africa',
    pass: '@emploipourtous.africa'
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = transporter;

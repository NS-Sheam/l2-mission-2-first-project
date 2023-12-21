import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: '123sheamfeni@gmail.com',
      pass: 'uswo wepg eeba sghs',
    },
  });

  await transporter.sendMail({
    from: '123sheamfeni@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 min!', // Subject line
    text: '', // plain text body
    html, // html body
  });
};

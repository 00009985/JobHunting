import mailgun from 'mailgun-js';

export const sendEmail = async (req, res, next) => {
  const mail = () =>
    mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });

  const { email, subject, message } = req.body;
  mail()
    .messages()
    .send({
      from: 'Job Hunting <li.anastasiya2001@gmail.com>',
      to: `${email}`,
      subject: `${subject}`,
      html: `${message}`,
    });
};

import { useState } from 'react';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
    function sendEmail(e) {
      e.preventDefault();

      emailjs.sendForm('service_oricpfk', 'template_p2257gb', e.target, 'nDH5bdag0VT0oDMfc').then(res => {
        console.log(res)
      }).catch(err => console.log(err));
    }
  
  return (
    <div className="App">
      <ToastContainer position="bottom-center" limit={1} />
      <header className="App-header">
        <form onSubmit={sendEmail}>
          <h1>Send Email</h1>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email" name='email'
            ></input>
          </div>
          <div>
            <label htmlFor="email">Name</label>
            <input
              type="text" name='name' 
            ></input>
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text" name='subject'
            ></input>
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message" name='message'
            ></textarea>
          </div>
          <div>
            <label></label>
            <button type="submit">Submit</button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Contact;
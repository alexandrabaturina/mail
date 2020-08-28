document.addEventListener('DOMContentLoaded', function () {
  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-content-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  // Send email when clicking Submit button
  document.querySelector('#compose-form').addEventListener('submit', send_email);
}

function send_email(event) {
  event.preventDefault();
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: document.querySelector('#compose-recipients').value,
      subject: document.querySelector('#compose-subject').value,
      body: document.querySelector('#compose-body').value
    })
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      load_mailbox('sent');
    });
}

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#email-content-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      emails.forEach(email => {
        const div = document.createElement('div');
        if (mailbox === 'inbox' || mailbox === 'archive') {
          div.innerHTML = `
            <div class='email-block'>${email.sender}</div>
          `;
        } else if (mailbox === 'sent') {
          div.innerHTML = `
          <div class='email-block'>${email.recipients}</div>
          `;
        }
        div.innerHTML += `
          <div class='email-block'>${email.subject}</div>
          <div class='email-block'>${email.timestamp}</div>
        `;
        div.classList.add('email-div');
        if (email.read === true) {
          div.style.backgroundColor = '#E8E8E8';
        }

        document.querySelector('#emails-view').append(div);
        div.addEventListener('click', () => render_email_content(`${email.id}`, mailbox));
      });
    });
}


function render_email_content(email_id, mailbox) {

  document.querySelector('#email-content-view').innerHTML = '';

  // Show email content view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-content-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Mark email as read
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      read: true
    })
  })

  // Render email content
  fetch(`/emails/${email_id}`)
    .then(response => response.json())
    .then(email => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${email.subject}</h3>
        <p>
          To: <strong>${email.recipients}</strong><br>
          From: <strong>${email.sender}</strong><br>
          ${email.timestamp}
        </p>
        <hr/>
      `;

      // Render email body line by line if there's more than one line
      const emailBody = email.body.split("\n");
      for (var i = 0, len = emailBody.length; i < len; i++) {
        div.innerHTML += `
          <p>${emailBody[i]}</p>
        `;
      }
      document.querySelector('#email-content-view').append(div);

      // Do not archive mail in the Sent mailbox
      if (mailbox === 'sent') {
        return
      }

      // Archive/Unarchive email 
      const btn = document.createElement('button');
      btn.innerHTML = email.archived ? 'Unarchive' : 'Archive';
      btn.classList.add('btn-sm');
      document.querySelector('#email-content-view').append(btn);

      btn.addEventListener('click', () => {
        console.log(`Status before function invocation: ${email.archived}`);
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            archived: !email.archived
          })
        })
          .then(result => {
            load_mailbox('inbox');
          });
      });

    });
}

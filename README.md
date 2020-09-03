# Project 3: Mail
## Overview
The current repo contains project called **mail** which is a front-end for an email client that makes API calls to send and receive emails.

This project is built as Project 3 for [CS50W 2020 course](https://courses.edx.org/courses/course-v1:HarvardX+CS50W+Web/course/) provided by edX platform.
## Features
The project meets the following requirements.
* **Send Mail**
  
  * When a user submits the email composition form, the email is sent (this option is built with JavaScript).
  * A ```POST``` request is made to ```/emails```, passing in values for ```recipients```, ```subject```, and ```body```.
  * Once the email has been sent, the user’s ***Sent*** mailbox is loaded.
  
* **Mailbox**

  * When a user visits their ***Inbox***, ***Sent*** mailbox, or ***Archive***, the appropriate mailbox is loaded.
  * A ```GET``` request to ```/emails/<mailbox>``` is made to request the emails for a particular mailbox.
  * When a mailbox is visited, the application first queris the API for the latest emails in that mailbox.
  * When a mailbox is visited, the name of the mailbox appears at the top of the page (this part is done in starter code).
  * Each email is rendered in its own box  that displays who the email is from, what the subject line is, and the timestamp of the email.
  * If the email is unread, it appears with a white background. If the email has been read, it appears with a gray background.
  
![image](https://user-images.githubusercontent.com/53233637/92069814-3714af80-ed5f-11ea-8c54-730cb5709b0d.png)
  
* **View Email**

  * When a user clicks on an email, they are taken to a view where they see the content of that email.
  * A ```GET``` request is made to ```/emails/<email_id>``` to request the email.
  * The application shows the email’s sender, recipients, subject, timestamp, and body.
  * Once the email has been clicked on, it is marked as read. A ```PUT``` request is made to ```/emails/<email_id>``` to update whether an email is read or not.
  
![image](https://user-images.githubusercontent.com/53233637/92069896-7cd17800-ed5f-11ea-8c11-33c77e8452d1.png)

* **Archive/Unarchive**

  * Users are allowed to archive and unarchive emails that they have received.
  * When viewing an ***Inbox*** email, the user is presented with a button that lets them archive the email. When viewing an ***Archive*** email, the user should is with a button that lets them unarchive the email. This requirement does not apply to emails in the ***Sent*** mailbox.
  * A ```PUT``` request is made to ```/emails/<email_id>``` to mark an email as archived or unarchived.
  * Once an email has been archived or unarchived, the user’s ***Inbox*** is loaded.
  
![image](https://user-images.githubusercontent.com/53233637/92070059-e6518680-ed5f-11ea-83b6-d4e529ef478b.png)
  
* **Reply**

  * Users are allowed to reply to an email.
  * When viewing an email, the user are presented with a “Reply” button that lets them reply to the email.
  * When the user clicks the “Reply” button, they are taken to the email composition form.
  * The composition form is pre-filled with the ```recipient``` field set to whoever sent the original email.
  * The ```subject``` line is pre-filled. If the original email had a subject line of ```foo```, the new subject line should be ```Re: foo```. (If the subject line already begins with ```Re: ```, no need to add it again.)
  * The ```body``` of the email is pre-filled with a line like ```"On Jan 1 2020, 12:00 AM foo@example.com wrote:"``` followed by the original text of the email.

![image](https://user-images.githubusercontent.com/53233637/92070253-60820b00-ed60-11ea-9e2a-7764aec78b8d.png)
## Dependencies
The app is built using *Django* framework. To install Django via terminal, use the following command.
```sh
$ pip3 install Django
```


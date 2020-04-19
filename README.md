# tranet
Code Quiz Homework (wk4)
1) index.html is the main page which lists Rules of the quiz. User can click on Start Quiz button or View Highscores Link on top left corner on this page.
2) On click of Start Quiz button, quiz.html page is displayed.
3) script.js handles the dynamic features to render questions, options and time left on the quiz page.
4) Once user makes a selection, user is notified if their selction is right or wrong. The result is displayed for 2 seconds and timer is paused during this time. 
5) Also when the timer is paused, the options buttons on the screen are disabled so that user can not click multiple buttons for the same question before next question is displayed.
6) Quiz ends when timer reaches zero or all questions are answered. 
7) At the end of quiz, user is shown his total score and a form to enter their name. 
8) After user clicks submit on the form, their name and score is saved in local storage and user is redirected to the highscores page. 
9) highscores page shows top users with top 5 scores. This page has inline javascript.   
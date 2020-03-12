# Quiz-app-project

A web application built with node.js and react. The final app is running here: https://quiz-app-harjoitustyo.herokuapp.com/

How the application is used:

The user registers with a username and password, or logs in with their facebook account. The user is then able to log in to the site and and play qiuzzes with different themes. Part of the quizzes are fetched from open trivia database, which is an open api with user generated content: https://opentdb.com/ User scores points from the quizzes that are stored in a database (mongoose) and the user can see them in their profile page.

The users can also create their own quizzes, that have either multiple choice or true/false answers. The user can select how many questions the quizzes have and in multiple choice quizzes how many answer alternatives there are. The user generated quizzes are first stored in the frontend and when the user submits it, it's stored in the database.

There is also a chat where the user can talk to others who play quizzes. It is currently not functioning in real-time.

The application fetches all the questions and answers with a single request and therefore, if the user wants, they can see them in their network tab. Thus, scoring points is not very reliable, but in the next version, the correct answers could come one at a time from the api.

The frontend repo is here: https://github.com/lauraleonilla/quiz-app-frontend

The report of hours spent on the project can be found here: https://github.com/lauraleonilla/quiz-app-backend/blob/master/timeKeeping.md

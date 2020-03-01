# Quiz-app-project

A web application built with node.js and react.

The user registers with a username and password, or oauth. The user is then able to log in and play qiuzzes with different themes on the site. The quizzes are fetched from open trivia database, which is an open api with user generated content: https://opentdb.com/ User scores points from the quizzes that are stored in a database (mongoose) and the user can see them in their profile page.

The site will display the users with highest scores on the start page.

A possible extensions to the app: user can create their own quiz and share it with the rest of the users. And a chat function with socket.io so the users can chat with each other.

The frontend repo is here: https://github.com/lauraleonilla/quiz-app-frontend

The report of hours spent on the project can be found here: https://github.com/lauraleonilla/quiz-app-backend/blob/master/timeKeeping.md

# hw4-quiz

Create a multible choice quiz application, that has countdown timer, ans score keeping 
Time will be deducted for incorrect answers, added for correct answers. Score will be incremented by 1 for each correct answer. 


TODO:
- [ ] UI
  - [X] Create Shell HTML
    - [X] Container for questions
    - [X] Container for Answer buttons
    - [X] Container for timer and score area output
      - [ ] Timer will need 2 output areas, Minutes and seconds
    - [] Container for stauts (correct or incorrect)
  - [X] Create Start Button
  - [X] Create answer buttons from array or object of question answer pairs
  - [ ] Quiz end
    - [ ] Create name input field
    - [ ] create save button
- [ ] Logic
  - [ ] Quesitons
    - [X] Create Question/answer array or Object to hold question, possible answers and correct answer flag
    - [ ] Create randomization logic for selecting questions
  - [ ] Create Timer countdown logic
    - [ ] create function to calc timer seconds into mintues and seconds and display on the page
    - [ ] create function to add or subtract time based on correct or incoorect answer
    - [ ] create function to track and display the score 
    - [ ] create function to add to the score on correct answers.
    - [ ] create logix that ends the quiz when the timer hits zero
  - [ ] Answers
    - [ ] create function to get and display answers as buttons from the object or array called quesitons
    - [ ] add listeners to answer buttons for the click events
    - [ ] create logix that measures of the answers are correct or incorrect  
  - [ ] Quiz End
    - [ ] Create function add name input score total to the window
    - [ ] Create function to save name and score to local storage 
  - [ ] 

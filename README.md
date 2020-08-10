# hw4-quiz

Create a multible choice quiz application, that has countdown timer, ans score keeping 
Time will be deducted for incorrect answers, added for correct answers. Score will be incremented by 1 for each correct answer. 

---
BUGS:
- [X] issue you can click anywhere in the jumbo tron to start the quiz. you dont have to click the start button
- [X] next quesiton displays, but without any answer buttons showing




TODO:
- [ ] UI
  - [X] Create Shell HTML
    - [X] Container for questions
    - [X] Container for Answer buttons
    - [X] Container for timer and score area output
      - [X] Timer will need 2 output areas, Minutes and seconds (used progress bar instead)
      - [X] format coundown instead progress bar correctly
    - [X] Container for stauts (correct or incorrect)
  - [X] Create Start Button
  - [X] Create answer buttons from array or object of question answer pairs
  - [ ] create player card 
    - [X] create name field
  - [ ] Quiz end
    - [X] Create name input field (descided to get this at the start)
    - [ ] create save button
- [ ] Logic
  - [ ] Quesitons
    - [X] Create Question/answer array or Object to hold question, possible answers and correct answer flag
    - [ ] Create randomization logic for selecting questions
  - [X] Create Timer countdown logic
    - [X] create function to calc timer seconds into mintues and seconds and display on the page
    - [X] create function to add or subtract time based on correct or incorect answer
    - [X] create function to track and display the score 
    - [X] create function to add to the score on correct answers.
    - [ ] create logix that ends the quiz when the timer hits zero
  - [ ] Answers
    - [X] create function to get and display answers as buttons from the object or array called quesitons
    - [X] add listeners to answer buttons for the click events
    - [X] create logix that measures if the answers are correct or incorrect  
  - [ ] Quiz End
    - [ ] display save score button at when time is up or at the end of the array
  

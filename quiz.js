document.addEventListener("DOMContentLoaded", function() {
    let maxScore = 0;
    let quizData = {
            "sections": [
                {
                    "sectionTitle": "General Knowledge",
                    "questions": [
                        {
                           "questionType": "mcq",
                           "question": "What is the capital of France?",
                           "options": ["Paris", "London", "Berlin", "Rome"],
                           "answer": "Paris"
                        },
                        {
                            "questionType": "mcq",
                            "question": "Which planet is known as the Red Planet?",
                            "options": ["Mars", "Venus", "Jupiter", "Saturn"],
                            "answer": "Mars"
                        },
                
                    ]
           
                },
                {
                    "sectionTitle": "Science",
                    "questions": [
                        {
                           "questionType": "mcq",
                           "question": "What is the chemical symbol for water?",
                           "options": ["H2O", "CO2", "NaCl", "O2"],
                           "answer": "H2O"
                        },
                        {
                            "questionType": "text",
                            "question": "What is the smallest unit of matter?",
                            "answer": "Atom"
                        },
                
                    ]
           
                },
                {
                    "sectionTitle": "Mathematics",
                    "questions": [
                        {
                           "questionType": "text",
                           "question": "What is 2 + 2?",
                           "answer": "4"
                        },
                        {
                            "questionType": "text",
                            "question": "What is the value of pi (π) to two decimal places?",
                            "answer": '3.14'
                        },
                
                    ]
           
                },
                {
                    "sectionTitle": "Indian History",
                    "questions": [
                        {
                           "questionType": "text",
                           "question": "Who was the first Prime Minister of India?",
                           "answer": "Jawaharlal Nehru"
                        },
                        {
                            "questionType": "text",
                            "question": "Who led the Salt March, also known as the Dandi March, in 1930?",
                            "answer": "Mahatma Gandhi"
                        },
                
                    ]
           
                },
        
            ],
            
        };
        initSections();

        function initSections(){
            let sections =document.querySelectorAll('.section');
            sections.forEach((section)=>{
                section.addEventListener("click", ()=>{
                    let sectionNumber = parseInt(section.getAttribute("data-section"));
                    startQuiz(sectionNumber);
                })
            })
        }

        function startQuiz(index){
           const currentQuestions = shuffleArray(quizData.sections[index].questions);
           let currentQuestionIndex = 0;
           let score = 0;
           let answerSelected = false;

           document.getElementById("quiz-container").style.display = "none";
           document.getElementById("questions-container").style.display = "block";
           document.getElementById("questions-container").innerHTML = `
           <p id="score">Score:0</p>
           <div id="question"></div>
           <div id="options"></div>
           <button id="next-button">Next</button>
           `;
            
           function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
           }

           showQuestions();

           function showQuestions(){
              
              const question = currentQuestions[currentQuestionIndex];
              const questionElement = document.getElementById("question");
              const optionsElement = document.getElementById('options');
              
              questionElement.textContent = question.question;
              optionsElement.innerHTML = '';

              if(question.questionType === "mcq"){
                question.options.forEach(option =>{
                    const optionElement = document.createElement('div');
                    optionElement.textContent = option;
                    optionElement.addEventListener('click', function(){
                        if(!answerSelected){
                            answerSelected = true;
                            optionElement.classList.add("selected");
                            checkAnswer(option, question.answer);
                            console.log("selected", option)
                        }
                    });
                    optionsElement.appendChild(optionElement);
                });

              }else{
                const inputElement = document.createElement('input');
                inputElement.type = question.questionType === 'number' ? 'number' : 'text';

                const submitButton = document.createElement('button');
                submitButton.textContent = 'Submit Answer';
                submitButton.className = 'submit-answer';

                submitButton.onclick=()=>{
                    if (!answerSelected){
                        answerSelected = true;
                        checkAnswer(inputElement.value.toString(), question.answer.toString());

                    }
                };
                optionsElement.appendChild(inputElement);
                optionsElement.appendChild(submitButton);

              }

           }

           function checkAnswer(givenAnswer, correctAnswer){
              const feedbackElement = document.createElement('div');
              feedbackElement.id = 'feedback';
              if (givenAnswer === correctAnswer || correctAnswer.toLowerCase() === givenAnswer.toLowerCase()){
                score++;
                feedbackElement.textContent = 'Corerct!';
                feedbackElement.style.color = 'green';
              } else{
                feedbackElement.textContent = `Wrong. Corerct answer: ${correctAnswer}`;
                feedbackElement.style.color = 'red';
              }
              const optionsElement = document.getElementById('options');
              optionsElement.appendChild(feedbackElement);
              updateScore();
           }

           function updateScore(){
            document.getElementById('score').textContent = "Score:" + score;
           }
           
           function endQuiz(){
            let questionContainer = document.getElementById('questions-container');
            let quizContainer = document.getElementById('quiz-container');
            
            if (score > maxScore) {
                maxScore = score;
            }
            questionContainer.innerHTML =`
            <h1>Quiz Completed!</h1>
            <p>Your final score: ${score}/${currentQuestions.length}</p>
            <p>Max Score: ${maxScore}</p>
            <button id ="home-button">Go to Home</button>
            `;
            document.getElementById('home-button').addEventListener('click', function(){
                 quizContainer.style.display = 'grid';
                 questionContainer.style.display = 'none';
            });

            
           }

           document.getElementById("next-button").addEventListener("click", ()=>{
                if(currentQuestionIndex == currentQuestions.length-1){
                    console.log("Quiz Over!");
                    endQuiz();
                } else{
                    answerSelected=false;
                    currentQuestionIndex++;
                    showQuestions();
                }
           })
           
        }
   

 });

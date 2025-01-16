// Fetch global web development questions from an API
async function fetchQuizData() {
    const response = await fetch('https://opentdb.com/api.php?amount=50&category=18&type=multiple');
    const data = await response.json();
    return data.results.map((q) => ({
      question: q.question,
      options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
      correctAnswer: q.correct_answer,
    }));
  }
  
  // Initialize variables
  let currentQuestionIndex = 0;
  let quizData = [];
  let correctAnswers = 0;
  let wrongAnswers = 0;
  
  // Render a question
  function renderQuestion() {
    const questionText = document.getElementById("question-text");
    const options = document.querySelectorAll(".option");
  
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.innerHTML = currentQuestion.question;
  
    options.forEach((option, index) => {
      option.textContent = currentQuestion.options[index];
      option.style.backgroundColor = ""; // Reset option background
      option.style.pointerEvents = "auto"; // Re-enable click events
      option.onclick = () => handleOptionClick(option, currentQuestion.correctAnswer);
    });
  
    document.getElementById("current-question").textContent = currentQuestionIndex + 1;
  }
  
  // Handle option click
  function handleOptionClick(selectedOption, correctAnswer) {
    const options = document.querySelectorAll(".option");
  
    // Highlight correct and incorrect options
    options.forEach(option => {
      option.style.pointerEvents = "none"; // Disable further clicks
      if (option.textContent === correctAnswer) {
        option.style.backgroundColor = "rgb(13, 248, 5) "; // Highlight the correct answer
      }
      if (option === selectedOption && option.textContent !== correctAnswer) {
        option.style.backgroundColor = "rgb(248, 5, 5) "; // Highlight wrong selected option
      }
    });
  
    // Update score
    if (selectedOption.textContent === correctAnswer) {
      correctAnswers++;
    } else {
      wrongAnswers++;
    }
  
    // Delay to show the correct answer before moving to the next question
    setTimeout(() => {
      currentQuestionIndex++;
  
      if (currentQuestionIndex < quizData.length) {
        renderQuestion();
      } else {
        showResults(); // Display results at the end
      }
    }, 1500); // 1.5 seconds delay to show feedback
  }
  
  // Show quiz results
  function showResults() {
    const quizContainer = document.querySelector(".quiz-container");
    const percentage = Math.round((correctAnswers / quizData.length) * 100);
    let performance;
  
    if (percentage < 50) {
      performance = "Bad";
    } else if (percentage < 70) {
      performance = "Good";
    } else if (percentage < 90) {
      performance = "Excellent";
    } else {
      performance = "Expert";
    }
  
    quizContainer.innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Correct Answers: ${correctAnswers}</p>
      <p>Wrong Answers: ${wrongAnswers}</p>
      <p>Percentage: ${percentage}%</p>
      <h3>Performance: ${performance}</h3>
      <button id="new-quiz-btn">New Quiz</button>
    `;
  
    // Add functionality to the New Quiz button
    document.getElementById("new-quiz-btn").addEventListener("click", refreshQuestions);
  }
  
  // Refresh questions (for new quiz)
  async function refreshQuestions() {
    quizData = (await fetchQuizData()).slice(0, 20); // Limit to 20 questions
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    document.querySelector(".quiz-container").innerHTML = `
      <div class="question-header">
        <p>Question <span id="current-question">1</span>/20</p>
      </div>
      <div class="question-box">
        <h3 id="question-text">Loading question...</h3>
        <div class="options">
          <button class="option" data-value="A">Option A</button>
          <button class="option" data-value="B">Option B</button>
          <button class="option" data-value="C">Option C</button>
          <button class="option" data-value="D">Option D</button>
        </div>
      </div>
    `;
    renderQuestion();
  }
  
  // Initialize the quiz
  (async function initializeQuiz() {
    quizData = (await fetchQuizData()).slice(0, 20); // Fetch 20 questions
    renderQuestion();
  })();
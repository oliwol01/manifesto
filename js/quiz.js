(function () {
  "use strict";


  const questions = [
    {
      text: "How do you like spending your free time?",
      options: ["Creatively", "Learning ", "Resting"],
      correctIndex: 1,
    },
    {
      text: "Which best describes you socially?",
      options: ["Introvert", "Extrovert", "Mix of both"],
      correctIndex: 1,
    },
    {
      text: "Which describes your learning style best?",
      options: ["Structured and goal-oriented", "Hands-on and experimental", "Thoughtful and reflective"],
      correctIndex: 2,
    },
  ];


  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const progressEl = document.getElementById("progress");
  const questionTextEl = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options");
  const feedbackRestEl = document.getElementById("feedback-rest");
  const feedbackWrapEl = document.querySelector(".feedback-wrap");

 
  let currentQuestionIndex = 0;
  let selectedOptionIndex = null;
  let feedbackShown = false; 

  function resetState() {
    currentQuestionIndex = 0;
    selectedOptionIndex = null;
    nextBtn.disabled = true;
    nextBtn.textContent = "Next";
    feedbackShown = false;
    hideFeedback();
  }

  function showStart() {
    startScreen.classList.remove("d-none");
    quizScreen.classList.add("d-none");
  }

  function showQuiz() {
    startScreen.classList.add("d-none");
    quizScreen.classList.remove("d-none");
    hideFeedback();
    renderQuestion();
  }


  function renderQuestion() {
    const q = questions[currentQuestionIndex];
    questionTextEl.textContent = q.text;
    progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    optionsContainer.innerHTML = "";
    selectedOptionIndex = null;
    nextBtn.disabled = true;
    if (currentQuestionIndex === questions.length - 1) {
      nextBtn.innerHTML = "Finish";
      nextBtn.setAttribute("aria-label", "Finish quiz");
    } else {
      nextBtn.innerHTML = '<span aria-hidden="true">→</span>';
      nextBtn.setAttribute("aria-label", "Next question");
    }
    feedbackShown = false; 
    hideFeedback();
    enableOptions(); 

    q.options.forEach((label, idx) => {
      const button = document.createElement("button");
      button.className = "btn btn-outline-primary";
      button.type = "button";
      button.textContent = label;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => selectOption(idx, button));
      optionsContainer.appendChild(button);
    });
  }

  function selectOption(index, buttonEl) {
    selectedOptionIndex = index;
    nextBtn.disabled = false;
    // toggle visual selection
    for (const btn of optionsContainer.querySelectorAll(".btn-outline-primary")) {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    }
    buttonEl.classList.add("active");
    buttonEl.setAttribute("aria-pressed", "true");
  }

  function disableOptions() {
    for (const btn of optionsContainer.querySelectorAll(".btn-outline-primary")) {
      btn.disabled = true;
      btn.style.pointerEvents = "none";
      btn.style.opacity = "0.6";
    }
  }

  function enableOptions() {
    for (const btn of optionsContainer.querySelectorAll(".btn-outline-primary")) {
      btn.disabled = false;
      btn.style.pointerEvents = "";
      btn.style.opacity = "";
    }
  }

  function handleNext() {
    if (selectedOptionIndex === null) return;
  
    const q = questions[currentQuestionIndex];
    const label = (q.options[selectedOptionIndex] || "").toLowerCase();
  
    const feedbackMap = {
      0: {
        learn: { src: "img/feedback-learn.png", alt: "Learning feedback" },
        rest: { src: "img/feedback-rest.png", alt: "Resting feedback" },
        creative: { src: "img/feedback-creative.png", alt: "Creative feedback" }
      },
      1: {
        introvert: { src: "img/feedback-introvert.png", alt: "Introvert feedback" },
        extrovert: { src: "img/feedback-extrovert.png", alt: "Extrovert feedback" },
        mix: { src: "img/feedback-mix.png", alt: "Mixed feedback" }
      },
      2: {
        structured: { src: "img/feedback-structured.png", alt: "Structured feedback" },
        experimental: { src: "img/feedback-experimental.png", alt: "Experimental feedback" },
        reflective: { src: "img/feedback-reflective.png", alt: "Reflective feedback" }
      }
    };
  
    const currentFeedback = feedbackMap[currentQuestionIndex];
  
    if (!feedbackShown && currentFeedback) {
      for (const key in currentFeedback) {
        if (label.includes(key)) {
          const { src, alt } = currentFeedback[key];
          if (feedbackRestEl) {
            feedbackRestEl.src = src;
            feedbackRestEl.alt = alt;
          }
          feedbackShown = true;
          showFeedback();
          return; 
        }
      }
    }
  
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      renderQuestion();
    } else {
      window.location.href = "video.html";
    }
  }
  
  
  

  function showFeedback() {
    if (!feedbackRestEl) return;
    quizScreen.classList.add("feedback-visible");
    feedbackWrapEl?.classList.remove("d-none");
    requestAnimationFrame(() => feedbackWrapEl?.classList.add("show"));
    disableOptions(); 
  }

  function hideFeedback() {
    if (!feedbackRestEl) return;
    quizScreen.classList.remove("feedback-visible");
    feedbackWrapEl?.classList.remove("show");
    feedbackWrapEl?.classList.add("d-none");
  }

  startBtn?.addEventListener("click", () => {
    resetState();
    showQuiz();
  });

  nextBtn?.addEventListener("click", handleNext);


  showStart();
}());




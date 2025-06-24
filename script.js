const questions = [
  {
    question: "What kind of story excites you the most?",
    options: {
      a: { text: "Explosions and chase scenes", genre: "Action" },
      b: { text: "Heartfelt love stories", genre: "Romance" },
      c: { text: "Laugh out loud moments", genre: "Comedy" },
      d: { text: "Dark mysteries and plot twists", genre: "Thriller" }
    }
  },
  {
    question: "Pick a setting you enjoy:",
    options: {
      a: { text: "Battlefield or warzone", genre: "Action" },
      b: { text: "Cafés and beaches", genre: "Romance" },
      c: { text: "School or office", genre: "Comedy" },
      d: { text: "Haunted house or crime scene", genre: "Thriller" }
    }
  },
  {
    question: "Choose your weekend activity:",
    options: {
      a: { text: "Hiking or sports", genre: "Action" },
      b: { text: "Going on a date", genre: "Romance" },
      c: { text: "Watching stand-up", genre: "Comedy" },
      d: { text: "Reading mystery novels", genre: "Thriller" }
    }
  },
  {
    question: "Which movie poster would catch your eye?",
    options: {
      a: { text: "Explosions and bold colors", genre: "Action" },
      b: { text: "A couple holding hands", genre: "Romance" },
      c: { text: "Funny cartoon characters", genre: "Comedy" },
      d: { text: "A shadowy figure in the dark", genre: "Thriller" }
    }
  },
  {
    question: "Pick a snack for movie night:",
    options: {
      a: { text: "Spicy nachos", genre: "Action" },
      b: { text: "Chocolate-covered strawberries", genre: "Romance" },
      c: { text: "Popcorn with extra butter", genre: "Comedy" },
      d: { text: "Licorice or dark chocolate", genre: "Thriller" }
    }
  },
  {
    question: "Which character do you root for?",
    options: {
      a: { text: "The brave hero", genre: "Action" },
      b: { text: "The hopeless romantic", genre: "Romance" },
      c: { text: "The class clown", genre: "Comedy" },
      d: { text: "The clever detective", genre: "Thriller" }
    }
  }
];

const quizContainer = document.getElementById("quiz");

let currentQuestion = 0;
let answers = [];

function showQuestion(index) {
  quizContainer.innerHTML = '';
  const q = questions[index];
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");
  questionDiv.innerHTML = `<h3>${q.question}</h3>`;

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");

  let optionKeys = Object.entries(q.options);
  optionKeys.forEach(([key, option]) => {
    // Use a span for styling checked state
    optionsDiv.innerHTML += `
      <label>
        <input type="radio" name="q${index}" value="${option.genre}" />
        <span>${option.text}</span>
      </label>
    `;
  });

  questionDiv.appendChild(optionsDiv);
  quizContainer.appendChild(questionDiv);

  // Next/Submit button
  let btn = document.createElement("button");
  btn.className = "submit-btn";
  btn.innerText = (index === questions.length - 1) ? "Submit" : "Next";
  btn.onclick = () => {
    const selected = document.querySelector('input[type="radio"]:checked');
    if (!selected) {
      alert("Please select an option!");
      return;
    }
    answers[index] = selected.value;
    if (index === questions.length - 1) {
      showResult();
    } else {
      showQuestion(index + 1);
    }
  };
  quizContainer.appendChild(btn);
}

const bestMovies = {
  Action: ["Mad Max: Fury Road", "John Wick", "Die Hard"],
  Romance: ["The Notebook", "Pride & Prejudice", "La La Land"],
  Comedy: ["Superbad", "The Hangover", "Groundhog Day"],
  Thriller: ["Se7en", "Gone Girl", "The Silence of the Lambs"]
};

function showResult() {
  const genreCount = {};
  answers.forEach(genre => {
    genreCount[genre] = (genreCount[genre] || 0) + 1;
  });
  const resultGenre = Object.keys(genreCount).reduce((a, b) => genreCount[a] > genreCount[b] ? a : b, Object.keys(genreCount)[0]);
  const movies = bestMovies[resultGenre] || [];
  quizContainer.innerHTML = `<div class="result">🎬 You like <b>${resultGenre}</b> movies!<br><br>Top 3 picks:<ul style='list-style:none;padding:0;'>${movies.map(m => `<li>🍿 ${m}</li>`).join('')}</ul></div>`;
}

showQuestion(0);

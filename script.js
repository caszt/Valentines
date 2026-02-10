// Intro logic
const intro = document.getElementById('introScreen');
const startBtn = document.getElementById('startButton');
const gameBox = document.getElementById('gameBox');

startBtn.addEventListener('click', () => {
  intro.style.display = 'none';
  gameBox.style.display = 'inline-block';
});

let score = 0;
let step = 0;

function showCommentaryWithLoading(message, commentaryDelay, loadingDelay, nextSceneFunction) {
  const textEl = document.getElementById("text");
  const buttons = document.querySelectorAll("button");

  // Hide buttons while commentary/loading
  buttons[0].style.display = "none";
  buttons[1].style.display = "none";

  // 1️⃣ Show commentary first
  textEl.innerText = message;

  setTimeout(() => {
    // 2️⃣ Start loading dots animation
    let dots = 0;
    const interval = setInterval(() => {
      dots = (dots + 1) % 4;
      textEl.innerText = message + '.'.repeat(dots);
    }, 300);

    // 3️⃣ After loadingDelay, stop dots, show buttons, THEN call next scene
    setTimeout(() => {
      clearInterval(interval);
      buttons[0].style.display = "inline-block"; // restore buttons first
      buttons[1].style.display = "inline-block";
      nextSceneFunction(); // THEN set new text and onclicks
    }, loadingDelay);

  }, commentaryDelay);
}

function createSparkle() {
  const sparkle = document.createElement('div');
  
  // Random size between 2px and 6px
  const size = Math.random() * 4 + 2; // 2 <= size < 6
  sparkle.style.width = size + 'px';
  sparkle.style.height = size + 'px';
  
  sparkle.style.position = 'absolute';
  sparkle.style.background = 'white';
  sparkle.style.borderRadius = '50%';
  
  // Random position on screen
  sparkle.style.left = Math.random() * window.innerWidth + 'px';
  sparkle.style.top = Math.random() * window.innerHeight + 'px';
  
  // Random opacity for depth effect
  sparkle.style.opacity = Math.random();
  
  sparkle.style.pointerEvents = 'none'; // clicks go through
  sparkle.style.transition = 'transform 2s linear, opacity 2s linear';
  
  document.body.appendChild(sparkle);

  // Animate falling or twinkling
  setTimeout(() => {
    sparkle.style.transform = `translateY(${Math.random() * 50}px)`;
    sparkle.style.opacity = 0;
  }, 50);

  // Remove after animation
  setTimeout(() => {
    sparkle.remove();
  }, 2000);
}

// Spawn sparkles continuously
setInterval(createSparkle, 50);

function createBoxHeart() {
  const box = document.getElementById('gameBox');
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerText = '💖';

  // Random starting position along the box edges
  const side = Math.floor(Math.random() * 4); // 0=top,1=right,2=bottom,3=left
  let x, y;
  if (side === 0) { // top
    x = Math.random() * box.offsetWidth + 'px';
    y = '0px';
  } else if (side === 1) { // right
    x = box.offsetWidth + 'px';
    y = Math.random() * box.offsetHeight + 'px';
  } else if (side === 2) { // bottom
    x = Math.random() * box.offsetWidth + 'px';
    y = box.offsetHeight + 'px';
  } else { // left
    x = '0px';
    y = Math.random() * box.offsetHeight + 'px';
  }

  // Target translation (slightly inside/outside)
  const targetX = (Math.random() - 0.5) * 30 + 'px';
  const targetY = (Math.random() - 0.5) * 30 + 'px';

  heart.style.left = x;
  heart.style.top = y;
  heart.style.setProperty('--x', targetX);
  heart.style.setProperty('--y', targetY);
  heart.style.fontSize = (Math.random() * 15 + 15) + 'px';

  box.appendChild(heart);

  // Remove after animation
  setTimeout(() => heart.remove(), 2000);
}

// Generate hearts every 0.4s
setInterval(createBoxHeart, 400);


function updatePoints() {
  document.getElementById("points").innerText = "Points: " + score;
}

function setScene(message, aText, bText) {
  document.getElementById("text").innerText = message;
  const buttons = document.querySelectorAll("button");
  buttons[0].innerText = aText;
  buttons[1].innerText = bText;
}

function choiceA() {
  nextStep("A");
}

function choiceB() {
  nextStep("B");
}

function nextStep(choice) {
  step++;

  if (step === 1) {
    score += (choice === "A") ? 0 : 10;
    showCommentaryWithLoading(
  choice === "A" 
    ? "Fine, go shower"
    : "YESSS GOOD MORNING TO YOU TOO",
  1000,  // commentary delay (ms)
  1200,  // loading dots delay (ms)
  function() {
    setScene(
      "A person messaged you, who immediately comes to your mind?",
      "Sian",
      "A friend"
    )
  }
);

  

  } else if (step === 2) {
    score += (choice === "A") ? 10 : 0;
    showCommentaryWithLoading(
  choice === "A" 
    ? "Awweee, me? "
    : "WHICH FRIEND? 🤨",
  1000,  // commentary delay (ms)
  1200,  // loading dots delay (ms)
  function() {
    setScene(
      "What is Sian's favorite part of the day?",
      "Going out with friends",
      "Going home with you after school"
    )
  }
);

} else if (step === 3) {
    score += (choice === "A") ? 10 : 0;
    showCommentaryWithLoading(
  choice === "A" 
     ? "I love it, but wrong"
    : "You know me so well, hehe",
  1000,  // commentary delay (ms)
  1200,  // loading dots delay (ms)
  function() {
    setScene(
      "What's your type?",
      "You",
      "Still you"
    )
  }
);

} else if (step === 4) {
    score += (choice === "A") ? 10 : 10;
    showCommentaryWithLoading(
  choice === "A" 
    ? "I know, I'm irresistable"
    : "I know, I'm irresistable",
  1000,  // commentary delay (ms)
  1200,  // loading dots delay (ms)
  function() {
    setScene(
      "Cheese or Spicy BBQ?",
      "Cheese",
      "Spicy BBQ"
    )
  }
);

} else if (step === 5) {
    score += (choice === "A") ? 0 : 10;
    showCommentaryWithLoading(
  choice === "A" 
    ? "Not much of a fan"
    : "YEAHHHH, BABY!",
  1000,  // commentary delay (ms)
  1200,  // loading dots delay (ms)
  function() {
    setScene(
      "Which is my favorite?",
      "Naruto",
      "Omniscient Reader's Viewpoint"
    )
  }
);

} else if (step === 6) {
    score += (choice === "A") ? 10 : 10;
    showCommentaryWithLoading(
  choice === "A" 
    ? "Both are right because my baby is my most favorite"
    : "Both are right because my baby is my most favorite",
  1000,  // commentary delay (ms)
  1200,  // loading dots delay (ms)
  function() {
    setScene(
      "What is my birthday?",
      "June 17",
      "September 17"
    )
  }
);

} else if (step === 7) {
    score += (choice === "A") ? 10 : 0;
    showCommentaryWithLoading(
  choice === "A" 
    ? "Correct!"
    : "That's another birthday, love",
  1000,  // commentary delay (ms)
  1200,  // loading dots delay (ms)
  function() {
    setScene(
      "My favorite drink?",
      "Coffee",
      "Calamansi juice"
    )
  }
);

} else if (step === 8) {
    score += (choice === "A") ? 0 : 10;
    showCommentaryWithLoading(
  choice === "A" 
    ? "Noooo, I don't like it"
    : "MHM, MHM",
  1000,  // commentary delay (ms)
  1200,  // loading dots delay (ms)
  function() {
    setScene(
      "Our first monthsary?",
      "Mang Inasal",
      "Sebu Cha!"
    )
  }
);

} else if (step === 9) {
    score += (choice === "A") ? 10 : 0;
    showCommentaryWithLoading(
  choice === "A" 
    ? "That's before we dated!"
    : "YEAHHHHH",
  1000,  // commentary delay (ms)
  1200,  // loading dots delay (ms)
  function() {
    setScene(
      "Do you love me?",
      "Yes",
      "Yes 100x"
    )
  }
);

  } else if (step === 10) {
    score += (choice === "A") ? 10 : 10;
    showCommentaryWithLoading(
  choice === "A" 
    ? "Awweee"
    : "AWWEEEEE",
  1000,  // commentary delay (ms)
  1200,  // loading dots delay (ms)
  function() {
    setScene(
      "Which is our favorite spot?",
      "Mcdo",
      "Gmall"
    )
  }
);

} else if (step === 11) {
    score += (choice === "A") ? 7 : 10;
    showCommentaryWithLoading(
  choice === "A" 
    ? "Second fave"
    : "FAVORITEEEEE",
  1000,  // commentary delay (ms)
  1200,  // loading dots delay (ms)
  function() {
    setScene(
      "Are you single?",
      "No.",
      "Yes."
    )
  }
);

} else if (step === 12) {
    score += (choice === "A") ? 10 : 0;
    showCommentaryWithLoading(
  choice === "A" 
    ? "Good."
    : "Says who?",
  1000,  // commentary delay (ms)
  1200,  // loading dots delay (ms)
  function() {
    setScene(
      "Lastly, I have a question.",
      "..",
      ".."
    )
  }
);

} else if (step === 13) {
    score += (choice === "A") ? 0 : 0;
    showCommentaryWithLoading(
  choice === "A" 
    ? "."
    : ".",
  800,  // commentary delay (ms)
  800,  // loading dots delay (ms)
  
);

  } else if (step === 14) {
    // Valentine question
    document.getElementById("text").innerText =
      "Will you be my Valentine?";
    
    const buttons = document.querySelectorAll("button");
    buttons[0].innerText = "YES!";
    buttons[1].innerText = "No (100 points required)";
    
    buttons[0].onclick = yesEnding;
    buttons[1].onclick = noEnding;
    return;
  }

  updatePoints();
}

let noCount = 0;

function yesEnding() {
  document.getElementById("gameBox").innerHTML =
    "<h2>I love you, Seah. 😘</h2><p>Valentine status confirmed. May kiss ka sakin.</p>";
}

function noEnding() {
  noCount++;

  const messages = [
    "Hey..! I said 50 points required. Try again.",
    "System error: 'No' not recognized. (5 chances left)",
    "Nice try. Please choose the correct answer. (4 chances left)",
    "The developer rigged this game 😌 (3 chances left)",
    "You can't say no. (2 chances left)",
    "Okay okay. Last chance."
  ];

  const msg = messages[Math.min(noCount-1, messages.length-1)];

  document.getElementById("text").innerText =
    msg + "\n\nWill you be my Valentine?";

  const buttons = document.querySelectorAll("button");
  buttons[0].innerText = "YES!";
  buttons[1].innerText = "No";
}


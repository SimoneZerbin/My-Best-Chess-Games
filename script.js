import { Chess } from "./public/libs/chess.js";
import { games } from "./games.js";
import { translations, translatePage, currentLang, toggleLang } from "./translation.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Chess();
  const board = Chessboard("board", {
    position: "start",
    draggable: false
  });

  let moves = [];
  let moveIndex = 0;

  // DOM
  const yearFilter = document.getElementById("yearFilter");
  const colorFilter = document.getElementById("colorFilter");
  const gameSelect = document.getElementById("gameSelect");

  const gameTitle = document.getElementById("gameTitle");
  const gameMeta = document.getElementById("gameMeta");
  const gameDescription = document.getElementById("gameDescription");
  const moveInfo = document.getElementById("move-info");
  const footerText = document.getElementsByTagName("footer")[0];

  const langBtn = document.getElementById("langToggle");

  // ===== FILTRI =====
  function initYearFilter() {
    const years = [...new Set(games.map(g => g.year))].sort((a, b) => b - a);
    yearFilter.innerHTML = `<option value="all">All</option>`;
    years.forEach(y => {
      yearFilter.innerHTML += `<option value="${y}">${y}</option>`;
    });
  }

  function updateGameList() {
    const year = yearFilter.value;
    const color = colorFilter.value;

    const filtered = games.filter(g =>
      (year === "all" || g.year == year) &&
      (color === "all" || g.color === color)
    );

    gameSelect.innerHTML = "";
    filtered.forEach(g => {
      const opt = document.createElement("option");
      opt.value = g.id;
      opt.textContent = `${g.year} • ${g.title[currentLang]}`;
      gameSelect.appendChild(opt);
    });

    if (filtered.length) loadGame(filtered[0].id);
  }

  // ===== CARICA PARTITA =====
  function loadGame(id) {
    const g = games.find(x => x.id === id);
    if (!g) return;

    game.reset();
    game.loadPgn(g.pgn);
    moves = game.history();
    moveIndex = 0;
    game.reset();
    board.position(game.fen());
    board.orientation(g.color);

    gameTitle.textContent = g.title[currentLang];
    gameMeta.textContent =
      `${g.year} • ${translations[currentLang][g.color]} • ${g.result}`;
    gameDescription.textContent = g.description[currentLang];
    
    updateMoveInfo();
  }

  // ===== CONTROLLI MOSSE =====
  function nextMove() {
    if (moveIndex < moves.length) {
      game.move(moves[moveIndex++]);
      board.position(game.fen());
      updateMoveInfo();
    }
  }

  function prevMove() {
    if (moveIndex > 0) {
      game.undo();
      moveIndex--;
      board.position(game.fen());
      updateMoveInfo();
    }
  }

  function startGame() {
    game.reset();
    moveIndex = 0;
    board.position(game.fen());
    updateMoveInfo();
  }

  function endGame() {
    while (moveIndex < moves.length) {
      game.move(moves[moveIndex++]);
    }
    board.position(game.fen());
    updateMoveInfo();
  }

  // ===== INFO MOSSA =====
  function updateMoveInfo() {
    const moveNum = Math.floor(moveIndex / 2) + 1;
    const color = moveIndex % 2 === 0 ? "White" : "Black";

    moveInfo.textContent =
      `${translations[currentLang].move} ${moveNum} (${color === "White" ? translations[currentLang].white : translations[currentLang].black})`;
  }

  // ===== BOTTONE LINGUA =====
  function updateLangButton() {
    if (!langBtn) return;

    const itFlag = langBtn.querySelector(".it");
    const enFlag = langBtn.querySelector(".en");
    const spans = langBtn.querySelectorAll(".lang-text");

    if (!itFlag || !enFlag || spans.length === 0) return;

    const isIt = currentLang === "it";

    // reset class
    itFlag.classList.remove("active");
    enFlag.classList.remove("active");
    spans.forEach(span => span.classList.remove("active"));

    // applica classe solo a lingua attiva
    if (isIt) {
      itFlag.classList.add("active");
      spans.forEach(span => { if(span.textContent === "IT") span.classList.add("active"); });
    } else {
      enFlag.classList.add("active");
      spans.forEach(span => { if(span.textContent === "EN") span.classList.add("active"); });
    }
  }


  if (langBtn) {
    langBtn.addEventListener("click", () => {
      // cambia lingua
      const lang = toggleLang();
      translatePage(lang);
      updateLangButton();
      updateGameList();
    });
  }

  // ===== EVENTI FILTRI =====
  yearFilter.addEventListener("change", updateGameList);
  colorFilter.addEventListener("change", updateGameList);
  gameSelect.addEventListener("change", e => loadGame(e.target.value));

  document.getElementById("nextBtn").onclick = nextMove;
  document.getElementById("prevBtn").onclick = prevMove;
  document.getElementById("startBtn").onclick = startGame;
  document.getElementById("endBtn").onclick = endGame;

  // ===== INIT =====
  initYearFilter();
  translatePage(currentLang);
  updateLangButton();
  updateGameList();
});

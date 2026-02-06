export let currentLang = "it";

export const translations = {
  it: {
    title: "♟️ Le mie migliori partite di scacchi ♟️",
    subtitle: "Ciao a tutti, mi chiamo Simone, ho 22 anni <br> e sono un candidato maestro di scacchi con un elo di 2050.<br> Ho creato questa pagine per condividere le mie partite migliori,<br> giocate in tornei ufficiali oppure online.<br>Spero che le mie partite vi piacciano e vi facciano scoprire nuove idee.<br> Buona visione!",
    year: "Anno",
    color: "Colore",
    game: "Partita",
    move: "Mossa",
    start: "⏮ Inizio",
    prev: "◀ Indietro",
    next: "Avanti ▶",
    end: "Fine ⏭",
    both: "Entrambi",
    white: "Bianco",
    black: "Nero",
    footer: "Se volete sfidarmi, potete mandarmi un invito all'account chess.com <strong>Im_ZerBiN</strong>"
  },
  en: {
    title: "♟️ My best chess games ♟️",
    subtitle: "Hi everyone, my name is Simone, I'm 22 years old <br> and I'm a chess candidate master with an Elo of 2050. <br> I created this page to share my best games, <br> played in official tournaments or online. <br> I hope you enjoy my games and that they inspire you to discover new ideas. <br> Enjoy!",
    year: "Year",
    color: "Color",
    game: "Game",
    move: "Move",
    start: "⏮ Start",
    prev: "◀ Back",
    next: "Next ▶",
    end: "End ⏭",
    both: "Both",
    white: "White",
    black: "Black",
    footer: "If you want to challenge me to a chess game, you can send me an invitation to the chess.com account <strong>Im_ZerBiN</strong>"
  }
};

export function translatePage(lang) {
  currentLang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = translations[lang][key];
  });

  document.getElementById("colorFilter").innerHTML = `
    <option value="all">${translations[lang].both}</option>
    <option value="white">${translations[lang].white}</option>
    <option value="black">${translations[lang].black}</option>
  `;

}

export function toggleLang() {
  currentLang = currentLang === "it" ? "en" : "it";
  return currentLang;
}

const WEBHOOK_URL = "https://hook.eu2.make.com/g8lpeddzq9hhk7brsoja1dvd9pha6aqq";

// ---------- Shared ----------
function track(payload) {
  return fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(() => {});
}

// ---------- HOME (index) ----------
const grid = document.getElementById('grid');
const sendBtn = document.getElementById('sendBtn');

const ITEMS = [
  "Elfen Haven","Moon Sanctuary","Castle Hall","Lava Pits","Royal Harbor","Crystal Cave",
  "Sirens Realm","Golem Fortress","Blood Arena","Rot Sewers","Arcane Library","Runic Ruin",
  "Drow Undercity","Ironhold Siege","Coastal Raid","Bone Desert","Void Rift","Steampunk City",
  "Mystic Maze","Grand Bazaar","Sunken Temple","Sky City","Storm Peaks","Blight Swamp",
  "Fairy Forest","Goblinville","Night Citadel","Beast Land","Haunted Forest","Gearwork Lab",
  "Skull Island","Wizard Tower","Necro Graveyard","Deep Cavern","Dwarven Forge","Tavern"
];

const CORRECT_SET = ["Elfen Haven","Golem Fortress","Bone Desert","Mystic Maze","Beast Land","Tavern"];
const CORRECT_URL = "correct.html";
const WRONG_URL = "wrong.html";

function renderGrid() {
  const frag = document.createDocumentFragment();

  ITEMS.forEach((t, i) => {
    const label = document.createElement('label');
    label.className = 'cell';
    label.innerHTML = `<input type="checkbox" value="${t}"><span><strong>${i + 1}.</strong> ${t}</span>`;
    frag.appendChild(label);
  });

  grid.appendChild(frag);
}

function selectedValues() {
  return [...grid.querySelectorAll('input[type="checkbox"]:checked')].map(x => x.value);
}

function isCorrectSelection(selected) {
  if (selected.length !== CORRECT_SET.length) return false;
  const set = new Set(selected);
  return CORRECT_SET.every(x => set.has(x));
}

if (grid && sendBtn) {
  renderGrid();

  sendBtn.addEventListener('click', () => {
    const selected = selectedValues();
    const isCorrect = isCorrectSelection(selected);
    const target = isCorrect ? CORRECT_URL : WRONG_URL;

    track({
      event: "send_click",
      result: isCorrect ? "CORRECT" : "WRONG",
      selectedText: selected.join(", "),
      timestamp: new Date().toISOString(),
      page: location.href
    });

    setTimeout(() => { location.href = target; }, 150);
  });
}

// ---------- REVIEW button (correct/wrong) ----------
const reviewBtn = document.getElementById('reviewBtn');

if (reviewBtn) {
  reviewBtn.addEventListener('click', () => {
    const reviewLink =
      (typeof window.REVIEW_LINK === "string" && window.REVIEW_LINK.trim()) ? window.REVIEW_LINK.trim() : null;

    track({
      event: "review_click",
      timestamp: new Date().toISOString(),
      page: location.href
    });

    if (reviewLink) {
      setTimeout(() => { location.href = reviewLink; }, 150);
    }
  });
}

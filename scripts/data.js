// ─── Default seed data ───────────────────────────────────────────────────────
const DEFAULT_PLANTS = [
  {
    id: "1", name: "Sunny", species: "Succulent (Echeveria)",
    image: "https://images.unsplash.com/photo-1649531373919-a52c80fba1e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    wateringFrequency: 14, lastWatered: "2026-04-10T00:00:00.000Z",
    sunlight: "full", location: "Living room windowsill",
    notes: "Loves bright light. Don't overwater!"
  },
  {
    id: "2", name: "Cherry", species: "Tomato Plant",
    image: "https://images.unsplash.com/photo-1609668102365-3f0d13db6188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    wateringFrequency: 2, lastWatered: "2026-04-16T00:00:00.000Z",
    sunlight: "full", location: "Backyard garden",
    notes: "Starting to flower! Need to add stakes soon."
  },
  {
    id: "3", name: "Basil", species: "Sweet Basil",
    image: "https://images.unsplash.com/photo-1632431455870-65dd9cf75e0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    wateringFrequency: 1, lastWatered: "2026-04-17T00:00:00.000Z",
    sunlight: "partial", location: "Kitchen counter",
    notes: "Perfect for cooking! Pinch off flowers to encourage leaf growth."
  },
  {
    id: "4", name: "Monty", species: "Monstera Deliciosa",
    image: "https://images.unsplash.com/photo-1634803534299-56378af8fa70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    wateringFrequency: 7, lastWatered: "2026-04-12T00:00:00.000Z",
    sunlight: "partial", location: "Corner of bedroom",
    notes: "Growing new leaves! Might need a bigger pot soon."
  },
  {
    id: "5", name: "Lavender", species: "English Lavender",
    image: "https://images.unsplash.com/photo-1774176546101-0ff6a783eee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    wateringFrequency: 3, lastWatered: "2026-04-15T00:00:00.000Z",
    sunlight: "full", location: "Front porch",
    notes: "Smells amazing! Attracts bees and butterflies."
  },
  {
    id: "6", name: "Snake", species: "Snake Plant",
    image: "https://images.unsplash.com/photo-1668426231244-1827c29ef8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    wateringFrequency: 21, lastWatered: "2026-04-05T00:00:00.000Z",
    sunlight: "shade", location: "Bathroom",
    notes: "Super low maintenance. Great air purifier!"
  }
];

const DEFAULT_TASKS = [
  { id: "1", plantId: "2", plantName: "Cherry", type: "water",     dueDate: "2026-04-18T00:00:00.000Z", completed: false },
  { id: "2", plantId: "3", plantName: "Basil",  type: "water",     dueDate: "2026-04-18T00:00:00.000Z", completed: false },
  { id: "3", plantId: "4", plantName: "Monty",  type: "water",     dueDate: "2026-04-19T00:00:00.000Z", completed: false },
  { id: "4", plantId: "2", plantName: "Cherry", type: "fertilize", dueDate: "2026-04-20T00:00:00.000Z", completed: false }
];

const DEFAULT_JOURNAL = [
  { id: "1", date: "2026-04-15T00:00:00.000Z", plantId: "2", plantName: "Cherry",
    title: "First flowers appearing!", content: "So excited to see the first yellow flowers on my tomato plant. Can't wait for the tomatoes to start forming." },
  { id: "2", date: "2026-04-10T00:00:00.000Z", plantId: "4", plantName: "Monty",
    title: "New leaf unfurling", content: "The new Monstera leaf is finally opening up. It's got beautiful fenestrations (holes) forming. This one is going to be huge!" },
  { id: "3", date: "2026-04-05T00:00:00.000Z",
    title: "Garden reorganization", content: "Spent the afternoon reorganizing my plant collection. Moved some plants to better light conditions and cleaned all the leaves." }
];

// ─── Storage helpers ──────────────────────────────────────────────────────────
function loadData(key, defaults) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaults;
  } catch { return defaults; }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ─── Plants ───────────────────────────────────────────────────────────────────
function getPlants() { return loadData('gs_plants', DEFAULT_PLANTS); }
function savePlants(p) { saveData('gs_plants', p); }

function addPlant(plant) {
  const plants = getPlants();
  plants.push(plant);
  savePlants(plants);
}

function updatePlant(id, updates) {
  const plants = getPlants().map(p => p.id === id ? { ...p, ...updates } : p);
  savePlants(plants);
}

function deletePlant(id) {
  savePlants(getPlants().filter(p => p.id !== id));
  saveTasks(getTasks().filter(t => t.plantId !== id));
}

// ─── Tasks ────────────────────────────────────────────────────────────────────
function getTasks() { return loadData('gs_tasks', DEFAULT_TASKS); }
function saveTasks(t) { saveData('gs_tasks', t); }

function updateTask(id, updates) {
  const tasks = getTasks().map(t => t.id === id ? { ...t, ...updates } : t);
  saveTasks(tasks);
}

// ─── Journal ──────────────────────────────────────────────────────────────────
function getJournalEntries() { return loadData('gs_journal', DEFAULT_JOURNAL); }

function addJournalEntry(entry) {
  const entries = getJournalEntries();
  entries.unshift(entry);
  saveData('gs_journal', entries);
}

// ─── Toast notification ───────────────────────────────────────────────────────
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast-show'));
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

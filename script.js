const dayGrid = document.querySelector("#dayGrid");
const daysLeft = document.querySelector("#daysLeft");
const completedDays = document.querySelector("#completedDays");
const currentWeek = document.querySelector("#currentWeek");
const phaseLabel = document.querySelector("#phaseLabel");
const dayTitle = document.querySelector("#dayTitle");
const dayBadge = document.querySelector("#dayBadge");
const dayDescription = document.querySelector("#dayDescription");
const foodList = document.querySelector("#foodList");
const completeToggle = document.querySelector("#completeToggle");
const dayNotes = document.querySelector("#dayNotes");
const resetButton = document.querySelector("#resetButton");
const languageButtons = document.querySelectorAll(".language-switch button");
const translatableNodes = document.querySelectorAll("[data-i18n]");

const storageKey = "switchOnDietTracker.v2";
const oldStorageKey = "switchOnDietTracker.v1";
const totalDays = 28;

const translations = {
  en: {
    lang: "en",
    title: "Switch-On Diet Tracker",
    heroEyebrow: "28-day Korean Switch-On inspired tracker",
    heroTitle: "Plan the day. Log the meal. Keep the streak visible.",
    heroCopy:
      "A practical four-week tracker for shake days, low-carb high-protein meals, and the scheduled fast days described in public reviews of the diet.",
    daysLeftLabel: "days left",
    loggedLabel: "logged",
    selectedPhaseLabel: "selected phase",
    dailyLogEyebrow: "Daily log",
    chooseDayTitle: "Choose a day",
    resetLabel: "Reset completed days",
    loggedToggle: "Logged",
    permittedEyebrow: "Permitted today",
    foodListTitle: "Food list",
    notesLabel: "Day notes",
    notesPlaceholder: "How did meals, hunger, energy, and prep go today?",
    safetyNote:
      "This is a planning website, not medical advice. The diet includes restrictive shake days and 24-hour fasts; check with a qualified clinician before starting, especially with health conditions, pregnancy, eating-disorder history, or medication use.",
    week: "Week",
    day: "Day",
    ariaDay: "Day {day}, {badge}",
    foods: {
      proteinShakes: "Protein shakes",
      water: "Water",
      unsweetenedTea: "Unsweetened tea",
      blackCoffee: "Black coffee",
      electrolytes: "Electrolytes without sugar",
      eggs: "Eggs",
      tofu: "Tofu",
      fishSeafood: "Fish or seafood",
      chickenBreast: "Chicken breast",
      leafyGreens: "Leafy greens",
      broccoli: "Broccoli",
      cucumber: "Cucumber",
      mushrooms: "Mushrooms",
      cabbageKimchi: "Cabbage or kimchi without sugar",
      seaweed: "Seaweed",
      leanChicken: "Lean chicken",
      leanBeef: "Lean beef in modest portions",
      greekYogurt: "Plain Greek yogurt",
      seaweedSoup: "Seaweed soup",
      avocado: "Avocado",
      smallOil: "Olive or sesame oil in small amounts",
      broth: "Broth, if needed",
    },
    plan: {
      shakeReset: {
        badge: "Shake reset",
        description:
          "The opening reset is built around protein shakes and calorie-free drinks. Keep the day simple and focus on hydration.",
      },
      shakeMeal: {
        badge: "Shakes plus one meal",
        description:
          "Keep protein shakes as the anchor and add a low-carb, high-protein meal with non-starchy vegetables.",
      },
      fast: {
        badge: "24-hour fast",
        description:
          "This is one of the plan's scheduled 24-hour fasting days. Prioritize fluids and stop if you feel unwell.",
      },
      lowCarbDay: {
        badge: "Low-carb protein day",
        description:
          "Build meals around protein, vegetables, and small amounts of fat while skipping sugar, alcohol, refined grains, and starchy sides.",
      },
      lowCarbRhythm: {
        badge: "Low-carb protein rhythm",
        description:
          "Build meals around protein, vegetables, and small amounts of fat while skipping sugar, alcohol, refined grains, and starchy sides.",
      },
    },
  },
  zh: {
    lang: "zh-Hans",
    title: "Switch-On 饮食追踪器",
    heroEyebrow: "28 天韩式 Switch-On 饮食追踪器",
    heroTitle: "规划每天。记录饮食。看见坚持。",
    heroCopy:
      "一个实用的四周追踪工具，用来安排蛋白奶昔日、低碳高蛋白餐，以及公开饮食介绍中提到的定期断食日。",
    daysLeftLabel: "剩余天数",
    loggedLabel: "已记录",
    selectedPhaseLabel: "当前阶段",
    dailyLogEyebrow: "每日记录",
    chooseDayTitle: "选择一天",
    resetLabel: "重置已完成天数",
    loggedToggle: "已记录",
    permittedEyebrow: "今天可吃",
    foodListTitle: "食物清单",
    notesLabel: "当天备注",
    notesPlaceholder: "今天的餐食、饥饿感、精力和备餐情况如何？",
    safetyNote:
      "这是一个规划网站，不是医疗建议。此饮食包含限制性的蛋白奶昔日和 24 小时断食；开始前请咨询合格的医疗专业人士，尤其是在有健康状况、怀孕、饮食失调史或正在用药的情况下。",
    week: "第",
    weekSuffix: "周",
    day: "第",
    daySuffix: "天",
    ariaDay: "第 {day} 天，{badge}",
    foods: {
      proteinShakes: "蛋白奶昔",
      water: "水",
      unsweetenedTea: "无糖茶",
      blackCoffee: "黑咖啡",
      electrolytes: "无糖电解质饮品",
      eggs: "鸡蛋",
      tofu: "豆腐",
      fishSeafood: "鱼类或海鲜",
      chickenBreast: "鸡胸肉",
      leafyGreens: "绿叶蔬菜",
      broccoli: "西兰花",
      cucumber: "黄瓜",
      mushrooms: "蘑菇",
      cabbageKimchi: "卷心菜或无糖泡菜",
      seaweed: "海苔或海带",
      leanChicken: "瘦鸡肉",
      leanBeef: "适量瘦牛肉",
      greekYogurt: "原味希腊酸奶",
      seaweedSoup: "海带汤",
      avocado: "牛油果",
      smallOil: "少量橄榄油或芝麻油",
      broth: "需要时可喝清汤",
    },
    plan: {
      shakeReset: {
        badge: "蛋白奶昔重启日",
        description:
          "开头的重启阶段以蛋白奶昔和无热量饮品为主。让饮食保持简单，并注意补水。",
      },
      shakeMeal: {
        badge: "奶昔加一餐",
        description:
          "以蛋白奶昔为基础，再加入一餐低碳、高蛋白、搭配非淀粉类蔬菜的正餐。",
      },
      fast: {
        badge: "24 小时断食",
        description:
          "这是计划中的 24 小时断食日之一。优先补充液体；如果感觉不适，请停止。",
      },
      lowCarbDay: {
        badge: "低碳高蛋白日",
        description:
          "以蛋白质、蔬菜和少量脂肪来搭配餐食，同时避开糖、酒精、精制谷物和高淀粉配菜。",
      },
      lowCarbRhythm: {
        badge: "低碳高蛋白节奏",
        description:
          "以蛋白质、蔬菜和少量脂肪来搭配餐食，同时避开糖、酒精、精制谷物和高淀粉配菜。",
      },
    },
  },
};

const foodSets = {
  shakeOnly: ["proteinShakes", "water", "unsweetenedTea", "blackCoffee", "electrolytes"],
  shakePlusLowCarb: [
    "proteinShakes",
    "eggs",
    "tofu",
    "fishSeafood",
    "chickenBreast",
    "leafyGreens",
    "broccoli",
    "cucumber",
    "mushrooms",
    "cabbageKimchi",
    "seaweed",
    "unsweetenedTea",
  ],
  lowCarbMeals: [
    "eggs",
    "tofu",
    "fishSeafood",
    "leanChicken",
    "leanBeef",
    "greekYogurt",
    "leafyGreens",
    "broccoli",
    "cucumber",
    "mushrooms",
    "cabbageKimchi",
    "seaweedSoup",
    "avocado",
    "smallOil",
  ],
  fastDay: ["water", "unsweetenedTea", "blackCoffee", "electrolytes", "broth"],
};

const plan = Array.from({ length: totalDays }, (_, index) => {
  const day = index + 1;
  const week = Math.ceil(day / 7);
  const fastDays = [11, 17, 20, 23, 25, 27];

  if (day <= 3) {
    return { day, week, badgeKey: "shakeReset", type: "shake", foods: foodSets.shakeOnly };
  }

  if (day <= 7) {
    return { day, week, badgeKey: "shakeMeal", type: "shake", foods: foodSets.shakePlusLowCarb };
  }

  if (fastDays.includes(day)) {
    return { day, week, badgeKey: "fast", type: "fast", foods: foodSets.fastDay };
  }

  return {
    day,
    week,
    badgeKey: week === 2 ? "lowCarbDay" : "lowCarbRhythm",
    type: "meal",
    foods: foodSets.lowCarbMeals,
  };
});

let state = loadState();
let selectedDay = state.selectedDay || 1;
let currentLanguage = state.language || "en";

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved) return normalizeState(saved);

    const oldSaved = JSON.parse(localStorage.getItem(oldStorageKey));
    if (oldSaved) return normalizeState(oldSaved);
  } catch {
    return { completed: {}, notes: {}, language: "en" };
  }

  return { completed: {}, notes: {}, language: "en" };
}

function normalizeState(saved) {
  return {
    completed: saved.completed || {},
    notes: saved.notes || {},
    selectedDay: saved.selectedDay || 1,
    language: saved.language === "zh" ? "zh" : "en",
  };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify({ ...state, selectedDay, language: currentLanguage }));
}

function t() {
  return translations[currentLanguage];
}

function weekLabel(week) {
  const copy = t();
  return currentLanguage === "zh" ? `${copy.week}${week}${copy.weekSuffix}` : `${copy.week} ${week}`;
}

function dayLabel(day) {
  const copy = t();
  return currentLanguage === "zh" ? `${copy.day}${day}${copy.daySuffix}` : `${copy.day} ${day}`;
}

function applyStaticTranslations() {
  const copy = t();

  document.documentElement.lang = copy.lang;
  document.title = copy.title;
  dayNotes.placeholder = copy.notesPlaceholder;
  resetButton.setAttribute("aria-label", copy.resetLabel);
  resetButton.title = copy.resetLabel;

  translatableNodes.forEach((node) => {
    node.textContent = copy[node.dataset.i18n];
  });

  languageButtons.forEach((button) => {
    const isSelected = button.dataset.lang === currentLanguage;
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function renderGrid() {
  dayGrid.innerHTML = "";

  plan.forEach((entry) => {
    const planCopy = t().plan[entry.badgeKey];
    const button = document.createElement("button");
    button.className = "day-button";
    button.type = "button";
    button.textContent = entry.day;
    button.setAttribute(
      "aria-label",
      t().ariaDay.replace("{day}", entry.day).replace("{badge}", planCopy.badge),
    );

    if (entry.day === selectedDay) button.classList.add("is-selected");
    if (state.completed[entry.day]) button.classList.add("is-complete");
    if (entry.type === "fast") button.classList.add("is-fast");

    button.addEventListener("click", () => {
      selectedDay = entry.day;
      saveState();
      render();
    });

    dayGrid.append(button);
  });
}

function renderDetail() {
  const entry = plan[selectedDay - 1];
  const planCopy = t().plan[entry.badgeKey];

  phaseLabel.textContent = weekLabel(entry.week);
  currentWeek.textContent = weekLabel(entry.week);
  dayTitle.textContent = dayLabel(entry.day);
  dayBadge.textContent = planCopy.badge;
  dayDescription.textContent = planCopy.description;
  completeToggle.checked = Boolean(state.completed[entry.day]);
  dayNotes.value = state.notes[entry.day] || "";

  foodList.innerHTML = "";
  entry.foods.forEach((foodKey) => {
    const chip = document.createElement("div");
    chip.className = "food-chip";
    chip.textContent = t().foods[foodKey];
    foodList.append(chip);
  });
}

function renderSummary() {
  const completedCount = Object.values(state.completed).filter(Boolean).length;
  completedDays.textContent = completedCount;
  daysLeft.textContent = Math.max(totalDays - completedCount, 0);
}

function render() {
  applyStaticTranslations();
  renderSummary();
  renderGrid();
  renderDetail();
}

completeToggle.addEventListener("change", () => {
  state.completed[selectedDay] = completeToggle.checked;
  saveState();
  render();
});

dayNotes.addEventListener("input", () => {
  state.notes[selectedDay] = dayNotes.value;
  saveState();
});

resetButton.addEventListener("click", () => {
  state = { completed: {}, notes: state.notes || {}, language: currentLanguage };
  saveState();
  render();
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentLanguage = button.dataset.lang;
    state.language = currentLanguage;
    saveState();
    render();
  });
});

render();

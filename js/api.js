document.addEventListener('DOMContentLoaded', () => {

  const motivationBtn  = document.getElementById('motivationBtn');
  const motivationBox  = document.getElementById('motivationBox');
  const motivationText = document.getElementById('motivationText');

  if (!motivationBtn) return;

  const motivations = [
    "Push yourself, no one else will!",
    "Fitness is not a destination, it's a lifestyle.",
    "Small steps every day!",
    "No pain, no gain!",
    "You are stronger than you think.",
    "Progress, not perfection.",
    "Every small step forward is still a step forward.",
    "Your mental health is a priority, not a luxury.",
    "Rest is productive. Breathe.",
    "You have survived every difficult day so far.",
    "Be kind to yourself today.",
    "One day at a time.",
    "Your feelings are valid.",
    "Growth happens outside your comfort zone.",
    "You are enough, exactly as you are.",
    "Difficult roads often lead to beautiful destinations.",
    "Take care of your body — it's the only place you live.",
    "Healing is not linear. Keep going.",
    "You deserve peace and happiness."
  ];

  let lastIndex = -1;

  motivationBtn.addEventListener('click', () => {
    let index;
    do { index = Math.floor(Math.random() * motivations.length); }
    while (index === lastIndex);
    lastIndex = index;

    motivationText.textContent  = '\u201C' + motivations[index] + '\u201D';
    motivationBox.style.display = 'block';
    motivationBtn.textContent   = '\u2728 Get Another Motivation';
  });

});
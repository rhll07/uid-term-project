/* api.js — Daily Affirmation (local, no API needed)
   Used on: mental.html
   Works locally, on GitHub Pages, everywhere.
*/

document.addEventListener('DOMContentLoaded', () => {

  const affirmationBtn  = document.getElementById('affirmationBtn');
  const affirmationBox  = document.getElementById('affirmationBox');
  const affirmationText = document.getElementById('affirmationText');

  if (!affirmationBtn) return;

  const affirmations = [
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

  affirmationBtn.addEventListener('click', () => {
    let index;
    do { index = Math.floor(Math.random() * affirmations.length); }
    while (index === lastIndex);
    lastIndex = index;

    affirmationText.textContent  = '\u201C' + affirmations[index] + '\u201D';
    affirmationBox.style.display = 'block';
    affirmationBtn.textContent   = '\u2728 Get Another Affirmation';
  });

});
let balance = 1000;
let multiplier = 1;
let gameInterval;
let isFlying = false;

const balanceEl = document.getElementById("balance");
const betEl = document.getElementById("bet");
const multiplierEl = document.getElementById("multiplier");
const planeEl = document.getElementById("plane");
const startBtn = document.getElementById("start-btn");
const cashoutBtn = document.getElementById("cashout-btn");
const messageEl = document.getElementById("message");

// Обновление баланса на экране
function updateBalance() {
  balanceEl.textContent = balance;
}

// Начать игру
startBtn.addEventListener("click", () => {
  const bet = parseInt(betEl.value);

  if (isFlying) {
    messageEl.textContent = "Игра уже идет!";
    return;
  }

  if (bet > balance || bet <= 0) {
    messageEl.textContent = "Недостаточно средств для ставки!";
    return;
  }

  // Сбрасываем параметры игры
  multiplier = 1;
  multiplierEl.textContent = `x${multiplier.toFixed(2)}`;
  planeEl.style.transform = "translateX(0)";

  isFlying = true;
  balance -= bet;
  updateBalance();
  messageEl.textContent = "";

  // Активация кнопки "Забрать"
  cashoutBtn.disabled = false;

  // Начинаем полет самолета
  gameInterval = setInterval(() => {
    multiplier += Math.random() * 0.1;
    multiplierEl.textContent = `x${multiplier.toFixed(2)}`;
    planeEl.style.transform = `translateX(${multiplier * 50}px)`;

    // Рандомное завершение полета
    if (Math.random() < 0.01 * multiplier) {
      endGame(false);
    }
  }, 100);
});

// Забрать выигрыш
cashoutBtn.addEventListener("click", () => {
  if (!isFlying) return;

  const bet = parseInt(betEl.value);
  const winnings = bet * multiplier;

  balance += winnings;
  updateBalance();
  messageEl.textContent = `Вы выиграли ${winnings.toFixed(2)} тенге!`;
  endGame(true);
});

// Завершение игры
function endGame(success) {
  clearInterval(gameInterval);
  isFlying = false;
  cashoutBtn.disabled = true;

  if (!success) {
    messageEl.textContent = "Самолет улетел! Вы проиграли!";
  }
}
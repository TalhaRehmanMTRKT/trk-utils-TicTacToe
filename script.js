
let board = Array(9).fill("");
let currentPlayer = "✓";
let gameOver = false;

async function loadPyodideAndLogic() {
    window.pyodide = await loadPyodide();
    await pyodide.loadPackage(["micropip"]);
    await pyodide.runPythonAsync(await (await fetch("game_logic.py")).text());
}

loadPyodideAndLogic().then(() => {
    initGame();
});

function initGame() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    board = Array(9).fill("");
    gameOver = false;
    currentPlayer = "✓";
    document.getElementById("status").innerText = "Player 1’s turn (✓)";
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        cell.addEventListener("click", () => makeMove(i));
        grid.appendChild(cell);
    }
}

function makeMove(index) {
    if (board[index] !== "" || gameOver) return;

    board[index] = currentPlayer;
    document.querySelectorAll(".cell")[index].innerText = currentPlayer;

    let pyResult = pyodide.globals.get("make_move")(board, currentPlayer, index);
    let updated = pyResult.toJs({ dict_converter: Object });

    board = updated.board;
    gameOver = updated.status !== "ongoing";

    if (updated.status === "win") {
        document.getElementById("status").innerText = `${updated.message}`;
        disableBoard();
    } else if (updated.status === "draw") {
        document.getElementById("status").innerText = "It's a draw!";
        disableBoard();
    } else {
        currentPlayer = currentPlayer === "✓" ? "✗" : "✓";
        document.getElementById("status").innerText = `Player ${currentPlayer === "✓" ? "1" : "2"}’s turn (${currentPlayer})`;
    }
}

function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => cell.classList.add("disabled"));
}

function resetGame() {
    initGame();
}

function showInfo() {
    alert("Developed by Talha Rehman");
}

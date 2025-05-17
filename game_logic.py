def check_winner(board):
    win_combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for combo in win_combinations:
        a, b, c = combo
        if board[a] and board[a] == board[b] == board[c]:
            return True, f"Player {1 if board[a] == '✓' else 2} wins!"
    return False, ""

def is_draw(board):
    return all(cell != "" for cell in board)

def reset_board():
    return [""] * 9

def make_move(board, player, position):
    if board[position] != "":
        return {"board": board, "status": "invalid", "message": "Invalid move"}
    board[position] = player
    won, message = check_winner(board)
    if won:
        return {"board": board, "status": "win", "message": message}
    elif is_draw(board):
        return {"board": board, "status": "draw", "message": ""}
    return {"board": board, "status": "ongoing", "message": ""}

def computer_move(board):
    # TODO: Implement computer logic (coming soon)
    pass

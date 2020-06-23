
# display grid
def display_grid(grid):
    for row in grid:
        print(row)

def get_input(grid):
    while(True):
        try:
            row = int(input("Enter row number: "))
            grid[row]
            col = int(input("Enter col number: "))
            grid[row][col]
            # return if space is empty
            if grid[row][col] == '-':
                return row, col
            print('Space already taken')
        except:
            print("Please enter a valid number")

def check_pos(row, col):
    if (row < 0 or row > 2) or (col < 0 or col > 2):
        return False
    return True

def get_count(grid, new_row, new_col, symbol, case):
    count = 0
    while(check_pos(new_row, new_col)):
        if grid[new_row][new_col] == symbol:
            count += 1
        if case == 'down': new_row += 1
        elif case == 'up': new_row -= 1
        elif case == 'left': new_col -= 1
        elif case == 'right': new_col += 1
        elif case == 'diag1-left':
            new_row -= 1
            new_col -= 1
        elif case == 'diag1-right':
            new_row += 1
            new_col += 1
        elif case == 'diag2-left':
            new_row += 1
            new_col -= 1
        elif case == 'diag2-right':
            new_row -= 1
            new_col += 1
        
    return count

def check(grid, symbol, row, col):
    # on curr symbol, so count = 1
    count = 1

    # check vertically
    # going down
    count += get_count(grid, row+1, col, symbol, 'down')
    if count == 3: return True
    # going up 
    count += get_count(grid, row-1, col, symbol, 'up')
    if count == 3: return True
    print('vertically', count)
    count = 1

    # check horizontally
    # going left
    count += get_count(grid, row, col-1, symbol, 'left')
    if count == 3: return True
    # going right
    count += get_count(grid, row, col+1, symbol, 'right')
    if count == 3: return True
    print('horizontally', count)
    count = 1

    # check slope down diagonal 
    # going left up diagonal
    count += get_count(grid, row-1, col-1, symbol, 'diag1-left')
    if count == 3: return True
    # going right down diagonal
    count += get_count(grid, row+1, col+1, symbol, 'diag1-right')
    if count == 3: return True
    print('diag1', count)
    count = 1

    # check slope up diagonal 
    # going left down diagonal
    count += get_count(grid, row+1, col-1, symbol, 'diag2-left')
    if count == 3: return True
    # going right down diagonal
    count += get_count(grid, row-1, col+1, symbol, 'diag2-right')
    if count == 3: return True
    print('diag2', count)

    return False

def start(grid):
    player = 'player1'
    while(True):
        display_grid(grid)
        print("Your turn,", player)
        row, col = get_input(grid)
        if player == 'player1':
            symbol = 'x'
        else: 
            symbol = 'o'
        grid[row][col] = symbol
        # check to see if there's a winner 
        if check(grid, symbol, row, col):
            print(player, 'wins')
            display_grid(grid)
            break
        # change players 
        if player == 'player1':
            player = 'player2'
        else:
            player = 'player1'

grid = []

for x in range(3):
    row = []
    for y in range(3):
        row.append('-')
    grid.append(row)

start(grid)
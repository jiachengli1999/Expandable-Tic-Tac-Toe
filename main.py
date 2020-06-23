def make_grid():
    n = int(input('Enter grid size: '))
    while n <= 0:
        n = int(input('Enter grid size: '))
    grid = []
    for x in range(n):
        row = []
        for y in range(n):
            row.append('-')
        grid.append(row)
    return grid, n

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

def check_pos(row, col, size):
    if (row < 0 or row > size-1) or (col < 0 or col > size-1):
        return False
    return True

def get_count(grid, new_row, new_col, symbol, case, size):
    count = 0
    while(check_pos(new_row, new_col, size)):
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

def check(grid, symbol, row, col, size):
    # on curr symbol, so count = 1
    count = 1

    # check vertically
    # going down
    count += get_count(grid, row+1, col, symbol, 'down', size)
    if count == size: return True
    print('vertically', count)
    # going up 
    count += get_count(grid, row-1, col, symbol, 'up', size)
    if count == size: return True
    print('vertically', count)
    count = 1

    # check horizontally
    # going left
    count += get_count(grid, row, col-1, symbol, 'left', size)
    if count == size: return True
    print('horizontally', count)
    # going right
    count += get_count(grid, row, col+1, symbol, 'right', size)
    if count == size: return True
    print('horizontally', count)
    count = 1

    # check slope down diagonal 
    # going left up diagonal
    count += get_count(grid, row-1, col-1, symbol, 'diag1-left', size)
    if count == size: return True
    print('diag1', count)
    # going right down diagonal
    count += get_count(grid, row+1, col+1, symbol, 'diag1-right', size)
    if count == size: return True
    print('diag1', count)
    count = 1

    # check slope up diagonal 
    # going left down diagonal
    count += get_count(grid, row+1, col-1, symbol, 'diag2-left', size)
    if count == size: return True
    print('diag2', count)
    # going right up diagonal
    count += get_count(grid, row-1, col+1, symbol, 'diag2-right', size)
    if count == size: return True
    print('diag2', count)

    return False

def start():
    player = 'player1'
    grid, size = make_grid()
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
        if check(grid, symbol, row, col, size):
            print(player, 'wins')
            display_grid(grid)
            break
        # change players 
        if player == 'player1':
            player = 'player2'
        else:
            player = 'player1'

start()
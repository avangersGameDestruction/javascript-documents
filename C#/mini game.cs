private static final int dimension = 3;
private static final int[][] board = new int[dimension][dimension];
private static final int xwins = dimension * 1;
private static final int owins = dimension * -1;

public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int count = 0;
    boolean keepPlaying = true;
    boolean xsTurn = true;
    while (keepPlaying) {
        xsTurn = (count % 2 == 0);
        System.out.print("Enter i-j in the format:");
        if (xsTurn) {
            System.out.println(" X plays: ");
        } else {
            System.out.println(" O plays: ");
        }
        String result = null;
        while (result == null) {
            result = parseInput(scanner, xsTurn);
        }
        String[] xy = result.split(",");
        int x = Integer.parseInt(xy[0]);
        int y = Integer.parseInt(xy[1]);
        keepPlaying = makeMove(xsTurn, x, y);
        count++;
    }
    if (xsTurn) {
        System.out.print("X");
    } else {
        System.out.print("O");
    }
    System.out.println(" WON");
    printArrayBoard(board);
}

private static String parseInput(Scanner scanner, boolean xsTurn) {
    String line = scanner.nextLine();
    String[] values = line.split("-");
    int x = Integer.parseInt(values[0]);
    int y = Integer.parseInt(values[1]);
    boolean alreadyPlayed = alreadyPlayed(x, y);
    String result = null;
    if (alreadyPlayed) {
        System.out.println("Already played in this x-y. Retry");
    } else {
        result = "" + x + "," + y;
    }
    return result;
}

private static boolean alreadyPlayed(int x, int y) {
    System.out.println("x-y: " + x + "-" + y + " board[x][y]: " + board[x][y]);
    if (board[x][y] != 0) {
        return true;
    }
    return false;
}

private static void printArrayBoard(int[][] board) {
    for (int i = 0; i < dimension; i++) {
        int[] height = board[i];
        for (int j = 0; j < dimension; j++) {
            System.out.print(height[j] + " ");
        }
        System.out.println();
    }
}

private static boolean makeMove(boolean xo, int x, int y) {
    if (xo) {
        board[x][y] = 1;
    } else {
        board[x][y] = -1;
    }
    boolean didWin = checkBoard();
    if (didWin) {
        System.out.println("keep playing");
    }
    return didWin;
}

private static boolean checkBoard() {
    //check horizontal
    int[] horizontalTotal = new int[dimension];
    for (int i = 0; i < dimension; i++) {
        int[] height = board[i];
        int total = 0;
        for (int j = 0; j < dimension; j++) {
            total += height[j];
        }
        horizontalTotal[i] = total;
    }
    for (int a = 0; a < horizontalTotal.length; a++) {
        if (horizontalTotal[a] == xwins || horizontalTotal[a] == owins) {
            System.out.println("horizontal");
            return false;
        }
    }
    //check vertical
    int[] verticalTotal = new int[dimension];

    for (int j = 0; j < dimension; j++) {
        int total = 0;
        for (int i = 0; i < dimension; i++) {
            total += board[i][j];
        }
        verticalTotal[j] = total;
    }
    for (int a = 0; a < verticalTotal.length; a++) {
        if (verticalTotal[a] == xwins || verticalTotal[a] == owins) {
            System.out.println("vertical");
            return false;
        }
    }
    //check diagonal
    int total1 = 0;
    int total2 = 0;
    for (int i = 0; i < dimension; i++) {
        for (int j = 0; j < dimension; j++) {
            if (i == j) {
                total1 += board[i][j];
            }
            if (i == (dimension - 1 - j)) {
                total2 += board[i][j];
            }
        }
    }
    if (total1 == xwins || total1 == owins) {
        System.out.println("diagonal 1");
        return false;
    }
    if (total2 == xwins || total2 == owins) {
        System.out.println("diagonal 2");
        return false;
    }
    return true;
}
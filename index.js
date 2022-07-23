const main = document.getElementById("main");

// let board = new Array(9);

window.addEventListener('keydown', (event) => {
    if (event.key <= 9 && event.key >= 0) {
        numberClick(event.key);
    }
})

for(let i =0;i<9;i++){
    // board[i]=new Array(9);
    for(let j =0;j<9;j++){
        let tile = document.createElement("div");
        let id = 'tile'+i+'_'+j;
        // console.log(id);
        tile.setAttribute('id','tile'+i+'_'+j);
        tile.classList.add('tile');
        tile.innerText=0;
        tile.style.color="aqua"
        tile.setAttribute('onclick', 'ontileclick("' +id +'")');
        // board[i][j]=tile;
        main.appendChild(tile);

    }
    // main.appendChild(br);
    
}
let prevClicked = "";
const ontileclick = (id) =>{
    const cell = document.getElementById(id);
    
    // console.log(cell,id);
    // cell.style.borderColor="red";
    const temp = document.getElementById(prevClicked);
    if(temp!==null){
        temp.classList.remove('selected');
    }
    cell.classList.add('selected');
    prevClicked = id;
    // cell.;
}

// ordinary way to create 2d array
let board = new Array(9);
for(let i =0;i<9;i++){
    board[i]= new Array(9);
    for(let j =0;j<9;j++){
        board[i][j]=0;
    }
}

// create 2d array using map and fill function  
// let board = Array(9).fill().map(() => Array(9).fill(0));

// const create = (e,i,j)=>{
//     const arr = []
//     const row = new Hashmap();
//     row.set(e,arr.push(i));
// }


// var row = new Map();
// var col = new Map();


// // map<int ,vector<int>>m;

// // var m = new Map();

// // m.set(key,value);
// // m.get(key)

// for(let i =0;i<9;i++){
//     for(let j =0;j<9;j++){
//         if(board[i][j]!=0){
//             let num = board[i][j];
//             if(row.has(num)){
//                 if(row.get(num).includes(i)){
//                     alert("same value repeated in row");
//                 }
//                 row.get(num).push(i);
//             }
//             else{
//                 row.set(num,[]);
//             }
//             if(col.has(num)){
//                 if(col.get(num).includes(j)){
//                     alert("same value repeated in col");
//                 }
//                 col.get(num).push(j);
//             }
//             else{
//                 col.set(num,[]);
//             }
//         }
//     }
// }

console.log(board);
const numberClick = (e) =>{
    console.log(prevClicked);
    const cell = document.getElementById(prevClicked);
    cell.style.color="black";
    cell.innerText=e;
    let i = parseInt(prevClicked[4]);
    let j = parseInt(prevClicked[6]);
    // valid(e,i,j);
    board[i][j]=parseInt(e);   
    console.log(board);
}


// Sudoku solver logic :

let N = 9;
 
/* Takes a partially filled-in grid and attempts
    to assign values to all unassigned locations in
    such a way to meet the requirements for
    Sudoku solution (non-duplication across rows,
    columns, and boxes) */
function solveSudoku(grid, row, col)
{
     
    /* If we have reached the 8th
       row and 9th column (0
       indexed matrix) ,
       we are returning true to avoid further
       backtracking       */
    if (row == N - 1 && col == N)
        return true;
 
    // Check if column value  becomes 9 ,
    // we move to next row
    // and column start from 0
    if (col == N)
    {
        row++;
        col = 0;
    }
 
    // Check if the current position
    // of the grid already
    // contains value >0, we iterate
    // for next column
    if (grid[row][col] != 0)
        return solveSudoku(grid, row, col + 1);
 
    for(let num = 1; num < 10; num++)
    {
         
        // Check if it is safe to place
        // the num (1-9)  in the given
        // row ,col ->we move to next column
        if (isSafe(grid, row, col, num))
        {
             
            /*  assigning the num in the current
            (row,col)  position of the grid and
            assuming our assigned num in the position
            is correct */
            grid[row][col] = num;
 
            // Checking for next
            // possibility with next column
            if (solveSudoku(grid, row, col + 1))
                return true;
        }
         
        /* removing the assigned num , since our
           assumption was wrong , and we go for next
           assumption with diff num value   */
        grid[row][col] = 0;
    }
    return false;
}
 
/* A utility function to print grid */
function print(grid)
{
    for(let i = 0; i < N; i++)
    {
        for(let j = 0; j < N; j++)
            document.write(grid[i][j] + " ");
             
        document.write("<br>");
    }
}
 
// Check whether it will be legal
// to assign num to the
// given row, col
function isSafe(grid, row, col, num)
{
     
    // Check if we find the same num
    // in the similar row , we
    // return false
    for(let x = 0; x <= 8; x++)
        if (grid[row][x] == num)
            return false;
 
    // Check if we find the same num
    // in the similar column ,
    // we return false
    for(let x = 0; x <= 8; x++)
        if (grid[x][col] == num)
            return false;
 
    // Check if we find the same num
    // in the particular 3*3
    // matrix, we return false
    let startRow = row - row % 3,
        startCol = col - col % 3;
         
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (grid[i + startRow][j + startCol] == num)
                return false;
 
    return true;
}

// if (solveSudoku(board, 0, 0))
//     print(board)
// else
//     document.write("no solution  exists ")

// const valid

const show = ()=>{
    


    if(solveSudoku(board,0,0))
    {
        for(let i =0;i<9;i++){
            for(let j =0;j<9;j++){
                let id = 'tile'+i+'_'+j;
                let cell = document.getElementById(id);
                cell.innerText= board[i][j];
                cell.style.background = "green";

            }
        }
    }
    // else{
    //     console.log("Please Enter the correct Input ")
    // }
       
    

}


// const row = new Hashmap();
// const col = new Hashmap();
// row.set(3,[0,1....]);
// col.set(3,[2,5...]);

// 0,2->3
// row[3]=0;
// col[3]=2;
// 0,3->3
// if(row[3]==curri||col[3]==currj)

// 1,5->3







// console.log(main);
// main.appendChild(board);
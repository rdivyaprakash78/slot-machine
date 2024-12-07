// Importing required dependencies

const prompt = require("prompt-sync")();

// Global variables

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNTS = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
};

const SYMBOL_VALUES = {
    A : 4,
    B : 3,
    C : 2,
    D : 1
};

// Getting deposit amount from user

const getDeposit = () =>{
    while(true)
        {
        const depositAmount = prompt("Enter your deposit amount : ");
        const numberDepositAmount = parseFloat(depositAmount)
        if (numberDepositAmount <= 0 || isNaN(numberDepositAmount))
        {
            console.log("Invalid input. Please enter a valid positive number.");
        }
        else
        {
            return depositAmount;
        }
    }
}

// Getting number of lines for betting.
const getLines = () => {
    while(true){
        const linesCount = prompt("Enter the number of lines for betting : ");
        if (isNaN(linesCount) || linesCount <= 0 || linesCount > 3)
        {
            console.log("Invalid input. Please enter a number between 1-3.");
        }
        else
        {
            return linesCount;
        }
    }
}

// Getting bet per line.
const getBetPerLine = (deposit, lines) => {
    while(true){
        const betPerLine = prompt("Enter the bet per line : ");
        const numberBetPerLine = parseFloat(betPerLine);

        if(isNaN(numberBetPerLine) || numberBetPerLine > (deposit/lines)){
            console.log("Less balance to make the bet. Enter a lesser amount.");
        }
        else{
            return numberBetPerLine;
        }
    }
}

// Function to generate spin values for each spin
const getSpinValues = () => {
    const totalSymbols = [];
    const spinValues = [];
    for(const[key, value] of Object.entries(SYMBOL_COUNTS))
    {
        for (let i = 0; i< value; i++)
        {
            totalSymbols.push(key);
        }
    }
    for(let i=0; i < COLS; i ++)
    {
        spinValues.push([]);
        for (let j = 0; j < ROWS; j++)
        {
            reelSymbols = [...totalSymbols]
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            spinValues[i].push(reelSymbols[randomIndex]);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return spinValues; 
    
}

// Function to transpose spin values

const getTransposeSpinValues = (spinValues) => {
    const transposeSpinValues = [];
    for (let i = 0; i < ROWS; i++)
    {
        transposeSpinValues.push([]);
        for (let j = 0; j < COLS; j++)
        {
            transposeSpinValues[i].push(spinValues[j][i]);
        }
    }
    return transposeSpinValues;
}

// Function to format and print spin values

const formatSpinValues = (transposeValues) => {
    for (const values of transposeValues) {
        let rowString = "";
        for (const [inner_index, inner_value] of values.entries()) {
            rowString += inner_value;
            if (inner_index != values.length - 1)
            {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

// Function to calculate winnings

const getWinnings = (lines, bet, transpose) => {
    let winnings = 0;
    let allSame = true;

    for (let i = 0 ; i<lines ; i++)
        {
            let row = transpose[i];
            for (let i =1; i<row.length; i++){
                if(row[0]!=row[i]) {
                    allSame = false;
                    break;
                }
            }
            if(allSame == true)
                {
                    winnings += bet * SYMBOL_VALUES[row[0]];
                } 
            
        }
        return winnings;
    }

    

// Flow of game

const deposit = getDeposit();
let balance = deposit;

while(true && balance > 0)
{
    const lines = getLines();
    const bet = getBetPerLine(balance, lines);
    balance = balance - (bet * lines);
    console.log("Your current balance is : ", balance);
    const spin = getSpinValues();
    const transpose = getTransposeSpinValues(spin);
    formatSpinValues(transpose);
    const winnings = getWinnings(lines, bet, transpose);
    balance = balance + winnings;
    console.log("Your winnings are : ", winnings);
    console.log("Your current balance : ", balance);
    if (balance > 0) 
        {
            const playAgain = prompt("Do you want to play again? (yes/no) : ");
            if(playAgain.toLowerCase()!= "yes") break;
        }
    else{
        console.log("Insufficient balance. Game over.");
        break;
    }

    
}



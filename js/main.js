function the15Puzzle(){
    var movesDisplay = $('.moves span'),
        tilesList = $('.tiles'),
        tiles = tilesList.find('li'),
        clicks = 0;

    var arr = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]],
        joinedArray = arr[0].concat(arr[1],arr[2], arr[3]), //1 dimension array
        winnerArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]; //winner array

    function shuffleCells(arr){
        var tmp,
            current,
            top = joinedArray.length,
            inversions = 0;

        //shuffle array
        if(top) while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = joinedArray[current];
            joinedArray[current] = joinedArray[top];
            joinedArray[top] = tmp;
        }

        for(var i = 0; i<15; i++){
            for(var j = i+1; j<16; j++){
                if(joinedArray[i]>joinedArray[j]){ inversions++; }
            }
        }

        if(inversions % 2 != 0){
            tmp = joinedArray[15];
            joinedArray[15] = joinedArray[14]
            joinedArray[14] = tmp;
        }

        // split 1 dimension array back to matrix
        for(var row in arr){
            arr[row] = joinedArray.slice(row*4, row*4+4);
        }
    }

    //update Cell Value
    function updateCellValue(cell, row){
        var leftOffset = cell * 25 + '%';
        var topOffset = row * 25 + '%';
        $("#tile" + arr[row][cell]).css({'left' : leftOffset, 'top' : topOffset})
    }

    //position cells on board
    function positionCells(){
        for(var row in arr ){
            for(var cell in arr[row]){
                updateCellValue(cell, row);
            }
        }
    }

    function getEmptyCell(cell, row){
        var empPoint = [];

        if (row - 1 >= 0 && arr[row - 1][cell] === 0) { empPoint.cell = cell; empPoint.row = row - 1; return empPoint; }
        if (row + 1 < 4 && arr[row + 1][cell] === 0) { empPoint.cell = cell; empPoint.row = row + 1; return empPoint; }
        if (cell - 1 >= 0 && arr[row][cell - 1] === 0) { empPoint.cell = cell - 1; empPoint.row = row; return empPoint; }
        if (cell + 1 < 4 && arr[row][cell + 1] === 0) { empPoint.cell = cell + 1; empPoint.row = row; return empPoint; }
        return false;
    }

    //move tile to empty position if possible
    function moveTile(tileNumber){
        var position = $.inArray(tileNumber, joinedArray),
            cell = position % 4,
            row = position / 4 | 0,
            emptyPoint = false;

        emptyPoint = getEmptyCell(cell, row);

        if(emptyPoint === false) { return false; }//if all cells around clicked one are non zero, do nothing

        arr[emptyPoint.row][emptyPoint.cell] = arr[row][cell];
        arr[row][cell] = 0;
        joinedArray = arr[0].concat(arr[1],arr[2], arr[3]);

        updateCellValue(cell, row);
        updateCellValue(emptyPoint.cell, emptyPoint.row);

        movesDisplay.html(++clicks);

        if(winnerArray == joinedArray){
            alert("You win!!!)")
            movesDisplay.html(clicks + "finished");
        }
    }

    //init game
    this.init = function(){
        shuffleCells(arr);
        positionCells();
        tilesList.show();
        tiles.click(function(){
            moveTile($(this).data("tile-number"));
        });
    };
}

$(function(){
    var field = new the15Puzzle(); // create the15game object
    field.init(); //init game
});

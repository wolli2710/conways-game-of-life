/**
 * @author Wolfgang Vogl / http://wolfgang-vogl.com
 */


(function initGame(){

  var Game = function(){
    /**
     * constant values
     */

    //speed in hundred milliseconds
    const SPEED = 5;
    //stroke width
    const STROKE = 2;
    //game cell width
    const FIELD_SIZE = 10;
    //default cell background color
    const BACKGROUND_COLOR = "#009900";
    //living cell color
    const LIVING_CELL_COLOR = "#000066"

    // canvas and elements
    var canvas,
        grid,
        board,
    // current array and previous array
        arr = [],
        prevArr = [];

    /**
     * width and height of the canvas element
     */
    var cWidth = cWidth || window.document.getElementById('canvas').width;
    var cHeight= cHeight || window.document.getElementById('canvas').height;

    /**
     * loop width and height
     */
    var loops_x = cWidth/FIELD_SIZE;
    var loops_y = cHeight/FIELD_SIZE;

    /**
     * random function from smallest to biggest int
     */
    var RandomNumber = function(from, to){
      return Math.floor(Math.random() * (to - from) + from);
    };

    /**
     * initialize the previous Array the first time
     * with true for living cells and false for others
     */
    var CreateArray = function(){
      for(var i = 0; i<loops_x; i++){
        prevArr[i] = [];
        for(var j = 0; j<loops_y; j++){
          var x = RandomNumber(0,10);
          (x==2||x==8) ? prevArr[i].push(true) : prevArr[i].push(false);
        }
      }
    };

    /**
     * initializes the game and calls game the first time
     */
    this.start = function(){
      canvas = document.getElementById('canvas');
      grid = canvas.getContext('2d');
      board = canvas.getContext('2d');
      CreateArray();
      draw();
    };

    /**
     * draw Rect function for game cells
     */
    var drawRect = function(x,y,color){
      board.fillStyle = color;
      board.fillRect(x ,y , FIELD_SIZE-STROKE ,FIELD_SIZE-STROKE);
    };

    /**
     * draw the game cells the right color
     */
    var draw = function(){
      board.clearRect(0, 0, cWidth, cHeight);

      arr = currentArray();
      for(var i = 0; i<arr.length; i++){
        for(var j = 0; j<arr[i].length; j++){
          var color = BACKGROUND_COLOR;
          if (arr[i][j]===true){ color= LIVING_CELL_COLOR };
          drawRect(i*(FIELD_SIZE+STROKE)+(STROKE), j*(FIELD_SIZE+STROKE)+(STROKE), color);
        }
      }
      setTimeout( function(){return draw()}, (SPEED+100));
    };

    /**
     *  Returns the current array with updated states
     */
    var currentArray = function(){
      var newArr = [];
      for(var i = 0; i< loops_x; i++){
        newArr[i] = [];
        for(var j = 0; j< loops_y; j++){
          newArr[i].push(checkCurrentState(i, j));
        }
      }
        //update previous Array to the state of the current array
      for(var i =0; i<newArr.length; i++){
        prevArr[i] = newArr[i].slice(0);
      }
      return newArr;
    }

    /**
     *  Game logic is in here 
     */
    var checkCurrentState = function(i, j){
      counter = prevArr.countNeighbours(i,j);
      //check if cell is currently alive
      if(prevArr[i][j]){
        //if cell is alive and has exactly two or three neighbours, cell stays alive
        //else it dies
        return (counter === 2 || counter === 3) ? true : false ;
      }
      else{
        //if cell is dead but has exactly three living neighbours it gets alive
        return (counter===3) ? true : false;
      }
    }
    //end of game object
  };

  /**
   * Extend prototype of Array with countNeighbours functionality 
   * to count immediate neighbours of one living cell (x,y)
   */
  Array.prototype.countNeighbours = function(x,y){
    var counter = 0;
    for(var i = x-1; i<=x+1; i++){
      for(var j = y-1; j<=y+1; j++){
        if(!(i===x&&j===y)&& !(i===-1||j===-1) && !(i>=this.length||j>this.length)){
          if(this[i][j]===true){ counter++; }
        }
      }
    }
    return counter;
  };

  /**
   * create and start the game
   */
  (function initGame(){
    var game = new Game();
    game.start();
  })();
  
})();
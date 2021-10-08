
// * Setting up the grid
const grid = document.querySelector('.grid')
const width = 28
const cells = []

//* Setting up the game
let pacMan = 657
let blinky = 432
let speedy = 433
let inky = 434
let clyde = 435
const currentScore = document.querySelector('#score')
const getReady = document.querySelector('.ready')
let glowing = false
const lives = []
const livesDisplay = document.querySelector('.lives')
let livesRemaining = 3
let dotsRemaining = 295
const wonButton = document.querySelector('#won-button')
const lostButton = document.querySelector('#lost-button')
const dotsRemainingDisplay = document.querySelector('#dots-remaining')
for (let index = 0; index < width ** 2 + (width * 3); index++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  cells.push(div)
  div.classList.add('maze')
}

// * Creating the maze

const canMove = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 57, 62, 68, 71, 77, 82, 85, 90, 96, 99, 105, 110, 113, 118, 124, 127, 133, 138, 141,142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 169, 174, 177, 186, 189, 194, 197, 202, 205, 214, 217, 222, 225, 226, 227, 228, 229, 230, 233, 234, 235, 236, 239, 240, 241, 242, 245, 246, 247, 248, 249, 250, 258, 264, 267, 273, 286, 292, 295, 301, 314, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 329, 342, 345, 354, 357, 370, 373, 382, 385, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 426, 429, 438, 441, 454, 457, 466, 469, 482, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 497, 510, 513, 522, 525, 538, 541, 550, 553, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 589, 594, 600, 603, 609, 614, 617, 622, 628, 631, 637, 642, 645, 646, 647, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 668, 669, 670, 675, 678, 681, 690, 693, 696, 703, 706, 709, 718, 721, 724, 729, 730, 731, 732, 733, 734, 737, 738, 739, 740, 743, 744, 745, 746, 749, 750, 751, 752, 753, 754, 757, 768, 771, 782, 785, 796, 799, 810, 813, 814, 815, 816, 827, 817,818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838]

canMove.forEach((index) => {
  cells[index].classList.remove('maze')
  cells[index].classList.add('dots')
  return
})


const tunnels = [280, 308, 336, 338, 281, 282, 283, 284, 309, 310, 311, 312, 337, 339, 340, 303, 304, 305, 306, 307, 331, 332, 333, 334, 335, 359, 360, 361, 362, 363, 448, 449, 450, 451, 452, 476, 477, 478, 479, 480, 504, 505, 506, 507, 508, 471, 472, 473, 474, 475, 499, 500, 501, 502, 503, 527, 528, 529, 530, 531]

tunnels.forEach((index) => {
  cells[index].classList.add('space')
  return
})

const ghostsDen = [349, 350, 377, 378, 404, 405, 406, 407, 432, 433, 434, 435, 431, 436, 403, 408]
ghostsDen.forEach((index) => {
  cells[index].classList.remove('maze')
  cells[index].classList.add('home')
  return
})

const ghostsDenDoor = [349, 350]
ghostsDenDoor.forEach((index) => {
  cells[index].classList.remove('dots')
  cells[index].classList.add('door')
  return
})


cells[(width * 3) + 1].classList.add('energizer')
cells[(width * 3) + 1].classList.remove('dots')
cells[(width * 3) + width - 2].classList.add('energizer')
cells[(width * 3) + width - 2].classList.remove('dots')
cells[(width * 23) + 1].classList.add('energizer')
cells[(width * 23) + 1].classList.remove('dots')
cells[(width * 23) + width - 2].classList.add('energizer')
cells[(width * 23) + width - 2].classList.remove('dots')

//* SETTING THE GAME

cells[pacMan].classList.add('pacman')
cells[blinky].classList.add('blinky', 'ghost')
cells[blinky].classList.remove('dots')
cells[inky].classList.add('inky', 'ghost')
cells[inky].classList.remove('dots')
cells[speedy].classList.add('speedy', 'ghost')
cells[speedy].classList.remove('dots')
cells[clyde].classList.add('clyde', 'ghost')
cells[clyde].classList.remove('dots')
cells[pacMan].classList.remove('dots')
let score = 0


//* GAMEPLAY


function gamePlay() {
  wonButton.style.display = 'none'
  lostButton.style.display = 'none'
  gameStartScreen()
  setTimeout(() => {
    pacManMoves()
    updateDotsRemaining(dotsRemaining)
    updateValues(score)
    ghostsMove()
  }, 1600)

}

gamePlay()

//* GAME START


function gameStartScreen() {
  let readyInterval = 0
  readyInterval = setInterval(() => {
    getReady.classList.toggle('disappear')
  }, 500)
  
  setTimeout(() => {
    clearInterval(readyInterval)
    getReady.classList.add('no-display')
    getReady.classList.remove('get-ready')
    document.querySelector('header').style.display = 'flex'
  }, 1500)
}



//* GHOSTS

//* GHOSTS RESET

function speedyReset() {
  
  if ((cells[speedy].classList.contains('pacmanglows'))) {
    cells[speedy].classList.remove('speedy')
    cells[speedy].classList.remove('ghost')
    cells[speedy].classList.remove('glow-ghosts')
    cells[speedy].classList.remove('glow-speedy')
    speedy = 433
    cells[speedy].classList.add('speedy')
    cells[speedy].classList.add('ghost')
  }
}

function inkyReset() {
  
  if ((cells[inky].classList.contains('pacmanglows'))) {
    cells[inky].classList.remove('inky')
    cells[inky].classList.remove('ghost')
    cells[inky].classList.remove('glow-ghosts')
    cells[inky].classList.remove('glow-inky')
    inky = 434
    cells[inky].classList.add('inky')
    cells[inky].classList.add('ghost')
  }
}

function blinkyReset() {
  
  if ((cells[blinky].classList.contains('pacmanglows'))) {
    cells[blinky].classList.remove('blinky')
    cells[blinky].classList.remove('ghost')
    cells[blinky].classList.remove('glow-ghosts')
    cells[blinky].classList.remove('glow-blinky')
    blinky = 432
    cells[blinky].classList.add('blinky')
    cells[blinky].classList.add('ghost')
  }
}

function clydeReset() {
  
  if ((cells[clyde].classList.contains('pacmanglows'))) {
    cells[clyde].classList.remove('clyde')
    cells[clyde].classList.remove('ghost')
    cells[clyde].classList.remove('glow-ghosts')
    cells[clyde].classList.remove('glow-clyde')
    clyde = 435
    cells[clyde].classList.add('clyde')
    cells[clyde].classList.add('ghost')
  }
}

//* GHOSTS LEAVE THE DEN CAREOGRAPHY

function ghostsMove() {
  
  
  const speedyGetsOutInterval = setInterval(() => {
    cells[speedy].classList.remove('speedy')
    cells[speedy].classList.remove('ghost')
    speedy -= width
    cells[speedy].classList.add('speedy')
    cells[speedy].classList.add('ghost')
  }, 200)
  setTimeout(() => {
    clearInterval(speedyGetsOutInterval)
  }, 800)
  
  setTimeout(function() {
    speedyMoves()
    const inkyGetsOutInterval = setInterval(() => {
      cells[inky].classList.remove('inky')
      cells[inky].classList.remove('ghost')
      inky -= width
      cells[inky].classList.add('inky')
      cells[inky].classList.add('ghost')
    }, 200)
    setTimeout(() => {
      clearInterval(inkyGetsOutInterval)
    }, 800)
  }, 2000)
  setTimeout(function() {
    inkyMoves()
    cells[blinky].classList.remove('blinky')
    cells[blinky].classList.remove('ghost')
    blinky += 1
    cells[blinky].classList.add('blinky')
    cells[blinky].classList.add('ghost')
    setTimeout(function() {
      const blinkyGetsOutInterval = setInterval(() => {
        cells[blinky].classList.remove('blinky')
        cells[blinky].classList.remove('ghost')
        blinky -= width
        cells[blinky].classList.add('blinky')
        cells[blinky].classList.add('ghost')
      }, 200)
      setTimeout(() => {
        clearInterval(blinkyGetsOutInterval)
      }, 800)
    }, 200)
  }, 4000)
  setTimeout(function() {
    blinkyMoves()
    cells[clyde].classList.remove('clyde')
    cells[clyde].classList.remove('ghost')
    clyde -= 1
    cells[clyde].classList.add('clyde')
    cells[clyde].classList.add('ghost')
    setTimeout(function() {
      const clydeGetsOutInterval = setInterval(() => {
        cells[clyde].classList.remove('clyde')
        cells[clyde].classList.remove('ghost')
        clyde -= width
        cells[clyde].classList.add('clyde')
        cells[clyde].classList.add('ghost')
      }, 200)
      setTimeout(() => {
        clearInterval(clydeGetsOutInterval)
      }, 800)
    }, 200)
  }, 6000)
  setTimeout(function() {
    clydeMoves()
  }, 8000)
  
  
}


//* GHOSTS FIND A PATH

const ghostsNextMove = [+1, -1, +width, -width]
let isClear = false


function pathCheck(ghostName, path) {
  if (cells[ghostName += path].classList.contains('maze')) { 
    isClear = false
  } else if (cells[ghostName += path].classList.contains('home')) {
    isClear = false
  } else {
    isClear = true
  }
}

//* GHOSTS MOVE ALONG THE PATH


function speedyMoves() {
  
  let ghostRandomPath = ghostsNextMove[Math.floor(Math.random() * ghostsNextMove.length)]
  setInterval(() => {
    
    pathCheck(speedy, ghostRandomPath)
    if (speedy === 433 || speedy === 405 || speedy === 377 || speedy === 349) {
      ghostRandomPath = -width
      isClear = true
      
    } else {
      while (!isClear) {
        ghostRandomPath = ghostsNextMove[Math.floor(Math.random() * ghostsNextMove.length)]
        pathCheck(speedy, ghostRandomPath)
      }
    }
    
    
    if (isClear) {
      pathCheck(speedy, ghostRandomPath)
      cells[speedy].classList.remove('speedy')
      cells[speedy].classList.remove('ghost')
      cells[speedy].classList.remove('glow-ghosts')
      cells[speedy].classList.remove('glow-speedy')
      speedy += ghostRandomPath
      if ((cells[speedy].classList.contains('pacman'))) {
        livesRemaining -= 1
        updateLives(livesRemaining)
      }
      cells[speedy].classList.add('speedy')   
      cells[speedy].classList.add('ghost') 
      if (glowing) {
        cells[speedy].classList.add('glow-ghosts')
        cells[speedy].classList.add('glow-speedy')
        cells[speedy].classList.remove('speedy')
        cells[speedy].classList.remove('ghost')
      }
    }
    
  }, 150) 
  
}

function inkyMoves() {
  let ghostRandomPath = ghostsNextMove[Math.floor(Math.random() * ghostsNextMove.length)]
  setInterval(() => {
    
    pathCheck(inky, ghostRandomPath)
    if (inky === 434 || inky === 406 || inky === 378 || inky === 350) {
      ghostRandomPath = -width
      isClear = true
    } else {
      while (!isClear) {
        ghostRandomPath = ghostsNextMove[Math.floor(Math.random() * ghostsNextMove.length)]
        pathCheck(inky, ghostRandomPath)
      }
    }
    
    if (isClear) {
      pathCheck(inky, ghostRandomPath)
      cells[inky].classList.remove('inky')
      cells[inky].classList.remove('ghost')
      cells[inky].classList.remove('glow-ghosts')
      cells[inky].classList.remove('glow-inky')
      inky += ghostRandomPath
      if ((cells[inky].classList.contains('pacman'))) {
        livesRemaining -= 1
        updateLives(livesRemaining)
      }
      cells[inky].classList.add('inky')   
      cells[inky].classList.add('ghost')  
      if (glowing) {
        cells[inky].classList.add('glow-ghosts')
        cells[inky].classList.add('glow-inky')
        cells[inky].classList.remove('inky')
        cells[inky].classList.remove('ghost')
      }
    } 
  }, 150)   
  
}

function blinkyMoves() {
  let ghostRandomPath = ghostsNextMove[Math.floor(Math.random() * ghostsNextMove.length)]
  setInterval(() => {
    pathCheck(blinky, ghostRandomPath)
    if (blinky === 432) {
      ghostRandomPath = +1
      isClear = true
    } else if (blinky === 433 || blinky === 405 || blinky === 377 || blinky === 349) {
      ghostRandomPath = -width
      isClear = true
    } else {
      while (!isClear) {
        ghostRandomPath = ghostsNextMove[Math.floor(Math.random() * ghostsNextMove.length)]
        pathCheck(blinky, ghostRandomPath)
      }
    }
    
    if (isClear) {
      pathCheck(blinky, ghostRandomPath)
      cells[blinky].classList.remove('blinky')
      cells[blinky].classList.remove('ghost')
      cells[blinky].classList.remove('glow-ghosts')
      cells[blinky].classList.remove('glow-blinky')
      blinky += ghostRandomPath
      if ((cells[blinky].classList.contains('pacman'))) {
        livesRemaining -= 1
        updateLives(livesRemaining)
      }
      cells[blinky].classList.add('blinky')   
      cells[blinky].classList.add('ghost')   
      if (glowing) {
        cells[blinky].classList.add('glow-ghosts')
        cells[blinky].classList.add('glow-blinky')
        cells[blinky].classList.remove('blinky')
        cells[blinky].classList.remove('ghost')
      }
    } 
  }, 150) 
}

function clydeMoves() {
  let ghostRandomPath = ghostsNextMove[Math.floor(Math.random() * ghostsNextMove.length)]
  setInterval(() => {
    pathCheck(clyde, ghostRandomPath)
    if (clyde === 435) {
      ghostRandomPath = -1
      isClear = true
    } else if (clyde === 434 || clyde === 406 || clyde === 378 || clyde === 350) {
      ghostRandomPath = -width
      isClear = true
    } else {
      while (!isClear) {
        ghostRandomPath = ghostsNextMove[Math.floor(Math.random() * ghostsNextMove.length)]
        pathCheck(clyde, ghostRandomPath)
      }
    }
    
    if (isClear) {
      pathCheck(clyde, ghostRandomPath)
      cells[clyde].classList.remove('clyde')
      cells[clyde].classList.remove('ghost')
      cells[clyde].classList.remove('glow-ghosts')
      cells[clyde].classList.remove('glow-clyde')
      clyde += ghostRandomPath
      if ((cells[clyde].classList.contains('pacman'))) {
        livesRemaining -= 1
        updateLives(livesRemaining)
      }
      cells[clyde].classList.add('clyde')   
      cells[clyde].classList.add('ghost') 
      if (glowing) {
        cells[clyde].classList.add('glow-ghosts')
        cells[clyde].classList.add('glow-clyde')
        cells[clyde].classList.remove('clyde')
        cells[clyde].classList.remove('ghost')
      }  
    } 
  }, 150) 
  
}


//* PACMAN MOVES



function pacManMoves () {
  document.addEventListener('keydown', (event) => {
    const key = event.key
    
    if (!glowing) {
      if ( key === 'ArrowDown') {
        cells[pacMan].classList.remove('pacman', 'up', 'left', 'right', 'down')
        pacMan += width 
        if ((cells[pacMan].classList.contains('maze')) || (cells[pacMan].classList.contains('door'))) {
          pacMan -= width
        }
        if ((cells[pacMan].classList.contains('ghost'))) {
          livesRemaining -= 1
        }
        cells[pacMan].classList.add('down')
        cells[pacMan].classList.add('pacman')
        pacManEats()
      } else if (key === 'ArrowUp') {
        cells[pacMan].classList.remove('pacman', 'up', 'left', 'right', 'down')
        pacMan -= width 
        if ((cells[pacMan].classList.contains('maze'))) {
          pacMan += width
        }
        if ((cells[pacMan].classList.contains('ghost'))) {
          livesRemaining -= 1
        }
        cells[pacMan].classList.add('up')
        cells[pacMan].classList.add('pacman')
        pacManEats()
      } else if (key === 'ArrowLeft' && pacMan === 392) {
        cells[pacMan].classList.remove('pacman', 'up', 'left', 'right', 'down')
        pacMan = 419
        if ((cells[pacMan].classList.contains('ghost'))) {
          livesRemaining -= 1
        }
        cells[pacMan].classList.add('left')
        cells[pacMan].classList.add('pacman')
        pacManEats()
      } else if (key === 'ArrowLeft')  {
        cells[pacMan].classList.remove('pacman', 'up', 'left', 'right', 'down')
        pacMan -= 1
        if ((cells[pacMan].classList.contains('maze'))) {
          pacMan += 1
        }
        if ((cells[pacMan].classList.contains('ghost'))) {
          livesRemaining -= 1
        }
        
        cells[pacMan].classList.add('left')
        cells[pacMan].classList.add('pacman')
        pacManEats()
      }  else if (key === 'ArrowRight' && pacMan === 419) {
        cells[pacMan].classList.remove('pacman', 'up', 'left', 'right', 'down')
        pacMan = 392
        if ((cells[pacMan].classList.contains('ghost'))) {
          livesRemaining -= 1 
        }
        cells[pacMan].classList.add('right')
        cells[pacMan].classList.add('pacman')
        pacManEats()
      } else if (key === 'ArrowRight') {
        cells[pacMan].classList.remove('pacman', 'up', 'left', 'right', 'down')
        pacMan += 1
        if ((cells[pacMan].classList.contains('maze'))) {
          pacMan -= 1
        }
        if ((cells[pacMan].classList.contains('ghost'))) {
          livesRemaining -= 1
        }
        cells[pacMan].classList.add('right')
        cells[pacMan].classList.add('pacman')
        
        pacManEats()
      } 
      updateLives(livesRemaining)
    } else {
      cells[pacMan].classList.remove('pacman')
      cells[pacMan].classList.add('pacmanglows')
      if ( key === 'ArrowDown') {
        cells[pacMan].classList.remove('pacmanglows', 'up', 'left', 'right', 'down', 'pacman')
        pacMan += width 
        if ((cells[pacMan].classList.contains('maze')) || (cells[pacMan].classList.contains('door'))) {
          pacMan -= width
        }
        if ((cells[pacMan].classList.contains('glow-ghosts'))) {
          score += 200
          updateValues(score)
        }
        cells[pacMan].classList.add('down')
        cells[pacMan].classList.add('pacmanglows')
        pacManEats()
      } else if (key === 'ArrowUp') {
        cells[pacMan].classList.remove('pacmanglows', 'up', 'left', 'right', 'down', 'pacman')
        pacMan -= width 
        if ((cells[pacMan].classList.contains('maze'))) {
          pacMan += width
        }
        if ((cells[pacMan].classList.contains('glow-ghosts'))) {
          score += 200
          updateValues(score)
        }
        cells[pacMan].classList.add('up')
        cells[pacMan].classList.add('pacmanglows')
        pacManEats()
      } else if (key === 'ArrowLeft' && pacMan === 392) {
        cells[pacMan].classList.remove('pacmanglows', 'up', 'left', 'right', 'down', 'pacman')
        pacMan = 419
        if ((cells[pacMan].classList.contains('glow-ghosts'))) {
          score += 200
          updateValues(score)
        }
        cells[pacMan].classList.add('left')
        cells[pacMan].classList.add('pacmanglows')
        pacManEats()
      } else if (key === 'ArrowLeft')  {
        cells[pacMan].classList.remove('pacmanglows', 'up', 'left', 'right', 'down', 'pacman')
        pacMan -= 1
        if ((cells[pacMan].classList.contains('maze'))) {
          pacMan += 1
        }
        if ((cells[pacMan].classList.contains('glow-ghosts'))) {
          score += 200
          updateValues(score)
        }
        cells[pacMan].classList.add('left')
        cells[pacMan].classList.add('pacmanglows')
        pacManEats()
      }  else if (key === 'ArrowRight' && pacMan === 419) {
        cells[pacMan].classList.remove('pacmanglows', 'up', 'left', 'right', 'down', 'pacman')
        pacMan = 392
        if ((cells[pacMan].classList.contains('glow-ghosts'))) {
          score += 200
          updateValues(score)
        }
        cells[pacMan].classList.add('right')
        cells[pacMan].classList.add('pacmanglows')
        pacManEats()
      } else if (key === 'ArrowRight') {
        cells[pacMan].classList.remove('pacmanglows', 'up', 'left', 'right', 'down', 'pacman')
        pacMan += 1
        if ((cells[pacMan].classList.contains('maze'))) {
          pacMan -= 1
        }
        if ((cells[pacMan].classList.contains('glow-ghosts'))) {
          score += 200
          updateValues(score)
        }
        cells[pacMan].classList.add('right')
        cells[pacMan].classList.add('pacmanglows')
        
        pacManEats()
      } 
      updateLives(livesRemaining)
    }
  }) 

} 
function pacManEats() {
  if (cells[pacMan].classList.contains('dots')) {
    cells[pacMan].classList.remove('dots')
    score += 10
    dotsRemaining -= 1
    updateDotsRemaining(dotsRemaining)
  } else if (cells[pacMan].classList.contains('energizer')) {
    cells[pacMan].classList.remove('energizer')
    score += 50
    const glowInterval = setInterval(() => {
      glowing = true
      cells[pacMan].classList.remove('pacman')
      cells[pacMan].classList.add('pacmanglows')
      blinkyReset()
      speedyReset()
      clydeReset()
      inkyReset()
    }, 50)
    setTimeout(() => {
      cells[blinky].classList.remove('glow-ghosts')
      cells[blinky].classList.remove('glow-blinky')
      cells[speedy].classList.remove('glow-ghosts')
      cells[speedy].classList.remove('glow-speedy')
      cells[inky].classList.remove('glow-ghosts')
      cells[inky].classList.remove('glow-inky')
      cells[clyde].classList.remove('glow-ghosts')
      cells[clyde].classList.remove('glow-clyde')
      cells[pacMan].classList.remove('pacmanglows')
      cells[pacMan].classList.add('pacman')
      glowing = false
      clearInterval(glowInterval)
    }, 9000)
  }
  if (dotsRemaining === 0){
    gameWon()
  }
  updateValues(score)
}



//* UPDATE SCORE 
function updateValues(score){
  currentScore.innerHTML = score
  return currentScore
}

//* UPDATE REMAINING DOTS

function updateDotsRemaining(dotsRemaining) {
  dotsRemainingDisplay.innerHTML = dotsRemaining
  return dotsRemainingDisplay
}


//* LOSE A LIFE

//Display remaining lives
for (let index = 0; index < 3; index++) {
  const divLives = document.createElement('div')
  livesDisplay.appendChild(divLives)
  lives.push(divLives)
  divLives.classList.add('lives')
}


//* LIVES REMAINING

function updateLives(livesRemaining){
  if (livesRemaining === 2) {
    lives[lives.length - 1].classList.remove('lives')
  } else if (livesRemaining === 1) {
    lives[lives.length - 2].classList.remove('lives')
  } else if (livesRemaining === 0) {
    lives[0].classList.remove('lives')
    gameLost() 
  }
}

//* LOSING THE GAME

function gameLost() {
  lostButton.style.display = 'flex'
  lostButton.addEventListener('click', gameReset())
}

//* WINNING THE GAME

function gameWon() {
  wonButton.style.display = 'flex'
  wonButton.addEventListener('click', gameReset())
}

// //* RESET GAME 
function gameReset(){
  setTimeout(() => {
    location.reload()
  }, 3000)
}



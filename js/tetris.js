const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const scale = 20; // block size
ctx.scale(scale, scale);

const arena = createMatrix(12, 20);

function createMatrix(w, h){
  const m = [];
  while(h--) m.push(new Array(w).fill(0));
  return m;
}

const pieces = ['I','L','J','O','T','S','Z'];
let bag = [];

function shuffle(array){
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function nextPiece(){
  if(bag.length === 0){
    bag = pieces.slice();
    shuffle(bag);
  }
  return bag.pop();
}
function createPiece(type){
  switch(type){
    case 'I': return [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]];
    case 'L': return [[0,2,0],[0,2,0],[0,2,2]];
    case 'J': return [[0,3,0],[0,3,0],[3,3,0]];
    case 'O': return [[4,4],[4,4]];
    case 'T': return [[0,5,0],[5,5,5],[0,0,0]];
    case 'S': return [[0,6,6],[6,6,0],[0,0,0]];
    case 'Z': return [[7,7,0],[0,7,7],[0,0,0]];
  }
}

function drawMatrix(matrix, offset){
  matrix.forEach((row,y)=>{
    row.forEach((value,x)=>{
      if(value!==0){
        ctx.fillStyle = colors[value];
        ctx.fillRect(x+offset.x, y+offset.y, 1, 1);
      }
    });
  });
}

function merge(arena, player){
  player.matrix.forEach((row,y)=>{
    row.forEach((value,x)=>{
      if(value) arena[y+player.pos.y][x+player.pos.x] = value;
    });
  });
}

function collide(arena, player){
  const m = player.matrix;
  for(let y=0;y<m.length;y++){
    for(let x=0;x<m[y].length;x++){
      if(m[y][x] && (arena[y+player.pos.y] && arena[y+player.pos.y][x+player.pos.x])!==0){
        return true;
      }
    }
  }
  return false;
}

function rotate(matrix, dir){
  for(let y=0;y<matrix.length;y++){
    for(let x=0;x<y;x++){
      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }
  if(dir>0) matrix.forEach(row=>row.reverse()); else matrix.reverse();
}

function playerDrop(){
  player.pos.y++;
  if(collide(arena, player)){
    player.pos.y--;
    merge(arena, player);
    playerReset();
    sweep();
    updateScore();
  }
  dropCounter = 0;
}

function sweep(){
  let rowCount=1;
  outer: for(let y=arena.length-1;y>=0;y--){
    for(let x=0;x<arena[y].length;x++) if(arena[y][x]===0) continue outer;
    const row = arena.splice(y,1)[0].fill(0);
    arena.unshift(row);
    y++;
    player.score += rowCount * 10;
    player.lines += 1;
    rowCount *= 2;
  }
  if (rowCount > 1) { // Means lines were cleared
      gameAudio.lineClear();
  }
}

function playerMove(dir){
  player.pos.x += dir;
  if(collide(arena, player)){
      player.pos.x -= dir;
  } else {
      gameAudio.move();
  }
}

function playerRotate(dir){
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir);
  while(collide(arena, player)){
    player.pos.x += offset;
    offset = -(offset + (offset>0?1:-1));
    if(offset > player.matrix[0].length){ rotate(player.matrix, -dir); player.pos.x = pos; return; }
  }
  gameAudio.rotate();
}

let isGameOverState = false;

function playerReset(){
  const type = nextPiece();
  player.matrix = createPiece(type);
  player.pos.y = 0;
  player.pos.x = ((arena[0].length / 2)|0) - ((player.matrix[0].length/2)|0);
  if(collide(arena, player)){
    isGameOverState = true;
    gameAudio.gameOver();
    if (player.score > 0) {
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const name = currentUser ? currentUser.username : 'Guest';
        try {
          const raw = localStorage.getItem('leaderboard') || '[]';
          const arr = JSON.parse(raw);
          arr.push({ name: name, game: 'Neon Tetris', score: player.score, date: new Date().toISOString() });
          localStorage.setItem('leaderboard', JSON.stringify(arr));
        } catch (e) { console.error(e); }
        showPlayAgain();
      }, 50);
    } else {
      showPlayAgain();
    }
  }
}

function showPlayAgain() {
  ctx.fillStyle = 'rgba(0,0,0,0.8)';
  ctx.fillRect(0,0,canvas.width/scale,canvas.height/scale);
  ctx.fillStyle = '#b400ff';
  ctx.font = '1px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', canvas.width/(2*scale), canvas.height/(2*scale) - 2);
  ctx.fillStyle = '#00f0f0';
  ctx.font = '0.7px Outfit, sans-serif';
  ctx.fillText('Press SPACE', canvas.width/(2*scale), canvas.height/(2*scale) + 0.5);
  ctx.fillText('to Play Again', canvas.width/(2*scale), canvas.height/(2*scale) + 1.5);
}

let dropCounter = 0; let dropInterval = 1000; let lastTime = 0;
function update(time=0){
  if(isGameOverState) return;
  const delta = time - lastTime; lastTime = time;
  dropCounter += delta;
  if(dropCounter > dropInterval) playerDrop();
  draw();
  requestAnimationFrame(update);
}

function draw(){
  ctx.fillStyle = '#071029'; ctx.fillRect(0,0,canvas.width/scale,canvas.height/scale);
  drawMatrix(arena, {x:0,y:0});
  drawMatrix(player.matrix, player.pos);
}

const colors = [null,'#00f0f0','#0066ff','#0033ff','#ffd700','#b400ff','#00d000','#ff3b3b'];

const player = {pos:{x:0,y:0},matrix:null,score:0,lines:0};

function updateScore(){
  document.getElementById('score').textContent = player.score;
  document.getElementById('lines').textContent = player.lines;
}

document.addEventListener('keydown',(e)=>{
  if(isGameOverState && e.code==='Space') {
    isGameOverState = false;
    arena.forEach(row=>row.fill(0)); player.score=0; player.lines=0; updateScore();
    playerReset(); lastTime=0; requestAnimationFrame(update);
    return;
  }
  if(isGameOverState) return;
  
  const kl = e.key.toLowerCase();
  if(e.key==='ArrowLeft' || kl==='a') playerMove(-1);
  else if(e.key==='ArrowRight' || kl==='d') playerMove(1);
  else if(e.key==='ArrowDown' || kl==='s') playerDrop();
  else if(e.key==='ArrowUp' || kl==='w' || kl==='x') playerRotate(1);
  else if(e.code==='Space'){
    while(!collide(arena, player)){ player.pos.y++; }
    player.pos.y--; merge(arena, player); playerReset(); sweep(); updateScore();
    dropCounter = 0;
    gameAudio.drop();
  }
});

document.getElementById('startBtn').addEventListener('click', ()=>{
  playerReset(); lastTime = 0; requestAnimationFrame(update);
});
document.getElementById('resetBtn').addEventListener('click', ()=>{
  arena.forEach(row=>row.fill(0)); player.score=0; player.lines=0; updateScore(); draw();
});

// Native Canvas Touch Controls
let touchStartX = null;
let touchStartY = null;
let touchMoved = false;

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if(isGameOverState) {
        // Tap canvas to restart identical to hitting 'Space'
        isGameOverState = false;
        arena.forEach(row=>row.fill(0)); player.score=0; player.lines=0; updateScore();
        playerReset(); lastTime=0; requestAnimationFrame(update);
        return;
    }
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchMoved = false;
}, {passive: false});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if(isGameOverState || touchStartX === null || touchStartY === null) return;
    
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    
    // Configurable thresholds for swipes
    if (Math.abs(dx) > 30) {
        playerMove(dx > 0 ? 1 : -1);
        touchStartX = touch.clientX; // Reset only X to allow continuous lateral movement
        touchMoved = true;
    }
    
    // Separate drop logic allowing diagonal sweeping
    if (dy > 40) {
        playerDrop();
        touchStartY = touch.clientY; // Reset only Y
        touchMoved = true;
    }
}, {passive: false});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    if(isGameOverState) return;
    
    // If the finger was just tapped and immediately lifted (no swipe threshold reached) => Rotate
    if (!touchMoved) {
        playerRotate(1);
    }
    
    touchStartX = null;
    touchStartY = null;
});

playerReset(); draw(); updateScore();

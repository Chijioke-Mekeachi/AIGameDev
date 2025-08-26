"use client";

import { useRef, useState } from "react";

export default function MidScreen() {
  const [view, setView] = useState("editor"); // 'editor' or 'preview'

  // Default starter code (HTML + CSS + JS)
  const [code, setCode] = useState(`<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Snake — Classic JS Game</title>
  <style>
    :root{
      --bg:#0b0f14;
      --panel:#0f1720;
      --accent:#3b82f6;
      --accent-2:#60a5fa;
      --muted:#9ca3af;
      --snake:#34d399;
      --food:#fb7185;
    }
    html,body{height:100%;margin:0;background:linear-gradient(180deg,var(--bg) 0%, #071018 100%);font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial;}
    .wrap{min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;}
    .game-card{width:980px;max-width:100%;background:linear-gradient(180deg,var(--panel),#07101a);border:1px solid rgba(255,255,255,0.03);border-radius:12px;padding:18px;display:grid;grid-template-columns:1fr 320px;gap:16px;box-shadow:0 10px 30px rgba(2,6,23,0.6);}
    .left{display:flex;flex-direction:column;gap:12px;align-items:center;}
    canvas{background:#07121A;border-radius:8px;border:1px solid rgba(255,255,255,0.03);box-shadow:inset 0 2px 12px rgba(0,0,0,0.6);width:100%;height:auto;max-height:640px;}
    .hud{display:flex;gap:8px;align-items:center;justify-content:center;color:var(--muted);font-size:14px;}
    .badge{padding:6px 10px;border-radius:8px;background:rgba(255,255,255,0.02);color:var(--muted);border:1px solid rgba(255,255,255,0.02);}
    .score{font-weight:700;color:var(--accent-2);font-size:18px;}
    .right{padding:12px;border-left:1px dashed rgba(255,255,255,0.03);display:flex;flex-direction:column;gap:12px;align-items:stretch;}
    h1{margin:0;color:white;font-size:20px;}
    p{margin:0;color:var(--muted);font-size:13px;line-height:1.4;}
    button{background:linear-gradient(180deg,var(--accent),var(--accent-2));border:none;color:white;padding:10px 12px;border-radius:8px;font-weight:700;cursor:pointer;box-shadow:0 6px 18px rgba(60,130,246,0.24);}
    .small{padding:8px;border-radius:8px;background:transparent;border:1px solid rgba(255,255,255,0.03);color:var(--muted);cursor:pointer;}
    .controls{display:flex;gap:10px;flex-wrap:wrap;}
    .hint{background:rgba(255,255,255,0.02);padding:10px;border-radius:8px;color:var(--muted);font-size:13px;}
    .dir-pad{display:grid;grid-template-columns:repeat(3, 56px);gap:6px;justify-content:center;align-items:center;}
    .dir-pad button{width:56px;height:56px;border-radius:8px;background:rgba(255,255,255,0.02);color:var(--muted);border:1px solid rgba(255,255,255,0.02);font-weight:700;}
    footer{grid-column:1/-1;text-align:center;color:var(--muted);font-size:12px;margin-top:6px;}
    @media(max-width:880px){.game-card{grid-template-columns:1fr;}}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="game-card">
      <div class="left">
        <canvas id="game" width="640" height="480"></canvas>

        <div class="hud" aria-hidden="false">
          <div class="badge">Score <span class="score" id="score">0</span></div>
          <div class="badge">Level <span id="level">1</span></div>
          <div class="badge">Speed <span id="speed">6</span></div>
        </div>

        <div style="display:flex;gap:10px;align-items:center;">
          <button id="startBtn">Start / Restart</button>
          <button class="small" id="pauseBtn">Pause</button>
          <button class="small" id="muteBtn">Mute</button>
        </div>
      </div>

      <aside class="right">
        <div>
          <h1>Snake — Classic</h1>
          <p>Use arrow keys or WASD to move the snake. Eat the red food to grow. Don't hit the walls or yourself. Speed increases with score.</p>
        </div>

        <div class="hint">
          <strong>Tips:</strong> Try to trap food, don't circle too tight. On mobile use the direction pad below.
        </div>

        <div>
          <h3 style="color:white;margin:0 0 8px 0;font-size:14px;">Mobile Controls</h3>
          <div class="dir-pad" id="dirPad">
            <div></div>
            <button data-dir="up">▲</button>
            <div></div>
            <button data-dir="left">◀</button>
            <div></div>
            <button data-dir="right">▶</button>
            <div></div>
            <button data-dir="down">▼</button>
            <div></div>
          </div>
        </div>

        <div>
          <h3 style="color:white;margin:0 0 8px 0;font-size:14px;">Game Controls</h3>
          <div class="controls">
            <button class="small" id="easy">Easy</button>
            <button class="small" id="normal">Normal</button>
            <button class="small" id="hard">Hard</button>
          </div>
        </div>

        <div>
          <h3 style="color:white;margin:0 0 8px 0;font-size:14px;">How to play</h3>
          <p>Score increases by 1 for each food. Every 5 points speed goes up a bit. Press Start to begin or restart after a game over.</p>
        </div>
      </aside>

      <footer>Made with ❤️ — Open in a browser to play</footer>
    </div>
  </div>

  <script>
    (function(){
      const canvas = document.getElementById('game');
      const ctx = canvas.getContext('2d');
      const scoreEl = document.getElementById('score');
      const levelEl = document.getElementById('level');
      const speedEl = document.getElementById('speed');
      const startBtn = document.getElementById('startBtn');
      const pauseBtn = document.getElementById('pauseBtn');
      const muteBtn = document.getElementById('muteBtn');
      const dirPad = document.getElementById('dirPad');

      // Game settings
      const tileSize = 20;
      const cols = Math.floor(canvas.width / tileSize);
      const rows = Math.floor(canvas.height / tileSize);

      let snake = [];
      let dir = {x:1,y:0};
      let nextDir = {x:1,y:0};
      let food = null;
      let running=false;
      let intervalId = null;
      let speed = 6; // ticks per sec
      let score = 0;
      let level = 1;
      let muted = false;

      // sounds (optional simple tones via WebAudio)
      let audioCtx = null;
      function beep(freq, time=0.06) {
        if (muted) return;
        if (!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'sine'; o.frequency.value = freq;
        o.connect(g); g.connect(audioCtx.destination);
        g.gain.value = 0.03;
        o.start(); o.stop(audioCtx.currentTime + time);
      }

      function resetGame(difficulty='normal') {
        snake = [
          {x: Math.floor(cols/2)-1, y: Math.floor(rows/2)},
          {x: Math.floor(cols/2)-2, y: Math.floor(rows/2)},
          {x: Math.floor(cols/2)-3, y: Math.floor(rows/2)}
        ];
        dir = {x:1,y:0};
        nextDir = {x:1,y:0};
        score = 0;
        level = 1;
        speed = difficulty === 'easy' ? 5 : difficulty === 'hard' ? 10 : 6;
        running = false;
        food = placeFood();
        updateHUD();
        draw();
      }

      function placeFood(){
        while(true){
          const f = {x: Math.floor(Math.random()*cols), y: Math.floor(Math.random()*rows)};
          if (!snake.some(s=>s.x===f.x && s.y===f.y)) return f;
        }
      }

      function updateHUD(){
        scoreEl.textContent = score;
        levelEl.textContent = level;
        speedEl.textContent = speed;
      }

      function drawGrid(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        // optional subtle grid
        ctx.strokeStyle = 'rgba(255,255,255,0.02)';
        ctx.lineWidth = 1;
        for(let x=0;x<=cols;x++){
          ctx.beginPath(); ctx.moveTo(x*tileSize,0); ctx.lineTo(x*tileSize,canvas.height); ctx.stroke();
        }
        for(let y=0;y<=rows;y++){
          ctx.beginPath(); ctx.moveTo(0,y*tileSize); ctx.lineTo(canvas.width,y*tileSize); ctx.stroke();
        }
      }

      function draw(){
        drawGrid();

        // draw food
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--food') || '#fb7185';
        ctx.fillRect(food.x*tileSize + 2, food.y*tileSize + 2, tileSize-4, tileSize-4);

        // draw snake
        for(let i=0;i<snake.length;i++){
          const s = snake[i];
          // head gradient
          if(i===0){
            ctx.fillStyle = '#34d399';
            ctx.fillRect(s.x*tileSize, s.y*tileSize, tileSize, tileSize);
            ctx.strokeStyle = 'rgba(0,0,0,0.25)';
            ctx.strokeRect(s.x*tileSize+0.5, s.y*tileSize+0.5, tileSize-1, tileSize-1);
          } else {
            ctx.fillStyle = 'rgba(52,211,153,' + (1 - Math.min(i/20,0.7)) + ')';
            ctx.fillRect(s.x*tileSize+1, s.y*tileSize+1, tileSize-2, tileSize-2);
          }
        }
      }

      function tick(){
        // apply queued direction but prevent reversing
        if ((nextDir.x !== -dir.x || nextDir.y !== -dir.y) || snake.length===1) {
          dir = nextDir;
        }

        const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};

        // wall collision -> game over
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) { gameOver(); return; }

        // self-collision
        if (snake.some(s => s.x===head.x && s.y===head.y)) { gameOver(); return; }

        snake.unshift(head);

        // food?
        if (head.x === food.x && head.y === food.y) {
          score++;
          beep(880,0.05);
          // increase speed every 5 points
          if (score % 5 === 0) {
            speed += 1;
            level = Math.min(level + 1, 99);
            restartLoop();
          }
          food = placeFood();
        } else {
          snake.pop();
        }
        updateHUD();
        draw();
      }

      function gameOver(){
        running = false;
        clearInterval(intervalId);
        intervalId = null;
        beep(200,0.2);
        // flash effect
        for(let i=0;i<3;i++){
          setTimeout(()=>{ canvas.style.filter='brightness(1.3)'; }, i*200);
          setTimeout(()=>{ canvas.style.filter=''; }, i*200 + 80);
        }
        alert('Game over — score: ' + score);
      }

      function restartLoop(){
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(tick, Math.floor(1000 / speed));
      }

      // Controls
      window.addEventListener('keydown', (e)=>{
        const k = e.key;
        if (k === 'ArrowUp' || k === 'w' || k==='W') nextDir = {x:0,y:-1};
        if (k === 'ArrowDown' || k === 's' || k==='S') nextDir = {x:0,y:1};
        if (k === 'ArrowLeft' || k === 'a' || k==='A') nextDir = {x:-1,y:0};
        if (k === 'ArrowRight' || k === 'd' || k==='D') nextDir = {x:1,y:0};
        if (k === ' '){ // space = pause
          togglePause();
        }
      });

      // mobile dir pad
      dirPad.addEventListener('click', (ev)=>{
        const btn = ev.target.closest('button[data-dir]');
        if (!btn) return;
        const d = btn.getAttribute('data-dir');
        if (d==='up') nextDir = {x:0,y:-1};
        if (d==='down') nextDir = {x:0,y:1};
        if (d==='left') nextDir = {x:-1,y:0};
        if (d==='right') nextDir = {x:1,y:0};
      });

      startBtn.addEventListener('click', ()=>{
        resetGame(); running = true; restartLoop();
      });

      pauseBtn.addEventListener('click', togglePause);

      function togglePause(){
        if (!running){
          running = true;
          restartLoop();
          pauseBtn.textContent = 'Pause';
        } else {
          running = false;
          clearInterval(intervalId);
          intervalId = null;
          pauseBtn.textContent = 'Resume';
        }
      }

      muteBtn.addEventListener('click', ()=>{
        muted = !muted;
        muteBtn.textContent = muted ? 'Unmute' : 'Mute';
      });

      document.getElementById('easy').addEventListener('click', ()=>{ resetGame('easy'); });
      document.getElementById('normal').addEventListener('click', ()=>{ resetGame('normal'); });
      document.getElementById('hard').addEventListener('click', ()=>{ resetGame('hard'); });

      // init
      resetGame('normal');

      // draw initial frame
      draw();
    })();
  </script>
</body>
</html>
`);

  const textareaRef = useRef(null);

  return (
    <section className="bg-black w-full md:w-3/5 h-screen flex flex-col border-r border-gray-700">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
        <h2 className="text-gray-300 text-lg font-semibold">Mid Screen</h2>
        <div className="space-x-2">
          <button
            onClick={() => setView("editor")}
            className={`px-4 py-1 rounded text-sm ${
              view === "editor"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setView("preview")}
            className={`px-4 py-1 rounded text-sm ${
              view === "preview"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Code / Preview Area */}
      <div className="flex-1 overflow-auto p-4">
        {view === "editor" ? (
          <textarea
            ref={textareaRef}
            className="w-full h-full resize-none bg-transparent text-gray-200 outline-none font-mono text-sm"
            placeholder="Write HTML, CSS, JS..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        ) : (
          <iframe
            title="preview"
            className="w-full h-full bg-white rounded-lg"
            sandbox="allow-scripts allow-same-origin"
            srcDoc={code}
          />
        )}
      </div>
    </section>
  );
}

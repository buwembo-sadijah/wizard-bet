let balance=100000, selections=[], history=[];
const matches=[
["Premier League","Arsenal","Chelsea",2.10,3.30,3.20],["La Liga","Barcelona","Sevilla",1.55,4.20,5.60],
["Serie A","Inter","Roma",1.80,3.50,4.10],["Champions League","PSG","Bayern",2.40,3.60,2.45],
["Premier League","Liverpool","Tottenham",1.70,4.00,4.60],["La Liga","Real Madrid","Valencia",1.40,4.80,7.00],
["Bundesliga","Dortmund","Leverkusen",2.20,3.50,2.75],["Ligue 1","Lyon","Monaco",2.60,3.40,2.35]
];
const games=[
["🚀","Crash"],["✈️","Aviator Demo"],["🚁","Helicopter Crash"],["🚗","Car Crash"],["🎈","Balloon Pop"],
["🎲","Dice"],["🎯","Mines"],["🃏","Blackjack"],["🎡","Roulette"],["🎰","Slots"],
["🍒","Fruit Slots"],["💎","Gem Rush"],["🐉","Dragon Slots"],["🐯","Tiger Slots"],["🐟","Fish Game"],
["🪙","Coin Flip"],["🎱","Lucky 8"],["🎁","Mystery Box"],["💰","Gold Rush"],["🔥","Fire Spin"]
];
function money(n){return Math.floor(n).toLocaleString()}
function render(){
document.getElementById('balance').textContent=money(balance);document.getElementById('heroBalance').textContent=money(balance);document.getElementById('walletBalance').textContent=money(balance);
document.getElementById('matches').innerHTML=matches.map((m,i)=>`<div class="card"><div class="league">${m[0]} • Demo odds</div><div class="teams"><span>${m[1]}</span><span>VS</span><span>${m[2]}</span></div><div class="markets">
<button class="odd" onclick="addBet(${i},'${m[1]}',${m[3]})">1 ${m[3]}</button><button class="odd" onclick="addBet(${i},'Draw',${m[4]})">X ${m[4]}</button><button class="odd" onclick="addBet(${i},'${m[2]}',${m[5]})">2 ${m[5]}</button></div></div>`).join('');
document.getElementById('games').innerHTML=games.map((g,i)=>`<div class="game"><div class="icon">${g[0]}</div><b>${g[1]}</b><button onclick="playGame(${i})">Play demo</button></div>`);
updateSlip();document.getElementById('adminBets').textContent=history.length;
}
function addBet(i,pick,odd){selections=[{match:matches[i][1]+" vs "+matches[i][2],pick,odd}];toggleSlip(true);updateSlip()}
function updateSlip(){document.getElementById('count').textContent=selections.length;document.getElementById('selections').innerHTML=selections.length?selections.map((s,i)=>`<div class="selection"><b>${s.match}</b>${s.pick} @ ${s.odd}</div>`).join(''):'Your selections will appear here.';let stake=Number(document.getElementById('stake').value||0);let odds=selections.reduce((a,s)=>a*s.odd,1);document.getElementById('payout').textContent=selections.length?money(stake*odds):'0'}
document.getElementById('stake').addEventListener('input',updateSlip);
function placeBet(){if(!selections.length)return alert('Select a market first.');let stake=Number(document.getElementById('stake').value);if(stake<100||stake>balance)return alert('Enter a valid stake within your demo balance.');let odds=selections.reduce((a,s)=>a*s.odd,1);balance-=stake;history.unshift({type:'Sports',stake,odds,payout:stake*odds,status:'Open'});selections=[];updateSlip();render();alert('Demo bet placed. No real money is involved.')}
function playGame(i){let stake=Number(prompt(`Demo stake for ${games[i][1]} (UGX):`,'1000'));if(!stake||stake<100||stake>balance)return;balance-=stake;let multiplier=(Math.random()*4+0.2);let payout=Math.floor(stake*multiplier);balance+=payout;history.unshift({type:games[i][1],stake,odds:multiplier.toFixed(2),payout,status:payout>=stake?'Win':'Loss'});render();openModal(games[i][0]+' '+games[i][1],`<div class="result">Stake: UGX ${money(stake)}<br>Multiplier: <b>${multiplier.toFixed(2)}x</b><br>Result: <b>UGX ${money(payout)}</b></div>`)}
function deposit(){balance+=50000;render();alert('UGX 50,000 demo balance added.')}
function withdraw(){let x=Number(prompt('Demo withdrawal amount:','10000'));if(x>0&&x<=balance){balance-=x;render();alert('Demo withdrawal completed. No real payment was made.')}else alert('Invalid amount.')}
function toggleSlip(force){document.getElementById('betslip').classList.toggle('open',force===true?true:undefined)}
function openModal(t,b){document.getElementById('modalTitle').textContent=t;document.getElementById('modalBody').innerHTML=b;document.getElementById('modal').classList.add('show')}
function closeModal(){document.getElementById('modal').classList.remove('show')}
document.getElementById('history').addEventListener('click',()=>{});
render();
setInterval(()=>{document.querySelectorAll('.hero-card small').forEach(x=>x.textContent='Virtual money only • Demo mode')},1000);

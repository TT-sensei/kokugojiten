// SOUND RECIPE のレシピを参考にした、教材用の軽いWeb Audio効果音。
let soundContext=null;
function soundCtx(){if(!soundContext)soundContext=new(window.AudioContext||window.webkitAudioContext)();if(soundContext.state==='suspended')soundContext.resume();return soundContext}
function tone(ctx,f,t,d,type='sine',level=.18){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(level,ctx.currentTime+t);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+t+d);o.connect(g).connect(ctx.destination);o.start(ctx.currentTime+t);o.stop(ctx.currentTime+t+d)}
const soundRecipes={
 correct:(c)=>{tone(c,659,0,.22,'sine',.22);tone(c,880,.1,.45,'sine',.2)},
 wrong:(c)=>{tone(c,220,0,.35,'triangle',.17);tone(c,145,.18,.44,'triangle',.15)},
 near:(c)=>{tone(c,523,0,.16,'triangle',.15);tone(c,659,.1,.22,'triangle',.14)},
 click:(c)=>tone(c,900,0,.12,'square',.1),
 start:(c)=>{tone(c,392,0,.24,'sawtooth',.12);tone(c,523,.16,.24,'sawtooth',.14);tone(c,784,.32,.62,'sawtooth',.16)},
 clear:(c)=>[523,659,784,1047].forEach((f,i)=>tone(c,f,i*.12,.7,'sine',.16)),
 combo:(c,n=3)=>{[523,659,784].slice(0,n>=5?3:2).forEach((f,i)=>tone(c,f,i*.1,.3,'triangle',.15));if(n>=5)tone(c,1047,.3,.55,'sine',.18)},
 badge:(c)=>[523,659,784,1047].forEach((f,i)=>tone(c,f,i*.12,.62,'sine',.18)),
 alarm:(c)=>{tone(c,330,0,.26,'square',.13);tone(c,330,.34,.36,'square',.13)},
 gameover:(c)=>{tone(c,392,0,.22,'triangle',.12);tone(c,330,.18,.22,'triangle',.12);tone(c,262,.36,.5,'triangle',.13)}
};
window.playSound=(name,arg)=>{try{const c=soundCtx();soundRecipes[name]?.(c,arg)}catch{}}

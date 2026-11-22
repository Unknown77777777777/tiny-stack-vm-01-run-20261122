const{readdirSync:R,readFileSync:G,mkdirSync:K,writeFileSync:W}=require('fs'),I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
for(const d of R(I)){
const p=G(I+'/'+d+'/program.bin'),n=G(I+'/'+d+'/input.bin');
let s=[],c=[],m=new Int32Array(256),o=[],pc=0,t=0,k=0,e=0;
for(;;){
if(t++>=1e6){e=10;break}
if(pc<0||pc>=p.length){e=9;break}
const q=p[pc],L=q==1?1:q==2?4:q>=48&&q<=51?2:0,w=pc,N=w+1+L;
if(!(q<8||q>15&&q<35||q>47&&q<53||q>63&&q<66||q>79&&q<84)){e=5;break}
if(N>p.length){e=9;break}
pc=N;
let a,b;
const U=x=>s.length<x&&(e=2),F=()=>s.length>255&&(e=3);
if(q==0)break;
else if(q==1){if(F())break;s.push(p[w+1]<<24>>24)}
else if(q==2){if(F())break;s.push(p.readInt32LE(w+1))}
else if(q==3){if(U(1))break;s.pop()}
else if(q==4){if(U(1)||F())break;s.push(s.at(-1))}
else if(q==5){if(U(2))break;s.push(s.splice(-2,1)[0])}
else if(q==6){if(U(2)||F())break;s.push(s.at(-2))}
else if(q==7){if(U(3))break;s.push(s.splice(-3,1)[0])}
else if(q>=16&&q<=34){
if(q==23){if(U(1))break;s.push(-s.pop()|0)}
else if(q==27){if(U(1))break;s.push(~s.pop())}
else{if(U(2))break;b=s.pop();a=s.pop();
if(q>=19&&q<=22&&!b){e=4;break}
let r=q==16?a+b|0:q==17?a-b|0:q==18?Math.imul(a,b):q==19?(a/b)|0:q==20?(a%b)|0:q==21?(a>>>0)/(b>>>0)|0:q==22?(a>>>0)%(b>>>0)|0:q==24?a&b:q==25?a|b:q==26?a^b:q==28?a<<(b&31):q==29?a>>(b&31):q==30?(a>>>(b&31))|0:q==32?(a==b?1:0):q==33?(a<b?1:0):(a>>>0)<(b>>>0)?1:0;
s.push(r)}}
else if(q>=48&&q<=50){const g=p.readInt16LE(w+1);
if(q==48)pc=N+g;
else{if(U(1))break;const v=s.pop();if((q==49)==(v==0))pc=N+g}}
else if(q==51){if(c.length>63){e=7;break}c.push(N);pc=p[w+1]|p[w+2]<<8}
else if(q==52){if(!c.length){e=8;break}pc=c.pop()}
else if(q==64){if(U(1))break;a=s.pop();if(a<0||a>255){e=6;break}s.push(m[a])}
else if(q==65){if(U(2))break;a=s.pop();b=s.pop();if(a<0||a>255){e=6;break}m[a]=b}
else if(q==80){if(U(1))break;const g=''+s.pop();if(o.length+g.length>65536){e=11;break}o.push(...Buffer.from(g))}
else if(q==81){if(U(1))break;if(o.length>65535){e=11;break}o.push(s.pop()&255)}
else if(q==82){if(F())break;s.push(k<n.length?n[k++]:-1)}
else if(q==83){if(U(1))break;e=s.pop()&255;break}
}
K(O+'/'+d,{recursive:true});
W(O+'/'+d+'/stdout.bin',Buffer.from(o));
W(O+'/'+d+'/exit.txt',e+'\n');
}

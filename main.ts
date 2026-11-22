import{readFileSync,readdirSync,mkdirSync,writeFileSync}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function V(p,n){
 let q=0,t=0,s=[],c=[],m=new Int32Array(256),o=[],k=0,a,b,g;
 while(1){
  if(t>=1e6)return[o,10];
  if(q<0||q>=p.length)return[o,9];
  const x=p[q];
  if(!(x<8||x>15&&x<31||x>31&&x<35||x>47&&x<53||x>63&&x<66||x>79&&x<84))return[o,5];
  const L=x==1?1:x==2?4:x>47&&x<52?2:0;
  if(q+1+L>p.length)return[o,9];
  t++;
  switch(x){
   case 0:return[o,0];
   case 1:case 2:if(s.length>255)return[o,3];s.push(x==1?(a=p[q+1])>127?a-256:a:p.readInt32LE(q+1));q+=x==1?2:5;break;
   case 3:if(!s.length)return[o,2];s.pop();q++;break;
   case 4:if(!s.length)return[o,2];if(s.length>255)return[o,3];s.push(s[s.length-1]);q++;break;
   case 5:if(s.length<2)return[o,2];a=s.pop();b=s.pop();s.push(a,b);q++;break;
   case 6:if(s.length<2)return[o,2];if(s.length>255)return[o,3];s.push(s[s.length-2]);q++;break;
   case 7:if(s.length<3)return[o,2];a=s[s.length-3];s.splice(s.length-3,1);s.push(a);q++;break;
   case 16:case 17:case 18:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:if(s.length<2)return[o,2];b=s.pop();a=s.pop();s.push(x==16?a+b|0:x==17?a-b|0:x==18?Math.imul(a,b):x==24?a&b:x==25?a|b:x==26?a^b:x==28?a<<b:x==29?a>>b:x==30?a>>>b|0:x==32?(a==b?1:0):x==33?(a<b?1:0):(a>>>0)<(b>>>0)?1:0);q++;break;
   case 19:if(s.length<2)return[o,2];b=s.pop();a=s.pop();if(!b)return[o,4];s.push(a==-2147483648&&b==-1?-2147483648:(a/b)|0);q++;break;
   case 20:if(s.length<2)return[o,2];b=s.pop();a=s.pop();if(!b)return[o,4];s.push((a%b)|0);q++;break;
   case 21:if(s.length<2)return[o,2];b=s.pop();a=s.pop();if(!b)return[o,4];s.push((a>>>0)/(b>>>0)|0);q++;break;
   case 22:if(s.length<2)return[o,2];b=s.pop();a=s.pop();if(!b)return[o,4];s.push((a>>>0)%(b>>>0)|0);q++;break;
   case 23:case 27:if(!s.length)return[o,2];s.push(x==23?-s.pop()|0:~s.pop());q++;break;
   case 48:q+=3+p.readInt16LE(q+1);break;
   case 49:case 50:if(!s.length)return[o,2];a=s.pop();g=p.readInt16LE(q+1);q+=3;if(x==49?!a:a)q+=g;break;
   case 51:if(c.length>63)return[o,7];c.push(q+3);q=p[q+1]|p[q+2]<<8;break;
   case 52:if(!c.length)return[o,8];q=c.pop();break;
   case 64:if(!s.length)return[o,2];a=s.pop();if(a<0||a>255)return[o,6];s.push(m[a]);q++;break;
   case 65:if(s.length<2)return[o,2];a=s.pop();b=s.pop();if(a<0||a>255)return[o,6];m[a]=b;q++;break;
   case 80:if(!s.length)return[o,2];a=s.pop();g=String(a);if(o.length+g.length>65536)return[o,11];for(let i=0;i<g.length;i++)o.push(g.charCodeAt(i));q++;break;
   case 81:if(!s.length)return[o,2];a=s.pop();if(o.length>65535)return[o,11];o.push(a&255);q++;break;
   case 82:if(s.length>255)return[o,3];s.push(k<n.length?n[k++]:-1);q++;break;
   case 83:if(!s.length)return[o,2];return[o,s.pop()&255];
  }
 }
}
for(const d of readdirSync(I).sort()){
 const[r,e]=V(readFileSync(I+'/'+d+'/program.bin'),readFileSync(I+'/'+d+'/input.bin'));
 mkdirSync(O+'/'+d,{recursive:true});
 writeFileSync(O+'/'+d+'/stdout.bin',Buffer.from(r));
 writeFileSync(O+'/'+d+'/exit.txt',e+'\n');
}

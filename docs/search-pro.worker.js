const nt="ENTRIES",V="KEYS",T="VALUES",F="";class D{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=E(this._path);if(E(s)===F)return{done:!1,value:this.result()};const n=t.get(E(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=E(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>E(t)).filter(t=>t!==F).join("")}value(){return E(this._path).node.get(F)}result(){switch(this._type){case T:return this.value();case V:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const E=e=>e[e.length-1],ot=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return W(e,t,s,n,i,1,o,""),n},W=(e,t,s,n,o,u,i,r)=>{const h=u*i;t:for(const c of e.keys())if(c===F){const d=o[h-1];d<=s&&n.set(r,[e.get(c),d])}else{let d=u;for(let l=0;l<c.length;++l,++d){const p=c[l],f=i*d,g=f-i;let a=o[f];const m=Math.max(0,d-s-1),y=Math.min(i-1,d+s);for(let _=m;_<y;++_){const b=p!==t[_],z=o[g+_]+ +b,A=o[g+_+1]+1,w=o[f+_]+1,L=o[f+_+1]=Math.min(z,A,w);L<a&&(a=L)}if(a>s)continue t}W(e.get(c),t,s,n,o,d,i,r+c)}};class C{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=x(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=O(n);for(const i of o.keys())if(i!==F&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,ut(this._tree,t)}entries(){return new D(this,nt)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return ot(this._tree,t,s)}get(t){const s=I(this._tree,t);return s!==void 0?s.get(F):void 0}has(t){const s=I(this._tree,t);return s!==void 0&&s.has(F)}keys(){return new D(this,V)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,M(this._tree,t).set(F,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=M(this._tree,t);return n.set(F,s(n.get(F))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=M(this._tree,t);let o=n.get(F);return o===void 0&&n.set(F,o=s()),o}values(){return new D(this,T)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const x=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==F&&t.startsWith(n))return s.push([e,n]),x(e.get(n),t.slice(n.length),s);return s.push([e,t]),x(void 0,"",s)},I=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==F&&t.startsWith(s))return I(e.get(s),t.slice(s.length))},M=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==F&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const h=e.get(u);if(r===u.length)e=h;else{const c=new Map;c.set(u.slice(r),h),e.set(t.slice(n,n+r),c),e.delete(u),e=c}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},ut=(e,t)=>{const[s,n]=x(e,t);if(s!==void 0){if(s.delete(F),s.size===0)R(n);else if(s.size===1){const[o,u]=s.entries().next().value;$(n,o,u)}}},R=e=>{if(e.length===0)return;const[t,s]=O(e);if(t.delete(s),t.size===0)R(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==F&&$(e.slice(0,-1),n,o)}},$=(e,t,s)=>{if(e.length===0)return;const[n,o]=O(e);n.set(o+t,s),n.delete(o)},O=e=>e[e.length-1],it=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},rt=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,S="or",q="and",ct="and_not",lt=(e,t)=>{e.includes(t)||e.push(t)},P=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},G=({score:e},{score:t})=>t-e,ht=()=>new Map,k=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},N=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,dt={[S]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),P(n.terms,u)}}return e},[q]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);P(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[ct]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},at=(e,t,s,n,o,u)=>{const{k:i,b:r,d:h}=u;return Math.log(1+(s-t+.5)/(t+.5))*(h+e*(i+1)/(e+i*(1-r+r*n/o)))},ft=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},H=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},gt=(e,t,s,n)=>{if(!e._index.has(n)){H(e,s,t,n);return}const o=e._index.fetch(n,ht),u=o.get(t);u==null||u.get(s)==null?H(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},mt={k:1.2,b:.7,d:.5},pt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(rt),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof(console==null?void 0:console[e])=="function"&&console[e](t)},autoVacuum:!0},J={combineWith:S,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:mt},Ft={combineWith:q,prefix:(e,t,s)=>t===s.length-1},_t={batchSize:1e3,batchWait:10},U={minDirtFactor:.1,minDirtCount:20},yt={..._t,...U},Y=(e,t=S)=>{if(e.length===0)return new Map;const s=t.toLowerCase();return e.reduce(dt[s])||new Map},B=(e,t,s,n,o,u,i,r,h=new Map)=>{if(o==null)return h;for(const c of Object.keys(u)){const d=u[c],l=e._fieldIds[c],p=o.get(l);if(p==null)continue;let f=p.size;const g=e._avgFieldLength[l];for(const a of p.keys()){if(!e._documentIds.has(a)){gt(e,l,a,s),f-=1;continue}const m=i?i(e._documentIds.get(a),s,e._storedFields.get(a)):1;if(!m)continue;const y=p.get(a),_=e._fieldLength.get(a)[l],b=at(y,f,e._documentCount,_,g,r),z=n*d*m*b,A=h.get(a);if(A){A.score+=z,lt(A.terms,t);const w=N(A.match,s);w?w.push(c):A.match[s]=[c]}else h.set(a,{score:z,terms:[t],match:{[s]:[c]}})}}return h},At=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((a,m)=>({...a,[m]:N(n.boost,m)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:h}=n,{fuzzy:c,prefix:d}={...J.weights,...i},l=e._index.get(t.term),p=B(e,t.term,t.term,1,l,o,u,h);let f,g;if(t.prefix&&(f=e._index.atPrefix(t.term)),t.fuzzy){const a=t.fuzzy===!0?.2:t.fuzzy,m=a<1?Math.min(r,Math.round(t.term.length*a)):a;m&&(g=e._index.fuzzyGet(t.term,m))}if(f)for(const[a,m]of f){const y=a.length-t.term.length;if(!y)continue;g==null||g.delete(a);const _=d*a.length/(a.length+.3*y);B(e,t.term,a,_,m,o,u,h,p)}if(g)for(const a of g.keys()){const[m,y]=g.get(a);if(!y)continue;const _=c*a.length/(a.length+y);B(e,t.term,a,_,m,o,u,h,p)}return p},X=(e,t,s={})=>{if(typeof t!="string"){const d={...s,...t,queries:void 0},l=t.queries.map(p=>X(e,p,d));return Y(l,d.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:h}=i,c=r(t).flatMap(d=>h(d)).filter(d=>!!d).map(ft(i)).map(d=>At(e,d,i));return Y(c,i.combineWith)},K=(e,t,s={})=>{const n=X(e,t,s),o=[];for(const[u,{score:i,terms:r,match:h}]of n){const c=r.length,d={id:e._documentIds.get(u),score:i*c,terms:Object.keys(h),match:h};Object.assign(d,e._storedFields.get(u)),(s.filter==null||s.filter(d))&&o.push(d)}return o.sort(G),o},Ct=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of K(e,t,s)){const r=i.join(" "),h=n.get(r);h!=null?(h.score+=u,h.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:h}]of n)o.push({suggestion:u,terms:r,score:i/h});return o.sort(G),o};class Et{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if((t==null?void 0:t.fields)==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...pt,...t,autoVacuum:s,searchOptions:{...J,...t.searchOptions||{}},autoSuggestOptions:{...Ft,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=U,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const zt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:h,serializationVersion:c},d)=>{if(c!==1&&c!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const l=new Et(d);l._documentCount=t,l._nextId=s,l._documentIds=k(n),l._idToShortId=new Map,l._fieldIds=o,l._fieldLength=k(u),l._avgFieldLength=i,l._storedFields=k(r),l._dirtCount=h||0,l._index=new C;for(const[p,f]of l._documentIds)l._idToShortId.set(f,p);for(const[p,f]of e){const g=new Map;for(const a of Object.keys(f)){let m=f[a];c===1&&(m=m.ds),g.set(parseInt(a,10),k(m))}l._index.set(p,g)}return l},Q=Object.entries,wt=Object.fromEntries,j=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(c,d=!1)=>{let l="";i===0?l=c.length>20?`… ${c.slice(-20)}`:c:d?l=c.length+i>100?`${c.slice(0,100-i)}… `:c:l=c.length>20?`${c.slice(0,20)} … ${c.slice(-20)}`:c,l&&o.push(l),i+=l.length,d||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let h=s.indexOf(n,u);if(h===-1)return null;for(;h>=0;){const c=h+n.length;if(r(e.slice(u,h)),u=c,i>100)break;h=s.indexOf(n,u)}return i<100&&r(e.slice(u),!0),o},Z=/[\u4e00-\u9fa5]/g,tt=(e={})=>({fuzzy:.2,prefix:!0,processTerm:t=>{const s=t.match(Z)||[],n=t.replace(Z,"").toLowerCase();return n?[n,...s]:[...s]},...e}),xt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),kt=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),et=(e,t,s={})=>{const n={};return K(t,e,tt({boost:{h:2,t:1,c:4},...s})).forEach(o=>{const{id:u,terms:i,score:r}=o,h=u.includes("@"),c=u.includes("#"),[d,l]=u.split(/[#@]/),{contents:p}=n[d]??={title:"",contents:[]};if(h)p.push([{type:"customField",key:d,index:l,display:i.map(f=>o.c.map(g=>j(g,f))).flat().filter(f=>f!==null)},r]);else{const f=i.map(g=>j(o.h,g)).filter(g=>g!==null);if(f.length&&p.push([{type:c?"heading":"title",key:d,...c&&{anchor:l},display:f},r]),"t"in o)for(const g of o.t){const a=i.map(m=>j(g,m)).filter(m=>m!==null);a.length&&p.push([{type:"text",key:d,...c&&{anchor:l},display:a},r])}}}),Q(n).sort(([,o],[,u])=>"max"==="total"?xt(o,u):kt(o,u)).map(([o,{title:u,contents:i}])=>{if(!u){const r=it(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},st=(e,t,s={})=>Ct(t,e,tt(s)).map(({suggestion:n})=>n),v=wt(Q(JSON.parse("{\"/\":{\"documentCount\":40,\"nextId\":40,\"documentIds\":{\"0\":\"v-ce159204\",\"1\":\"v-ce159204#ws-dataview-v1-0-0-2022-10-06\",\"2\":\"v-ce159204#ws-dataview-v1-1-0-2023-05-03\",\"3\":\"v-ce159204#ws-dataview-v1-2-0-2023-08-26\",\"4\":\"v-e5bdcaf0\",\"5\":\"v-e5bdcaf0#位移图表\",\"6\":\"v-e5bdcaf0#加速度图表\",\"7\":\"v-e5bdcaf0#转速图表\",\"8\":\"v-e5bdcaf0#轴心轨迹\",\"9\":\"v-e5bdcaf0#数据列表\",\"10\":\"v-f3ce4cac\",\"11\":\"v-f3ce4cac#配置参数\",\"12\":\"v-af3251d0\",\"13\":\"v-af3251d0#菜单选项\",\"14\":\"v-af3251d0#背景全屏\",\"15\":\"v-af3251d0#文件上传\",\"16\":\"v-af3251d0#壁纸管理\",\"17\":\"v-af3251d0#镜像更新\",\"18\":\"v-75f5c9dc\",\"19\":\"v-75f5c9dc#开屏页\",\"20\":\"v-75f5c9dc#页面标注\",\"21\":\"v-75f5c9dc#我的笔记\",\"22\":\"v-75f5c9dc#下拉菜单\",\"23\":\"v-75f5c9dc#设备信息\",\"24\":\"v-75f5c9dc#二维码\",\"25\":\"v-5b9144d2\",\"26\":\"v-5b9144d2#网站导航\",\"27\":\"v-5b9144d2#登录日志\",\"28\":\"v-5b9144d2#数据库统计\",\"29\":\"v-2547dd76\",\"30\":\"v-2547dd76#网络\",\"31\":\"v-2547dd76#外观\",\"32\":\"v-2547dd76#功能\",\"33\":\"v-3c47031a\",\"34\":\"v-3c47031a#数据主屏\",\"35\":\"v-3c47031a#任务参数\",\"36\":\"v-3c47031a#采集记录\",\"37\":\"v-3c47031a#工艺信号\",\"38\":\"v-3c47031a#表格模板\",\"39\":\"v-145c230d\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[1,5],\"1\":[8,9],\"2\":[9,17],\"3\":[9,16],\"4\":[1,16],\"5\":[1,8],\"6\":[1,12],\"7\":[1,8],\"8\":[1,3],\"9\":[1,7],\"10\":[1,7],\"11\":[1,31],\"12\":[1],\"13\":[1,7],\"14\":[1,2],\"15\":[1,17],\"16\":[1,4],\"17\":[1,12],\"18\":[1,9],\"19\":[1,5],\"20\":[1,18],\"21\":[1,4],\"22\":[1,20],\"23\":[1,11],\"24\":[1,4],\"25\":[1,6],\"26\":[1,6],\"27\":[1,11],\"28\":[1,9],\"29\":[1,6],\"30\":[1,14],\"31\":[1,12],\"32\":[1,15],\"33\":[1,11],\"34\":[1,31],\"35\":[1,32],\"36\":[1,9],\"37\":[1,10],\"38\":[1,7],\"39\":[1]},\"averageFieldLength\":[1.5750000000000006,11.3482905982906],\"storedFields\":{\"0\":{\"h\":\"更新记录\",\"t\":[\"相关信息\",\"该页记录了 Ws DataView 的更新日志\"]},\"1\":{\"h\":\"ws-dataview v1.0.0 (2022-10-06)\",\"t\":[\"国庆节赶工制作，第一版release\",\"文档构建基于 vuepress-theme-reco v1.6.0\"]},\"2\":{\"h\":\"ws-dataview v1.1.0 (2023-05-03)\",\"t\":[\"优化：部分选项调整为默认使能\",\"优化：状态管理重构，持久化方案由手动管理转为 vuex-persistedstate 自动管理\",\"新增：数据统计组件 statistic，记录网络日志与报警次数\",\"新增：图表页添加转速、轴心轨迹图\",\"优化：WebSocket新增数据包类型，以适应新增图表功能\",\"改动：移除了服务器留言功能\"]},\"3\":{\"h\":\"ws-dataview v1.2.0 (2023-08-26)\",\"t\":[\"优化：优化了自动采集部分的计算逻辑，并提供一组工艺信号的数据接口\",\"优化：提供配置参数热更新\",\"新增：工艺信号数据校准组件\",\"新增：数据库统计条数与数据库抽检结果展示组件\",\"新增：文档基于 vuepress-theme-hope 2.0.0-beta.235 重构\"]},\"4\":{\"h\":\"图表分析\",\"t\":[\"相关信息\",\"图表分析使用了数据大屏的UI风格，你可以通过 侧边抽屉的外观选项功能页 进行关闭。\",\"当前图表类型：位移时域/频域、加速度时域/频域、1/3倍频程、转速时域、轴心轨迹。\",\"后续可能会按照实际情况，添加新的分析图表与功能。\"]},\"5\":{\"h\":\"位移图表\",\"t\":[\"路由路径: /chart/disdataview\",\"左侧显示特征值，右侧显示图表，提供时域/频域切换。\"]},\"6\":{\"h\":\"加速度图表\",\"t\":[\"路由路径: /chart/accdataview\",\"左侧特征值，右侧图表，提供对数轴/实数轴切换 (频域有效)，提供时域/频域/倍频程切换。\"]},\"7\":{\"h\":\"转速图表\",\"t\":[\"路由路径: /chart/rpmdataview\",\"左侧特征值，右侧图表，转速ADC实际时域图，辅助现场转速传感器的调试安装。\"]},\"8\":{\"h\":\"轴心轨迹\",\"t\":[\"路由路径: /chart/axisdataview\"]},\"9\":{\"h\":\"数据列表\",\"t\":[\"路由路径: /chart/listdataview\",\"位移/加速度数据列表显示，提供csv格式数据下载方式。\"]},\"10\":{\"h\":\"参数管理\",\"t\":[\"const obj = (()=>()=>({})||[])()() /* JavaScript混淆 */ \"]},\"11\":{\"h\":\"配置参数\",\"t\":[\"路由路径: /test/tabpanel\",\"config.json的可视化配置UI。支持单独修改与批量修改两种方式。\",\"配置文件的加载，支持服务器加载与本地文件加载两种方式。修改配置时，不影响源文件数据。需用户自行下载修改后的配置文件。\",\"更新配置文件的方式：\",\"下载修改后的配置文件，通过右键菜单的 文件上传功能 更新至服务端。\",\"使用参数热更新页面。\",\"示例1\",\"开关指向单例模式时，点击页码，可单独修改该页码的通道配置。\",\"示例2\",\"开关指向批量修改时，点击页码，可加入批量修改的通道组。同时在模式开关下方提供了4个通道组辅助按钮，帮助用户快速选中/取消通道。\",\"批量修改后，需点击保存，才能将修改项同步到通道组内的通道。\",\"示例3\"]},\"12\":{\"h\":\"右键菜单\"},\"13\":{\"h\":\"菜单选项\",\"t\":[\"对话框其他入口说明\",\"壁纸管理 对应了侧边抽屉外观选项\",\"添加笔记 对应了开屏页右上角我的笔记\",\"文件上传 对应了侧边抽屉功能选项\"]},\"14\":{\"h\":\"背景全屏\",\"t\":[\"背景全屏效果图如下。\"]},\"15\":{\"h\":\"文件上传\",\"t\":[\"组件名称：upload\",\"使用该功能时，上传文件放置在指定文件夹下。请注意同名文件覆盖问题。\",\"文件存放位置\",\"ZD4412: /media/disk/Update\",\"RK3399: /home/linaro/update\",\"FT2000: /home/dhl/UpDate\"]},\"16\":{\"h\":\"壁纸管理\",\"t\":[\"组件名称：wallpaper\",\"提供背景壁纸切换与下载。\"]},\"17\":{\"h\":\"镜像更新\",\"t\":[\"组件名称：flashutils\",\"FPGA multiboot 双镜像在线更新方案。精力有限，目前不打算做其他平台的实现。 因此，该功能 仅支持小范围的生产设备(携带Web服务)。\"]},\"18\":{\"h\":\"网页首屏\",\"t\":[\"\\\"hello world\\\".split('').forEach(e => console.log(e)) \"]},\"19\":{\"h\":\"开屏页\",\"t\":[\"路由路径: /dashboard\",\"注: 文档内的图片可点击放大\",\"示例1\"]},\"20\":{\"h\":\"页面标注\",\"t\":[\"标注说明\",\"logo图片 点击回到系统首页\",\"面包屑导航\",\"侧边栏，路由导航\",\"websocket 状态灯。点击状态灯可打开 侧边抽屉\",\"笔记对话框 查看详情\",\"全局下拉菜单 查看详情\",\"设备对话框 查看详情\",\"二维码识别生成插件 查看详情\",\"搜索栏，点击左边图标可切换搜索引擎\",\"每日一言\"]},\"21\":{\"h\":\"我的笔记\",\"t\":[\"笔记数据仅保存在浏览器端，若需要在设备端保留设备信息，请打开设备对话框。\",\"示例3\"]},\"22\":{\"h\":\"下拉菜单\",\"t\":[\"截止至文档编写日期为止，目前共有6个下拉选项。\",\"设备指令\",\"有源模式 兼容旧设备的运行模式指令\",\"位移模式 兼容旧设备的调试模式指令\",\"无源模式 新增功能，加速度无电流源模式\",\"直流模式 新增功能，加速度直流模式\",\"时间校准 新增功能，网页发送当前时间 +10ms(预估网络延时) 至设备端同步时间\",\"设备关机 新增功能，设备端进入关机流程\",\"示例4\"]},\"23\":{\"h\":\"设备信息\",\"t\":[\"设备信息更新后，将保存在服务器路径 /conf/device.json 文件中。websocket连接后，服务器将发送一段全局静态变量，其中包含FPGA的序列号。\",\"用户端将序列号与设备信息保存的序列号进行对比。\",\"示例5\"]},\"24\":{\"h\":\"二维码\",\"t\":[\"二维码功能暂时没有特殊的联动功能，目前仅作为小工具使用，支持拖拽识别。\",\"示例6\"]},\"25\":{\"h\":\"扩展应用\",\"t\":[\"相关信息\",\"非通用、非常驻功能。 扩展应用仅作为作者私货，不影响实际采集测试。\"]},\"26\":{\"h\":\"网站导航\",\"t\":[\"路由路径: /extend/homepage\",\"网站导航因缺少站点的icon图标，暂不支持扩展其他站点信息。\"]},\"27\":{\"h\":\"登录日志\",\"t\":[\"路由路径: /extend/loginlog\",\"登录日志以txt形式保存在服务器路径 /conf/login.log 文件中。\",\"改版后，日志组件已移至左侧导航组件中。\"]},\"28\":{\"h\":\"数据库统计\",\"t\":[\"路由路径: /extend/database\",\"该功能为实验功能，仅限于小范围使用(Web环境)。 描述说明请参考 merry-monitor\"]},\"29\":{\"h\":\"侧边抽屉\",\"t\":[\"侧边抽屉的打开方式\",\"点击状态灯 -> 开屏页\",\"右键菜单 -> 网页设置\"]},\"30\":{\"h\":\"网络\",\"t\":[\"组件名称: websocket\",\"标注说明\",\"WebSocket的登录地址与端口路径。\",\"首屏渲染结束后，是否尝试自动连接WebSocket服务器。\",\"主屏页更新，数据主屏 数据更新使能。\",\"图像页更新，图表分析 数据更新使能。\",\"在WebSocket已连接的条件下，点击可切换至相应的模式。\"]},\"31\":{\"h\":\"外观\",\"t\":[\"组件名称: skin\",\"选项说明\",\"日间|夜间模式切换。\",\"前景不透明度，表现为数据主屏的透明度。\",\"背景不透明度，表现为壁纸的透明度。\",\"关闭图表数据大屏的UI风格，使用壁纸作为背景图。\",\"数据主屏中的通道报警遮罩功能开关。\"]},\"32\":{\"h\":\"功能\",\"t\":[\"组件名称: tool\",\"选项说明\",\"打开/关闭右键自定义菜单功能。\",\"保留背景壁纸切换时的历史记录功能。\",\"数据主屏 采集数据的持久化，可解决网页刷新后，缓存数据丢失的问题。\",\"天气插件由 和风天气 提供。\",\"文件上传对话框。\"]},\"33\":{\"h\":\"测试管理\",\"t\":[\"const dp = new Array(n).fill(0).map(() => new Array(n).fill(0)) \"]},\"34\":{\"h\":\"数据主屏\",\"t\":[\"路由路径: /test/monitor\",\"数据主屏一方面用于观察数据状态。 另一方面也是测试功能的入口，基本误差的自动测试说明，如下图所示。\",\"示例1\",\"标注说明\",\"数据测试中的标准参考值。对应 excel表的标注1。\",\"数据测试中的试验次数，每个通道有三组试验。对应 excel图中标注2。\",\"单击数据采集时，触发采集的次数。(连点器效果)\",\"数据采集按钮，采集标有星号的通道数据，采集数据存放在 采集记录。\",\"任务参数，可配置需要的采集通道等相关配置。查看详情\",\"当前采集数据状态，默认为平均值。\",\"采集任务使能，控制采集程序激活。\",\"自动采集使能，控制采集程序激活。\",\"示例2\"]},\"35\":{\"h\":\"任务参数\",\"t\":[\"相关信息\",\"测量误差 与 检查测量误差\",\"当使能检查测量误差后，WebSocket接收到服务器数据时将启动自动采集的测量。\",\"例如：外部电压为+4V时，若带标记的采集通道与+4V之间的误差全部小于设定值0.300，则程序将识别出标准参考值为4V，并将数据主屏中的 标注1 改为4.000。\",\"通道误差 与 检查通道误差\",\"当使能通道测量误差后，当前标准参考值 改变后 将启动通道误差的检查。 经过实测，该功能实用性不高。一般情况不建议使用\",\"采集通道 被选中的采集通道，将作为自动测试的有效通道。并在主屏上 标注星星图标 用于区别。\",\"自动采集与任务参数强相关\",\"示例3\"]},\"36\":{\"h\":\"采集记录\",\"t\":[\"路由路径: /test/record\",\"采集后的缓存数据。提供数据重置、数据校准功能；csv、xlsx两种格式的excel下载。\",\"示例4\"]},\"37\":{\"h\":\"工艺信号\",\"t\":[\"路由路径: /test/slowdata\",\"新增任务类型，同时提供信号的展示、采集与缓存；与数据重置、数据校准、excel下载等功能。\",\"示例4\"]},\"38\":{\"h\":\"表格模板\",\"t\":[\"路由路径: /test/excel\",\"excel模板，提供4种内置模板。可实现随机数的混入与批量下载。\",\"示例5\"]},\"39\":{\"h\":\"Book\"}},\"dirtCount\":0,\"index\":[[\"book\",{\"0\":{\"39\":1}}],[\"beta\",{\"1\":{\"3\":1}}],[\"表格模板\",{\"0\":{\"38\":1}}],[\"表现为壁纸的透明度\",{\"1\":{\"31\":1}}],[\"表现为数据主屏的透明度\",{\"1\":{\"31\":1}}],[\"同时提供信号的展示\",{\"1\":{\"37\":1}}],[\"同时在模式开关下方提供了4个通道组辅助按钮\",{\"1\":{\"11\":1}}],[\"工艺信号\",{\"0\":{\"37\":1}}],[\"工艺信号数据校准组件\",{\"1\":{\"3\":1}}],[\"xlsx两种格式的excel下载\",{\"1\":{\"36\":1}}],[\"用于区别\",{\"1\":{\"35\":1}}],[\"用户端将序列号与设备信息保存的序列号进行对比\",{\"1\":{\"23\":1}}],[\"被选中的采集通道\",{\"1\":{\"35\":1}}],[\"一般情况不建议使用\",{\"1\":{\"35\":1}}],[\"经过实测\",{\"1\":{\"35\":1}}],[\"将作为自动测试的有效通道\",{\"1\":{\"35\":1}}],[\"将启动通道误差的检查\",{\"1\":{\"35\":1}}],[\"将保存在服务器路径\",{\"1\":{\"23\":1}}],[\"检查通道误差\",{\"1\":{\"35\":1}}],[\"检查测量误差\",{\"1\":{\"35\":1}}],[\"通道误差\",{\"1\":{\"35\":1}}],[\"通过右键菜单的\",{\"1\":{\"11\":1}}],[\"标注星星图标\",{\"1\":{\"35\":1}}],[\"标注1\",{\"1\":{\"35\":1}}],[\"标注说明\",{\"1\":{\"20\":1,\"30\":1,\"34\":1}}],[\"并在主屏上\",{\"1\":{\"35\":1}}],[\"并将数据主屏中的\",{\"1\":{\"35\":1}}],[\"并提供一组工艺信号的数据接口\",{\"1\":{\"3\":1}}],[\"则程序将识别出标准参考值为4v\",{\"1\":{\"35\":1}}],[\"300\",{\"1\":{\"35\":1}}],[\"3倍频程\",{\"1\":{\"4\":1}}],[\"若带标记的采集通道与+4v之间的误差全部小于设定值0\",{\"1\":{\"35\":1}}],[\"若需要在设备端保留设备信息\",{\"1\":{\"21\":1}}],[\"外部电压为+4v时\",{\"1\":{\"35\":1}}],[\"外观\",{\"0\":{\"31\":1}}],[\"例如\",{\"1\":{\"35\":1}}],[\"当使能通道测量误差后\",{\"1\":{\"35\":1}}],[\"当使能检查测量误差后\",{\"1\":{\"35\":1}}],[\"当前标准参考值\",{\"1\":{\"35\":1}}],[\"当前采集数据状态\",{\"1\":{\"34\":1}}],[\"当前图表类型\",{\"1\":{\"4\":1}}],[\"与数据重置\",{\"1\":{\"37\":1}}],[\"与\",{\"1\":{\"35\":2}}],[\"测量误差\",{\"1\":{\"35\":1}}],[\"测试管理\",{\"0\":{\"33\":1}}],[\"自动采集与任务参数强相关\",{\"1\":{\"35\":1}}],[\"自动采集使能\",{\"1\":{\"34\":1}}],[\"自动管理\",{\"1\":{\"2\":1}}],[\"控制采集程序激活\",{\"1\":{\"34\":2}}],[\"默认为平均值\",{\"1\":{\"34\":1}}],[\"任务参数\",{\"0\":{\"35\":1},\"1\":{\"34\":1}}],[\"采集与缓存\",{\"1\":{\"37\":1}}],[\"采集后的缓存数据\",{\"1\":{\"36\":1}}],[\"采集通道\",{\"1\":{\"35\":1}}],[\"采集任务使能\",{\"1\":{\"34\":1}}],[\"采集记录\",{\"0\":{\"36\":1},\"1\":{\"34\":1}}],[\"采集数据存放在\",{\"1\":{\"34\":1}}],[\"采集数据的持久化\",{\"1\":{\"32\":1}}],[\"采集标有星号的通道数据\",{\"1\":{\"34\":1}}],[\"连点器效果\",{\"1\":{\"34\":1}}],[\"触发采集的次数\",{\"1\":{\"34\":1}}],[\"单击数据采集时\",{\"1\":{\"34\":1}}],[\"每个通道有三组试验\",{\"1\":{\"34\":1}}],[\"每日一言\",{\"1\":{\"20\":1}}],[\"如下图所示\",{\"1\":{\"34\":1}}],[\"基本误差的自动测试说明\",{\"1\":{\"34\":1}}],[\"另一方面也是测试功能的入口\",{\"1\":{\"34\":1}}],[\"n\",{\"1\":{\"33\":2}}],[\"new\",{\"1\":{\"33\":2}}],[\"和风天气\",{\"1\":{\"32\":1}}],[\"天气插件由\",{\"1\":{\"32\":1}}],[\"缓存数据丢失的问题\",{\"1\":{\"32\":1}}],[\"保留背景壁纸切换时的历史记录功能\",{\"1\":{\"32\":1}}],[\"关闭右键自定义菜单功能\",{\"1\":{\"32\":1}}],[\"关闭图表数据大屏的ui风格\",{\"1\":{\"31\":1}}],[\"打开\",{\"1\":{\"32\":1}}],[\"功能\",{\"0\":{\"32\":1}}],[\"背景不透明度\",{\"1\":{\"31\":1}}],[\"背景全屏效果图如下\",{\"1\":{\"14\":1}}],[\"背景全屏\",{\"0\":{\"14\":1}}],[\"前景不透明度\",{\"1\":{\"31\":1}}],[\"日间|夜间模式切换\",{\"1\":{\"31\":1}}],[\"日志组件已移至左侧导航组件中\",{\"1\":{\"27\":1}}],[\"选项说明\",{\"1\":{\"31\":1,\"32\":1}}],[\"在websocket已连接的条件下\",{\"1\":{\"30\":1}}],[\"图像页更新\",{\"1\":{\"30\":1}}],[\"图表分析使用了数据大屏的ui风格\",{\"1\":{\"4\":1}}],[\"图表分析\",{\"0\":{\"4\":1},\"1\":{\"30\":1}}],[\"图表页添加转速\",{\"1\":{\"2\":1}}],[\"主屏页更新\",{\"1\":{\"30\":1}}],[\"是否尝试自动连接websocket服务器\",{\"1\":{\"30\":1}}],[\"首屏渲染结束后\",{\"1\":{\"30\":1}}],[\">\",{\"1\":{\"29\":2}}],[\"描述说明请参考\",{\"1\":{\"28\":1}}],[\"仅限于小范围使用\",{\"1\":{\"28\":1}}],[\"仅支持小范围的生产设备\",{\"1\":{\"17\":1}}],[\"改变后\",{\"1\":{\"35\":1}}],[\"改为4\",{\"1\":{\"35\":1}}],[\"改版后\",{\"1\":{\"27\":1}}],[\"改动\",{\"1\":{\"2\":1}}],[\"登录日志以txt形式保存在服务器路径\",{\"1\":{\"27\":1}}],[\"登录日志\",{\"0\":{\"27\":1}}],[\"暂不支持扩展其他站点信息\",{\"1\":{\"26\":1}}],[\"网络\",{\"0\":{\"30\":1}}],[\"网站导航因缺少站点的icon图标\",{\"1\":{\"26\":1}}],[\"网站导航\",{\"0\":{\"26\":1}}],[\"网页设置\",{\"1\":{\"29\":1}}],[\"网页发送当前时间\",{\"1\":{\"22\":1}}],[\"网页首屏\",{\"0\":{\"18\":1}}],[\"不影响实际采集测试\",{\"1\":{\"25\":1}}],[\"不影响源文件数据\",{\"1\":{\"11\":1}}],[\"非常驻功能\",{\"1\":{\"25\":1}}],[\"非通用\",{\"1\":{\"25\":1}}],[\"扩展应用仅作为作者私货\",{\"1\":{\"25\":1}}],[\"扩展应用\",{\"0\":{\"25\":1}}],[\"二维码功能暂时没有特殊的联动功能\",{\"1\":{\"24\":1}}],[\"二维码\",{\"0\":{\"24\":1}}],[\"二维码识别生成插件\",{\"1\":{\"20\":1}}],[\"其中包含fpga的序列号\",{\"1\":{\"23\":1}}],[\"服务器将发送一段全局静态变量\",{\"1\":{\"23\":1}}],[\"至设备端同步时间\",{\"1\":{\"22\":1}}],[\"预估网络延时\",{\"1\":{\"22\":1}}],[\"+10ms\",{\"1\":{\"22\":1}}],[\"时间校准\",{\"1\":{\"22\":1}}],[\"直流模式\",{\"1\":{\"22\":1}}],[\"无源模式\",{\"1\":{\"22\":1}}],[\"兼容旧设备的调试模式指令\",{\"1\":{\"22\":1}}],[\"兼容旧设备的运行模式指令\",{\"1\":{\"22\":1}}],[\"有源模式\",{\"1\":{\"22\":1}}],[\"设备信息更新后\",{\"1\":{\"23\":1}}],[\"设备信息\",{\"0\":{\"23\":1}}],[\"设备端进入关机流程\",{\"1\":{\"22\":1}}],[\"设备关机\",{\"1\":{\"22\":1}}],[\"设备指令\",{\"1\":{\"22\":1}}],[\"设备对话框\",{\"1\":{\"20\":1}}],[\"目前仅作为小工具使用\",{\"1\":{\"24\":1}}],[\"目前共有6个下拉选项\",{\"1\":{\"22\":1}}],[\"目前不打算做其他平台的实现\",{\"1\":{\"17\":1}}],[\"截止至文档编写日期为止\",{\"1\":{\"22\":1}}],[\"下拉菜单\",{\"0\":{\"22\":1}}],[\"下载修改后的配置文件\",{\"1\":{\"11\":1}}],[\"请打开设备对话框\",{\"1\":{\"21\":1}}],[\"请注意同名文件覆盖问题\",{\"1\":{\"15\":1}}],[\"笔记数据仅保存在浏览器端\",{\"1\":{\"21\":1}}],[\"笔记对话框\",{\"1\":{\"20\":1}}],[\"我的笔记\",{\"0\":{\"21\":1}}],[\"搜索栏\",{\"1\":{\"20\":1}}],[\"全局下拉菜单\",{\"1\":{\"20\":1}}],[\"查看详情\",{\"1\":{\"20\":4,\"34\":1}}],[\"状态灯\",{\"1\":{\"20\":1}}],[\"状态管理重构\",{\"1\":{\"2\":1}}],[\"路由导航\",{\"1\":{\"20\":1}}],[\"路由路径\",{\"1\":{\"5\":1,\"6\":1,\"7\":1,\"8\":1,\"9\":1,\"11\":1,\"19\":1,\"26\":1,\"27\":1,\"28\":1,\"34\":1,\"36\":1,\"37\":1,\"38\":1}}],[\"侧边抽屉的打开方式\",{\"1\":{\"29\":1}}],[\"侧边抽屉的外观选项功能页\",{\"1\":{\"4\":1}}],[\"侧边抽屉\",{\"0\":{\"29\":1},\"1\":{\"20\":1}}],[\"侧边栏\",{\"1\":{\"20\":1}}],[\"面包屑导航\",{\"1\":{\"20\":1}}],[\"点击可切换至相应的模式\",{\"1\":{\"30\":1}}],[\"点击状态灯\",{\"1\":{\"29\":1}}],[\"点击状态灯可打开\",{\"1\":{\"20\":1}}],[\"点击左边图标可切换搜索引擎\",{\"1\":{\"20\":1}}],[\"点击回到系统首页\",{\"1\":{\"20\":1}}],[\"点击页码\",{\"1\":{\"11\":2}}],[\"页面标注\",{\"0\":{\"20\":1}}],[\"注\",{\"1\":{\"19\":1}}],[\"开屏页\",{\"0\":{\"19\":1},\"1\":{\"29\":1}}],[\"开关指向批量修改时\",{\"1\":{\"11\":1}}],[\"开关指向单例模式时\",{\"1\":{\"11\":1}}],[\"login\",{\"1\":{\"27\":1}}],[\"loginlog\",{\"1\":{\"27\":1}}],[\"logo图片\",{\"1\":{\"20\":1}}],[\"log\",{\"1\":{\"18\":1,\"27\":1}}],[\"linaro\",{\"1\":{\"15\":1}}],[\"listdataview\",{\"1\":{\"9\":1}}],[\"excel模板\",{\"1\":{\"38\":1}}],[\"excel\",{\"1\":{\"38\":1}}],[\"excel下载等功能\",{\"1\":{\"37\":1}}],[\"excel图中标注2\",{\"1\":{\"34\":1}}],[\"excel表的标注1\",{\"1\":{\"34\":1}}],[\"extend\",{\"1\":{\"26\":1,\"27\":1,\"28\":1}}],[\"e\",{\"1\":{\"18\":2}}],[\"slowdata\",{\"1\":{\"37\":1}}],[\"skin\",{\"1\":{\"31\":1}}],[\"split\",{\"1\":{\"18\":1}}],[\"statistic\",{\"1\":{\"2\":1}}],[\"hello\",{\"1\":{\"18\":1}}],[\"homepage\",{\"1\":{\"26\":1}}],[\"home\",{\"1\":{\"15\":2}}],[\"hope\",{\"1\":{\"3\":1}}],[\"携带web服务\",{\"1\":{\"17\":1}}],[\"该功能实用性不高\",{\"1\":{\"35\":1}}],[\"该功能为实验功能\",{\"1\":{\"28\":1}}],[\"该功能\",{\"1\":{\"17\":1}}],[\"该页记录了\",{\"1\":{\"0\":1}}],[\"因此\",{\"1\":{\"17\":1}}],[\"精力有限\",{\"1\":{\"17\":1}}],[\"双镜像在线更新方案\",{\"1\":{\"17\":1}}],[\"map\",{\"1\":{\"33\":1}}],[\"monitor\",{\"1\":{\"28\":1,\"34\":1}}],[\"merry\",{\"1\":{\"28\":1}}],[\"media\",{\"1\":{\"15\":1}}],[\"multiboot\",{\"1\":{\"17\":1}}],[\"fill\",{\"1\":{\"33\":2}}],[\"foreach\",{\"1\":{\"18\":1}}],[\"fpga\",{\"1\":{\"17\":1}}],[\"flashutils\",{\"1\":{\"17\":1}}],[\"ft2000\",{\"1\":{\"15\":1}}],[\"镜像更新\",{\"0\":{\"17\":1}}],[\"update\",{\"1\":{\"15\":3}}],[\"upload\",{\"1\":{\"15\":1}}],[\"zd4412\",{\"1\":{\"15\":1}}],[\"上传文件放置在指定文件夹下\",{\"1\":{\"15\":1}}],[\"使用壁纸作为背景图\",{\"1\":{\"31\":1}}],[\"使用该功能时\",{\"1\":{\"15\":1}}],[\"使用参数热更新页面\",{\"1\":{\"11\":1}}],[\"组件名称\",{\"1\":{\"15\":1,\"16\":1,\"17\":1,\"30\":1,\"31\":1,\"32\":1}}],[\"添加笔记\",{\"1\":{\"13\":1}}],[\"添加新的分析图表与功能\",{\"1\":{\"4\":1}}],[\"对应\",{\"1\":{\"34\":2}}],[\"对应了侧边抽屉功能选项\",{\"1\":{\"13\":1}}],[\"对应了侧边抽屉外观选项\",{\"1\":{\"13\":1}}],[\"对应了开屏页右上角我的笔记\",{\"1\":{\"13\":1}}],[\"对话框其他入口说明\",{\"1\":{\"13\":1}}],[\"壁纸管理\",{\"0\":{\"16\":1},\"1\":{\"13\":1}}],[\"菜单选项\",{\"0\":{\"13\":1}}],[\"右键菜单\",{\"0\":{\"12\":1},\"1\":{\"29\":1}}],[\"右侧图表\",{\"1\":{\"6\":1,\"7\":1}}],[\"右侧显示图表\",{\"1\":{\"5\":1}}],[\"才能将修改项同步到通道组内的通道\",{\"1\":{\"11\":1}}],[\"需点击保存\",{\"1\":{\"11\":1}}],[\"需用户自行下载修改后的配置文件\",{\"1\":{\"11\":1}}],[\"批量修改后\",{\"1\":{\"11\":1}}],[\"取消通道\",{\"1\":{\"11\":1}}],[\"帮助用户快速选中\",{\"1\":{\"11\":1}}],[\"可实现随机数的混入与批量下载\",{\"1\":{\"38\":1}}],[\"可配置需要的采集通道等相关配置\",{\"1\":{\"34\":1}}],[\"可解决网页刷新后\",{\"1\":{\"32\":1}}],[\"可加入批量修改的通道组\",{\"1\":{\"11\":1}}],[\"可单独修改该页码的通道配置\",{\"1\":{\"11\":1}}],[\"示例6\",{\"1\":{\"24\":1}}],[\"示例5\",{\"1\":{\"23\":1,\"38\":1}}],[\"示例4\",{\"1\":{\"22\":1,\"36\":1,\"37\":1}}],[\"示例3\",{\"1\":{\"11\":1,\"21\":1,\"35\":1}}],[\"示例2\",{\"1\":{\"11\":1,\"34\":1}}],[\"示例1\",{\"1\":{\"11\":1,\"19\":1,\"34\":1}}],[\"文件中\",{\"1\":{\"23\":1,\"27\":1}}],[\"文件存放位置\",{\"1\":{\"15\":1}}],[\"文件上传对话框\",{\"1\":{\"32\":1}}],[\"文件上传\",{\"0\":{\"15\":1},\"1\":{\"13\":1}}],[\"文件上传功能\",{\"1\":{\"11\":1}}],[\"文档内的图片可点击放大\",{\"1\":{\"19\":1}}],[\"文档基于\",{\"1\":{\"3\":1}}],[\"文档构建基于\",{\"1\":{\"1\":1}}],[\"更新至服务端\",{\"1\":{\"11\":1}}],[\"更新配置文件的方式\",{\"1\":{\"11\":1}}],[\"更新记录\",{\"0\":{\"0\":1}}],[\"修改配置时\",{\"1\":{\"11\":1}}],[\"支持拖拽识别\",{\"1\":{\"24\":1}}],[\"支持服务器加载与本地文件加载两种方式\",{\"1\":{\"11\":1}}],[\"支持单独修改与批量修改两种方式\",{\"1\":{\"11\":1}}],[\"配置文件的加载\",{\"1\":{\"11\":1}}],[\"配置参数\",{\"0\":{\"11\":1}}],[\"json\",{\"1\":{\"23\":1}}],[\"json的可视化配置ui\",{\"1\":{\"11\":1}}],[\"javascript混淆\",{\"1\":{\"10\":1}}],[\"tool\",{\"1\":{\"32\":1}}],[\"tabpanel\",{\"1\":{\"11\":1}}],[\"test\",{\"1\":{\"11\":1,\"34\":1,\"36\":1,\"37\":1,\"38\":1}}],[\"theme\",{\"1\":{\"1\":1,\"3\":1}}],[\"||\",{\"1\":{\"10\":1}}],[\"=>\",{\"1\":{\"10\":2,\"18\":1,\"33\":1}}],[\"=\",{\"1\":{\"10\":1,\"33\":1}}],[\"obj\",{\"1\":{\"10\":1}}],[\"csv\",{\"1\":{\"36\":1}}],[\"conf\",{\"1\":{\"23\":1,\"27\":1}}],[\"config\",{\"1\":{\"11\":1}}],[\"console\",{\"1\":{\"18\":1}}],[\"const\",{\"1\":{\"10\":1,\"33\":1}}],[\"chart\",{\"1\":{\"5\":1,\"6\":1,\"7\":1,\"8\":1,\"9\":1}}],[\"参数管理\",{\"0\":{\"10\":1}}],[\"array\",{\"1\":{\"33\":2}}],[\"axisdataview\",{\"1\":{\"8\":1}}],[\"accdataview\",{\"1\":{\"6\":1}}],[\"辅助现场转速传感器的调试安装\",{\"1\":{\"7\":1}}],[\"rk3399\",{\"1\":{\"15\":1}}],[\"rpmdataview\",{\"1\":{\"7\":1}}],[\"record\",{\"1\":{\"36\":1}}],[\"reco\",{\"1\":{\"1\":1}}],[\"转速adc实际时域图\",{\"1\":{\"7\":1}}],[\"转速图表\",{\"0\":{\"7\":1}}],[\"转速时域\",{\"1\":{\"4\":1}}],[\"倍频程切换\",{\"1\":{\"6\":1}}],[\"实数轴切换\",{\"1\":{\"6\":1}}],[\"左侧特征值\",{\"1\":{\"6\":1,\"7\":1}}],[\"左侧显示特征值\",{\"1\":{\"5\":1}}],[\"加速度直流模式\",{\"1\":{\"22\":1}}],[\"加速度无电流源模式\",{\"1\":{\"22\":1}}],[\"加速度数据列表显示\",{\"1\":{\"9\":1}}],[\"加速度图表\",{\"0\":{\"6\":1}}],[\"加速度时域\",{\"1\":{\"4\":1}}],[\"提供4种内置模板\",{\"1\":{\"38\":1}}],[\"提供数据重置\",{\"1\":{\"36\":1}}],[\"提供\",{\"1\":{\"32\":1}}],[\"提供背景壁纸切换与下载\",{\"1\":{\"16\":1}}],[\"提供csv格式数据下载方式\",{\"1\":{\"9\":1}}],[\"提供对数轴\",{\"1\":{\"6\":1}}],[\"提供时域\",{\"1\":{\"5\":1,\"6\":1}}],[\"提供配置参数热更新\",{\"1\":{\"3\":1}}],[\"dp\",{\"1\":{\"33\":1}}],[\"device\",{\"1\":{\"23\":1}}],[\"database\",{\"1\":{\"28\":1}}],[\"dataview\",{\"0\":{\"1\":1,\"2\":1,\"3\":1},\"1\":{\"0\":1}}],[\"dashboard\",{\"1\":{\"19\":1}}],[\"dhl\",{\"1\":{\"15\":1}}],[\"disk\",{\"1\":{\"15\":1}}],[\"disdataview\",{\"1\":{\"5\":1}}],[\"位移模式\",{\"1\":{\"22\":1}}],[\"位移\",{\"1\":{\"9\":1}}],[\"位移图表\",{\"0\":{\"5\":1}}],[\"位移时域\",{\"1\":{\"4\":1}}],[\"后续可能会按照实际情况\",{\"1\":{\"4\":1}}],[\"轴心轨迹\",{\"0\":{\"8\":1},\"1\":{\"4\":1}}],[\"轴心轨迹图\",{\"1\":{\"2\":1}}],[\"频域有效\",{\"1\":{\"6\":1}}],[\"频域切换\",{\"1\":{\"5\":1}}],[\"频域\",{\"1\":{\"4\":2,\"6\":1}}],[\"进行关闭\",{\"1\":{\"4\":1}}],[\"你可以通过\",{\"1\":{\"4\":1}}],[\"重构\",{\"1\":{\"3\":1}}],[\"数据校准\",{\"1\":{\"37\":1}}],[\"数据校准功能\",{\"1\":{\"36\":1}}],[\"数据采集按钮\",{\"1\":{\"34\":1}}],[\"数据测试中的试验次数\",{\"1\":{\"34\":1}}],[\"数据测试中的标准参考值\",{\"1\":{\"34\":1}}],[\"数据更新使能\",{\"1\":{\"30\":2}}],[\"数据主屏一方面用于观察数据状态\",{\"1\":{\"34\":1}}],[\"数据主屏中的通道报警遮罩功能开关\",{\"1\":{\"31\":1}}],[\"数据主屏\",{\"0\":{\"34\":1},\"1\":{\"30\":1,\"32\":1}}],[\"数据库统计\",{\"0\":{\"28\":1}}],[\"数据库统计条数与数据库抽检结果展示组件\",{\"1\":{\"3\":1}}],[\"数据列表\",{\"0\":{\"9\":1}}],[\"数据统计组件\",{\"1\":{\"2\":1}}],[\"235\",{\"1\":{\"3\":1}}],[\"26\",{\"0\":{\"3\":1}}],[\"2\",{\"0\":{\"3\":1},\"1\":{\"3\":1}}],[\"2023\",{\"0\":{\"2\":1,\"3\":1}}],[\"2022\",{\"0\":{\"1\":1}}],[\"移除了服务器留言功能\",{\"1\":{\"2\":1}}],[\"以适应新增图表功能\",{\"1\":{\"2\":1}}],[\"web环境\",{\"1\":{\"28\":1}}],[\"websocket接收到服务器数据时将启动自动采集的测量\",{\"1\":{\"35\":1}}],[\"websocket的登录地址与端口路径\",{\"1\":{\"30\":1}}],[\"websocket连接后\",{\"1\":{\"23\":1}}],[\"websocket\",{\"1\":{\"20\":1,\"30\":1}}],[\"websocket新增数据包类型\",{\"1\":{\"2\":1}}],[\"world\",{\"1\":{\"18\":1}}],[\"wallpaper\",{\"1\":{\"16\":1}}],[\"ws\",{\"0\":{\"1\":1,\"2\":1,\"3\":1},\"1\":{\"0\":1}}],[\"记录网络日志与报警次数\",{\"1\":{\"2\":1}}],[\"新增任务类型\",{\"1\":{\"37\":1}}],[\"新增功能\",{\"1\":{\"22\":4}}],[\"新增\",{\"1\":{\"2\":2,\"3\":3}}],[\"persistedstate\",{\"1\":{\"2\":1}}],[\"持久化方案由手动管理转为\",{\"1\":{\"2\":1}}],[\"部分选项调整为默认使能\",{\"1\":{\"2\":1}}],[\"优化了自动采集部分的计算逻辑\",{\"1\":{\"3\":1}}],[\"优化\",{\"1\":{\"2\":3,\"3\":2}}],[\"1\",{\"0\":{\"2\":1},\"1\":{\"4\":1}}],[\"10\",{\"0\":{\"1\":1}}],[\"6\",{\"1\":{\"1\":1}}],[\"vuex\",{\"1\":{\"2\":1}}],[\"vuepress\",{\"1\":{\"1\":1,\"3\":1}}],[\"v1\",{\"0\":{\"1\":1,\"2\":1,\"3\":1},\"1\":{\"1\":1}}],[\"第一版release\",{\"1\":{\"1\":1}}],[\"国庆节赶工制作\",{\"1\":{\"1\":1}}],[\"000\",{\"1\":{\"35\":1}}],[\"08\",{\"0\":{\"3\":1}}],[\"03\",{\"0\":{\"2\":1}}],[\"05\",{\"0\":{\"2\":1}}],[\"06\",{\"0\":{\"1\":1}}],[\"0\",{\"0\":{\"1\":2,\"2\":1,\"3\":1},\"1\":{\"1\":1,\"3\":2,\"33\":2}}],[\"的更新日志\",{\"1\":{\"0\":1}}],[\"相关信息\",{\"1\":{\"0\":1,\"4\":1,\"25\":1,\"35\":1}}]],\"serializationVersion\":2}}")).map(([e,t])=>[e,zt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n}})=>{e==="suggest"?self.postMessage(st(t,v[s],n)):e==="search"?self.postMessage(et(t,v[s],n)):self.postMessage({suggestions:st(t,v[s],n),results:et(t,v[s],n)})};
//# sourceMappingURL=index.js.map

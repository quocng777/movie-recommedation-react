import{r as a,R as Z,N as P,j as e,$ as te,k as zt,a3 as Ft,a1 as Le,a4 as Gt,G as Bt,a5 as Ut,U as N,I as Ce,B as E,u as Se,S as Kt,a as Vt,b as Wt,h as Qt,f as Re,a2 as Oe,a6 as qt,a7 as Xt,a8 as Yt,l as Ht,a9 as Jt,aa as Zt,X as es,ab as ts,ac as ss,ad as is,ae as as,af as ns,ag as rs,ah as os,ai as ls,aj as cs,ak as ds,al as us,am as ms,an as fs,H as hs,ao as xs,T as $,ap as _,aq as ps,t as z,ar as gs,as as vs,at as js,au as ws,av as ys,aw as Ee,M as ke,ax as Me}from"./index-CK2H4E3S.js";import{D as Te,a as $e,b as _e,c as ze,d as Fe,e as Ge,f as Be,g as Ns}from"./dialog-B55C9sa1.js";import{n as bs}from"./nodata-image-CAyjc43K.js";import{L as ee}from"./index-fZeKj1nN.js";import{S as Cs,a as Ss,b as Rs,c as Es,e as ks,d as De,u as Ms,f as Ds}from"./select-gTctfduH.js";import{E as Ue,L as Ke}from"./lock-CUYn1Xnq.js";import{T as As}from"./trailer-video-dialog-CSzZJCup.js";import{R as Ps}from"./rating-indicator-C9_GTjKF.js";import{D as Ae,R as Is,a as Ls}from"./delete-modal-CL-ZcFWt.js";import{M as Os}from"./movie-card-IavtQ-7-.js";var Ts=["color","size","title","className"];function se(){return se=Object.assign||function(s){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(s[o]=t[o])}return s},se.apply(this,arguments)}function $s(s,i){if(s==null)return{};var t=_s(s,i),o,r;if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(s);for(r=0;r<l.length;r++)o=l[r],!(i.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(s,o)&&(t[o]=s[o])}return t}function _s(s,i){if(s==null)return{};var t={},o=Object.keys(s),r,l;for(l=0;l<o.length;l++)r=o[l],!(i.indexOf(r)>=0)&&(t[r]=s[r]);return t}var ie=a.forwardRef(function(s,i){var t=s.color,o=s.size,r=s.title,l=s.className,f=$s(s,Ts);return Z.createElement("svg",se({ref:i,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:o,height:o,fill:t,className:["bi","bi-play",l].filter(Boolean).join(" ")},f),r?Z.createElement("title",null,r):null,Z.createElement("path",{d:"M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"}))});ie.propTypes={color:P.string,size:P.oneOfType([P.string,P.number]),title:P.string,className:P.string};ie.defaultProps={color:"currentColor",size:"1em",title:null,className:""};const zs=s=>{const{cast:i,onClick:t}=s,[o,r]=a.useState(!1),l=()=>{r(!0)};return e.jsxs("div",{className:"rounded-lg overflow-hidden cursor-pointer shrink-0",onClick:t,children:[e.jsx("div",{className:"w-40 relative h-[15rem]",children:i.profile_path?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:te(i.profile_path),alt:i.name,onLoad:l,className:`${o?"opacity-100":"opacity-0"} transition-opacity duration-300 ease-in-out`}),!o&&e.jsx(zt,{className:"top-0 absolute bottom-0 right-0 left-0 opacity-100"})]}):e.jsx(Ft,{alt:i.name,className:"h-full flex-shrink-0"})}),e.jsxs("div",{className:"mt-2 flex flex-col w-40",children:[e.jsx("span",{className:"font-semibold text-ellipsis line-clamp-1",children:i.name}),e.jsx("span",{className:"text-sm text-ellipsis line-clamp-1",children:i.character})]})]})};function Fs(s){const{children:i}=s,[t,o]=a.useState(""),[r,l]=a.useState(""),[f,h]=a.useState(Le.PUBLIC),[u,c]=a.useState(!1),[x,g]=a.useState(""),[m,{isSuccess:p,isLoading:d,data:w}]=Gt(),j=Bt(),b=y=>{g(""),o(y.target.value)},R=y=>{l(y.target.value)},I=y=>{h(y)},v=()=>{if(!t.trim())return g("Name is required!");m({name:t,description:r,accessibility:f})};return a.useEffect(()=>{p&&(j(Ut(w.data)),N({title:"Success",description:`Added ${t} playlist 🍿`}),c(!1))},[p,w]),e.jsxs(Te,{open:u,onOpenChange:c,children:[e.jsx($e,{asChild:!0,children:i}),e.jsxs(_e,{className:"sm:max-w-sm",children:[e.jsxs(ze,{children:[e.jsx(Fe,{children:"Create new playlist"}),e.jsx(Ge,{children:"Fill out the form the create new dialog"})]}),e.jsxs("div",{className:"my-6 px-8 grid gap-y-4",children:[e.jsxs("div",{className:"grid gap-y-2",children:[e.jsx(ee,{htmlFor:"name",className:"text-sm",children:"Name (required)"}),e.jsx(Ce,{id:"name",value:t,onChange:b}),e.jsx("p",{className:"text-xs text-red-500",children:x})]}),e.jsxs("div",{className:"grid gap-y-2",children:[e.jsx(ee,{className:"text-sm",children:"Description"}),e.jsx(Ce,{id:"description",value:r,onChange:R})]}),e.jsxs("div",{className:"grid gap-y-2 w-full grid-1",children:[e.jsx(ee,{className:"text-sm",children:"Accessibility"}),e.jsxs(Cs,{value:f,onValueChange:I,children:[e.jsx(Ss,{children:e.jsx(Rs,{})}),e.jsx(Es,{className:"!w-full",children:e.jsxs(ks,{className:"!w-full",children:[e.jsx(De,{value:"public",className:"!w-full",children:e.jsxs("div",{className:"flex justify-between items-center gap-8",children:[e.jsx(Ue,{className:"w-6"}),e.jsx("p",{children:"Public"})]})}),e.jsx(De,{value:"private",className:"!w-full",children:e.jsxs("span",{className:"flex justify-between items-center gap-8",children:[e.jsx(Ke,{className:"w-6"}),e.jsx("p",{children:"Private"})]})})]})})]})]})]}),e.jsxs(Be,{className:"w-full flex justify-around !flex-row items-center sm:justify-around",children:[e.jsx(Ns,{children:e.jsx(E,{variant:"secondary",children:"Close"})}),e.jsx(E,{variant:"secondary",onClick:v,className:`${d?"pointer-events-none":""}`,children:"Create"})]})]})]})}function Pe(s,i){if(typeof s=="function")return s(i);s!=null&&(s.current=i)}function Gs(...s){return i=>{let t=!1;const o=s.map(r=>{const l=Pe(r,i);return!t&&typeof l=="function"&&(t=!0),l});if(t)return()=>{for(let r=0;r<o.length;r++){const l=o[r];typeof l=="function"?l():Pe(s[r],null)}}}}function Ve(...s){return a.useCallback(Gs(...s),s)}function Ie(s,i,{checkForDefaultPrevented:t=!0}={}){return function(r){if(s==null||s(r),t===!1||!r.defaultPrevented)return i==null?void 0:i(r)}}function Bs(s,i){return a.useReducer((t,o)=>i[t][o]??t,s)}var We=s=>{const{present:i,children:t}=s,o=Us(i),r=typeof t=="function"?t({present:o.isPresent}):a.Children.only(t),l=Ve(o.ref,Ks(r));return typeof t=="function"||o.isPresent?a.cloneElement(r,{ref:l}):null};We.displayName="Presence";function Us(s){const[i,t]=a.useState(),o=a.useRef({}),r=a.useRef(s),l=a.useRef("none"),f=s?"mounted":"unmounted",[h,u]=Bs(f,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return a.useEffect(()=>{const c=K(o.current);l.current=h==="mounted"?c:"none"},[h]),Se(()=>{const c=o.current,x=r.current;if(x!==s){const m=l.current,p=K(c);s?u("MOUNT"):p==="none"||(c==null?void 0:c.display)==="none"?u("UNMOUNT"):u(x&&m!==p?"ANIMATION_OUT":"UNMOUNT"),r.current=s}},[s,u]),Se(()=>{if(i){let c;const x=i.ownerDocument.defaultView??window,g=p=>{const w=K(o.current).includes(p.animationName);if(p.target===i&&w&&(u("ANIMATION_END"),!r.current)){const j=i.style.animationFillMode;i.style.animationFillMode="forwards",c=x.setTimeout(()=>{i.style.animationFillMode==="forwards"&&(i.style.animationFillMode=j)})}},m=p=>{p.target===i&&(l.current=K(o.current))};return i.addEventListener("animationstart",m),i.addEventListener("animationcancel",g),i.addEventListener("animationend",g),()=>{x.clearTimeout(c),i.removeEventListener("animationstart",m),i.removeEventListener("animationcancel",g),i.removeEventListener("animationend",g)}}else u("ANIMATION_END")},[i,u]),{isPresent:["mounted","unmountSuspended"].includes(h),ref:a.useCallback(c=>{c&&(o.current=getComputedStyle(c)),t(c)},[])}}function K(s){return(s==null?void 0:s.animationName)||"none"}function Ks(s){var o,r;let i=(o=Object.getOwnPropertyDescriptor(s.props,"ref"))==null?void 0:o.get,t=i&&"isReactWarning"in i&&i.isReactWarning;return t?s.ref:(i=(r=Object.getOwnPropertyDescriptor(s,"ref"))==null?void 0:r.get,t=i&&"isReactWarning"in i&&i.isReactWarning,t?s.props.ref:s.props.ref||s.ref)}var Vs=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],Qe=Vs.reduce((s,i)=>{const t=a.forwardRef((o,r)=>{const{asChild:l,...f}=o,h=l?Kt:i;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),e.jsx(h,{...f,ref:r})});return t.displayName=`Primitive.${i}`,{...s,[i]:t}},{}),ae="Checkbox",[Ws,ci]=Vt(ae),[Qs,qs]=Ws(ae),qe=a.forwardRef((s,i)=>{const{__scopeCheckbox:t,name:o,checked:r,defaultChecked:l,required:f,disabled:h,value:u="on",onCheckedChange:c,form:x,...g}=s,[m,p]=a.useState(null),d=Ve(i,v=>p(v)),w=a.useRef(!1),j=m?x||!!m.closest("form"):!0,[b=!1,R]=Wt({prop:r,defaultProp:l,onChange:c}),I=a.useRef(b);return a.useEffect(()=>{const v=m==null?void 0:m.form;if(v){const y=()=>R(I.current);return v.addEventListener("reset",y),()=>v.removeEventListener("reset",y)}},[m,R]),e.jsxs(Qs,{scope:t,state:b,disabled:h,children:[e.jsx(Qe.button,{type:"button",role:"checkbox","aria-checked":k(b)?"mixed":b,"aria-required":f,"data-state":He(b),"data-disabled":h?"":void 0,disabled:h,value:u,...g,ref:d,onKeyDown:Ie(s.onKeyDown,v=>{v.key==="Enter"&&v.preventDefault()}),onClick:Ie(s.onClick,v=>{R(y=>k(y)?!0:!y),j&&(w.current=v.isPropagationStopped(),w.current||v.stopPropagation())})}),j&&e.jsx(Xs,{control:m,bubbles:!w.current,name:o,value:u,checked:b,required:f,disabled:h,form:x,style:{transform:"translateX(-100%)"},defaultChecked:k(l)?!1:l})]})});qe.displayName=ae;var Xe="CheckboxIndicator",Ye=a.forwardRef((s,i)=>{const{__scopeCheckbox:t,forceMount:o,...r}=s,l=qs(Xe,t);return e.jsx(We,{present:o||k(l.state)||l.state===!0,children:e.jsx(Qe.span,{"data-state":He(l.state),"data-disabled":l.disabled?"":void 0,...r,ref:i,style:{pointerEvents:"none",...s.style}})})});Ye.displayName=Xe;var Xs=s=>{const{control:i,checked:t,bubbles:o=!0,defaultChecked:r,...l}=s,f=a.useRef(null),h=Ms(t),u=Qt(i);a.useEffect(()=>{const x=f.current,g=window.HTMLInputElement.prototype,p=Object.getOwnPropertyDescriptor(g,"checked").set;if(h!==t&&p){const d=new Event("click",{bubbles:o});x.indeterminate=k(t),p.call(x,k(t)?!1:t),x.dispatchEvent(d)}},[h,t,o]);const c=a.useRef(k(t)?!1:t);return e.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:r??c.current,...l,tabIndex:-1,ref:f,style:{...s.style,...u,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function k(s){return s==="indeterminate"}function He(s){return k(s)?"indeterminate":s?"checked":"unchecked"}var Je=qe,Ys=Ye;const Ze=a.forwardRef(({className:s,...i},t)=>e.jsx(Je,{ref:t,className:Re("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",s),...i,children:e.jsx(Ys,{className:Re("flex items-center justify-center text-current"),children:e.jsx(Ds,{className:"h-4 w-4"})})}));Ze.displayName=Je.displayName;function Hs(s){const{children:i,movieId:t}=s,o=Oe(d=>d.playlist),{data:r,refetch:l}=qt({movieId:t}),[f,{isSuccess:h,isError:u}]=Xt(),[c,{isSuccess:x,isError:g}]=Yt(),m=a.useMemo(()=>r!=null&&r.data?r.data.map(d=>d.id):[],[r]),p=d=>{m.some(w=>w===d)?c({playlistId:d,movieId:t}):f({playlistId:d,movieId:t})};return a.useEffect(()=>{h&&(N({title:"Success",description:`Added ${t} to a playlist 🎉`}),l())},[h]),a.useEffect(()=>{u&&N({title:"Error",description:`Error when adding ${t} to a playlist 😟`})},[u]),a.useEffect(()=>{x&&(N({title:"Success",description:`Removed ${t} to a playlist 🎉`}),l())},[x]),a.useEffect(()=>{g&&N({title:"Error",description:`Error when removing ${t} to a playlist 😟`})},[g]),e.jsxs(Te,{children:[e.jsx($e,{asChild:!0,children:i}),e.jsxs(_e,{className:"sm:max-w-sm",children:[e.jsxs(ze,{children:[e.jsx(Fe,{children:"Add movie to playlist"}),e.jsx(Ge,{children:"Choose one of following playlists"})]}),e.jsx("div",{className:"my-6 flex flex-col w-full gap-6",children:o.length?o.map(d=>e.jsxs("div",{className:"flex w-full justify-between gap-6",children:[e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsx(Ze,{className:"size-5",value:d.id,checked:m.some(w=>w===d.id),onClick:()=>p(d.id)},d.id),e.jsx("label",{className:"text-base text-medium font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:d.name})]}),d.accessibility===Le.PUBLIC?e.jsx(Ue,{}):e.jsx(Ke,{})]},d.id)):e.jsxs("div",{className:"grid w-full items-center gap-6 justify-center",children:[e.jsx("img",{src:bs,className:"max-w-40 justify-self-center"}),e.jsx("p",{className:"text-sm",children:"You don't have any playlists, create a new playlist now"})]})}),e.jsx(Be,{className:"w-full",children:e.jsx(Fs,{children:e.jsx(E,{type:"button",variant:"secondary",className:"w-full",children:"Create new playlist"})})})]})]})}const Js={en:"English",vn:"Vietnamese"},di=()=>{var we;const s=Ht(),{id:i}=Jt(),[t,o]=a.useState(),[r,l]=a.useState([]),[f,h]=a.useState([]),[u,c]=a.useState(!0),[x,g]=a.useState(!0),{isLiked:m,likeMovie:p,isInWatchLaterList:d,watchLater:w}=Zt(Number(i)),j=Oe(n=>!!n.auth.user),[b,R]=a.useState(null),[I,{data:v,isSuccess:y,error:L}]=es(),[et,{data:tt,isSuccess:ne}]=ts(),[st,{data:it,isSuccess:re}]=ss(),{data:V,isSuccess:oe}=is(parseInt(i)),[W,at]=a.useState(),[nt,le]=a.useState(!1),[rt,Q]=a.useState(!1),{data:ce,isSuccess:de}=as(parseInt(i)),[ot,{isSuccess:ue,isError:lt}]=ns(),[O,F]=a.useState(0),[ct]=rs(),q=a.useRef(!1),[dt,me]=a.useState(!1),[ut,X]=a.useState(!1),[fe,Y]=a.useState(!1),[G,mt]=a.useState([]),[he,ft]=a.useState(0),[M,xe]=a.useState(),[T,{data:D,isSuccess:pe}]=os(),[ht,{isSuccess:ge,isError:xt}]=ls(),[pt,{isSuccess:ve,isError:gt}]=cs(),[vt,{isSuccess:je,isError:jt}]=ds(),H=a.useRef(null),wt=window.location.hash.substring(1),[yt,J]=a.useState(!0),[Nt,bt]=a.useState([]),[Ct]=us(),St=()=>{j&&p()},Rt=()=>{j&&w()},Et=()=>{le(!0)},kt=n=>{n!==O&&(ot({movieId:parseInt(i),score:n}),F(n),Q(!1))},Mt=n=>{setTimeout(()=>{if(n.preventDefault(),n.stopPropagation(),!j||q.current){q.current=!1;return}Q(!0)},300)},Dt=n=>{n.preventDefault(),n.stopPropagation(),q.current=!0,!(!j||O===0)&&(ct(t==null?void 0:t.id),F(0))},At=n=>{s("/movie/"+n)},Pt=n=>{ht({movieId:parseInt(i),content:n}),T({movieId:t?t.id:0,limit:1})},It=(n,C)=>{pt({reviewId:n,movieId:parseInt(i),content:C})},Lt=n=>{vt({reviewId:n,movieId:parseInt(i)})},Ot=n=>{s("/person/"+n)};a.useEffect(()=>{i&&(c(!0),g(!0),J(!0),R(null),I({id:i}),et({id:i}),st({id:i}),T({movieId:parseInt(i),limit:1}))},[i]),a.useEffect(()=>{if(y&&v&&(o(v.data),c(!1)),L){const n=(L==null?void 0:L.status)||500;R(n===404?"No movie found with the given ID. Please check the ID and try again.":"Something went wrong. Please try again."),c(!1)}},[y,v,L]);const[Tt]=ms();return a.useEffect(()=>{(async()=>{var C,B,ye;if(!(!t||!t.genres.length)){J(!0),R(null);try{const A=[];for(const U of t.genres){const{data:S,error:be}=await Tt({collection_name:"movies",query:"Genre: "+U.toString(),amount:10,threshold:.25});if(be){console.error(`Error fetching retriever for genre ${U}:`,be);continue}if(console.log((B=(C=S==null?void 0:S.data)==null?void 0:C.data)==null?void 0:B.result),S!=null&&S.data){const $t=S.data.data.result.map(_t=>_t.toString());A.push(...$t)}console.log(A)}const Ne=[];for(const U of A){const S=await Ct({movie_id:U});S.status==="fulfilled"&&S.data&&Ne.push((ye=S.data)==null?void 0:ye.data)}bt(Ne),console.log("Fetched recommendations for all IDs:",A)}catch(A){console.error("Error fetching recommendations:",A)}finally{J(!1)}}})()},[t]),a.useEffect(()=>{var n;ne&&(l((n=tt.data)==null?void 0:n.cast),g(!1))},[ne]),a.useEffect(()=>{var n;re&&h((n=it.data)==null?void 0:n.keywords)},[re]),a.useEffect(()=>{var n,C;oe&&at(((n=V.data)==null?void 0:n.results.find(B=>B.type=="Trailer"))??((C=V.data)==null?void 0:C.results[0]))},[oe,V]),a.useEffect(()=>{var n;de&&F((n=ce.data)==null?void 0:n.score)},[de,ce]),a.useEffect(()=>{lt&&(F(0),N({title:"Error",description:`Error when added rating for ${t==null?void 0:t.title} 😰`}))}),a.useEffect(()=>{ue&&N({title:"Success",description:`Added rating for ${t==null?void 0:t.title}`})},[ue]),a.useEffect(()=>{var n;pe&&(console.log("reviewData",D),mt((n=D.data)!=null&&n.reviews?D.data.reviews:[]),ft(D.data?D.data.total:0))},[pe,D]),a.useEffect(()=>{xt&&N({title:"Error",description:`Error when added review for ${t==null?void 0:t.title} 😰`})}),a.useEffect(()=>{ge&&(T({movieId:t?t.id:0,limit:1}),me(!1),N({title:"Success",description:`Added review for ${t==null?void 0:t.title}`}))},[ge]),a.useEffect(()=>{gt&&N({title:"Error",description:`Error when edited review for ${t==null?void 0:t.title} 😰`})}),a.useEffect(()=>{ve&&(X(!1),T({movieId:t?t.id:0,limit:1}),N({title:"Success",description:`Edited review for ${t==null?void 0:t.title}`}))},[ve]),a.useEffect(()=>{jt&&N({title:"Error",description:`Error when deleted review for ${t==null?void 0:t.title} 😰`})}),a.useEffect(()=>{je&&(Y(!1),T({movieId:t?t.id:0,limit:1}),N({title:"Success",description:`Deleted review for ${t==null?void 0:t.title}`}))},[je]),a.useLayoutEffect(()=>{wt=="cast"&&H.current&&H.current.scrollIntoView({behavior:"smooth"})},[u,t]),u?e.jsx(fs,{}):b?e.jsx("div",{className:"flex p-4 justify-center",children:b}):t?e.jsxs("div",{className:"min-h-screen flex flex-col text-white",children:[e.jsx(hs,{children:e.jsxs("title",{children:["Move details - $",t.title]})}),e.jsxs("div",{className:"relative h-[600px] bg-cover bg-center flex items-center",style:{backgroundImage:`url(${te(t.backdrop_path||t.poster_path)})`},children:[e.jsx("div",{className:"absolute inset-0 bg-black bg-opacity-60"}),e.jsxs("div",{className:"relative z-10 max-w-5xl mx-auto px-6 py-12 flex gap-8 text-white",children:[e.jsx("div",{className:"w-1/3",children:e.jsx("img",{src:te(t.poster_path),alt:t.title,className:"w-full h-auto rounded-lg shadow-lg"})}),e.jsxs("div",{className:"w-2/3",children:[e.jsx("div",{className:"flex justify-between items-center",children:e.jsx("h1",{className:"text-5xl font-bold",children:t.title})}),e.jsx("span",{className:"text-lg",children:new Date(t.release_date).toLocaleDateString()}),e.jsx("div",{className:"flex gap-4 flex-wrap mt-4",children:(we=t.genres)==null?void 0:we.map(n=>e.jsx("span",{className:"bg-gray-700 px-4 py-1 rounded-full text-sm",children:n.name},n.id))}),e.jsxs("div",{className:"flex items-center gap-6 mt-6",children:[e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("div",{className:"bg-gray-800 text-white w-12 h-12 rounded-full flex justify-center items-center",children:e.jsx(Ps,{rating:t.vote_average})})}),e.jsx(xs,{onOpenChange:Q,open:rt,selectedRating:O,onRatingClick:kt,children:e.jsxs($,{children:[e.jsx(_,{children:e.jsx(E,{className:"bg-gray-rose-gradient text-white px-4 py-4 rounded-full text-sm hover:scale-105",onClick:Mt,onDoubleClick:Dt,children:O!==0?e.jsxs("div",{className:"flex font-bold gap-2 items-center",children:[e.jsx("span",{className:"text-xl",children:ps[O].emoji}),e.jsx("p",{children:"Your rating"})]}):e.jsx("p",{className:"font-bold",children:"Rating this movie 🌟"})})}),e.jsx(z,{children:j?e.jsx("p",{children:"Add rating for this movie"}):e.jsx("p",{children:"Login to add rating for this movie"})})]})})]}),e.jsxs("div",{className:"flex gap-4 mt-6 text-white",children:[e.jsxs($,{children:[e.jsx(_,{asChild:!0,children:e.jsx(Hs,{movieId:t.id,children:e.jsx(E,{size:"icon",className:"bg-gray-800 rounded-full text-white hover:bg-background hover:text-sky-500",children:e.jsx(gs,{})})})}),e.jsx(z,{children:e.jsx("p",{children:j?"Add to playlist":"Login to add to your playlist"})})]}),e.jsxs($,{children:[e.jsx(_,{asChild:!0,children:e.jsx(E,{size:"icon",className:"bg-gray-800 rounded-full text-white hover:bg-background hover:text-pink-500",onClick:St,children:m?e.jsx(vs,{className:"text-pink-500"}):e.jsx(js,{})})}),e.jsx(z,{children:e.jsx("p",{children:j?m?"Remove out of like list":"Like this movie":"Login to like this movie"})})]}),e.jsxs($,{children:[e.jsx(_,{asChild:!0,children:e.jsx(E,{size:"icon",className:"bg-gray-800 rounded-full text-white hover:bg-background hover:text-green-500",onClick:Rt,children:d?e.jsx(ys,{className:"text-green-500"}):e.jsx(ws,{})})}),e.jsx(z,{children:e.jsx("p",{children:j?d?"Remove from watch list":"Add to watch list":"Login to add to your watch list"})})]}),W&&e.jsxs($,{children:[e.jsx(_,{asChild:!0,children:e.jsx(E,{size:"icon",className:"bg-blue-500 rounded-full text-white hover:bg-blue-500 hover:bg-opacity-80",onClick:Et,children:e.jsx(ie,{})})}),e.jsx(z,{children:e.jsx("p",{children:"View trailer"})})]})]}),e.jsx("p",{className:"italic text-lg mt-6",children:t.tagline}),e.jsx("p",{className:"mt-4",children:t.overview})]})]})]}),e.jsxs("div",{className:"flex flex-1 w-full p-2 mx-auto mt-6 gap-6",children:[e.jsxs("div",{className:"w-3/4 px-4 flex flex-col space-y-8",ref:H,children:[e.jsxs("div",{className:"px-2",children:[e.jsx("h2",{className:"text-lg font-bold",children:"Cast"}),e.jsxs(Ee,{className:"w-full overflow-x-auto",children:[e.jsxs("div",{className:"flex gap-4 py-6",children:[x&&new Array(10).fill(null).map((n,C)=>e.jsx(ke,{},C)),r.length===0&&!x&&e.jsx("p",{className:"text-gray-500",children:"No cast available"}),r.map(n=>e.jsx(zs,{cast:n,onClick:()=>Ot(n.id.toString())},n.id))]}),e.jsx(Me,{orientation:"horizontal"})]})]}),e.jsxs("div",{className:"p-2",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{className:"flex items-center space-x-2 font-semibold",onClick:()=>{s(`/movie/${t.id}/reviews`)},children:[e.jsx("span",{className:"w-1 h-8 bg-rose-600"}),e.jsxs("span",{className:"text-xl text-white hover:text-rose-600 cursor-pointer hover:transition-colors",children:["User reviews ",`(${he||0})`]})]}),e.jsx(Ae,{triggerElement:e.jsx(E,{className:"text-gray-200 rounded-full bg-rose-900 hover:bg-rose-800 hover:text-white py-2 px-4",children:"Add New Review"}),open:dt,onOpenChange:me,onSave:Pt})]}),e.jsx("div",{className:"flex my-4",children:G.length>0?e.jsx(Is,{review:G[0],onEdit:()=>{xe(G[0]),X(!0)},onDelete:()=>{xe(G[0]),Y(!0)}}):e.jsx("div",{className:"text-gray-500",children:"No review available"})}),e.jsx(E,{className:"w-full border text-gray-300 rounded-full bg-transparent hover:bg-rose-900 hover:text-gray-200 transition-all duration-200",onClick:()=>{s(`/movie/${t.id}/reviews`)},children:"View all"})]}),e.jsxs("div",{className:"px-2 max-w-[1000px] mx-auto",children:[e.jsx("div",{className:"flex items-center space-x-6",children:e.jsx("h4",{className:"text-lg",children:"Recommend by genres"})}),e.jsxs(Ee,{className:"w-full",children:[e.jsxs("div",{className:"flex gap-4 py-6",children:[yt&&new Array(10).fill(null).map((n,C)=>e.jsx(ke,{},C)),Nt.map(n=>e.jsx(Os,{movie:n,onClick:()=>At(n.id.toString())},n.id))]}),e.jsx(Me,{orientation:"horizontal"})]})]})]}),e.jsxs("div",{className:"w-1/4 pl-4",children:[e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"Status:"}),e.jsx("p",{children:t.status})]}),e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"Original Language:"}),e.jsx("p",{children:Js[t.original_language]||t.original_language})]}),e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"Budget:"}),e.jsxs("p",{children:["$",t.budget.toLocaleString()]})]}),e.jsxs("p",{className:"mb-2",children:[e.jsx("strong",{children:"Revenue:"}),e.jsxs("p",{children:["$",t.revenue.toLocaleString()]})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx("h3",{className:"font-semibold mb-2",children:"Keywords"}),f.length>0?e.jsx("div",{className:"flex flex-wrap gap-2",children:f.map(n=>e.jsx("span",{className:"bg-gray-700 px-3 py-1 rounded-full text-sm",children:n.name},n.id))}):e.jsx("div",{children:" Loading...."})]})]})]}),W&&e.jsx(As,{video:W,open:nt,onOpenChange:le}),e.jsx(Ae,{open:ut,onOpenChange:X,triggerElement:e.jsx(e.Fragment,{}),onSave:n=>{M&&It(M.id,n)},initialText:M==null?void 0:M.comment}),e.jsx(Ls,{isOpen:fe,onClose:()=>Y(!fe),onDelete:()=>{M&&Lt(M.id)},content:"Are you sure you want to delete this review?"})]}):e.jsx("div",{className:"flex p-4 justify-center",children:"Movie not found"})};export{di as default};

var U=Object.defineProperty;var o=(t,e)=>U(t,"name",{value:e,configurable:!0});import{o as F}from"./rolldown-runtime-CzYk_CEw.js";import{t as J}from"./react-HNhQAnN4.js";import{o as j,t as v,u as L}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as X}from"./jsx-runtime-Br4tQxt1.js";import{t as b}from"./src-CIbK0PmT.js";import{t as Y}from"./Typography-BVFm109i.js";import{i as E,n as C}from"./core-DtZ76Qs_.js";import"./Avatar-BO8j0HaH.js";import{t as K}from"./src-1jRqCCWR.js";import"./box-DLdZVqFP.js";import"./typography-D38L8NZ6.js";var d=F(J());j();var Q="calc(100% / 3)",s={NAVIGATION:"AppHeader.Navigation",APP_NAME:"AppHeader.AppName",LOGO:"AppHeader.Logo",ACTIONS:"AppHeader.Actions"},Z=v.header`
  ${({theme:t,isMobile:e})=>{const n=t.spacing.spacing_60;return`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${t.spacing.spacing_50};
      width: 100%;
      height: ${e?"72px":"64px"};
      overflow: hidden;
      padding: 0 ${n};
      position: fixed;
      top: 0;
      z-index: 1;
      background: ${t.palette.surface.contrast};
    `}}
`,u=X(),M=(0,d.createContext)(null),tt=o(({value:t,children:e})=>(0,u.jsx)(M.Provider,{value:t,children:e}),"AppHeaderContextProvider"),y=o(()=>{const t=(0,d.useContext)(M);if(!t)throw new Error("AppHeader compound components must be used within AppHeader");return t},"useAppHeaderContext"),et=o((t,e,n,r)=>({isStandard:t==="standard",isCompact:t==="compact",isNavCenter:e==="center",isNavLeft:e==="left",isNavRight:e==="right",isNavCompact:t==="compact"||!n,hasAppName:!!n,isActionsPositionRight:r}),"computeHeaderState"),nt=o((t,e)=>t==="standard"&&!!e,"shouldCenterLogo"),m=o(t=>t.type?.displayName,"getDisplayName"),I=o((t,e)=>{const n=d.Children.toArray(t);for(const r of n)if(d.isValidElement(r)){if(e(r))return r;const i=r.props;if(i?.children){const a=I(i.children,e);if(a)return a}}return null},"findChildRecursive"),O=o((t,e)=>I(t,n=>m(n)===e),"findChildByType"),rt=o((t,e,n,r)=>I(t,i=>{if(m(i)!==e)return!1;const a=i.props;return n in a&&a[n]===r}),"findChildByTypeAndProp"),it=o((t,e,n,r)=>d.Children.toArray(t).findIndex(i=>{if(!d.isValidElement(i)||m(i)!==e)return!1;const a=i.props;return n in a&&a[n]===r}),"findChildIndexByTypeAndProp"),T=o((t,e,n)=>{if(!d.isValidElement(t))return n;const r=t.props;return e in r&&r[e]!==void 0?r[e]:n},"extractProp"),R=o((t,e)=>{const n={};return d.Children.toArray(t).forEach((r,i)=>{if(d.isValidElement(r)){const a=m(r);a&&e.includes(a)&&(n[a]=i)}}),n},"findChildIndices"),S=o((t,e)=>Math.abs(t-e)===1,"areSiblings"),V=o((t,e,n,r)=>{const i=d.Children.toArray(t),a=[];let p=0;for(;p<i.length;){const l=i[p],c=p+1<i.length?i[p+1]:null;if(d.isValidElement(l)&&d.isValidElement(c)){const f=m(l),h=m(c);if(f&&h&&e.includes(f)&&e.includes(h)&&S(p,p+1)){a.push((0,u.jsxs)(K,{style:{display:"flex",flexWrap:"nowrap",flexDirection:n?"column":"row",alignItems:n?"flex-start":"center",justifyContent:n?"center":"flex-start",height:n?"48px":"auto",gap:n?b.spacing.spacing_0:b.spacing.spacing_30,...r},children:[l,c]},`group-${p}`)),p+=2;continue}}a.push(l),p++}return a},"groupSiblingComponents"),at=o(t=>!t.isNavRight||!t.isActionsPositionRight?!1:t.isCompact||t.isStandard&&!t.hasAppName,"shouldGroupNavigationAndActions"),ot=o((t,e,n)=>{const r=t,i=R(r,[s.NAVIGATION,s.ACTIONS])[s.NAVIGATION]??-1,a=it(r,s.ACTIONS,"position","right");return i!==-1&&a!==-1&&S(i,a)?V(r,[s.NAVIGATION,s.ACTIONS],e,{position:"fixed",right:n.spacing.spacing_60}):Array.isArray(t)?t:d.Children.toArray(t)},"groupNavigationAndActionsIfSiblings"),st=o(({type:t="standard",style:e,children:n,...r})=>{const i=L(),a=E(`(max-width: ${i.breakpoints.mq3}px)`),p=T(O(n,s.NAVIGATION),"position","center"),l=T(O(n,s.APP_NAME),"name",void 0),c=R(n,[s.APP_NAME,s.LOGO,s.NAVIGATION,s.ACTIONS]),f=c[s.APP_NAME]??-1,h=c[s.LOGO]??-1,x=nt(t,l),N=f!==-1&&h!==-1&&S(f,h),w=rt(n,s.ACTIONS,"position","right")!==null,g=et(t,p,l,w),$=(0,d.useMemo)(()=>({state:g,shouldCenterLogo:x,hasAppNameAsSibling:N,isMobile:a}),[g,x,N,a]),_=(0,d.useMemo)(()=>{let A=V(n,[s.APP_NAME,s.LOGO],a);return at(g)&&(A=ot(A,a,i)),A},[n,g,a,i]);return(0,u.jsx)(tt,{value:$,children:(0,u.jsx)(Z,{isMobile:a,style:e,...r,children:_})})},"AppHeader$1"),pt=o((t,e)=>t==="left"?"relative":e.isNavRight?e.isStandard&&e.hasAppName?"fixed":"relative":"fixed","getActionsPosition"),dt=o((t,e,n)=>{if(e==="left")return"auto";const r=t.spacing.spacing_60;return n.isNavRight?n.isStandard&&n.hasAppName?r:0:r},"getActionsRight"),lt=o((t,e)=>{if(e==="left")return"auto";const{isNavLeft:n,isStandard:r,hasAppName:i}=t;return n&&r&&!i?"auto":Q},"getActionsMinWidth"),ct=v.div`
  ${({theme:t,state:e,position:n="right"})=>`
      display: flex;
      align-items: center;
      position: ${pt(n,e)};
      right: ${dt(t,n,e)};
      min-width: ${lt(e,n)};
      flex-direction: row;
      justify-content: ${n==="left"?"flex-start":"flex-end"};
      gap: ${t.spacing.spacing_50};
    `}
`;j();var G=o(({children:t,position:e="right",...n})=>{const r=L(),i=E(`(max-width: ${r.breakpoints.mq3}px)`),{state:a}=y();return(0,u.jsx)(ct,{isMobile:i,position:e,state:a,...n,children:t})},"ActionsBase");G.displayName="AppHeader.Actions";var ut=C(G),H=v.div`
  ${({theme:t,state:e,isMobile:n})=>`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      min-width: auto;
      width: auto;
      max-width: 170px;
      max-height: 50px;
      
      ${n&&e.isStandard?"justify-content: flex-start;":""}

      @media screen and (min-width: ${t.breakpoints.mq3}px) {
        max-width: 250px;
      }
      
      > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
     
    `}
`,B=o(({name:t,children:e,...n})=>{const{state:r,isMobile:i}=y(),a=r.isStandard?"h5":"h5Bold",p=i?"h6Bold":a,l=e??t;return l?e?(0,u.jsx)(H,{isMobile:i,state:r,...n,children:l}):(0,u.jsx)(H,{isMobile:i,state:r,...n,children:(0,u.jsx)(Y,{color:"primary.default",element:"span",fontStyles:p,children:l})}):null},"AppNameBase");B.displayName="AppHeader.AppName";var ft=C(B),ht=v.div`
  ${({shouldCenterLogo:t})=>`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      min-width: auto;
      height: auto;
      
      img,
      [data-nextjs-image],
      svg,
      > * {
        display: flex;
        max-height: 54px;
        width: auto;
        height: auto;
        object-fit: contain;
      }

      ${t?`
      width: auto;
      min-width: auto;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    `:""}
    `}
`,k=o(({children:t,...e})=>{const{shouldCenterLogo:n,isMobile:r}=y();return(0,u.jsx)(ht,{shouldCenterLogo:n&&!r,...e,children:t})},"LogoBase");k.displayName="AppHeader.Logo";var gt=C(k),P={absoluteCenter:`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    max-width: calc(100% - 400px); // hardcoded value to avoid layout shift
    min-width: 0;
    overflow: hidden;
  `,autoMargins:`
    margin-left: auto;
    margin-right: auto;
  `},q=o(t=>t.isNavCenter?t.isNavCompact||!t.hasAppName:!1,"shouldUseAbsoluteCenter"),mt=o(t=>q(t)?P.absoluteCenter:t.isNavCenter?P.autoMargins:"","getNavigationCenteringStyles"),At=o((t,e,n)=>t?"center":e?"flex-start":n?"flex-end":"center","getJustifyContent"),vt=v.nav`
  ${({theme:t,state:e})=>{const{isStandard:n,hasAppName:r,isNavCompact:i,isNavLeft:a,isNavRight:p}=e,l=n&&r,c=q(e),f=l?"fixed":"relative",h=i?0:"64px",x=i?"auto":"100%",N=i?"auto":"52px",w=c?"absolute":f,g=c?"50%":h,$=c?"50%":"0",_=c?"auto":"0",A=c?"auto":x,z=At(c,a,p),W=mt(e);return`
      position: ${w};
      top: ${g};
      left: ${$};
      right: ${_};
      z-index: 1;
      width: ${A};
      min-height: ${N};
      height: auto;
      background-color: ${t.palette.surface.contrast};
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: ${z};
      padding: 0 ${t.spacing.spacing_60};

      ${W}
    `}}
`,D=o(({children:t,...e})=>{const{state:n}=y();return(0,u.jsx)(vt,{state:n,...e,children:t})},"NavigationBase");D.displayName="AppHeader.Navigation";var xt=C(D),jt=Object.assign(st,{Logo:gt,AppName:ft,Navigation:xt,Actions:ut});export{jt as t};

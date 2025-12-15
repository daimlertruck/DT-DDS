var F=Object.defineProperty;var r=(t,n)=>F(t,"name",{value:n,configurable:!0});import{j as l}from"./jsx-runtime-Cgz2XvFB.js";import{r as h,R as u}from"./index-CwbBKW39.js";import"./typography-B3nKKPHm.js";import"./index-Drn3RBYP.js";import"./index-DV-VXEUn.js";import{u as G}from"./useMedia-CRgJMRRc.js";import{f as y,d as L}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import{B as J}from"./index-juXVSS06.js";import{t as S}from"./index-Dw_1laFD.js";import{w as v}from"./responsive-Bnmw4mt9.js";import{T as K}from"./Typography-BDc1BtFV.js";const M=64,Y=72,Z=52,j=1,Q="calc(100% / 3)",tt=54,nt=170,et=250,ot=50,d={NAVIGATION:"AppHeader.Navigation",APP_NAME:"AppHeader.AppName",LOGO:"AppHeader.Logo",ACTIONS:"AppHeader.Actions"},it=y.header`
  ${({theme:t,isMobile:n})=>{const e=t.spacing.spacing_60;return`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${t.spacing.spacing_50};
      width: 100%;
      height: ${n?`${Y}px`:`${M}px`};
      overflow: hidden;
      padding: 0 ${e};
      position: fixed;
      top: 0;
      z-index: ${j};
      background: ${t.palette.surface.contrast};
    `}}
`,R=h.createContext(null),st=r(({value:t,children:n})=>l.jsx(R.Provider,{value:t,children:n}),"AppHeaderContextProvider"),w=r(()=>{const t=h.useContext(R);if(!t)throw new Error("AppHeader compound components must be used within AppHeader");return t},"useAppHeaderContext"),rt=r((t,n,e,o)=>({isStandard:t==="standard",isCompact:t==="compact",isNavCenter:n==="center",isNavLeft:n==="left",isNavRight:n==="right",isNavCompact:t==="compact"||!e,hasAppName:!!e,isActionsPositionRight:o}),"computeHeaderState"),at=r((t,n)=>t==="standard"&&!!n,"shouldCenterLogo"),m=r(t=>{var n;return(n=t.type)==null?void 0:n.displayName},"getDisplayName"),H=r((t,n)=>{const e=h.Children.toArray(t);for(const o of e)if(u.isValidElement(o)){if(n(o))return o;const i=o.props;if(i!=null&&i.children){const s=H(i.children,n);if(s)return s}}return null},"findChildRecursive"),T=r((t,n)=>H(t,e=>m(e)===n),"findChildByType"),ct=r((t,n,e,o)=>H(t,i=>{if(m(i)!==n)return!1;const s=i.props;return e in s&&s[e]===o}),"findChildByTypeAndProp"),dt=r((t,n,e,o)=>h.Children.toArray(t).findIndex(s=>{if(!u.isValidElement(s)||m(s)!==n)return!1;const c=s.props;return e in c&&c[e]===o}),"findChildIndexByTypeAndProp"),O=r((t,n,e)=>{if(!u.isValidElement(t))return e;const o=t.props;return n in o&&o[n]!==void 0?o[n]:e},"extractProp"),V=r((t,n)=>{const e={};return h.Children.toArray(t).forEach((i,s)=>{if(u.isValidElement(i)){const a=m(i);a&&n.includes(a)&&(e[a]=s)}}),e},"findChildIndices"),_=r((t,n)=>Math.abs(t-n)===1,"areSiblings"),B=r((t,n,e,o)=>{const i=u.Children.toArray(t),s=[];let a=0;for(;a<i.length;){const c=i[a],p=a+1<i.length?i[a+1]:null;if(u.isValidElement(c)&&u.isValidElement(p)){const f=m(c),g=m(p);if(f&&g&&n.includes(f)&&n.includes(g)&&_(a,a+1)){s.push(l.jsxs(J,{style:{display:"flex",flexWrap:"nowrap",flexDirection:e?"column":"row",alignItems:e?"flex-start":"center",justifyContent:e?"center":"flex-start",height:e?"48px":"auto",gap:e?S.spacing.spacing_0:S.spacing.spacing_30,...o},children:[c,p]},`group-${a}`)),a+=2;continue}}s.push(c),a++}return s},"groupSiblingComponents"),pt=r(t=>!t.isNavRight||!t.isActionsPositionRight?!1:t.isCompact||t.isStandard&&!t.hasAppName,"shouldGroupNavigationAndActions"),lt=r((t,n,e)=>{const o=t,s=V(o,[d.NAVIGATION,d.ACTIONS])[d.NAVIGATION]??-1,a=dt(o,d.ACTIONS,"position","right");return s!==-1&&a!==-1&&_(s,a)?B(o,[d.NAVIGATION,d.ACTIONS],n,{position:"fixed",right:e.spacing.spacing_60}):Array.isArray(t)?t:u.Children.toArray(t)},"groupNavigationAndActionsIfSiblings"),ut=r(({type:t="standard",style:n,children:e,...o})=>{const i=L(),s=G(`(max-width: ${i.breakpoints.mq3}px)`),a=O(T(e,d.NAVIGATION),"position","center"),c=O(T(e,d.APP_NAME),"name",void 0),p=V(e,[d.APP_NAME,d.LOGO,d.NAVIGATION,d.ACTIONS]),f=p[d.APP_NAME]??-1,g=p[d.LOGO]??-1,x=at(t,c),C=f!==-1&&g!==-1&&_(f,g),I=ct(e,d.ACTIONS,"position","right")!==null,A=rt(t,a,c,I),$=h.useMemo(()=>({state:A,shouldCenterLogo:x,hasAppNameAsSibling:C,isMobile:s}),[A,x,C,s]),E=h.useMemo(()=>{let N=B(e,[d.APP_NAME,d.LOGO],s);return pt(A)&&(N=lt(N,s,i)),N},[e,A,s,i]);return l.jsx(st,{value:$,children:l.jsx(it,{isMobile:s,style:n,...o,children:E})})},"AppHeader$1"),ft=r((t,n)=>t==="left"?"relative":n.isNavRight?n.isStandard&&n.hasAppName?"fixed":"relative":"fixed","getActionsPosition"),gt=r((t,n,e)=>{if(n==="left")return"auto";const o=t.spacing.spacing_60;return e.isNavRight?e.isStandard&&e.hasAppName?o:0:o},"getActionsRight"),ht=r((t,n)=>{if(n==="left")return"auto";const{isNavLeft:e,isStandard:o,hasAppName:i}=t;return e&&o&&!i?"auto":Q},"getActionsMinWidth"),At=y.div`
  ${({theme:t,state:n,position:e="right"})=>{const o=ft(e,n),i=gt(t,e,n),s=ht(n,e);return`
      display: flex;
      align-items: center;
      position: ${o};
      right: ${i};
      min-width: ${s};
      flex-direction: row;
      justify-content: ${e==="left"?"flex-start":"flex-end"};
      gap: ${t.spacing.spacing_50};
    `}}
`,D=r(({children:t,position:n="right",...e})=>{const o=L(),i=G(`(max-width: ${o.breakpoints.mq3}px)`),{state:s}=w();return l.jsx(At,{isMobile:i,position:n,state:s,...e,children:t})},"ActionsBase");D.displayName="AppHeader.Actions";const mt=v(D),P=y.div`
  ${({theme:t,state:n,isMobile:e})=>{const o=e&&n.isStandard;return`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      min-width: auto;
      width: auto;
      max-width: ${nt}px;
      max-height: ${ot}px;
      
      ${o?"justify-content: flex-start;":""}

      @media screen and (min-width: ${t.breakpoints.mq3}px) {
        max-width: ${et}px;
      }
      
      > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
     
    `}}
`,W=r(({name:t,children:n,...e})=>{const{state:o,isMobile:i}=w(),s=o.isStandard?"h5":"h5Bold",a=i?"h6Bold":s,c=n??t;return c?n?l.jsx(P,{isMobile:i,state:o,...e,children:c}):l.jsx(P,{isMobile:i,state:o,...e,children:l.jsx(K,{color:"primary.default",element:"span",fontStyles:a,children:c})}):null},"AppNameBase");W.displayName="AppHeader.AppName";const xt=v(W),Nt=y.div`
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
        max-height: ${tt}px;
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
`,X=r(({children:t,...n})=>{const{shouldCenterLogo:e,isMobile:o}=w(),i=e&&!o;return l.jsx(Nt,{shouldCenterLogo:i,...n,children:t})},"LogoBase");X.displayName="AppHeader.Logo";const yt=v(X),b={absoluteCenter:`
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
  `},k=r(t=>t.isNavCenter?t.isNavCompact||!t.hasAppName:!1,"shouldUseAbsoluteCenter"),Ct=r(t=>k(t)?b.absoluteCenter:t.isNavCenter?b.autoMargins:"","getNavigationCenteringStyles"),vt=r((t,n,e)=>t?"center":n?"flex-start":e?"flex-end":"center","getJustifyContent"),wt=y.nav`
  ${({theme:t,state:n})=>{const{isStandard:e,hasAppName:o,isNavCompact:i,isNavLeft:s,isNavRight:a}=n,c=e&&o,p=k(n),f=c?"fixed":"relative",g=i?0:`${M}px`,x=i?"auto":"100%",C=i?"auto":`${Z}px`,I=p?"absolute":f,A=p?"50%":g,$=p?"50%":"0",E=p?"auto":"0",N=p?"auto":x,q=vt(p,s,a),U=Ct(n);return`
      position: ${I};
      top: ${A};
      left: ${$};
      right: ${E};
      z-index: ${j};
      width: ${N};
      min-height: ${C};
      height: auto;
      background-color: ${t.palette.surface.contrast};
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: ${q};
      padding: 0 ${t.spacing.spacing_60};

      ${U}
    `}}
`,z=r(({children:t,...n})=>{const{state:e}=w();return l.jsx(wt,{state:e,...n,children:t})},"NavigationBase");z.displayName="AppHeader.Navigation";const It=v(z),jt=Object.assign(ut,{Logo:yt,AppName:xt,Navigation:It,Actions:mt});export{jt as A};

var F=Object.defineProperty;var r=(t,n)=>F(t,"name",{value:n,configurable:!0});import{j as l}from"./jsx-runtime-Cgz2XvFB.js";import{r as g,R as u}from"./index-CwbBKW39.js";import"./typography-B3nKKPHm.js";import"./index-CCoLAdhZ.js";import"./index-DV-VXEUn.js";import{u as w}from"./useMedia-CRgJMRRc.js";import{f as y,d as G}from"./emotion-styled.browser.esm-CIRWz9XU.js";import{B as J}from"./index-DTgA8jos.js";import{t as T}from"./index-Cf7F2iyz.js";import{T as K}from"./Typography-Dk4smw7A.js";const v=r(t=>{const n=r(e=>{const{hide:o,show:s,...i}=e,a=w(o||"(max-width: 0px)"),c=w(s||"(max-width: 0px)");return o&&a||s&&!c?null:l.jsx(t,{...i})},"ResponsiveComponent");return n.displayName=t.displayName||t.name||"Component",n},"withResponsive"),L=64,Y=72,Z=52,j=1,Q="calc(100% / 3)",tt=54,nt=170,et=250,ot=50,d={NAVIGATION:"AppHeader.Navigation",APP_NAME:"AppHeader.AppName",LOGO:"AppHeader.Logo",ACTIONS:"AppHeader.Actions"},st=y.header`
  ${({theme:t,isMobile:n})=>{const e=t.spacing.spacing_60;return`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${t.spacing.spacing_50};
      width: 100%;
      height: ${n?`${Y}px`:`${L}px`};
      overflow: hidden;
      padding: 0 ${e};
      position: fixed;
      top: 0;
      z-index: ${j};
      background: ${t.palette.surface.contrast};
    `}}
`,R=g.createContext(null),it=r(({value:t,children:n})=>l.jsx(R.Provider,{value:t,children:n}),"AppHeaderContextProvider"),I=r(()=>{const t=g.useContext(R);if(!t)throw new Error("AppHeader compound components must be used within AppHeader");return t},"useAppHeaderContext"),rt=r((t,n,e,o)=>({isStandard:t==="standard",isCompact:t==="compact",isNavCenter:n==="center",isNavLeft:n==="left",isNavRight:n==="right",isNavCompact:t==="compact"||!e,hasAppName:!!e,isActionsPositionRight:o}),"computeHeaderState"),at=r((t,n)=>t==="standard"&&!!n,"shouldCenterLogo"),m=r(t=>{var n;return(n=t.type)==null?void 0:n.displayName},"getDisplayName"),_=r((t,n)=>{const e=g.Children.toArray(t);for(const o of e)if(u.isValidElement(o)){if(n(o))return o;const s=o.props;if(s!=null&&s.children){const i=_(s.children,n);if(i)return i}}return null},"findChildRecursive"),P=r((t,n)=>_(t,e=>m(e)===n),"findChildByType"),ct=r((t,n,e,o)=>_(t,s=>{if(m(s)!==n)return!1;const i=s.props;return e in i&&i[e]===o}),"findChildByTypeAndProp"),dt=r((t,n,e,o)=>g.Children.toArray(t).findIndex(i=>{if(!u.isValidElement(i)||m(i)!==n)return!1;const c=i.props;return e in c&&c[e]===o}),"findChildIndexByTypeAndProp"),O=r((t,n,e)=>{if(!u.isValidElement(t))return e;const o=t.props;return n in o&&o[n]!==void 0?o[n]:e},"extractProp"),V=r((t,n)=>{const e={};return g.Children.toArray(t).forEach((s,i)=>{if(u.isValidElement(s)){const a=m(s);a&&n.includes(a)&&(e[a]=i)}}),e},"findChildIndices"),S=r((t,n)=>Math.abs(t-n)===1,"areSiblings"),B=r((t,n,e,o)=>{const s=u.Children.toArray(t),i=[];let a=0;for(;a<s.length;){const c=s[a],p=a+1<s.length?s[a+1]:null;if(u.isValidElement(c)&&u.isValidElement(p)){const h=m(c),f=m(p);if(h&&f&&n.includes(h)&&n.includes(f)&&S(a,a+1)){i.push(l.jsxs(J,{style:{display:"flex",flexWrap:"nowrap",flexDirection:e?"column":"row",alignItems:e?"flex-start":"center",justifyContent:e?"center":"flex-start",height:e?"48px":"auto",gap:e?T.spacing.spacing_0:T.spacing.spacing_30,...o},children:[c,p]},`group-${a}`)),a+=2;continue}}i.push(c),a++}return i},"groupSiblingComponents"),pt=r(t=>!t.isNavRight||!t.isActionsPositionRight?!1:t.isCompact||t.isStandard&&!t.hasAppName,"shouldGroupNavigationAndActions"),lt=r((t,n,e)=>{const o=t,i=V(o,[d.NAVIGATION,d.ACTIONS])[d.NAVIGATION]??-1,a=dt(o,d.ACTIONS,"position","right");return i!==-1&&a!==-1&&S(i,a)?B(o,[d.NAVIGATION,d.ACTIONS],n,{position:"fixed",right:e.spacing.spacing_60}):Array.isArray(t)?t:u.Children.toArray(t)},"groupNavigationAndActionsIfSiblings"),ut=r(({type:t="standard",style:n,children:e,...o})=>{const s=G(),i=w(`(max-width: ${s.breakpoints.mq3}px)`),a=O(P(e,d.NAVIGATION),"position","center"),c=O(P(e,d.APP_NAME),"name",void 0),p=V(e,[d.APP_NAME,d.LOGO,d.NAVIGATION,d.ACTIONS]),h=p[d.APP_NAME]??-1,f=p[d.LOGO]??-1,x=at(t,c),C=h!==-1&&f!==-1&&S(h,f),$=ct(e,d.ACTIONS,"position","right")!==null,A=rt(t,a,c,$),E=g.useMemo(()=>({state:A,shouldCenterLogo:x,hasAppNameAsSibling:C,isMobile:i}),[A,x,C,i]),H=g.useMemo(()=>{let N=B(e,[d.APP_NAME,d.LOGO],i);return pt(A)&&(N=lt(N,i,s)),N},[e,A,i,s]);return l.jsx(it,{value:E,children:l.jsx(st,{isMobile:i,style:n,...o,children:H})})},"AppHeader$1"),ht=r((t,n)=>t==="left"?"relative":n.isNavRight?n.isStandard&&n.hasAppName?"fixed":"relative":"fixed","getActionsPosition"),ft=r((t,n,e)=>{if(n==="left")return"auto";const o=t.spacing.spacing_60;return e.isNavRight?e.isStandard&&e.hasAppName?o:0:o},"getActionsRight"),gt=r((t,n)=>{if(n==="left")return"auto";const{isNavLeft:e,isStandard:o,hasAppName:s}=t;return e&&o&&!s?"auto":Q},"getActionsMinWidth"),At=y.div`
  ${({theme:t,state:n,position:e="right"})=>{const o=ht(e,n),s=ft(t,e,n),i=gt(n,e);return`
      display: flex;
      align-items: center;
      position: ${o};
      right: ${s};
      min-width: ${i};
      flex-direction: row;
      justify-content: ${e==="left"?"flex-start":"flex-end"};
      gap: ${t.spacing.spacing_50};
    `}}
`,D=r(({children:t,position:n="right",...e})=>{const o=G(),s=w(`(max-width: ${o.breakpoints.mq3}px)`),{state:i}=I();return l.jsx(At,{isMobile:s,position:n,state:i,...e,children:t})},"ActionsBase");D.displayName="AppHeader.Actions";const mt=v(D),b=y.div`
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
`,W=r(({name:t,children:n,...e})=>{const{state:o,isMobile:s}=I(),i=o.isStandard?"h5":"h5Bold",a=s?"h6Bold":i,c=n??t;return c?n?l.jsx(b,{isMobile:s,state:o,...e,children:c}):l.jsx(b,{isMobile:s,state:o,...e,children:l.jsx(K,{color:"primary.default",element:"span",fontStyles:a,children:c})}):null},"AppNameBase");W.displayName="AppHeader.AppName";const xt=v(W),Nt=y.div`
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
`,X=r(({children:t,...n})=>{const{shouldCenterLogo:e,isMobile:o}=I(),s=e&&!o;return l.jsx(Nt,{shouldCenterLogo:s,...n,children:t})},"LogoBase");X.displayName="AppHeader.Logo";const yt=v(X),M={absoluteCenter:`
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
  `},k=r(t=>t.isNavCenter?t.isNavCompact||!t.hasAppName:!1,"shouldUseAbsoluteCenter"),Ct=r(t=>k(t)?M.absoluteCenter:t.isNavCenter?M.autoMargins:"","getNavigationCenteringStyles"),wt=r((t,n,e)=>t?"center":n?"flex-start":e?"flex-end":"center","getJustifyContent"),vt=y.nav`
  ${({theme:t,state:n})=>{const{isStandard:e,hasAppName:o,isNavCompact:s,isNavLeft:i,isNavRight:a}=n,c=e&&o,p=k(n),h=c?"fixed":"relative",f=s?0:`${L}px`,x=s?"auto":"100%",C=s?"auto":`${Z}px`,$=p?"absolute":h,A=p?"50%":f,E=p?"50%":"0",H=p?"auto":"0",N=p?"auto":x,q=wt(p,i,a),U=Ct(n);return`
      position: ${$};
      top: ${A};
      left: ${E};
      right: ${H};
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
`,z=r(({children:t,...n})=>{const{state:e}=I();return l.jsx(vt,{state:e,...n,children:t})},"NavigationBase");z.displayName="AppHeader.Navigation";const It=v(z),Lt=Object.assign(ut,{Logo:yt,AppName:xt,Navigation:It,Actions:mt});export{Lt as A,v as w};

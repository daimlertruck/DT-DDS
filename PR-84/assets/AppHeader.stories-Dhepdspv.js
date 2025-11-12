import{j as r}from"./jsx-runtime-CB_V9I5Y.js";import{A as wt}from"./Avatar-ksn8vZQb.js";import{a as St,A as $t}from"./Avatar.styled-CMw3s-uw.js";import{d as u}from"./index-D9dZuxfj.js";import"./index-SwsCHqUs.js";import"./index-XjDa9cP3.js";import{u as b}from"./useMedia-bxl5YFrZ.js";import{R as y,r as f}from"./index-CTjT7uj6.js";import{I as k}from"./Icon-DG6KDu5A.js";import{I as E}from"./IconButton-C_mszqXk.js";import{T as rt}from"./Typography-DHEP7O00.js";import{f as C,d as pt}from"./emotion-styled.browser.esm-DBghOYGd.js";import{B as It}from"./index-CWvrgZ1b.js";import"./Tooltip-C7HW4jEB.js";import"./Portal-DUP4U3GD.js";import"./z-index-CLLOsryR.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BAMY2Nnw.js";import"./iframe-BJyoh29S.js";const ct=64,Tt=52,lt=1,dt="calc(100% / 3)",Ht="54px";u.spacing.spacing_30;u.spacing.spacing_20;const c={NAVIGATION:"AppHeader.Navigation",APP_NAME:"AppHeader.AppName",LOGO:"AppHeader.Logo",ACTIONS:"AppHeader.Actions"},_t=C.header`
  ${({theme:t,isMobile:e})=>{const a=e?t.spacing.spacing_30:t.spacing.spacing_60;return`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${e?t.spacing.spacing_30:t.spacing.spacing_50};
      width: 100%;
      height: ${ct}px;
      overflow: hidden;
      padding: 0 ${a};
      position: fixed;
      top: 0;
      z-index: ${lt};
      background: ${t.palette.surface.contrast};
    `}}
`,jt=(t,e,a,n)=>({isStandard:t==="standard",isCompact:t==="compact",isNavCenter:e==="center",isNavLeft:e==="left",isNavRight:e==="right",isNavCompact:t==="compact"||!a,hasAppName:!!a,isActionsPositionRight:n}),v=t=>{var e;return(e=t.type)==null?void 0:e.displayName},O=(t,e)=>{const a=f.Children.toArray(t);for(const n of a)if(y.isValidElement(n)){if(e(n))return n;const o=n.props;if(o!=null&&o.children){const i=O(o.children,e);if(i)return i}}return null},G=(t,e)=>O(t,a=>v(a)===e),Pt=(t,e,a,n)=>O(t,o=>{if(v(o)!==e)return!1;const i=o.props;return a in i&&i[a]===n}),Lt=(t,e,a,n)=>f.Children.toArray(t).findIndex(i=>{if(!y.isValidElement(i)||v(i)!==e)return!1;const p=i.props;return a in p&&p[a]===n}),B=(t,e,a)=>{if(!y.isValidElement(t))return a;const n=t.props;return e in n&&n[e]!==void 0?n[e]:a},mt=(t,e)=>{const a={};return f.Children.toArray(t).forEach((o,i)=>{if(y.isValidElement(o)){const s=v(o);s&&e.includes(s)&&(a[s]=i)}}),a},R=(t,e)=>Math.abs(t-e)===1,Mt=(t,e,a,n)=>t==="standard"&&!!e&&a!==-1&&n!==-1&&a<n,ut=(t,e,a,n)=>{const o=f.Children.toArray(t),i=[];let s=0;for(;s<o.length;){const p=o[s],l=s+1<o.length?o[s+1]:null;if(y.isValidElement(p)&&y.isValidElement(l)){const d=v(p),m=v(l);if(d&&m&&e.includes(d)&&e.includes(m)&&R(s,s+1)){i.push(r.jsxs(It,{style:{display:"flex",flexFlow:"row nowrap",alignItems:"center",gap:a?u.spacing.spacing_20:u.spacing.spacing_30,...n},children:[p,l]},`group-${s}`)),s+=2;continue}}i.push(p),s++}return i},kt=t=>!t.isNavRight||!t.isActionsPositionRight?!1:t.isCompact||t.isStandard&&!t.hasAppName,Et=(t,e,a)=>{const o=mt(t,[c.NAVIGATION,c.ACTIONS])[c.NAVIGATION]??-1,i=Lt(t,c.ACTIONS,"position","right");return o!==-1&&i!==-1&&R(o,i)?ut(t,[c.NAVIGATION,c.ACTIONS],e,{position:"fixed",right:a.spacing.spacing_60}):t},gt=f.createContext(null),_=()=>{const t=f.useContext(gt);if(!t)throw new Error("AppHeader compound components must be used within AppHeader");return t},Ot=({type:t="standard",style:e,children:a,...n})=>{const o=pt(),i=b(`(max-width: ${o.breakpoints.mq3}px)`),s=B(G(a,c.NAVIGATION),"position","center"),p=B(G(a,c.APP_NAME),"name",void 0),l=mt(a,[c.APP_NAME,c.LOGO,c.NAVIGATION,c.ACTIONS]),d=l[c.APP_NAME]??-1,m=l[c.LOGO]??-1,g=Mt(t,p,d,m),x=d!==-1&&m!==-1&&R(d,m),P=Pt(a,c.ACTIONS,"position","right")!==null,A=jt(t,s,p,P),L=f.useMemo(()=>({state:A,shouldCenterLogo:g,hasAppNameAsSibling:x,isMobile:i}),[A,g,x,i]),M=f.useMemo(()=>{let N=a;return x&&A.isCompact&&!i&&(N=ut(N,[c.APP_NAME,c.LOGO],i)),kt(A)&&(N=Et(N,i,o)),N},[a,x,A,i,o]);return r.jsx(gt.Provider,{value:L,children:r.jsx(_t,{isMobile:i,style:e,...n,children:M})})},Rt=(t,e)=>t==="left"?"relative":e.isNavRight?e.isStandard&&e.hasAppName?"fixed":"relative":"fixed",Gt=(t,e,a,n)=>{if(a==="left")return"auto";const o=e?t.spacing.spacing_30:t.spacing.spacing_60;return n.isNavRight?n.isStandard&&n.hasAppName?o:0:o},Bt=(t,e)=>{if(e==="left")return"auto";const{isNavLeft:a,isStandard:n,hasAppName:o}=t;return a&&n&&!o?"auto":dt},Dt=C.div`
  ${({theme:t,state:e,isMobile:a,position:n="right"})=>{const o=Rt(n,e),i=Gt(t,a,n,e),s=Bt(e,n),p=a?t.spacing.spacing_30:t.spacing.spacing_50;return`
      display: flex;
      align-items: center;
      position: ${o};
      right: ${i};
      min-width: ${s};
      flex-direction: row;
      justify-content: ${n==="left"?"flex-start":"flex-end"};
      gap: ${p};
    `}}
`,j=t=>{const e=a=>{const n=b(a.hide||"(max-width: 0px)"),o=b(a.show||"(max-width: 0px)");if(a.hide&&n||a.show&&!o)return null;const{hide:i,show:s,...p}=a;return r.jsx(t,{...p})};return e.displayName=t.displayName||t.name||"Component",e},ht=({children:t,position:e="right",...a})=>{const n=pt(),o=b(`(max-width: ${n.breakpoints.mq3}px)`),{state:i}=_();return r.jsx(Dt,{isMobile:o,position:e,state:i,...a,children:t})};ht.displayName="AppHeader.Actions";const zt=j(ht),D=C.div`
  ${({state:t,hasAppNameAsSibling:e,isMobile:a})=>{const n=e&&t.isCompact,o=a&&t.isStandard;return`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      ${n?"width: auto; min-width: auto;":""}
      ${o?"justify-content: flex-start;":""}
    `}}
`,ft=({name:t,children:e,...a})=>{const{state:n,hasAppNameAsSibling:o,isMobile:i}=_(),s=e??t;return s?e?r.jsx(D,{hasAppNameAsSibling:o,isMobile:i,state:n,...a,children:s}):r.jsx(D,{hasAppNameAsSibling:o,isMobile:i,state:n,...a,children:r.jsx(rt,{color:"primary.default",element:"span",fontStyles:n.isStandard?"h5":"h5Bold",children:s})}):null};ft.displayName="AppHeader.AppName";const Vt=j(ft),Wt=(t,e)=>{const{isNavLeft:a,isCompact:n,isStandard:o,hasAppName:i}=t;return e&&n||a&&n||a&&o&&!i?"auto":dt},qt=C.div`
  ${({state:t,shouldCenterLogo:e,hasAppNameAsSibling:a})=>{const n=Wt(t,a),o=`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      height: auto;
    `,i=`
      img,
      [data-nextjs-image],
      svg,
      > * {
        display: flex;
        max-height: ${Ht};
        width: auto;
        height: auto;
        object-fit: contain;
      }
    `;return e?`
        ${o}
        width: auto;
        min-width: auto;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        ${i}
      `:`
      ${o}
      min-width: ${n};
      ${i}
    `}}
`,At=({children:t,...e})=>{const{state:a,shouldCenterLogo:n,hasAppNameAsSibling:o,isMobile:i}=_(),s=n||i&&a.isStandard;return r.jsx(qt,{hasAppNameAsSibling:o,shouldCenterLogo:s,state:a,...e,children:t})};At.displayName="AppHeader.Logo";const Jt=j(At),z={absoluteCenter:`
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
  `},Nt=t=>t.isNavCenter?t.isNavCompact||!t.hasAppName:!1,Ft=t=>Nt(t)?z.absoluteCenter:t.isNavCenter?z.autoMargins:"",Ut=(t,e,a)=>!t||!e?0:a,Xt=(t,e,a,n)=>e?t?a:n:0,Yt=(t,e,a)=>t?"center":e?"flex-start":a?"flex-end":"center",Zt=C.nav`
  ${({theme:t,state:e})=>{const{isStandard:a,hasAppName:n,isNavCompact:o,isNavLeft:i,isNavRight:s}=e,p=a&&n,l=Nt(e),d=p?"fixed":"relative",m=o?0:`${ct}px`,g=o?"auto":"100%",x=o?"auto":`${Tt}px`,P=Ut(p,i,t.spacing.spacing_60),A=Xt(p,s,t.spacing.spacing_60,t.spacing.spacing_50),L=l?"absolute":d,M=l?"50%":m,N=l?"50%":"0",yt=l?"auto":"0",vt=l?"auto":g,bt=Yt(l,i,s),Ct=Ft(e);return`
      position: ${L};
      top: ${M};
      left: ${N};
      right: ${yt};
      z-index: ${lt};
      width: ${vt};
      min-height: ${x};
      height: auto;
      background-color: ${t.palette.surface.contrast};
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: ${bt};
      padding-left: ${P};
      padding-right: ${A};

      ${Ct}
    `}}
`,xt=({children:t,...e})=>{const{state:a}=_();return r.jsx(Zt,{state:a,...e,children:t})};xt.displayName="AppHeader.Navigation";const Kt=j(xt),h=Object.assign(Ot,{Logo:Jt,AppName:Vt,Navigation:Kt,Actions:zt}),Qt=({type:t="standard",appName:e,navPosition:a="center",hasNavigation:n=!0,...o})=>{const i=b(`(max-width: ${u.breakpoints.mq3}px)`),s=[{label:"Home",link:"/home"},{label:"About",link:"/about"},{label:"Contact",link:"/contact"}];return r.jsx("div",{style:{width:"100%",height:"200px",backgroundColor:u.palette.surface.light},children:r.jsxs(h,{type:t,...o,children:[r.jsx(h.Actions,{position:"left",show:`(max-width: ${u.breakpoints.mq3}px)`,children:r.jsx(E,{ariaLabel:"menu",dataTestId:"hamburger-menu-icon",onClick:()=>null,size:"medium",children:r.jsx(k,{"aria-expanded":!1,code:"menu"})})}),t==="standard"&&e?r.jsx(h.AppName,{name:e}):null,r.jsx(h.Logo,{children:t==="standard"?r.jsx("img",{alt:"Daimler Truck",src:"/images/daimler_truck.svg",style:{height:i?"10px":"20px",width:"auto"}}):r.jsx("img",{alt:"Daimler Truck",src:"/images/daimler_truck_compact.svg",style:{height:i?"14px":"18px",width:"auto"}})}),t==="compact"&&e?r.jsx(h.AppName,{name:e}):null,n?r.jsx(h.Navigation,{position:a||"center",show:`(min-width: ${u.breakpoints.mq3}px)`,children:r.jsx("ul",{style:{listStyle:"none",padding:0,margin:0,display:"flex",flexFlow:"row nowrap",justifyContent:"center",alignItems:"flex-start",gap:u.spacing.spacing_50},children:s.map(p=>r.jsx("li",{children:r.jsx("a",{href:p.link,style:{textTransform:"capitalize",color:u.palette.content.dark,transition:"color 0.2s ease-in-out"},children:p.label})},p.label))})}):null,r.jsxs(h.Actions,{position:"right",children:[r.jsx(E,{ariaLabel:"search",dataTestId:"search-btn",onClick:()=>null,size:"medium",variant:"default",children:r.jsx(k,{"aria-expanded":!1,code:"search"})}),r.jsx(E,{ariaLabel:"internationalization",dataTestId:"language-btn",onClick:()=>null,size:"medium",variant:"default",children:r.jsx(k,{"aria-expanded":!1,code:"language"})}),i?null:r.jsx(rt,{color:"grey_120",element:"p",fontStyles:"bodySmBold",id:"userName",children:"John Doe"}),r.jsx("button",{"aria-controls":"userMenu","aria-expanded":"false","aria-haspopup":"true","aria-labelledby":"userName",style:{border:"none",cursor:"pointer",backgroundColor:"transparent",padding:0,margin:0},type:"button",children:r.jsx(wt,{hasTooltip:!1,size:$t.Medium,title:"John Doe",type:St.Primary})})]})]})})},xe={title:"Compound Components/AppHeader",component:h,parameters:{docs:{description:{component:"AppHeader is a flexible compound component that provides a complete application header with support for multiple layouts, responsive behavior, and customizable sections including logo, app name, navigation, and action buttons."},source:{transform:(t,e)=>{var l,d,m,g;const a=((l=e.args)==null?void 0:l.type)||"standard",n=((d=e.args)==null?void 0:d.appName)||"App Name";(m=e.args)!=null&&m.hasNavigation;const o=((g=e.args)==null?void 0:g.navPosition)||"center",i=a==="standard",s=a==="compact";return`
import { useTheme } from '@emotion/react';
import { useMedia } from '@dt-dds/react-core';


const theme = useTheme();
const isMobile = useMedia(\`(max-width: \${theme.breakpoints.mq3}px)\`);

<AppHeader type="${a}">
  <AppHeader.Actions
    position='left'
    show={\`(max-width: \${theme.breakpoints.mq3}px)\`}
  >
  <IconButton
    size='medium'
    onClick={() => null}
    ariaLabel='menu'
    dataTestId='hamburger-menu-icon'
  >
    <Icon code='menu' aria-expanded={false} />
  </IconButton>
</AppHeader.Actions>

${i&&n?`<AppHeader.AppName name="${n}" />`:""}

<AppHeader.Logo>
  ${i?`<img 
    src={'/images/daimler_truck.svg'} 
    alt='Daimler Truck'
    style={{ 
      height: isMobile ? '10px' : '20px', 
      width: 'auto'
    }} 
  />`:`<img 
    src={'/images/daimler_truck_compact.svg'}
    alt='Daimler Truck'
    style={{ 
      height: isMobile ? '14px' : '18px', 
      width: 'auto' 
    }} 
  />`}
</AppHeader.Logo>

${s&&n?`<AppHeader.AppName name="${n}" />`:""}

${`<AppHeader.Navigation 
  position="${o}" 
  show={\`(min-width: \${theme.breakpoints.mq3}px)\`}>
  <ul style={{ 
    listStyle: 'none', 
    padding: 0, 
    margin: 0, 
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: theme.spacing.spacing_50, 
  }}>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</AppHeader.Navigation>`}

<AppHeader.Actions position="right">
  <IconButton
    onClick={() => null}
    ariaLabel='search'
    dataTestId='search-btn'
    size='medium'
    variant='default'
  >
    <Icon code='search' aria-expanded={false} />
  </IconButton>
  {isMobile ? null : (
    <Typography 
      element='p' 
      fontStyles='bodySmBold' 
      color='grey_120' 
      id='userName'>
        John Doe
    </Typography>
  )}
    <button 
      aria-labelledby='userName'
      aria-haspopup='true'
      aria-controls='userMenu'
      aria-expanded='false'
      style={{ 
        border: 'none',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        padding: 0,
        margin: 0,
      }}
      type='button'
    >
      <Avatar 
        size={AvatarSize.Medium} 
        title='John Doe' 
        type={AvatarType.Primary} 
        hasTooltip={false}
      />
    </button>
  </AppHeader.Actions>
</AppHeader>`.trim()}}}},args:{type:"standard",appName:"App Name",navPosition:"center"},argTypes:{type:{options:["standard","compact"],control:{type:"inline-radio"},description:"The type of AppHeader layout"},appName:{control:{type:"text"},description:"AppName text content"},navPosition:{options:["center","left","right"],control:{type:"inline-radio"},description:"Navigation position"}},render:t=>r.jsx(Qt,{...t})},w={name:"Standard center nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"center"}},S={name:"Standard left nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"left"}},$={name:"Standard no nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",hasNavigation:!1}},I={name:"Compact center nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"center"}},T={name:"Compact left nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"left"}},H={name:"Compact no nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",hasNavigation:!1}};var V,W,q;w.parameters={...w.parameters,docs:{...(V=w.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: 'Standard center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...(q=(W=w.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var J,F,U;S.parameters={...S.parameters,docs:{...(J=S.parameters)==null?void 0:J.docs,source:{originalSource:`{
  name: 'Standard left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...(U=(F=S.parameters)==null?void 0:F.docs)==null?void 0:U.source}}};var X,Y,Z;$.parameters={...$.parameters,docs:{...(X=$.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: 'Standard no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...(Z=(Y=$.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var K,Q,tt;I.parameters={...I.parameters,docs:{...(K=I.parameters)==null?void 0:K.docs,source:{originalSource:`{
  name: 'Compact center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...(tt=(Q=I.parameters)==null?void 0:Q.docs)==null?void 0:tt.source}}};var et,at,nt;T.parameters={...T.parameters,docs:{...(et=T.parameters)==null?void 0:et.docs,source:{originalSource:`{
  name: 'Compact left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...(nt=(at=T.parameters)==null?void 0:at.docs)==null?void 0:nt.source}}};var ot,it,st;H.parameters={...H.parameters,docs:{...(ot=H.parameters)==null?void 0:ot.docs,source:{originalSource:`{
  name: 'Compact no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...(st=(it=H.parameters)==null?void 0:it.docs)==null?void 0:st.source}}};const ye=["Default","StandardWithLeftNavigation","StandardWithNoNavigation","Compact","CompactWithLeftNavigation","Minimal"];export{I as Compact,T as CompactWithLeftNavigation,w as Default,H as Minimal,S as StandardWithLeftNavigation,$ as StandardWithNoNavigation,ye as __namedExportsOrder,xe as default};

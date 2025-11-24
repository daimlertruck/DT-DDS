var St=Object.defineProperty;var i=(t,e)=>St(t,"name",{value:e,configurable:!0});import{j as p}from"./jsx-runtime-Cgz2XvFB.js";import{A as $t}from"./Avatar-C2XkCyel.js";import{t as g}from"./index-Dw_1laFD.js";import"./index-BEKTSPqq.js";import"./index-DV-VXEUn.js";import{u as C}from"./useMedia-CRgJMRRc.js";import{R as v,r as A}from"./index-CwbBKW39.js";import{I as E}from"./Icon-BrO18bYS.js";import{I as O}from"./IconButton-BxQ2uS0G.js";import{T as pt}from"./Typography-BDc1BtFV.js";import"./typography-B3nKKPHm.js";import{f as w,d as ct}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import{B as It}from"./index-juXVSS06.js";import"./Tooltip-D8X7corw.js";import"./z-index-BB_IPOEl.js";import"./Avatar.styled-CxoZIEaX.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-6Tx4pmSd.js";import"./iframe-C5pGOVL0.js";const lt=64,Tt=52,dt=1,mt="calc(100% / 3)",Ht="54px";g.spacing.spacing_30;g.spacing.spacing_20;const l={NAVIGATION:"AppHeader.Navigation",APP_NAME:"AppHeader.AppName",LOGO:"AppHeader.Logo",ACTIONS:"AppHeader.Actions"},jt=w.header`
  ${({theme:t,isMobile:e})=>{const a=e?t.spacing.spacing_30:t.spacing.spacing_60;return`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${e?t.spacing.spacing_30:t.spacing.spacing_50};
      width: 100%;
      height: ${lt}px;
      overflow: hidden;
      padding: 0 ${a};
      position: fixed;
      top: 0;
      z-index: ${dt};
      background: ${t.palette.surface.contrast};
    `}}
`,_t=i((t,e,a,n)=>({isStandard:t==="standard",isCompact:t==="compact",isNavCenter:e==="center",isNavLeft:e==="left",isNavRight:e==="right",isNavCompact:t==="compact"||!a,hasAppName:!!a,isActionsPositionRight:n}),"computeBarState"),b=i(t=>{var e;return(e=t.type)==null?void 0:e.displayName},"getDisplayName"),R=i((t,e)=>{const a=A.Children.toArray(t);for(const n of a)if(v.isValidElement(n)){if(e(n))return n;const o=n.props;if(o!=null&&o.children){const s=R(o.children,e);if(s)return s}}return null},"findChildRecursive"),B=i((t,e)=>R(t,a=>b(a)===e),"findChildByType"),Pt=i((t,e,a,n)=>R(t,o=>{if(b(o)!==e)return!1;const s=o.props;return a in s&&s[a]===n}),"findChildByTypeAndProp"),Lt=i((t,e,a,n)=>A.Children.toArray(t).findIndex(s=>{if(!v.isValidElement(s)||b(s)!==e)return!1;const c=s.props;return a in c&&c[a]===n}),"findChildIndexByTypeAndProp"),D=i((t,e,a)=>{if(!v.isValidElement(t))return a;const n=t.props;return e in n&&n[e]!==void 0?n[e]:a},"extractProp"),ut=i((t,e)=>{const a={};return A.Children.toArray(t).forEach((o,s)=>{if(v.isValidElement(o)){const r=b(o);r&&e.includes(r)&&(a[r]=s)}}),a},"findChildIndices"),G=i((t,e)=>Math.abs(t-e)===1,"areSiblings"),Mt=i((t,e,a,n)=>t==="standard"&&!!e&&a!==-1&&n!==-1&&a<n,"shouldCenterLogo"),gt=i((t,e,a,n)=>{const o=A.Children.toArray(t),s=[];let r=0;for(;r<o.length;){const c=o[r],d=r+1<o.length?o[r+1]:null;if(v.isValidElement(c)&&v.isValidElement(d)){const m=b(c),u=b(d);if(m&&u&&e.includes(m)&&e.includes(u)&&G(r,r+1)){s.push(p.jsxs(It,{style:{display:"flex",flexFlow:"row nowrap",alignItems:"center",gap:a?g.spacing.spacing_20:g.spacing.spacing_30,...n},children:[c,d]},`group-${r}`)),r+=2;continue}}s.push(c),r++}return s},"groupSiblingComponents"),kt=i(t=>!t.isNavRight||!t.isActionsPositionRight?!1:t.isCompact||t.isStandard&&!t.hasAppName,"shouldGroupNavigationAndActions"),Et=i((t,e,a)=>{const o=ut(t,[l.NAVIGATION,l.ACTIONS])[l.NAVIGATION]??-1,s=Lt(t,l.ACTIONS,"position","right");return o!==-1&&s!==-1&&G(o,s)?gt(t,[l.NAVIGATION,l.ACTIONS],e,{position:"fixed",right:a.spacing.spacing_60}):t},"groupNavigationAndActionsIfSiblings"),ht=A.createContext(null),_=i(()=>{const t=A.useContext(ht);if(!t)throw new Error("AppHeader compound components must be used within AppHeader");return t},"useAppHeaderContext"),Ot=i(({type:t="standard",style:e,children:a,...n})=>{const o=ct(),s=C(`(max-width: ${o.breakpoints.mq3}px)`),r=D(B(a,l.NAVIGATION),"position","center"),c=D(B(a,l.APP_NAME),"name",void 0),d=ut(a,[l.APP_NAME,l.LOGO,l.NAVIGATION,l.ACTIONS]),m=d[l.APP_NAME]??-1,u=d[l.LOGO]??-1,h=Mt(t,c,m,u),y=m!==-1&&u!==-1&&G(m,u),L=Pt(a,l.ACTIONS,"position","right")!==null,N=_t(t,r,c,L),M=A.useMemo(()=>({state:N,shouldCenterLogo:h,hasAppNameAsSibling:y,isMobile:s}),[N,h,y,s]),k=A.useMemo(()=>{let x=a;return y&&N.isCompact&&!s&&(x=gt(x,[l.APP_NAME,l.LOGO],s)),kt(N)&&(x=Et(x,s,o)),x},[a,y,N,s,o]);return p.jsx(ht.Provider,{value:M,children:p.jsx(jt,{isMobile:s,style:e,...n,children:k})})},"AppHeader$1"),Rt=i((t,e)=>t==="left"?"relative":e.isNavRight?e.isStandard&&e.hasAppName?"fixed":"relative":"fixed","getActionsPosition"),Gt=i((t,e,a,n)=>{if(a==="left")return"auto";const o=e?t.spacing.spacing_30:t.spacing.spacing_60;return n.isNavRight?n.isStandard&&n.hasAppName?o:0:o},"getActionsRight"),Bt=i((t,e)=>{if(e==="left")return"auto";const{isNavLeft:a,isStandard:n,hasAppName:o}=t;return a&&n&&!o?"auto":mt},"getActionsMinWidth"),Dt=w.div`
  ${({theme:t,state:e,isMobile:a,position:n="right"})=>{const o=Rt(n,e),s=Gt(t,a,n,e),r=Bt(e,n),c=a?t.spacing.spacing_30:t.spacing.spacing_50;return`
      display: flex;
      align-items: center;
      position: ${o};
      right: ${s};
      min-width: ${r};
      flex-direction: row;
      justify-content: ${n==="left"?"flex-start":"flex-end"};
      gap: ${c};
    `}}
`,P=i(t=>{const e=i(a=>{const n=C(a.hide||"(max-width: 0px)"),o=C(a.show||"(max-width: 0px)");if(a.hide&&n||a.show&&!o)return null;const{hide:s,show:r,...c}=a;return p.jsx(t,{...c})},"ResponsiveComponent");return e.displayName=t.displayName||t.name||"Component",e},"withResponsive"),ft=i(({children:t,position:e="right",...a})=>{const n=ct(),o=C(`(max-width: ${n.breakpoints.mq3}px)`),{state:s}=_();return p.jsx(Dt,{isMobile:o,position:e,state:s,...a,children:t})},"ActionsBase");ft.displayName="AppHeader.Actions";const zt=P(ft),z=w.div`
  ${({state:t,hasAppNameAsSibling:e,isMobile:a})=>{const n=e&&t.isCompact,o=a&&t.isStandard;return`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      ${n?"width: auto; min-width: auto;":""}
      ${o?"justify-content: flex-start;":""}
    `}}
`,At=i(({name:t,children:e,...a})=>{const{state:n,hasAppNameAsSibling:o,isMobile:s}=_(),r=e??t;return r?e?p.jsx(z,{hasAppNameAsSibling:o,isMobile:s,state:n,...a,children:r}):p.jsx(z,{hasAppNameAsSibling:o,isMobile:s,state:n,...a,children:p.jsx(pt,{color:"primary.default",element:"span",fontStyles:n.isStandard?"h5":"h5Bold",children:r})}):null},"AppNameBase");At.displayName="AppHeader.AppName";const Vt=P(At),Wt=i((t,e)=>{const{isNavLeft:a,isCompact:n,isStandard:o,hasAppName:s}=t;return e&&n||a&&n||a&&o&&!s?"auto":mt},"getLogoMinWidth"),qt=w.div`
  ${({state:t,shouldCenterLogo:e,hasAppNameAsSibling:a})=>{const n=Wt(t,a),o=`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      height: auto;
    `,s=`
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

        ${s}
      `:`
      ${o}
      min-width: ${n};
      ${s}
    `}}
`,Nt=i(({children:t,...e})=>{const{state:a,shouldCenterLogo:n,hasAppNameAsSibling:o,isMobile:s}=_(),r=n||s&&a.isStandard;return p.jsx(qt,{hasAppNameAsSibling:o,shouldCenterLogo:r,state:a,...e,children:t})},"LogoBase");Nt.displayName="AppHeader.Logo";const Jt=P(Nt),V={absoluteCenter:`
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
  `},xt=i(t=>t.isNavCenter?t.isNavCompact||!t.hasAppName:!1,"shouldUseAbsoluteCenter"),Ft=i(t=>xt(t)?V.absoluteCenter:t.isNavCenter?V.autoMargins:"","getNavigationCenteringStyles"),Ut=i((t,e,a)=>!t||!e?0:a,"calculatePaddingLeft"),Xt=i((t,e,a,n)=>e?t?a:n:0,"calculatePaddingRight"),Yt=i((t,e,a)=>t?"center":e?"flex-start":a?"flex-end":"center","getJustifyContent"),Zt=w.nav`
  ${({theme:t,state:e})=>{const{isStandard:a,hasAppName:n,isNavCompact:o,isNavLeft:s,isNavRight:r}=e,c=a&&n,d=xt(e),m=c?"fixed":"relative",u=o?0:`${lt}px`,h=o?"auto":"100%",y=o?"auto":`${Tt}px`,L=Ut(c,s,t.spacing.spacing_60),N=Xt(c,r,t.spacing.spacing_60,t.spacing.spacing_50),M=d?"absolute":m,k=d?"50%":u,x=d?"50%":"0",vt=d?"auto":"0",bt=d?"auto":h,Ct=Yt(d,s,r),wt=Ft(e);return`
      position: ${M};
      top: ${k};
      left: ${x};
      right: ${vt};
      z-index: ${dt};
      width: ${bt};
      min-height: ${y};
      height: auto;
      background-color: ${t.palette.surface.contrast};
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: ${Ct};
      padding-left: ${L};
      padding-right: ${N};

      ${wt}
    `}}
`,yt=i(({children:t,...e})=>{const{state:a}=_();return p.jsx(Zt,{state:a,...e,children:t})},"NavigationBase");yt.displayName="AppHeader.Navigation";const Kt=P(yt),f=Object.assign(Ot,{Logo:Jt,AppName:Vt,Navigation:Kt,Actions:zt}),Qt=i(({type:t="standard",appName:e,navPosition:a="center",hasNavigation:n=!0,...o})=>{const s=C(`(max-width: ${g.breakpoints.mq3}px)`),r=[{label:"Home",link:"/home"},{label:"About",link:"/about"},{label:"Contact",link:"/contact"}];return p.jsx("div",{style:{width:"100%",height:"200px",backgroundColor:g.palette.surface.light},children:p.jsxs(f,{type:t,...o,children:[p.jsx(f.Actions,{position:"left",show:`(max-width: ${g.breakpoints.mq3}px)`,children:p.jsx(O,{ariaLabel:"menu",dataTestId:"hamburger-menu-icon",onClick:i(()=>null,"onClick"),size:"medium",children:p.jsx(E,{"aria-expanded":!1,code:"menu"})})}),t==="standard"&&e?p.jsx(f.AppName,{name:e}):null,p.jsx(f.Logo,{children:t==="standard"?p.jsx("img",{alt:"Daimler Truck",src:"./images/daimler_truck.svg",style:{height:s?"10px":"20px",width:"auto"}}):p.jsx("img",{alt:"Daimler Truck",src:"./images/daimler_truck_compact.svg",style:{height:s?"14px":"18px",width:"auto"}})}),t==="compact"&&e?p.jsx(f.AppName,{name:e}):null,n?p.jsx(f.Navigation,{position:a||"center",show:`(min-width: ${g.breakpoints.mq3}px)`,children:p.jsx("ul",{style:{listStyle:"none",padding:0,margin:0,display:"flex",flexFlow:"row nowrap",justifyContent:"center",alignItems:"flex-start",gap:g.spacing.spacing_50},children:r.map(c=>p.jsx("li",{children:p.jsx("a",{href:c.link,style:{textTransform:"capitalize",color:g.palette.content.dark,transition:"color 0.2s ease-in-out"},children:c.label})},c.label))})}):null,p.jsxs(f.Actions,{position:"right",children:[p.jsx(O,{ariaLabel:"search",dataTestId:"search-btn",onClick:i(()=>null,"onClick"),size:"medium",variant:"default",children:p.jsx(E,{"aria-expanded":!1,code:"search"})}),p.jsx(O,{ariaLabel:"internationalization",dataTestId:"language-btn",onClick:i(()=>null,"onClick"),size:"medium",variant:"default",children:p.jsx(E,{"aria-expanded":!1,code:"language"})}),s?null:p.jsx(pt,{color:"grey_120",element:"p",fontStyles:"bodySmBold",id:"userName",children:"John Doe"}),p.jsx("button",{"aria-controls":"userMenu","aria-expanded":"false","aria-haspopup":"true","aria-labelledby":"userName",style:{border:"none",cursor:"pointer",backgroundColor:"transparent",padding:0,margin:0},type:"button",children:p.jsx($t,{hasTooltip:!1,size:"medium",title:"John Doe",type:"letter"})})]})]})})},"AppHeaderStoryWrapper"),ye={title:"Compound Components/AppHeader",component:f,parameters:{docs:{description:{component:"AppHeader is a flexible compound component that provides a complete application header with support for multiple layouts, responsive behavior, and customizable sections including logo, app name, navigation, and action buttons."},source:{transform:i((t,e)=>{var d,m,u,h;const a=((d=e.args)==null?void 0:d.type)||"standard",n=((m=e.args)==null?void 0:m.appName)||"App Name";(u=e.args)!=null&&u.hasNavigation;const o=((h=e.args)==null?void 0:h.navPosition)||"center",s=a==="standard",r=a==="compact";return`
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

${s&&n?`<AppHeader.AppName name="${n}" />`:""}

<AppHeader.Logo>
  ${s?`<img 
    src={'./images/daimler_truck.svg'} 
    alt='Daimler Truck'
    style={{ 
      height: isMobile ? '10px' : '20px', 
      width: 'auto'
    }} 
  />`:`<img 
    src={'./images/daimler_truck_compact.svg'}
    alt='Daimler Truck'
    style={{ 
      height: isMobile ? '14px' : '18px', 
      width: 'auto' 
    }} 
  />`}
</AppHeader.Logo>

${r&&n?`<AppHeader.AppName name="${n}" />`:""}

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
</AppHeader>`.trim()},"transform")}}},args:{type:"standard",appName:"App Name",navPosition:"center"},argTypes:{type:{options:["standard","compact"],control:{type:"inline-radio"},description:"The type of AppHeader layout"},appName:{control:{type:"text"},description:"AppName text content"},navPosition:{options:["center","left","right"],control:{type:"inline-radio"},description:"Navigation position"}},render:i(t=>p.jsx(Qt,{...t}),"render")},S={name:"Standard center nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"center"}},$={name:"Standard left nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"left"}},I={name:"Standard no nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",hasNavigation:!1}},T={name:"Compact center nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"center"}},H={name:"Compact left nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"left"}},j={name:"Compact no nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",hasNavigation:!1}};var W,q,J;S.parameters={...S.parameters,docs:{...(W=S.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: 'Standard center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...(J=(q=S.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};var F,U,X;$.parameters={...$.parameters,docs:{...(F=$.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'Standard left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...(X=(U=$.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,Z,K;I.parameters={...I.parameters,docs:{...(Y=I.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: 'Standard no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...(K=(Z=I.parameters)==null?void 0:Z.docs)==null?void 0:K.source}}};var Q,tt,et;T.parameters={...T.parameters,docs:{...(Q=T.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  name: 'Compact center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...(et=(tt=T.parameters)==null?void 0:tt.docs)==null?void 0:et.source}}};var at,nt,ot;H.parameters={...H.parameters,docs:{...(at=H.parameters)==null?void 0:at.docs,source:{originalSource:`{
  name: 'Compact left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...(ot=(nt=H.parameters)==null?void 0:nt.docs)==null?void 0:ot.source}}};var st,it,rt;j.parameters={...j.parameters,docs:{...(st=j.parameters)==null?void 0:st.docs,source:{originalSource:`{
  name: 'Compact no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...(rt=(it=j.parameters)==null?void 0:it.docs)==null?void 0:rt.source}}};const ve=["Default","StandardWithLeftNavigation","StandardWithNoNavigation","Compact","CompactWithLeftNavigation","Minimal"];export{T as Compact,H as CompactWithLeftNavigation,S as Default,j as Minimal,$ as StandardWithLeftNavigation,I as StandardWithNoNavigation,ve as __namedExportsOrder,ye as default};

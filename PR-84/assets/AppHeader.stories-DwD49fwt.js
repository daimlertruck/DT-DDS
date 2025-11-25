var we=Object.defineProperty;var s=(e,t)=>we(e,"name",{value:t,configurable:!0});import{j as i}from"./jsx-runtime-Cgz2XvFB.js";import{A as Ce}from"./Avatar-BSX1BqAZ.js";import{B as ce}from"./index-juXVSS06.js";import{t as h}from"./index-Dw_1laFD.js";import"./index-Ds0gOAx8.js";import"./index-KKT4VDis.js";import{u as y}from"./useMedia-CRgJMRRc.js";import{r as x,R as A}from"./index-CwbBKW39.js";import{I as O}from"./Icon-BrO18bYS.js";import{I}from"./IconButton-BxQ2uS0G.js";import{T as B}from"./Typography-BDc1BtFV.js";import"./typography-B3nKKPHm.js";import{f as w,d as le}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./Tooltip-DlW6jCwD.js";import"./z-index-BLm_Le11.js";import"./Avatar.styled-CxoZIEaX.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-6Tx4pmSd.js";import"./iframe-DD6Os20U.js";const de=64,Ie=72,Se=52,me=1,$e="calc(100% / 3)",He=54,Te=200,je=50,d={NAVIGATION:"AppHeader.Navigation",APP_NAME:"AppHeader.AppName",LOGO:"AppHeader.Logo",ACTIONS:"AppHeader.Actions"},Pe=w.header`
  ${({theme:e,isMobile:t})=>{const a=e.spacing.spacing_60;return`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${e.spacing.spacing_50};
      width: 100%;
      height: ${t?`${Ie}px`:`${de}px`};
      overflow: hidden;
      padding: 0 ${a};
      position: fixed;
      top: 0;
      z-index: ${me};
      background: ${e.palette.surface.contrast};
    `}}
`,ue=x.createContext(null),_e=s(({value:e,children:t})=>i.jsx(ue.Provider,{value:e,children:t}),"AppHeaderContextProvider"),_=s(()=>{const e=x.useContext(ue);if(!e)throw new Error("AppHeader compound components must be used within AppHeader");return e},"useAppHeaderContext"),Le=s((e,t,a,o)=>({isStandard:e==="standard",isCompact:e==="compact",isNavCenter:t==="center",isNavLeft:t==="left",isNavRight:t==="right",isNavCompact:e==="compact"||!a,hasAppName:!!a,isActionsPositionRight:o}),"computeHeaderState"),Me=s((e,t)=>e==="standard"&&!!t,"shouldCenterLogo"),v=s(e=>{var t;return(t=e.type)==null?void 0:t.displayName},"getDisplayName"),D=s((e,t)=>{const a=x.Children.toArray(e);for(const o of a)if(A.isValidElement(o)){if(t(o))return o;const n=o.props;if(n!=null&&n.children){const r=D(n.children,t);if(r)return r}}return null},"findChildRecursive"),R=s((e,t)=>D(e,a=>v(a)===t),"findChildByType"),Ee=s((e,t,a,o)=>D(e,n=>{if(v(n)!==t)return!1;const r=n.props;return a in r&&r[a]===o}),"findChildByTypeAndProp"),ke=s((e,t,a,o)=>x.Children.toArray(e).findIndex(r=>{if(!A.isValidElement(r)||v(r)!==t)return!1;const c=r.props;return a in c&&c[a]===o}),"findChildIndexByTypeAndProp"),z=s((e,t,a)=>{if(!A.isValidElement(e))return a;const o=e.props;return t in o&&o[t]!==void 0?o[t]:a},"extractProp"),he=s((e,t)=>{const a={};return x.Children.toArray(e).forEach((n,r)=>{if(A.isValidElement(n)){const p=v(n);p&&t.includes(p)&&(a[p]=r)}}),a},"findChildIndices"),G=s((e,t)=>Math.abs(e-t)===1,"areSiblings"),ge=s((e,t,a,o)=>{const n=A.Children.toArray(e),r=[];let p=0;for(;p<n.length;){const c=n[p],l=p+1<n.length?n[p+1]:null;if(A.isValidElement(c)&&A.isValidElement(l)){const m=v(c),u=v(l);if(m&&u&&t.includes(m)&&t.includes(u)&&G(p,p+1)){r.push(i.jsxs(ce,{style:{display:"flex",flexWrap:"nowrap",flexDirection:a?"column":"row",alignItems:a?"flex-start":"center",justifyContent:a?"center":"flex-start",height:a?"48px":"auto",gap:a?h.spacing.spacing_0:h.spacing.spacing_30,...o},children:[c,l]},`group-${p}`)),p+=2;continue}}r.push(c),p++}return r},"groupSiblingComponents"),Oe=s(e=>!e.isNavRight||!e.isActionsPositionRight?!1:e.isCompact||e.isStandard&&!e.hasAppName,"shouldGroupNavigationAndActions"),Be=s((e,t,a)=>{const n=he(e,[d.NAVIGATION,d.ACTIONS])[d.NAVIGATION]??-1,r=ke(e,d.ACTIONS,"position","right");return n!==-1&&r!==-1&&G(n,r)?ge(e,[d.NAVIGATION,d.ACTIONS],t,{position:"fixed",right:a.spacing.spacing_60}):e},"groupNavigationAndActionsIfSiblings"),De=s(({type:e="standard",style:t,children:a,...o})=>{const n=le(),r=y(`(max-width: ${n.breakpoints.mq3}px)`),p=z(R(a,d.NAVIGATION),"position","center"),c=z(R(a,d.APP_NAME),"name",void 0),l=he(a,[d.APP_NAME,d.LOGO,d.NAVIGATION,d.ACTIONS]),m=l[d.APP_NAME]??-1,u=l[d.LOGO]??-1,b=Me(e,c),C=m!==-1&&u!==-1&&G(m,u),M=Ee(a,d.ACTIONS,"position","right")!==null,N=Le(e,p,c,M),E=x.useMemo(()=>({state:N,shouldCenterLogo:b,hasAppNameAsSibling:C,isMobile:r}),[N,b,C,r]),k=x.useMemo(()=>{let g=a;return g=ge(g,[d.APP_NAME,d.LOGO],r),Oe(N)&&(g=Be(g,r,n)),g},[a,N,r,n]);return i.jsx(_e,{value:E,children:i.jsx(Pe,{isMobile:r,style:t,...o,children:k})})},"AppHeader$1"),Ge=s((e,t)=>e==="left"?"relative":t.isNavRight?t.isStandard&&t.hasAppName?"fixed":"relative":"fixed","getActionsPosition"),Re=s((e,t,a)=>{if(t==="left")return"auto";const o=e.spacing.spacing_60;return a.isNavRight?a.isStandard&&a.hasAppName?o:0:o},"getActionsRight"),ze=s((e,t)=>{if(t==="left")return"auto";const{isNavLeft:a,isStandard:o,hasAppName:n}=e;return a&&o&&!n?"auto":$e},"getActionsMinWidth"),Ve=w.div`
  ${({theme:e,state:t,position:a="right"})=>{const o=Ge(a,t),n=Re(e,a,t),r=ze(t,a);return`
      display: flex;
      align-items: center;
      position: ${o};
      right: ${n};
      min-width: ${r};
      flex-direction: row;
      justify-content: ${a==="left"?"flex-start":"flex-end"};
      gap: ${e.spacing.spacing_50};
    `}}
`,L=s(e=>{const t=s(a=>{const o=y(a.hide||"(max-width: 0px)"),n=y(a.show||"(max-width: 0px)");if(a.hide&&o||a.show&&!n)return null;const{hide:r,show:p,...c}=a;return i.jsx(e,{...c})},"ResponsiveComponent");return t.displayName=e.displayName||e.name||"Component",t},"withResponsive"),fe=s(({children:e,position:t="right",...a})=>{const o=le(),n=y(`(max-width: ${o.breakpoints.mq3}px)`),{state:r}=_();return i.jsx(Ve,{isMobile:n,position:t,state:r,...a,children:e})},"ActionsBase");fe.displayName="AppHeader.Actions";const We=L(fe),V=w.div`
  ${({state:e,isMobile:t})=>{const a=t&&e.isStandard;return`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      min-width: auto;
      width: auto;
      max-width: ${Te}px;
      max-height: ${je}px;
      
      ${a?"justify-content: flex-start;":""}
      
      > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
     
    `}}
`,Ae=s(({name:e,children:t,...a})=>{const{state:o,isMobile:n}=_(),r=o.isStandard?"h5":"h5Bold",p=n?"h6Bold":r,c=t??e;return c?t?i.jsx(V,{isMobile:n,state:o,...a,children:c}):i.jsx(V,{isMobile:n,state:o,...a,children:i.jsx(B,{color:"primary.default",element:"span",fontStyles:p,children:c})}):null},"AppNameBase");Ae.displayName="AppHeader.AppName";const qe=L(Ae),Fe=w.div`
  ${({shouldCenterLogo:e})=>`
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
        max-height: ${He}px;
        width: auto;
        height: auto;
        object-fit: contain;
      }

      ${e?`
      width: auto;
      min-width: auto;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    `:""}
    `}
`,xe=s(({children:e,...t})=>{const{shouldCenterLogo:a,isMobile:o}=_(),n=a&&!o;return i.jsx(Fe,{shouldCenterLogo:n,...t,children:e})},"LogoBase");xe.displayName="AppHeader.Logo";const Je=L(xe),W={absoluteCenter:`
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
  `},Ne=s(e=>e.isNavCenter?e.isNavCompact||!e.hasAppName:!1,"shouldUseAbsoluteCenter"),Xe=s(e=>Ne(e)?W.absoluteCenter:e.isNavCenter?W.autoMargins:"","getNavigationCenteringStyles"),Ue=s((e,t,a)=>e?"center":t?"flex-start":a?"flex-end":"center","getJustifyContent"),Ye=w.nav`
  ${({theme:e,state:t})=>{const{isStandard:a,hasAppName:o,isNavCompact:n,isNavLeft:r,isNavRight:p}=t,c=a&&o,l=Ne(t),m=c?"fixed":"relative",u=n?0:`${de}px`,b=n?"auto":"100%",C=n?"auto":`${Se}px`,M=l?"absolute":m,N=l?"50%":u,E=l?"50%":"0",k=l?"auto":"0",g=l?"auto":b,ve=Ue(l,r,p),be=Xe(t);return`
      position: ${M};
      top: ${N};
      left: ${E};
      right: ${k};
      z-index: ${me};
      width: ${g};
      min-height: ${C};
      height: auto;
      background-color: ${e.palette.surface.contrast};
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: ${ve};
      padding: 0 ${e.spacing.spacing_60};

      ${be}
    `}}
`,ye=s(({children:e,...t})=>{const{state:a}=_();return i.jsx(Ye,{state:a,...t,children:e})},"NavigationBase");ye.displayName="AppHeader.Navigation";const Ze=L(ye),f=Object.assign(De,{Logo:Je,AppName:qe,Navigation:Ze,Actions:We}),Ke=s(({type:e="standard",appName:t,navPosition:a="center",hasNavigation:o=!0,...n})=>{const r=y(`(max-width: ${h.breakpoints.mq3}px)`),p=y(`(min-width: ${h.breakpoints.mq4}px)`),c=[{label:"Home",link:"/home"},{label:"About",link:"/about"},{label:"Contact",link:"/contact"}];return i.jsx("div",{style:{width:"100%",height:"200px",backgroundColor:h.palette.surface.light},children:i.jsxs(f,{type:e,...n,children:[i.jsx(f.Actions,{position:"left",show:`(max-width: ${h.breakpoints.mq3}px)`,children:i.jsx(I,{ariaLabel:"menu",dataTestId:"hamburger-menu-icon",onClick:s(()=>null,"onClick"),size:"large",children:i.jsx(O,{"aria-expanded":!1,code:"menu"})})}),i.jsx(f.Logo,{children:e==="standard"&&!r?i.jsx("img",{alt:"Daimler Truck",src:"./images/daimler_truck.svg",style:{height:p?"20px":"15px",width:"auto"}}):i.jsx(B,{color:"primary.default",element:"p",fontStyles:`${r?"h6":"h5"}`,id:"brandName",children:"Daimler Truck"})}),t?i.jsx(f.AppName,{name:t}):null,o?i.jsx(f.Navigation,{position:a||"center",show:`(min-width: ${h.breakpoints.mq3}px)`,children:i.jsx("ul",{style:{listStyle:"none",padding:0,margin:0,display:"flex",flexFlow:"row nowrap",justifyContent:"center",alignItems:"flex-start",gap:h.spacing.spacing_60},children:c.map(l=>i.jsx("li",{children:i.jsx("a",{href:l.link,style:{textTransform:"capitalize",color:h.palette.content.dark,transition:"color 0.2s ease-in-out"},children:l.label})},l.label))})}):null,i.jsxs(f.Actions,{position:"right",children:[i.jsx(I,{ariaLabel:"search",dataTestId:"search-btn",onClick:s(()=>null,"onClick"),size:"medium",variant:"default",children:i.jsx(O,{"aria-expanded":!1,code:"search"})}),i.jsx(I,{ariaLabel:"internationalization",dataTestId:"language-btn",onClick:s(()=>null,"onClick"),size:"medium",variant:"default",children:i.jsx(O,{"aria-expanded":!1,code:"language"})}),i.jsxs(ce,{style:{flexFlow:"row nowrap",gap:h.spacing.spacing_30},children:[r?null:i.jsx(B,{color:"primary.default",element:"p",fontStyles:"bodySmBold",id:"userName",children:"John Doe"}),i.jsx(I,{"aria-controls":"userMenu","aria-expanded":"false","aria-haspopup":"true","aria-labelledby":"userName",ariaLabel:"User Menu",type:"button",children:i.jsx(Ce,{size:"medium",title:"John Doe"})})]})]})]})})},"AppHeaderStoryWrapper"),Nt={title:"Compound Components/AppHeader",component:f,parameters:{docs:{description:{component:"AppHeader is a flexible compound component that provides a complete application header with support for multiple layouts, responsive behavior, and customizable sections including logo, app name, navigation, and action buttons."},source:{transform:s((e,t)=>{var c,l,m,u;const a=((c=t.args)==null?void 0:c.type)||"standard",o=((l=t.args)==null?void 0:l.appName)||"App Name";(m=t.args)!=null&&m.hasNavigation;const n=((u=t.args)==null?void 0:u.navPosition)||"center";return`
import { useTheme } from '@emotion/react';
import { useMedia } from '@dt-dds/react-core';


const theme = useTheme();
const isMobile = useMedia(\`(max-width: \${theme.breakpoints.mq3}px)\`);
const isDesktop = useMedia(\`(min-width: \${theme.breakpoints.mq4}px)\`);

<AppHeader type="${a}" {...rest}>
  <AppHeader.Actions
    position='left'
    show={\`(max-width: \${theme.breakpoints.mq3}px)\`}
  >
  <IconButton
    ariaLabel='menu'
    dataTestId='hamburger-menu-icon'
    onClick={() => null}
    size='large'
  >
    <Icon aria-expanded={false} code='menu' />
  </IconButton>
</AppHeader.Actions>

<AppHeader.Logo>
  ${a==="standard"?`{!isMobile ? (
  <img 
    src={'./images/daimler_truck.svg'} 
    alt='Daimler Truck'
    style={{ 
      height: isDesktop ? '20px' : '15px', 
      width: 'auto'
    }} 
  />
  ) : (
  <Typography
    color='primary.default'
    element='p'
    fontStyles={\`\${isMobile ? 'h6' : 'h5'}\`}
    id='brandName'
  >
    Daimler Truck
  </Typography>
  )}`:`<Typography
    color='primary.default'
    element='p'
    fontStyles={\`\${isMobile ? 'h6' : 'h5'}\`}
    id='brandName'
  >
    Daimler Truck
  </Typography>`}
</AppHeader.Logo>

${`<AppHeader.AppName name="${o}" />`}

${`<AppHeader.Navigation 
  position="${n}" 
  show={\`(min-width: \${theme.breakpoints.mq3}px)\`}>
  <ul style={{ 
    listStyle: 'none', 
    padding: 0, 
    margin: 0, 
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: theme.spacing.spacing_60, 
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
  <IconButton
    ariaLabel='internationalization'
    dataTestId='language-btn'
    onClick={() => null}
    size='medium'
    variant='default'
  >
    <Icon aria-expanded={false} code='language' />
  </IconButton>
  <Box style={{ 
    flexFlow: 'row nowrap', 
    gap: theme.spacing.spacing_30 
  }}>
  {isMobile ? null : (
    <Typography
      color='primary.default'
      element='p'
      fontStyles='bodySmBold'
      id='userName'
    >
      John Doe
    </Typography>
  )}
    <IconButton 
      aria-controls='userName'
      aria-haspopup='true'
      aria-controls='userMenu'
      aria-expanded='false'
      ariaLabel='User Menu'
    >
      <Avatar size='medium' title='John Doe' />
    </IconButton>
  </Box>
  </AppHeader.Actions>
</AppHeader>`.trim()},"transform")}}},args:{type:"standard",appName:"App Name",navPosition:"center"},argTypes:{type:{options:["standard","compact"],control:{type:"inline-radio"},description:"The type of AppHeader layout"},appName:{control:{type:"text"},description:"AppName text content"},navPosition:{options:["center","left","right"],control:{type:"inline-radio"},description:"Navigation position"}},render:s(e=>i.jsx(Ke,{...e}),"render")},S={name:"Standard center nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"center"}},$={name:"Standard left nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"left"}},H={name:"Standard no nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",hasNavigation:!1}},T={name:"Compact center nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"center"}},j={name:"Compact left nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"left"}},P={name:"Compact no nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",hasNavigation:!1}};var q,F,J;S.parameters={...S.parameters,docs:{...(q=S.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: 'Standard center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...(J=(F=S.parameters)==null?void 0:F.docs)==null?void 0:J.source}}};var X,U,Y;$.parameters={...$.parameters,docs:{...(X=$.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: 'Standard left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...(Y=(U=$.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};var Z,K,Q;H.parameters={...H.parameters,docs:{...(Z=H.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  name: 'Standard no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...(Q=(K=H.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var ee,te,ae;T.parameters={...T.parameters,docs:{...(ee=T.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  name: 'Compact center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...(ae=(te=T.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var ne,oe,re;j.parameters={...j.parameters,docs:{...(ne=j.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  name: 'Compact left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...(re=(oe=j.parameters)==null?void 0:oe.docs)==null?void 0:re.source}}};var se,ie,pe;P.parameters={...P.parameters,docs:{...(se=P.parameters)==null?void 0:se.docs,source:{originalSource:`{
  name: 'Compact no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...(pe=(ie=P.parameters)==null?void 0:ie.docs)==null?void 0:pe.source}}};const yt=["Default","StandardWithLeftNavigation","StandardWithNoNavigation","Compact","CompactWithLeftNavigation","Minimal"];export{T as Compact,j as CompactWithLeftNavigation,S as Default,P as Minimal,$ as StandardWithLeftNavigation,H as StandardWithNoNavigation,yt as __namedExportsOrder,Nt as default};

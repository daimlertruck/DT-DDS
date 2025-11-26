var we=Object.defineProperty;var s=(e,t)=>we(e,"name",{value:t,configurable:!0});import{j as i}from"./jsx-runtime-Cgz2XvFB.js";import{A as Ce}from"./Avatar-DOrFMYhF.js";import{B as ce}from"./index-juXVSS06.js";import{t as h}from"./index-Dw_1laFD.js";import"./index-D2KK6fpr.js";import"./index-DV-VXEUn.js";import{u as N}from"./useMedia-CRgJMRRc.js";import{r as A,R as g}from"./index-CwbBKW39.js";import{I as O}from"./Icon-BrO18bYS.js";import{I}from"./IconButton-BxQ2uS0G.js";import{T as B}from"./Typography-BDc1BtFV.js";import"./typography-B3nKKPHm.js";import{f as w,d as le}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./Tooltip-mqUCC3Ja.js";import"./z-index-KGn0H6PT.js";import"./Avatar.styled-CxoZIEaX.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-6Tx4pmSd.js";import"./iframe-CvNp5JnE.js";const de=64,Ie=72,Se=52,me=1,$e="calc(100% / 3)",Te=54,He=170,je=250,_e=50,d={NAVIGATION:"AppHeader.Navigation",APP_NAME:"AppHeader.AppName",LOGO:"AppHeader.Logo",ACTIONS:"AppHeader.Actions"},Pe=w.header`
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
`,ue=A.createContext(null),Me=s(({value:e,children:t})=>i.jsx(ue.Provider,{value:e,children:t}),"AppHeaderContextProvider"),P=s(()=>{const e=A.useContext(ue);if(!e)throw new Error("AppHeader compound components must be used within AppHeader");return e},"useAppHeaderContext"),Ee=s((e,t,a,n)=>({isStandard:e==="standard",isCompact:e==="compact",isNavCenter:t==="center",isNavLeft:t==="left",isNavRight:t==="right",isNavCompact:e==="compact"||!a,hasAppName:!!a,isActionsPositionRight:n}),"computeHeaderState"),Le=s((e,t)=>e==="standard"&&!!t,"shouldCenterLogo"),y=s(e=>{var t;return(t=e.type)==null?void 0:t.displayName},"getDisplayName"),D=s((e,t)=>{const a=A.Children.toArray(e);for(const n of a)if(g.isValidElement(n)){if(t(n))return n;const o=n.props;if(o!=null&&o.children){const r=D(o.children,t);if(r)return r}}return null},"findChildRecursive"),R=s((e,t)=>D(e,a=>y(a)===t),"findChildByType"),ke=s((e,t,a,n)=>D(e,o=>{if(y(o)!==t)return!1;const r=o.props;return a in r&&r[a]===n}),"findChildByTypeAndProp"),Oe=s((e,t,a,n)=>A.Children.toArray(e).findIndex(r=>{if(!g.isValidElement(r)||y(r)!==t)return!1;const c=r.props;return a in c&&c[a]===n}),"findChildIndexByTypeAndProp"),z=s((e,t,a)=>{if(!g.isValidElement(e))return a;const n=e.props;return t in n&&n[t]!==void 0?n[t]:a},"extractProp"),he=s((e,t)=>{const a={};return A.Children.toArray(e).forEach((o,r)=>{if(g.isValidElement(o)){const p=y(o);p&&t.includes(p)&&(a[p]=r)}}),a},"findChildIndices"),G=s((e,t)=>Math.abs(e-t)===1,"areSiblings"),ge=s((e,t,a,n)=>{const o=g.Children.toArray(e),r=[];let p=0;for(;p<o.length;){const c=o[p],l=p+1<o.length?o[p+1]:null;if(g.isValidElement(c)&&g.isValidElement(l)){const m=y(c),u=y(l);if(m&&u&&t.includes(m)&&t.includes(u)&&G(p,p+1)){r.push(i.jsxs(ce,{style:{display:"flex",flexWrap:"nowrap",flexDirection:a?"column":"row",alignItems:a?"flex-start":"center",justifyContent:a?"center":"flex-start",height:a?"48px":"auto",gap:a?h.spacing.spacing_0:h.spacing.spacing_30,...n},children:[c,l]},`group-${p}`)),p+=2;continue}}r.push(c),p++}return r},"groupSiblingComponents"),Be=s(e=>!e.isNavRight||!e.isActionsPositionRight?!1:e.isCompact||e.isStandard&&!e.hasAppName,"shouldGroupNavigationAndActions"),De=s((e,t,a)=>{const n=e,r=he(n,[d.NAVIGATION,d.ACTIONS])[d.NAVIGATION]??-1,p=Oe(n,d.ACTIONS,"position","right");return r!==-1&&p!==-1&&G(r,p)?ge(n,[d.NAVIGATION,d.ACTIONS],t,{position:"fixed",right:a.spacing.spacing_60}):Array.isArray(e)?e:g.Children.toArray(e)},"groupNavigationAndActionsIfSiblings"),Ge=s(({type:e="standard",style:t,children:a,...n})=>{const o=le(),r=N(`(max-width: ${o.breakpoints.mq3}px)`),p=z(R(a,d.NAVIGATION),"position","center"),c=z(R(a,d.APP_NAME),"name",void 0),l=he(a,[d.APP_NAME,d.LOGO,d.NAVIGATION,d.ACTIONS]),m=l[d.APP_NAME]??-1,u=l[d.LOGO]??-1,v=Le(e,c),C=m!==-1&&u!==-1&&G(m,u),E=ke(a,d.ACTIONS,"position","right")!==null,x=Ee(e,p,c,E),L=A.useMemo(()=>({state:x,shouldCenterLogo:v,hasAppNameAsSibling:C,isMobile:r}),[x,v,C,r]),k=A.useMemo(()=>{let b=ge(a,[d.APP_NAME,d.LOGO],r);return Be(x)&&(b=De(b,r,o)),b},[a,x,r,o]);return i.jsx(Me,{value:L,children:i.jsx(Pe,{isMobile:r,style:t,...n,children:k})})},"AppHeader$1"),Re=s((e,t)=>e==="left"?"relative":t.isNavRight?t.isStandard&&t.hasAppName?"fixed":"relative":"fixed","getActionsPosition"),ze=s((e,t,a)=>{if(t==="left")return"auto";const n=e.spacing.spacing_60;return a.isNavRight?a.isStandard&&a.hasAppName?n:0:n},"getActionsRight"),Ve=s((e,t)=>{if(t==="left")return"auto";const{isNavLeft:a,isStandard:n,hasAppName:o}=e;return a&&n&&!o?"auto":$e},"getActionsMinWidth"),We=w.div`
  ${({theme:e,state:t,position:a="right"})=>{const n=Re(a,t),o=ze(e,a,t),r=Ve(t,a);return`
      display: flex;
      align-items: center;
      position: ${n};
      right: ${o};
      min-width: ${r};
      flex-direction: row;
      justify-content: ${a==="left"?"flex-start":"flex-end"};
      gap: ${e.spacing.spacing_50};
    `}}
`,M=s(e=>{const t=s(a=>{const n=N(a.hide||"(max-width: 0px)"),o=N(a.show||"(max-width: 0px)");if(a.hide&&n||a.show&&!o)return null;const{hide:r,show:p,...c}=a;return i.jsx(e,{...c})},"ResponsiveComponent");return t.displayName=e.displayName||e.name||"Component",t},"withResponsive"),fe=s(({children:e,position:t="right",...a})=>{const n=le(),o=N(`(max-width: ${n.breakpoints.mq3}px)`),{state:r}=P();return i.jsx(We,{isMobile:o,position:t,state:r,...a,children:e})},"ActionsBase");fe.displayName="AppHeader.Actions";const qe=M(fe),V=w.div`
  ${({theme:e,state:t,isMobile:a})=>{const n=a&&t.isStandard;return`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      min-width: auto;
      width: auto;
      max-width: ${He}px;
      max-height: ${_e}px;
      
      ${n?"justify-content: flex-start;":""}

      @media screen and (min-width: ${e.breakpoints.mq3}px) {
        max-width: ${je}px;
      }
      
      > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
     
    `}}
`,Ae=s(({name:e,children:t,...a})=>{const{state:n,isMobile:o}=P(),r=n.isStandard?"h5":"h5Bold",p=o?"h6Bold":r,c=t??e;return c?t?i.jsx(V,{isMobile:o,state:n,...a,children:c}):i.jsx(V,{isMobile:o,state:n,...a,children:i.jsx(B,{color:"primary.default",element:"span",fontStyles:p,children:c})}):null},"AppNameBase");Ae.displayName="AppHeader.AppName";const Xe=M(Ae),Fe=w.div`
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
        max-height: ${Te}px;
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
`,xe=s(({children:e,...t})=>{const{shouldCenterLogo:a,isMobile:n}=P(),o=a&&!n;return i.jsx(Fe,{shouldCenterLogo:o,...t,children:e})},"LogoBase");xe.displayName="AppHeader.Logo";const Je=M(xe),W={absoluteCenter:`
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
  `},Ne=s(e=>e.isNavCenter?e.isNavCompact||!e.hasAppName:!1,"shouldUseAbsoluteCenter"),Ue=s(e=>Ne(e)?W.absoluteCenter:e.isNavCenter?W.autoMargins:"","getNavigationCenteringStyles"),Ke=s((e,t,a)=>e?"center":t?"flex-start":a?"flex-end":"center","getJustifyContent"),Ye=w.nav`
  ${({theme:e,state:t})=>{const{isStandard:a,hasAppName:n,isNavCompact:o,isNavLeft:r,isNavRight:p}=t,c=a&&n,l=Ne(t),m=c?"fixed":"relative",u=o?0:`${de}px`,v=o?"auto":"100%",C=o?"auto":`${Se}px`,E=l?"absolute":m,x=l?"50%":u,L=l?"50%":"0",k=l?"auto":"0",b=l?"auto":v,ve=Ke(l,r,p),be=Ue(t);return`
      position: ${E};
      top: ${x};
      left: ${L};
      right: ${k};
      z-index: ${me};
      width: ${b};
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
`,ye=s(({children:e,...t})=>{const{state:a}=P();return i.jsx(Ye,{state:a,...t,children:e})},"NavigationBase");ye.displayName="AppHeader.Navigation";const Ze=M(ye),f=Object.assign(Ge,{Logo:Je,AppName:Xe,Navigation:Ze,Actions:qe}),Qe=s(({type:e="standard",appName:t,navPosition:a="center",hasNavigation:n=!0,...o})=>{const r=N(`(max-width: ${h.breakpoints.mq3}px)`),p=N(`(min-width: ${h.breakpoints.mq4}px)`),c=[{label:"Home",link:"/home"},{label:"About",link:"/about"},{label:"Contact",link:"/contact"}];return i.jsx("div",{style:{width:"100%",height:"200px",backgroundColor:h.palette.surface.light},children:i.jsxs(f,{type:e,...o,children:[i.jsx(f.Actions,{position:"left",show:`(max-width: ${h.breakpoints.mq3}px)`,children:i.jsx(I,{ariaLabel:"menu",dataTestId:"hamburger-menu-icon",onClick:s(()=>null,"onClick"),size:"large",children:i.jsx(O,{"aria-expanded":!1,code:"menu"})})}),i.jsx(f.Logo,{children:e==="standard"&&!r?i.jsx("img",{alt:"Daimler Truck",src:"./images/daimler_truck.svg",style:{height:p?"20px":"15px",width:"auto"}}):i.jsx(B,{color:"primary.default",element:"p",fontStyles:`${r?"h6":"h5"}`,id:"brandName",children:"Daimler Truck"})}),t?i.jsx(f.AppName,{name:t}):null,n?i.jsx(f.Navigation,{position:a||"center",show:`(min-width: ${h.breakpoints.mq3}px)`,children:i.jsx("ul",{style:{listStyle:"none",padding:0,margin:0,display:"flex",flexFlow:"row nowrap",justifyContent:"center",alignItems:"flex-start",gap:h.spacing.spacing_60},children:c.map(l=>i.jsx("li",{children:i.jsx("a",{href:l.link,style:{textTransform:"capitalize",color:h.palette.content.dark,transition:"color 0.2s ease-in-out"},children:l.label})},l.label))})}):null,i.jsxs(f.Actions,{position:"right",children:[i.jsx(I,{ariaLabel:"search",dataTestId:"search-btn",onClick:s(()=>null,"onClick"),size:"medium",variant:"default",children:i.jsx(O,{"aria-expanded":!1,code:"search"})}),i.jsx(I,{ariaLabel:"internationalization",dataTestId:"language-btn",onClick:s(()=>null,"onClick"),size:"medium",variant:"default",children:i.jsx(O,{"aria-expanded":!1,code:"language"})}),i.jsxs(ce,{style:{flexFlow:"row nowrap",gap:h.spacing.spacing_30},children:[r?null:i.jsx(B,{color:"primary.default",element:"p",fontStyles:"bodySmBold",id:"userName",children:"John Doe"}),i.jsx(I,{"aria-controls":"userMenu","aria-expanded":"false","aria-haspopup":"true","aria-labelledby":"userName",ariaLabel:"User Menu",type:"button",children:i.jsx(Ce,{size:"medium",title:"John Doe"})})]})]})]})})},"AppHeaderStoryWrapper"),yt={title:"Compound Components/AppHeader",component:f,parameters:{docs:{description:{component:"AppHeader is a flexible compound component that provides a complete application header with support for multiple layouts, responsive behavior, and customizable sections including logo, app name, navigation, and action buttons."},source:{transform:s((e,t)=>{var c,l,m,u;const a=((c=t.args)==null?void 0:c.type)||"standard",n=((l=t.args)==null?void 0:l.appName)||"App Name";(m=t.args)!=null&&m.hasNavigation;const o=((u=t.args)==null?void 0:u.navPosition)||"center";return`
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

${`<AppHeader.AppName name="${n}" />`}

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
</AppHeader>`.trim()},"transform")}}},args:{type:"standard",appName:"App Name",navPosition:"center"},argTypes:{type:{options:["standard","compact"],control:{type:"inline-radio"},description:"The type of AppHeader layout"},appName:{control:{type:"text"},description:"AppName text content"},navPosition:{options:["center","left","right"],control:{type:"inline-radio"},description:"Navigation position"}},render:s(e=>i.jsx(Qe,{...e}),"render")},S={name:"Standard center nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"center"}},$={name:"Standard left nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"left"}},T={name:"Standard no nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",hasNavigation:!1}},H={name:"Compact center nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"center"}},j={name:"Compact left nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"left"}},_={name:"Compact no nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",hasNavigation:!1}};var q,X,F;S.parameters={...S.parameters,docs:{...(q=S.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: 'Standard center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...(F=(X=S.parameters)==null?void 0:X.docs)==null?void 0:F.source}}};var J,U,K;$.parameters={...$.parameters,docs:{...(J=$.parameters)==null?void 0:J.docs,source:{originalSource:`{
  name: 'Standard left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...(K=(U=$.parameters)==null?void 0:U.docs)==null?void 0:K.source}}};var Y,Z,Q;T.parameters={...T.parameters,docs:{...(Y=T.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: 'Standard no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...(Q=(Z=T.parameters)==null?void 0:Z.docs)==null?void 0:Q.source}}};var ee,te,ae;H.parameters={...H.parameters,docs:{...(ee=H.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  name: 'Compact center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...(ae=(te=H.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var ne,oe,re;j.parameters={...j.parameters,docs:{...(ne=j.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  name: 'Compact left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...(re=(oe=j.parameters)==null?void 0:oe.docs)==null?void 0:re.source}}};var se,ie,pe;_.parameters={..._.parameters,docs:{...(se=_.parameters)==null?void 0:se.docs,source:{originalSource:`{
  name: 'Compact no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...(pe=(ie=_.parameters)==null?void 0:ie.docs)==null?void 0:pe.source}}};const vt=["Default","StandardWithLeftNavigation","StandardWithNoNavigation","Compact","CompactWithLeftNavigation","Minimal"];export{H as Compact,j as CompactWithLeftNavigation,S as Default,_ as Minimal,$ as StandardWithLeftNavigation,T as StandardWithNoNavigation,vt as __namedExportsOrder,yt as default};

var E=Object.defineProperty;var r=(n,e)=>E(n,"name",{value:e,configurable:!0});import{j as a}from"./jsx-runtime-Cgz2XvFB.js";import{A as U}from"./Avatar-HKXvY6fG.js";import{B as O}from"./index-DTgA8jos.js";import{t}from"./index-Xf3VWcnb.js";import"./index-Bfgvl4vq.js";import"./index-CwbBKW39.js";import"./index-DV-VXEUn.js";import{u as k}from"./useMedia-CRgJMRRc.js";import{I as N}from"./Icon-BWIy_dZb.js";import{I as m}from"./IconButton-DqfnmDe3.js";import{T as w}from"./Typography-Dk4smw7A.js";import{A as o}from"./index-ClTp-dsy.js";import"./Tooltip-Bx3UXqZg.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./typography-B3nKKPHm.js";import"./z-index-C44GOntP.js";import"./Avatar.styled-ieLONhHq.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-B1fQfNLW.js";const R=r(({type:n="standard",appName:e,navPosition:s="center",hasNavigation:y=!0,...x})=>{const p=k(`(max-width: ${t.breakpoints.mq3}px)`),v=k(`(min-width: ${t.breakpoints.mq4}px)`),l=[{label:"Home",link:"/home"},{label:"About",link:"/about"},{label:"Contact",link:"/contact"}];return a.jsx("div",{style:{width:"100%",height:"200px",backgroundColor:t.palette.surface.light},children:a.jsxs(o,{type:n,...x,children:[a.jsx(o.Actions,{position:"left",show:`(max-width: ${t.breakpoints.mq3}px)`,children:a.jsx(m,{ariaLabel:"menu",dataTestId:"hamburger-menu-icon",onClick:r(()=>null,"onClick"),size:"large",children:a.jsx(N,{"aria-expanded":!1,code:"menu"})})}),a.jsx(o.Logo,{children:n==="standard"&&!p?a.jsx("img",{alt:"Daimler Truck",src:"./images/daimler_truck.svg",style:{height:v?"20px":"15px",width:"auto"}}):a.jsx(w,{color:"primary.default",element:"p",fontStyles:`${p?"h6":"h5"}`,id:"brandName",children:"Daimler Truck"})}),e?a.jsx(o.AppName,{name:e}):null,y?a.jsx(o.Navigation,{position:s||"center",show:`(min-width: ${t.breakpoints.mq3}px)`,children:a.jsx("ul",{style:{listStyle:"none",padding:0,margin:0,display:"flex",flexFlow:"row nowrap",justifyContent:"center",alignItems:"flex-start",gap:t.spacing.spacing_60},children:l.map(i=>a.jsx("li",{children:a.jsx("a",{href:i.link,style:{textTransform:"capitalize",color:t.palette.content.dark,transition:"color 0.2s ease-in-out"},children:i.label})},i.label))})}):null,a.jsxs(o.Actions,{position:"right",children:[a.jsx(m,{ariaLabel:"search",dataTestId:"search-btn",onClick:r(()=>null,"onClick"),size:"medium",variant:"default",children:a.jsx(N,{"aria-expanded":!1,code:"search"})}),a.jsx(m,{ariaLabel:"internationalization",dataTestId:"language-btn",onClick:r(()=>null,"onClick"),size:"medium",variant:"default",children:a.jsx(N,{"aria-expanded":!1,code:"language"})}),a.jsxs(O,{style:{flexFlow:"row nowrap",gap:t.spacing.spacing_30},children:[p?null:a.jsx(w,{color:"primary.default",element:"p",fontStyles:"bodySmBold",id:"userName",children:"John Doe"}),a.jsx(m,{"aria-controls":"userMenu","aria-expanded":"false","aria-haspopup":"true","aria-labelledby":"userName",ariaLabel:"User Menu",type:"button",children:a.jsx(U,{size:"medium",title:"John Doe"})})]})]})]})})},"AppHeaderStoryWrapper"),ha={title:"Compound Components/AppHeader",component:o,parameters:{docs:{description:{component:"AppHeader is a flexible compound component that provides a complete application header with support for multiple layouts, responsive behavior, and customizable sections including logo, app name, navigation, and action buttons."},source:{transform:r((n,e)=>{var l,i,b,A;const s=((l=e.args)==null?void 0:l.type)||"standard",y=((i=e.args)==null?void 0:i.appName)||"App Name";(b=e.args)!=null&&b.hasNavigation;const x=((A=e.args)==null?void 0:A.navPosition)||"center";return`
import { useTheme } from '@emotion/react';
import { useMedia } from '@dt-dds/react-core';


const theme = useTheme();
const isMobile = useMedia(\`(max-width: \${theme.breakpoints.mq3}px)\`);
const isDesktop = useMedia(\`(min-width: \${theme.breakpoints.mq4}px)\`);

<AppHeader type="${s}" {...rest}>
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
  ${s==="standard"?`{!isMobile ? (
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

${`<AppHeader.AppName name="${y}" />`}

${`<AppHeader.Navigation 
  position="${x}" 
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
</AppHeader>`.trim()},"transform")}}},args:{type:"standard",appName:"App Name",navPosition:"center"},argTypes:{type:{options:["standard","compact"],control:{type:"inline-radio"},description:"The type of AppHeader layout"},appName:{control:{type:"text"},description:"AppName text content"},navPosition:{options:["center","left","right"],control:{type:"inline-radio"},description:"Navigation position"}},render:r(n=>a.jsx(R,{...n}),"render")},c={name:"Standard center nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"center"}},d={name:"Standard left nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"left"}},u={name:"Standard no nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",hasNavigation:!1}},h={name:"Compact center nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"center"}},g={name:"Compact left nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"left"}},f={name:"Compact no nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",hasNavigation:!1}};var S,j,T;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'Standard center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...(T=(j=c.parameters)==null?void 0:j.docs)==null?void 0:T.source}}};var I,C,H;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: 'Standard left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...(H=(C=d.parameters)==null?void 0:C.docs)==null?void 0:H.source}}};var B,$,M;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: 'Standard no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...(M=($=u.parameters)==null?void 0:$.docs)==null?void 0:M.source}}};var L,D,z;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: 'Compact center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...(z=(D=h.parameters)==null?void 0:D.docs)==null?void 0:z.source}}};var P,q,_;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: 'Compact left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...(_=(q=g.parameters)==null?void 0:q.docs)==null?void 0:_.source}}};var W,F,J;f.parameters={...f.parameters,docs:{...(W=f.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: 'Compact no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...(J=(F=f.parameters)==null?void 0:F.docs)==null?void 0:J.source}}};const ga=["Default","StandardWithLeftNavigation","StandardWithNoNavigation","Compact","CompactWithLeftNavigation","Minimal"];export{h as Compact,g as CompactWithLeftNavigation,c as Default,f as Minimal,d as StandardWithLeftNavigation,u as StandardWithNoNavigation,ga as __namedExportsOrder,ha as default};

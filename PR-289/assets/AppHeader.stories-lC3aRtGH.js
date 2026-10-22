var w=Object.defineProperty;var t=(r,e)=>w(r,"name",{value:e,configurable:!0});import{n as j}from"./rolldown-runtime-CzYk_CEw.js";import{n as x}from"./src-DGNtCwAd.js";import{t as S}from"./jsx-runtime-Br4tQxt1.js";import{t as T}from"./icon-OuUDthRF.js";import{r as n,t as I}from"./src-COQ5RfcX.js";import{t as N}from"./Typography-CfA1D3DF.js";import{l as v,t as C}from"./core-tFyv4o0n.js";import{t as H}from"./Avatar-hIZCneov.js";import{n as $,r as M,t as o}from"./src-Bewc7Krp.js";import{t as B}from"./src-CYYpCRzL.js";import{t as L}from"./box-Dhy-LEcB.js";import{t as D}from"./typography-D2a4VPS7.js";import{t as g}from"./IconButton-yXF3faAu.js";import{t as z}from"./icon-button-DemP2Y7v.js";var a,b,P,s,p,l,m,c,d,q;function A(){return(A=j((()=>{M(),L(),C(),T(),z(),D(),I(),$(),a=S(),b=t(({type:r="standard",appName:e,navPosition:u="center",hasNavigation:h=!0,...f})=>{const i=v(`(max-width: ${n.breakpoints.mq3}px)`),_=v(`(min-width: ${n.breakpoints.mq4}px)`),k=[{label:"Home",link:"/home"},{label:"About",link:"/about"},{label:"Contact",link:"/contact"}];return(0,a.jsx)("div",{style:{width:"100%",height:"200px",backgroundColor:n.palette.surface.light},children:(0,a.jsxs)(o,{type:r,...f,children:[(0,a.jsx)(o.Actions,{position:"left",show:`(max-width: ${n.breakpoints.mq3}px)`,children:(0,a.jsx)(g,{ariaLabel:"menu",dataTestId:"hamburger-menu-icon",onClick:t(()=>null,"onClick"),size:"large",children:(0,a.jsx)(x,{"aria-expanded":!1,code:"menu"})})}),(0,a.jsx)(o.Logo,{children:r==="standard"&&!i?(0,a.jsx)("img",{alt:"Daimler Truck",src:"./images/daimler_truck.svg",style:{height:_?"20px":"15px",width:"auto"}}):(0,a.jsx)(N,{color:"primary.default",element:"p",fontStyles:`${i?"h6":"h5"}`,id:"brandName",children:"Daimler Truck"})}),e?(0,a.jsx)(o.AppName,{name:e}):null,h?(0,a.jsx)(o.Navigation,{position:u||"center",show:`(min-width: ${n.breakpoints.mq3}px)`,children:(0,a.jsx)("ul",{style:{listStyle:"none",padding:0,margin:0,display:"flex",flexFlow:"row nowrap",justifyContent:"center",alignItems:"flex-start",gap:n.spacing.spacing_60},children:k.map(y=>(0,a.jsx)("li",{children:(0,a.jsx)("a",{href:y.link,style:{textTransform:"capitalize",color:n.palette.content.dark,transition:"color 0.2s ease-in-out"},children:y.label})},y.label))})}):null,(0,a.jsxs)(o.Actions,{position:"right",children:[(0,a.jsx)(g,{ariaLabel:"search",dataTestId:"search-btn",onClick:t(()=>null,"onClick"),size:"medium",variant:"default",children:(0,a.jsx)(x,{"aria-expanded":!1,code:"search"})}),(0,a.jsx)(g,{ariaLabel:"internationalization",dataTestId:"language-btn",onClick:t(()=>null,"onClick"),size:"medium",variant:"default",children:(0,a.jsx)(x,{"aria-expanded":!1,code:"language"})}),(0,a.jsxs)(B,{style:{flexFlow:"row nowrap",gap:n.spacing.spacing_30},children:[i?null:(0,a.jsx)(N,{color:"primary.default",element:"p",fontStyles:"bodySmBold",id:"userName",children:"John Doe"}),(0,a.jsx)(g,{"aria-controls":"userMenu","aria-expanded":"false","aria-haspopup":"true","aria-labelledby":"userName",ariaLabel:"User Menu",type:"button",children:(0,a.jsx)(H,{size:"medium",title:"John Doe"})})]})]})]})})},"AppHeaderStoryWrapper"),P={title:"Compound Components/AppHeader",component:o,parameters:{docs:{description:{component:"AppHeader is a flexible compound component that provides a complete application header with support for multiple layouts, responsive behavior, and customizable sections including logo, app name, navigation, and action buttons."},source:{transform:t((r,e)=>{const u=e.args?.type||"standard",h=e.args?.appName||"App Name",f=e.args?.hasNavigation||!0,i=e.args?.navPosition||"center";return`
import { useTheme } from '@emotion/react';
import { useMedia } from '@dt-dds/react-core';


const theme = useTheme();
const isMobile = useMedia(\`(max-width: \${theme.breakpoints.mq3}px)\`);
const isDesktop = useMedia(\`(min-width: \${theme.breakpoints.mq4}px)\`);

<AppHeader type="${u}" {...rest}>
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
  ${u==="standard"?`{!isMobile ? (
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

${h?`<AppHeader.AppName name="${h}" />`:""}

${f?`<AppHeader.Navigation 
  position="${i}" 
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
</AppHeader.Navigation>`:""}

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
</AppHeader>`.trim()},"transform")}}},args:{type:"standard",appName:"App Name",navPosition:"center"},argTypes:{type:{options:["standard","compact"],control:{type:"inline-radio"},description:"The type of AppHeader layout"},appName:{control:{type:"text"},description:"AppName text content"},navPosition:{options:["center","left","right"],control:{type:"inline-radio"},description:"Navigation position"}},render:t(r=>(0,a.jsx)(b,{...r}),"render")},s={name:"Standard center nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"center"}},p={name:"Standard left nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"left"}},l={name:"Standard no nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",hasNavigation:!1}},m={name:"Compact center nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"center"}},c={name:"Compact left nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"left"}},d={name:"Compact no nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",hasNavigation:!1}},q=["Default","StandardWithLeftNavigation","StandardWithNoNavigation","Compact","CompactWithLeftNavigation","Minimal"],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Standard center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...s.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Standard left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...p.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Standard no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...l.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Compact center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...m.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Compact left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...c.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Compact no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...d.parameters?.docs?.source}}}})))()}t(A,"init_AppHeader_stories");A();export{m as Compact,c as CompactWithLeftNavigation,s as Default,d as Minimal,p as StandardWithLeftNavigation,l as StandardWithNoNavigation,q as __namedExportsOrder,P as default};

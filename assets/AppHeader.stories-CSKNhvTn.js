var k=Object.defineProperty;var r=(n,e)=>k(n,"name",{value:e,configurable:!0});import{t as x}from"./src-Cgsrikn0.js";import{t as w}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t}from"./src-CIbK0PmT.js";import{t as v}from"./Typography-BVFm109i.js";import{i as N}from"./core-DtZ76Qs_.js";import{t as j}from"./Avatar-BO8j0HaH.js";import{t as o}from"./src-DTbYyZKr.js";import{t as S}from"./src-1jRqCCWR.js";import"./box-DLdZVqFP.js";import"./typography-D38L8NZ6.js";import{t as l}from"./IconButton-DPHwvLfO.js";import"./icon-button-DUNOTLRV.js";var a=w(),T=r(({type:n="standard",appName:e,navPosition:s="center",hasNavigation:p=!0,...f})=>{const i=N(`(max-width: ${t.breakpoints.mq3}px)`),b=N(`(min-width: ${t.breakpoints.mq4}px)`),A=[{label:"Home",link:"/home"},{label:"About",link:"/about"},{label:"Contact",link:"/contact"}];return(0,a.jsx)("div",{style:{width:"100%",height:"200px",backgroundColor:t.palette.surface.light},children:(0,a.jsxs)(o,{type:n,...f,children:[(0,a.jsx)(o.Actions,{position:"left",show:`(max-width: ${t.breakpoints.mq3}px)`,children:(0,a.jsx)(l,{ariaLabel:"menu",dataTestId:"hamburger-menu-icon",onClick:r(()=>null,"onClick"),size:"large",children:(0,a.jsx)(x,{"aria-expanded":!1,code:"menu"})})}),(0,a.jsx)(o.Logo,{children:n==="standard"&&!i?(0,a.jsx)("img",{alt:"Daimler Truck",src:"./images/daimler_truck.svg",style:{height:b?"20px":"15px",width:"auto"}}):(0,a.jsx)(v,{color:"primary.default",element:"p",fontStyles:`${i?"h6":"h5"}`,id:"brandName",children:"Daimler Truck"})}),e?(0,a.jsx)(o.AppName,{name:e}):null,p?(0,a.jsx)(o.Navigation,{position:s||"center",show:`(min-width: ${t.breakpoints.mq3}px)`,children:(0,a.jsx)("ul",{style:{listStyle:"none",padding:0,margin:0,display:"flex",flexFlow:"row nowrap",justifyContent:"center",alignItems:"flex-start",gap:t.spacing.spacing_60},children:A.map(y=>(0,a.jsx)("li",{children:(0,a.jsx)("a",{href:y.link,style:{textTransform:"capitalize",color:t.palette.content.dark,transition:"color 0.2s ease-in-out"},children:y.label})},y.label))})}):null,(0,a.jsxs)(o.Actions,{position:"right",children:[(0,a.jsx)(l,{ariaLabel:"search",dataTestId:"search-btn",onClick:r(()=>null,"onClick"),size:"medium",variant:"default",children:(0,a.jsx)(x,{"aria-expanded":!1,code:"search"})}),(0,a.jsx)(l,{ariaLabel:"internationalization",dataTestId:"language-btn",onClick:r(()=>null,"onClick"),size:"medium",variant:"default",children:(0,a.jsx)(x,{"aria-expanded":!1,code:"language"})}),(0,a.jsxs)(S,{style:{flexFlow:"row nowrap",gap:t.spacing.spacing_30},children:[i?null:(0,a.jsx)(v,{color:"primary.default",element:"p",fontStyles:"bodySmBold",id:"userName",children:"John Doe"}),(0,a.jsx)(l,{"aria-controls":"userMenu","aria-expanded":"false","aria-haspopup":"true","aria-labelledby":"userName",ariaLabel:"User Menu",type:"button",children:(0,a.jsx)(j,{size:"medium",title:"John Doe"})})]})]})]})})},"AppHeaderStoryWrapper"),J={title:"Compound Components/AppHeader",component:o,parameters:{docs:{description:{component:"AppHeader is a flexible compound component that provides a complete application header with support for multiple layouts, responsive behavior, and customizable sections including logo, app name, navigation, and action buttons."},source:{transform:r((n,e)=>{const s=e.args?.type||"standard",p=e.args?.appName||"App Name",f=e.args?.hasNavigation||!0,i=e.args?.navPosition||"center";return`
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

${p?`<AppHeader.AppName name="${p}" />`:""}

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
</AppHeader>`.trim()},"transform")}}},args:{type:"standard",appName:"App Name",navPosition:"center"},argTypes:{type:{options:["standard","compact"],control:{type:"inline-radio"},description:"The type of AppHeader layout"},appName:{control:{type:"text"},description:"AppName text content"},navPosition:{options:["center","left","right"],control:{type:"inline-radio"},description:"Navigation position"}},render:r(n=>(0,a.jsx)(T,{...n}),"render")},m={name:"Standard center nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"center"}},c={name:"Standard left nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",navPosition:"left"}},d={name:"Standard no nav",parameters:{layout:"fullscreen"},args:{type:"standard",appName:"App Name",hasNavigation:!1}},u={name:"Compact center nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"center"}},h={name:"Compact left nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",navPosition:"left"}},g={name:"Compact no nav",parameters:{layout:"fullscreen"},args:{type:"compact",appName:"App Name",hasNavigation:!1}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Standard center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Standard left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Standard no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Compact center nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'center'
  }
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Compact left nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'left'
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Compact no nav',
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    hasNavigation: false
  }
}`,...g.parameters?.docs?.source}}};var U=["Default","StandardWithLeftNavigation","StandardWithNoNavigation","Compact","CompactWithLeftNavigation","Minimal"];export{u as Compact,h as CompactWithLeftNavigation,m as Default,g as Minimal,c as StandardWithLeftNavigation,d as StandardWithNoNavigation,U as __namedExportsOrder,J as default};

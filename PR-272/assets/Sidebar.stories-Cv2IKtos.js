var M=Object.defineProperty;var a=(o,r)=>M(o,"name",{value:r,configurable:!0});import{n as H}from"./rolldown-runtime-CzYk_CEw.js";import{t as D}from"./react-HNhQAnN4.js";import{c as v,f as x}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n}from"./src-Cuw9yEd6.js";import{t as L}from"./jsx-runtime-Br4tQxt1.js";import{t as q}from"./icon-C5Mc9UDb.js";import{t as d}from"./Typography-DiI-78Iy.js";import{l as E,t as B}from"./core-DQ3Or4oH.js";import{t as g}from"./Avatar-CcqKkemS.js";import{r as $,t as f}from"./src-BrVuK8kx.js";import{t as U}from"./src-CYYpCRzL.js";import{t as N}from"./box-Dhy-LEcB.js";import{t as z}from"./typography-C6ylz3aO.js";import{t as c}from"./IconButton-yXF3faAu.js";import{t as F}from"./icon-button-DemP2Y7v.js";import{i as Q,n as t,o as W,r as R,s as K,t as V}from"./app-header-BkxgekYV.js";var y,e,j,I,w,J,_,l,T,p,k,m,P;function A(){return(A=H((()=>{y=D(),v(),V(),$(),N(),B(),q(),F(),z(),K(),Q(),R(),e=L(),j=a(({isMobile:o,toggleSidebar:r})=>{const i=x();return(0,e.jsxs)(f,{style:{borderBottom:`1px solid ${i.palette.border.default}`},type:"compact",children:[(0,e.jsx)(f.Logo,{children:(0,e.jsx)(d,{color:"primary.default",element:"p",fontStyles:`${o?"h6":"h5"}`,id:"brandName",children:"Daimler Truck"})}),(0,e.jsx)(f.AppName,{name:"My App"}),(0,e.jsxs)(f.Actions,{position:"right",children:[(0,e.jsx)(c,{ariaLabel:"search",dataTestId:"search-btn",onClick:a(()=>null,"onClick"),size:"medium",variant:"default",children:(0,e.jsx)(n,{"aria-expanded":!1,code:"search"})}),(0,e.jsx)(c,{ariaLabel:"internationalization",dataTestId:"language-btn",onClick:a(()=>null,"onClick"),size:"medium",variant:"default",children:(0,e.jsx)(n,{"aria-expanded":!1,code:"language"})}),(0,e.jsxs)(U,{style:{flexFlow:"row nowrap",gap:i.spacing.spacing_30},children:[o?null:(0,e.jsx)(d,{color:"primary.default",element:"p",fontStyles:"bodySmBold",id:"userName",children:"John Doe"}),(0,e.jsx)(c,{"aria-controls":"userName","aria-expanded":"false","aria-haspopup":"true",ariaLabel:"User Menu",children:(0,e.jsx)(g,{size:"medium",title:"John Doe"})})]}),o?(0,e.jsx)(c,{ariaLabel:"Toggle sidebar",onClick:r,size:"medium",variant:"default",children:(0,e.jsx)(n,{code:"menu_open"})}):null]})]})},"AppHeaderLayout"),I=a(({children:o,isExpanded:r,isMobile:i,showMainHeader:u,toggleSidebar:h})=>{const s=x(),b=i?0:r?250:70;return(0,e.jsxs)("div",{style:{width:"100%",height:"550px",overflow:"hidden",backgroundColor:s.palette.surface.contrast,display:"flex",flexFlow:"row nowrap"},children:[(0,e.jsx)("div",{style:{width:b,flexShrink:0,transition:"width 0.2s ease-in-out"}}),u?(0,e.jsx)(j,{isMobile:i,toggleSidebar:h}):null,o,(0,e.jsx)("main",{style:{display:"flex",flex:"1 1 0%",alignItems:"center",justifyContent:"center",backgroundColor:s.palette.surface.light,padding:s.spacing.spacing_60},children:(0,e.jsx)(d,{color:"content.default",fontStyles:"bodyLgRegular",children:"Main content area"})})]})},"StoryLayout"),w=a(o=>{const r=x(),i=E(`(max-width: ${r.breakpoints.mq3}px)`),{isExpanded:u,setIsExpanded:h,toggleSidebar:s}=W({isExpanded:o.isExpanded??!i}),b=o.showMainHeader??!1,C=b?i?72:64:0,S=typeof window<"u"?window.location.pathname:"/";return(0,y.useEffect)(()=>{o.isExpanded!==void 0&&h(o.isExpanded)},[o.isExpanded,h]),(0,e.jsx)(I,{isExpanded:u,isMobile:i,showMainHeader:b,toggleSidebar:s,children:(0,e.jsxs)(t,{ariaLabel:"Sidebar navigation",isExpanded:u,offsetTop:o.offsetTop||C,onToggle:s,placement:o.placement,children:[(0,e.jsx)(t.Header,{show:`(max-width: ${r.breakpoints.mq3}px)`,children:(0,e.jsxs)(t.Item,{children:[(0,e.jsx)(t.Toggle,{}),(0,e.jsx)(d,{color:"primary.default",element:"h2",fontStyles:"h5",children:"Daimler Truck"})]})}),(0,e.jsx)(t.Divider,{show:`(max-width: ${r.breakpoints.mq3}px)`}),(0,e.jsxs)(t.Content,{children:[(0,e.jsx)(t.Section,{children:(0,e.jsxs)(t.Item,{href:"/",children:[(0,e.jsx)(n,{code:"dashboard"}),"Dashboard"]})}),(0,e.jsx)(t.Divider,{}),(0,e.jsx)(t.Section,{title:"Sales Management",children:(0,e.jsxs)(t.Item,{href:S,children:[(0,e.jsx)(n,{code:"finance"}),"Sales & Quotes",(0,e.jsxs)(t.SubList,{children:[(0,e.jsx)(t.Item,{href:S,children:"All Quotes"}),(0,e.jsx)(t.Item,{href:"/sales-and-quotes/pending",children:"Pending Quotes"}),(0,e.jsx)(t.Item,{href:"/sales-and-quotes/new",children:"New Quote"})]})]})}),(0,e.jsx)(t.Divider,{}),(0,e.jsxs)(t.Section,{title:"Customer Management",children:[(0,e.jsxs)(t.Item,{href:"/credit-applications",children:[(0,e.jsx)(n,{code:"credit_score"}),"Credit Applications"]}),(0,e.jsxs)(t.Item,{href:"/contracts",children:[(0,e.jsx)(n,{code:"contract_edit"}),"Contracts"]}),(0,e.jsxs)(t.Item,{href:"/customers",children:[(0,e.jsx)(n,{code:"person_pin"}),"Customers"]})]})]}),(0,e.jsxs)(t.Footer,{children:[(0,e.jsxs)(t.Item,{href:"/dashboard",children:[(0,e.jsx)(n,{code:"book"}),(0,e.jsx)(d,{color:"inherit",element:"span",fontStyles:"bodyMdBold",children:"Terms of Use"})]}),(0,e.jsxs)(t.Item,{children:[(0,e.jsx)(c,{ariaLabel:"User profile",onClick:a(()=>null,"onClick"),children:(0,e.jsx)(g,{size:"medium",title:"Account",type:"thumbnail"})}),(0,e.jsx)(d,{color:"inherit",element:"span",fontStyles:"bodyMdBold",onClick:a(()=>null,"onClick"),onKeyDown:a(()=>null,"onKeyDown"),role:"button",tabIndex:0,children:"Account"})]})]}),(0,e.jsx)(t.Divider,{hide:`(max-width: ${r.breakpoints.mq3}px)`}),(0,e.jsx)(t.Footer,{hide:`(max-width: ${r.breakpoints.mq3}px)`,children:(0,e.jsxs)(t.Item,{children:[(0,e.jsx)(t.Toggle,{}),(0,e.jsx)(d,{color:"inherit",element:"span",fontStyles:"bodyMdBold",onClick:s,onKeyDown:s,role:"button",tabIndex:0,children:"Collapse"})]})})]})})},"SidebarDemo"),J={title:"Compound Components/Sidebar",component:t,parameters:{layout:"fullscreen",docs:{description:{component:"A compound component for building navigation sidebars. State is managed externally via `useSidebar` hook."}}},args:{isExpanded:!0,placement:"left",offsetTop:0},argTypes:{isExpanded:{control:"boolean",description:"Controls sidebar expanded/collapsed state",defaultValue:{summary:!0}},placement:{control:{type:"inline-radio"},options:["left","right"],description:"Sidebar position on desktop",defaultValue:{summary:"left"}},offsetTop:{control:"number",description:"Sidebar top offset in pixels",defaultValue:{summary:0}}},render:a(o=>(0,e.jsx)(w,{...o}),"render")},_=`
import { useTheme } from '@emotion/react';
import { useMedia } from '@dt-dds/react-core';

import { Icon } from '@dt-dds/react-icon';
import { Typography } from '@dt-dds/react-typography';
import { Sidebar, useSidebar } from '@dt-dds/react-sidebar';

const App = () => {
  const theme = useTheme();
  const isMobile = useMedia(\`(max-width: \${theme.breakpoints.mq3}px)\`);

  const { isExpanded, toggleSidebar } = useSidebar({
    isExpanded: !isMobile,
  });

  return (
    <Sidebar isExpanded={isExpanded} onToggle={toggleSidebar}>
      <Sidebar.Header show={\`(max-width: \${theme.breakpoints.mq3}px)\`}>
        <Sidebar.Item>
          <Sidebar.Toggle />
          <Typography color='primary.default' element='h2' fontStyles='h5'>
            Daimler Truck
          </Typography>
        </Sidebar.Item>
      </Sidebar.Header>
      
      <Sidebar.Divider show={\`(max-width: \${theme.breakpoints.mq3}px)\`} />
      
      <Sidebar.Content>
        <Sidebar.Section>
          <Sidebar.Item href='/'>
            <Icon code='dashboard' />
            Dashboard
          </Sidebar.Item>
        </Sidebar.Section>

        <Sidebar.Divider />

        <Sidebar.Section title="Section Two">
          <Sidebar.Item href="/sales-and-quotes/all">
            <Icon code="finance" />
            Sales & Quotes
            <Sidebar.SubList>
              <Sidebar.Item href='/sales-and-quotes/all'>
                All Quotes
              </Sidebar.Item>
              <Sidebar.Item href='/sales-and-quotes/pending'>
                Pending Quotes
              </Sidebar.Item>
              <Sidebar.Item href='/sales-and-quotes/new'>
                New Quote
              </Sidebar.Item>
            </Sidebar.SubList>
          </Sidebar.Item>
        </Sidebar.Section>

        <Sidebar.Divider />

        <Sidebar.Section title="Section Three">
          <Sidebar.Item href="/credit-applications">
            <Icon code="credit_score" />
            Credit Applications
          </Sidebar.Item>
          <Sidebar.Item href="/contracts">
            <Icon code="contract_edit" />
            Contracts
          </Sidebar.Item>
          <Sidebar.Item href="/customers">
            <Icon code="person_pin" />
            Customers
          </Sidebar.Item>
        </Sidebar.Section>
      </Sidebar.Content>
      
      <Sidebar.Footer>
        <Sidebar.Item href='/terms-of-use'>
          <Icon code='book' />
          <Typography color='inherit' element='span' fontStyles='bodyMdBold'>
            Terms of Use
          </Typography>
        </Sidebar.Item>
        <Sidebar.Item>
          <IconButton ariaLabel='User profile' onClick={() => null}>
            <Avatar size='medium' title='Account' type='thumbnail' />
          </IconButton>
          <Typography
            color='inherit'
            element='span'
            fontStyles='bodyMdBold'
            onClick={() => null}
            onKeyDown={() => null}
            role='button'
            tabIndex={0}
          >
            Account
          </Typography>
        </Sidebar.Item>
      </Sidebar.Footer>

      <Sidebar.Divider hide={\`(max-width: \${theme.breakpoints.mq3}px)\`} />
      
      <Sidebar.Footer hide={\`(max-width: \${theme.breakpoints.mq3}px)\`}>
        <Sidebar.Item>
          <Sidebar.Toggle />
          <Typography color='inherit' element='span' fontStyles='bodyMdBold'>
            Collapse
          </Typography>
        </Sidebar.Item>
      </Sidebar.Footer>
    </Sidebar>
  );
};
`,l={name:"Default",parameters:{docs:{source:{code:_,language:"tsx"}}}},T=`
import Link from 'next/link'; // or react-router-dom, etc.

<Sidebar.Item>
  <Link href="/dashboard">
    <Icon code="dashboard" />
    Dashboard
  </Link>
</Sidebar.Item>
`,p={name:"With custom link element",parameters:{layout:"fullscreen",docs:{description:{story:"Use your own link component (Next.js, React Router, etc.) by wrapping it inside `Sidebar.Item`."},source:{code:T,language:"tsx"}}},args:{}},k=`
import { useTheme } from '@emotion/react';
import { useMedia } from '@dt-dds/react-core';

import { Typography } from '@dt-dds/react-typography';
import { IconButton } from '@dt-dds/react-icon-button';

import { AppHeader } from '@dt-dds/react-app-header';
import { Sidebar, useSidebar } from '@dt-dds/react-sidebar';

const App = () => {
  const theme = useTheme();
  const isMobile = useMedia(\`(max-width: \${theme.breakpoints.mq3}px)\`);

  const { isExpanded, toggleSidebar } = useSidebar({
    isExpanded: !isMobile,
  });

  // AppHeader height
  const offsetTop = isMobile ? 72 : 64;

  return (
    <AppHeader type='compact'>
      <AppHeader.Logo>
        <Typography color='primary.default' element='p' fontStyles='h5'>
          Daimler Truck
        </Typography>
      </AppHeader.Logo>
      
      <AppHeader.AppName name='My App' />
      
      <AppHeader.Actions position='right' show={\`(max-width: \${theme.breakpoints.mq3}px)\`}>
        <IconButton ariaLabel='Toggle sidebar' onClick={toggleSidebar} size='medium' variant='default'>
          <Icon code='menu_open' />
        </IconButton>
      </AppHeader.Actions>
    </AppHeader>

    <Sidebar isExpanded={isExpanded} offsetTop={offsetTop} onToggle={toggleSidebar}>
      // Sidebar content
    </Sidebar>
  );
};
`,m={name:"With AppHeader",parameters:{layout:"fullscreen",docs:{description:{story:"Use with `AppHeader` compound component to create a complete web application shell."},source:{code:k,language:"tsx"}}},args:{showMainHeader:!0}},P=["Default","WithCustomLink","withMainHeader"],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  parameters: {
    docs: {
      source: {
        code: defaultUsageCode,
        language: 'tsx'
      }
    }
  }
}`,...l.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'With custom link element',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Use your own link component (Next.js, React Router, etc.) by wrapping it inside \`Sidebar.Item\`.'
      },
      source: {
        code: customLinkCode,
        language: 'tsx'
      }
    }
  },
  args: {}
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'With AppHeader',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Use with \`AppHeader\` compound component to create a complete web application shell.'
      },
      source: {
        code: withMainHeaderCode,
        language: 'tsx'
      }
    }
  },
  args: {
    showMainHeader: true
  }
}`,...m.parameters?.docs?.source}}}})))()}a(A,"init_Sidebar_stories");A();export{l as Default,p as WithCustomLink,P as __namedExportsOrder,J as default,m as withMainHeader};

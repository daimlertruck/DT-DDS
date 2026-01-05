var E=Object.defineProperty;var n=(o,r)=>E(o,"name",{value:r,configurable:!0});import{j as e}from"./jsx-runtime-Cgz2XvFB.js";import{r as f}from"./index-CwbBKW39.js";import{A as u}from"./index-BOxAflGI.js";import{A as D}from"./Avatar-DeNlItEX.js";import{B as L}from"./index-DTgA8jos.js";import"./typography-B3nKKPHm.js";import"./index-DoF_A9JH.js";import"./index-DV-VXEUn.js";import{u as v}from"./useMedia-CRgJMRRc.js";import{I as s}from"./Icon-BWIy_dZb.js";import{I as p}from"./IconButton-DqfnmDe3.js";import{T as c}from"./Typography-Dk4smw7A.js";import{S as t,a as q,b as B}from"./Sidebar-DCvP-qPk.js";import{d as S}from"./emotion-styled.browser.esm-CIRWz9XU.js";import"./index-Xf3VWcnb.js";import"./Tooltip-6ghTNwuw.js";import"./z-index-C44GOntP.js";import"./Avatar.styled-ieLONhHq.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-MfQAYxAh.js";import"./hexToRgba-CWpEuk8w.js";const _=n((o={})=>{const{isExpanded:r=!1}=o,[a,d]=f.useState(r),l=f.useCallback(()=>{d(i=>!i)},[]);return{isExpanded:a,setIsExpanded:d,toggleSidebar:l}},"useSidebar"),$=n(({isMobile:o,toggleSidebar:r})=>{const a=S();return e.jsxs(u,{style:{borderBottom:`1px solid ${a.palette.border.default}`},type:"compact",children:[e.jsx(u.Logo,{children:e.jsx(c,{color:"primary.default",element:"p",fontStyles:`${o?"h6":"h5"}`,id:"brandName",children:"Daimler Truck"})}),e.jsx(u.AppName,{name:"My App"}),e.jsxs(u.Actions,{position:"right",children:[e.jsx(p,{ariaLabel:"search",dataTestId:"search-btn",onClick:n(()=>null,"onClick"),size:"medium",variant:"default",children:e.jsx(s,{"aria-expanded":!1,code:"search"})}),e.jsx(p,{ariaLabel:"internationalization",dataTestId:"language-btn",onClick:n(()=>null,"onClick"),size:"medium",variant:"default",children:e.jsx(s,{"aria-expanded":!1,code:"language"})}),e.jsxs(L,{style:{flexFlow:"row nowrap",gap:a.spacing.spacing_30},children:[o?null:e.jsx(c,{color:"primary.default",element:"p",fontStyles:"bodySmBold",id:"userName",children:"John Doe"}),e.jsx(p,{"aria-controls":"userName","aria-expanded":"false","aria-haspopup":"true",ariaLabel:"User Menu",children:e.jsx(D,{size:"medium",title:"John Doe"})})]}),o?e.jsx(p,{ariaLabel:"Toggle sidebar",onClick:r,size:"medium",variant:"default",children:e.jsx(s,{code:"menu_open"})}):null]})]})},"AppHeaderLayout"),U=n(({children:o,isExpanded:r,isMobile:a,showMainHeader:d,toggleSidebar:l})=>{const i=S(),m=a?0:r?q:B;return e.jsxs("div",{style:{width:"100%",height:"550px",overflow:"hidden",backgroundColor:i.palette.surface.contrast,display:"flex",flexFlow:"row nowrap"},children:[e.jsx("div",{style:{width:m,flexShrink:0,transition:"width 0.2s ease-in-out"}}),d?e.jsx($,{isMobile:a,toggleSidebar:l}):null,o,e.jsx("main",{style:{display:"flex",flex:"1 1 0%",alignItems:"center",justifyContent:"center",backgroundColor:i.palette.surface.light,padding:i.spacing.spacing_60},children:e.jsx(c,{color:"content.default",fontStyles:"bodyLgRegular",children:"Main content area"})})]})},"StoryLayout"),N=n(o=>{const r=S(),a=v(`(max-width: ${r.breakpoints.mq3}px)`),{isExpanded:d,setIsExpanded:l,toggleSidebar:i}=_({isExpanded:o.isExpanded??!a}),m=o.showMainHeader??!1,M=m?a?72:64:0,g=typeof window<"u"?window.location.pathname:"/";return f.useEffect(()=>{o.isExpanded!==void 0&&l(o.isExpanded)},[o.isExpanded,l]),e.jsx(U,{isExpanded:d,isMobile:a,showMainHeader:m,toggleSidebar:i,children:e.jsxs(t,{ariaLabel:"Sidebar navigation",isExpanded:d,offsetTop:o.offsetTop||M,onToggle:i,placement:o.placement,children:[e.jsx(t.Header,{show:`(max-width: ${r.breakpoints.mq3}px)`,children:e.jsxs(t.Item,{children:[e.jsx(t.Toggle,{}),e.jsx(c,{color:"primary.default",element:"h2",fontStyles:"h5",children:"Daimler Truck"})]})}),e.jsx(t.Divider,{show:`(max-width: ${r.breakpoints.mq3}px)`}),e.jsxs(t.Content,{children:[e.jsx(t.Section,{children:e.jsxs(t.Item,{href:"/",children:[e.jsx(s,{code:"dashboard"}),"Dashboard"]})}),e.jsx(t.Divider,{}),e.jsx(t.Section,{title:"Sales Management",children:e.jsxs(t.Item,{href:g,children:[e.jsx(s,{code:"finance"}),"Sales & Quotes",e.jsxs(t.SubList,{children:[e.jsx(t.Item,{href:g,children:"All Quotes"}),e.jsx(t.Item,{href:"/sales-and-quotes/pending",children:"Pending Quotes"}),e.jsx(t.Item,{href:"/sales-and-quotes/new",children:"New Quote"})]})]})}),e.jsx(t.Divider,{}),e.jsxs(t.Section,{title:"Customer Management",children:[e.jsxs(t.Item,{href:"/credit-applications",children:[e.jsx(s,{code:"credit_score"}),"Credit Applications"]}),e.jsxs(t.Item,{href:"/contracts",children:[e.jsx(s,{code:"contract_edit"}),"Contracts"]}),e.jsxs(t.Item,{href:"/customers",children:[e.jsx(s,{code:"person_pin"}),"Customers"]})]})]}),e.jsxs(t.Footer,{children:[e.jsxs(t.Item,{href:"/dashboard",children:[e.jsx(s,{code:"book"}),e.jsx(c,{color:"inherit",element:"span",fontStyles:"bodyMdBold",children:"Terms of Use"})]}),e.jsxs(t.Item,{children:[e.jsx(p,{ariaLabel:"User profile",onClick:n(()=>null,"onClick"),children:e.jsx(D,{size:"medium",title:"Account",type:"thumbnail"})}),e.jsx(c,{color:"inherit",element:"span",fontStyles:"bodyMdBold",onClick:n(()=>null,"onClick"),onKeyDown:n(()=>null,"onKeyDown"),role:"button",tabIndex:0,children:"Account"})]})]}),e.jsx(t.Divider,{hide:`(max-width: ${r.breakpoints.mq3}px)`}),e.jsx(t.Footer,{hide:`(max-width: ${r.breakpoints.mq3}px)`,children:e.jsxs(t.Item,{children:[e.jsx(t.Toggle,{}),e.jsx(c,{color:"inherit",element:"span",fontStyles:"bodyMdBold",onClick:i,onKeyDown:i,role:"button",tabIndex:0,children:"Collapse"})]})})]})})},"SidebarDemo"),ue={title:"Compound Components/Sidebar",component:t,parameters:{layout:"fullscreen",docs:{description:{component:"A compound component for building navigation sidebars. State is managed externally via `useSidebar` hook."}}},args:{isExpanded:!0,placement:"left",offsetTop:0},argTypes:{isExpanded:{control:"boolean",description:"Controls sidebar expanded/collapsed state",defaultValue:{summary:!0}},placement:{control:{type:"inline-radio"},options:["left","right"],description:"Sidebar position on desktop",defaultValue:{summary:"left"}},offsetTop:{control:"number",description:"Sidebar top offset in pixels",defaultValue:{summary:0}}},render:n(o=>e.jsx(N,{...o}),"render")},W=`
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
`,h={name:"Default",parameters:{docs:{source:{code:W,language:"tsx"}}}},z=`
import Link from 'next/link'; // or react-router-dom, etc.

<Sidebar.Item>
  <Link href="/dashboard">
    <Icon code="dashboard" />
    Dashboard
  </Link>
</Sidebar.Item>
`,b={name:"With custom link element",parameters:{layout:"fullscreen",docs:{description:{story:"Use your own link component (Next.js, React Router, etc.) by wrapping it inside `Sidebar.Item`."},source:{code:z,language:"tsx"}}},args:{}},F=`
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
`,x={name:"With AppHeader",parameters:{layout:"fullscreen",docs:{description:{story:"Use with `AppHeader` compound component to create a complete web application shell."},source:{code:F,language:"tsx"}}},args:{showMainHeader:!0}};var y,I,j;h.parameters={...h.parameters,docs:{...(y=h.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'Default',
  parameters: {
    docs: {
      source: {
        code: defaultUsageCode,
        language: 'tsx'
      }
    }
  }
}`,...(j=(I=h.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var w,T,k;b.parameters={...b.parameters,docs:{...(w=b.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(k=(T=b.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var A,C,H;x.parameters={...x.parameters,docs:{...(A=x.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(H=(C=x.parameters)==null?void 0:C.docs)==null?void 0:H.source}}};const he=["Default","WithCustomLink","withMainHeader"];export{h as Default,b as WithCustomLink,he as __namedExportsOrder,ue as default,x as withMainHeader};

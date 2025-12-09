var D=Object.defineProperty;var i=(o,r)=>D(o,"name",{value:r,configurable:!0});import{j as e}from"./jsx-runtime-Cgz2XvFB.js";import{r as f}from"./index-CwbBKW39.js";import{A as u}from"./index-DQwrd5ZC.js";import{A as M}from"./Avatar-BN-fvGFO.js";import{B as E}from"./index-juXVSS06.js";import"./typography-B3nKKPHm.js";import"./index-DJIEcyam.js";import"./index-DV-VXEUn.js";import{u as L}from"./useMedia-CRgJMRRc.js";import{I as s}from"./Icon-BrO18bYS.js";import{I as p}from"./IconButton-BxQ2uS0G.js";import{T as l}from"./Typography-BDc1BtFV.js";import{S as t,a as v,b as q}from"./Sidebar-D4eeGCoY.js";import{d as S}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./index-Dw_1laFD.js";import"./responsive-trRo2nHf.js";import"./Tooltip-Dd2hzHvZ.js";import"./z-index-C44GOntP.js";import"./Avatar.styled-CxoZIEaX.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-6Tx4pmSd.js";import"./iframe-BSfTL1Ci.js";import"./hexToRgba-CWpEuk8w.js";const B=i((o={})=>{const{isExpanded:r=!1}=o,[a,d]=f.useState(r),c=f.useCallback(()=>{d(n=>!n)},[]);return{isExpanded:a,setIsExpanded:d,toggleSidebar:c}},"useSidebar"),_=i(({isMobile:o,toggleSidebar:r})=>{const a=S();return e.jsxs(u,{style:{borderBottom:`1px solid ${a.palette.border.default}`},type:"compact",children:[e.jsx(u.Logo,{children:e.jsx(l,{color:"primary.default",element:"p",fontStyles:`${o?"h6":"h5"}`,id:"brandName",children:"Daimler Truck"})}),e.jsx(u.AppName,{name:"My App"}),e.jsxs(u.Actions,{position:"right",children:[e.jsx(p,{ariaLabel:"search",dataTestId:"search-btn",onClick:i(()=>null,"onClick"),size:"medium",variant:"default",children:e.jsx(s,{"aria-expanded":!1,code:"search"})}),e.jsx(p,{ariaLabel:"internationalization",dataTestId:"language-btn",onClick:i(()=>null,"onClick"),size:"medium",variant:"default",children:e.jsx(s,{"aria-expanded":!1,code:"language"})}),e.jsxs(E,{style:{flexFlow:"row nowrap",gap:a.spacing.spacing_30},children:[o?null:e.jsx(l,{color:"primary.default",element:"p",fontStyles:"bodySmBold",id:"userName",children:"John Doe"}),e.jsx(p,{"aria-controls":"userName","aria-expanded":"false","aria-haspopup":"true",ariaLabel:"User Menu",children:e.jsx(M,{size:"medium",title:"John Doe"})})]}),o?e.jsx(p,{ariaLabel:"Toggle sidebar",onClick:r,size:"medium",variant:"default",children:e.jsx(s,{code:"menu_open"})}):null]})]})},"AppHeaderLayout"),$=i(({children:o,isExpanded:r,isMobile:a,showMainHeader:d,toggleSidebar:c})=>{const n=S(),m=a?0:r?v:q;return e.jsxs("div",{style:{width:"100%",height:"550px",overflow:"hidden",backgroundColor:n.palette.surface.contrast,display:"flex",flexFlow:"row nowrap"},children:[e.jsx("div",{style:{width:m,flexShrink:0,transition:"width 0.2s ease-in-out"}}),d?e.jsx(_,{isMobile:a,toggleSidebar:c}):null,o,e.jsx("main",{style:{display:"flex",flex:"1 1 0%",alignItems:"center",justifyContent:"center",backgroundColor:n.palette.surface.light,padding:n.spacing.spacing_60},children:e.jsx(l,{color:"content.default",fontStyles:"bodyLgRegular",children:"Main content area"})})]})},"StoryLayout"),U=i(o=>{const r=S(),a=L(`(max-width: ${r.breakpoints.mq3}px)`),{isExpanded:d,setIsExpanded:c,toggleSidebar:n}=B({isExpanded:o.isExpanded??!a}),m=o.showMainHeader??!1,H=m?a?72:64:0;return f.useEffect(()=>{o.isExpanded!==void 0&&c(o.isExpanded)},[o.isExpanded,c]),e.jsx($,{isExpanded:d,isMobile:a,showMainHeader:m,toggleSidebar:n,children:e.jsxs(t,{ariaLabel:"Sidebar navigation",isExpanded:d,offsetTop:o.offsetTop||H,onToggle:n,placement:o.placement,children:[e.jsx(t.Header,{show:`(max-width: ${r.breakpoints.mq3}px)`,children:e.jsxs(t.Item,{children:[e.jsx(t.Toggle,{}),e.jsx(l,{color:"primary.default",element:"h2",fontStyles:"h5",children:"Daimler Truck"})]})}),e.jsx(t.Divider,{show:`(max-width: ${r.breakpoints.mq3}px)`}),e.jsxs(t.Content,{children:[e.jsx(t.Section,{children:e.jsxs(t.Item,{href:"/",children:[e.jsx(s,{code:"dashboard"}),"Dashboard"]})}),e.jsx(t.Divider,{}),e.jsx(t.Section,{title:"Sales Management",children:e.jsxs(t.Item,{href:"/iframe.html",children:[e.jsx(s,{code:"finance"}),"Sales & Quotes",e.jsxs(t.SubList,{children:[e.jsx(t.Item,{href:"/iframe.html",children:"All Quotes"}),e.jsx(t.Item,{href:"/sales-and-quotes/pending",children:"Pending Quotes"}),e.jsx(t.Item,{href:"/sales-and-quotes/new",children:"New Quote"}),e.jsx(t.Item,{href:"/sales-and-quotes/import-sam",children:"Import SAM"})]})]})}),e.jsx(t.Divider,{}),e.jsxs(t.Section,{title:"Customer Management",children:[e.jsxs(t.Item,{href:"/credit-applications",children:[e.jsx(s,{code:"credit_score"}),"Credit Applications"]}),e.jsxs(t.Item,{href:"/contracts",children:[e.jsx(s,{code:"contract_edit"}),"Contracts"]}),e.jsxs(t.Item,{href:"/customers",children:[e.jsx(s,{code:"person_pin"}),"Customers"]})]})]}),e.jsxs(t.Footer,{children:[e.jsxs(t.Item,{href:"/dashboard",children:[e.jsx(s,{code:"book"}),e.jsx(l,{color:"inherit",element:"span",fontStyles:"bodyMdBold",children:"Terms of Use"})]}),e.jsxs(t.Item,{children:[e.jsx(p,{ariaLabel:"User profile",onClick:i(()=>null,"onClick"),children:e.jsx(M,{size:"medium",title:"Account",type:"thumbnail"})}),e.jsx(l,{color:"inherit",element:"span",fontStyles:"bodyMdBold",onClick:i(()=>null,"onClick"),onKeyDown:i(()=>null,"onKeyDown"),role:"button",tabIndex:0,children:"Account"})]})]}),e.jsx(t.Divider,{hide:`(max-width: ${r.breakpoints.mq3}px)`}),e.jsx(t.Footer,{hide:`(max-width: ${r.breakpoints.mq3}px)`,children:e.jsxs(t.Item,{children:[e.jsx(t.Toggle,{}),e.jsx(l,{color:"inherit",element:"span",fontStyles:"bodyMdBold",onClick:n,onKeyDown:n,role:"button",tabIndex:0,children:"Collapse"})]})})]})})},"SidebarDemo"),ue={title:"Compound Components/Sidebar",component:t,parameters:{layout:"fullscreen",docs:{description:{component:"A compound component for building navigation sidebars. State is managed externally via `useSidebar` hook."}}},args:{isExpanded:!0,placement:"left",offsetTop:0,showMainHeader:!1},argTypes:{isExpanded:{control:"boolean",description:"Controls sidebar expanded/collapsed state",defaultValue:{summary:!0}},placement:{control:{type:"inline-radio"},options:["left","right"],description:"Sidebar position on desktop",defaultValue:{summary:"left"}},offsetTop:{control:"number",description:"Sidebar top offset in pixels",defaultValue:{summary:0}}},render:i(o=>e.jsx(U,{...o}),"render")},N=`
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
              <Sidebar.Item href='/sales-and-quotes/import-sam'>
                Import SAM
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
`,h={name:"Default",parameters:{docs:{source:{code:N,language:"tsx"}}}},W=`
import Link from 'next/link'; // or react-router-dom, etc.

<Sidebar.Item>
  <Link href="/dashboard">
    <Icon code="dashboard" />
    Dashboard
  </Link>
</Sidebar.Item>
`,b={name:"With custom link element",parameters:{layout:"fullscreen",docs:{description:{story:"Use your own link component (Next.js, React Router, etc.) by wrapping it inside `Sidebar.Item`."},source:{code:W,language:"tsx"}}},args:{}},z=`
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
`,x={name:"With AppHeader",parameters:{layout:"fullscreen",docs:{description:{story:"Use with `AppHeader` compound component to create a complete web application shell."},source:{code:z,language:"tsx"}}},args:{showMainHeader:!0}};var g,y,I;h.parameters={...h.parameters,docs:{...(g=h.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'Default',
  parameters: {
    docs: {
      source: {
        code: defaultUsageCode,
        language: 'tsx'
      }
    }
  }
}`,...(I=(y=h.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var j,w,T;b.parameters={...b.parameters,docs:{...(j=b.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(T=(w=b.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var k,A,C;x.parameters={...x.parameters,docs:{...(k=x.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(C=(A=x.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};const he=["Default","WithCustomLink","withMainHeader"];export{h as Default,b as WithCustomLink,he as __namedExportsOrder,ue as default,x as withMainHeader};

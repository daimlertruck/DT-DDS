var y=Object.defineProperty;var t=(r,a)=>y(r,"name",{value:a,configurable:!0});import{n as x}from"./rolldown-runtime-CzYk_CEw.js";import{t as b}from"./react-HNhQAnN4.js";import{c as _,f as O}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as w}from"./src-Dy65K5lf.js";import{t as I}from"./jsx-runtime-Br4tQxt1.js";import{t as R}from"./icon-DzgDoBJz.js";import{t as D}from"./Typography-6OXNaZjx.js";import{t as v}from"./typography-DYFUH5Hl.js";import{n as p,t as C}from"./src-CpUvBFa7.js";var n,e,m,j,c,f,u,h,d,T;function g(){return(g=x((()=>{n=b(),_(),R(),v(),C(),e=I(),m=[{text:"Option 1",value:"1"},{text:"Option 2",value:"2"},{text:"Option 3 with a large text message label",value:"3"},{text:"Option 4",value:"4",disabled:!0}],j={title:"Data Display/Dropdown",component:p,argTypes:{placement:{options:["bottom","top","right","left"],control:{type:"select"}},matchWidth:{control:{type:"boolean"}},offsetX:{control:{type:"number"}},offsetY:{control:{type:"number"}},isFocusable:{control:{type:"boolean"}}},render:t(function(a){const[o,i]=(0,n.useState)(!1),l=(0,n.useRef)(null);return(0,e.jsxs)("div",{style:{height:200,padding:16},children:[(0,e.jsxs)("button",{onClick:t(()=>i(!o),"onClick"),ref:l,style:{marginBottom:12},type:"button",children:[o?"Close":"Open"," dropdown"]}),(0,e.jsx)(p,{...a,anchorRef:l,isOpen:o,onClose:t(()=>i(!1),"onClose"),children:m.map(s=>(0,e.jsx)(p.Option,{isDisabled:s.disabled,onClick:t(()=>console.log(`${s.text} clicked`),"onClick"),children:s.text},s.value))})]})},"Render")},c={args:{anchorRef:(0,n.createRef)(),as:"ul",matchWidth:!1,offsetX:0,offsetY:4,placement:"bottom",isFocusable:!1}},f=[{text:"Very long text that should be truncated with ellipsis but extends beyond the intended width",value:"1"},{text:"My profile",value:"2"}],u=t(r=>{const a=O(),[o,i]=(0,n.useState)(!1),l=(0,n.useRef)(null);return(0,e.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",height:200,padding:a.spacing.spacing_30},children:[(0,e.jsxs)("button",{onClick:t(()=>i(!o),"onClick"),ref:l,style:{width:160},type:"button",children:[o?"Close":"Open"," dropdown"]}),o&&(0,e.jsx)(p,{...r,anchorRef:l,isOpen:!0,onClose:t(()=>i(!1),"onClose"),children:f.map(s=>(0,e.jsxs)(p.Option,{onClick:t(()=>console.log(`${s.text} clicked`),"onClick"),style:{display:"flex",alignItems:"center",gap:a.spacing.spacing_30},children:[(0,e.jsx)(w,{code:"user_attributes",size:"medium"}),(0,e.jsx)(D,{fontStyles:"bodyMdRegular",style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:s.text})]},s.value))})]})},"WithIconAndEllipsisDemo"),h=`
import { useRef, useState } from 'react';

import { useTheme } from '@emotion/react';

import { Dropdown } from '@dt-dds/react-dropdown';
import { Icon } from '@dt-dds/react-icon';
import { Typography } from '@dt-dds/react-typography';

const App = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} ref={ref} type='button'>
        {isOpen ? 'Close' : 'Open'} dropdown
      </button>
      {isOpen && (
        <Dropdown
          anchorRef={ref}
          as='ul'
          isFocusable={false}
          isOpen
          matchWidth={false}
          onClose={() => setIsOpen(false)}
        >
          <Dropdown.Option
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.spacing_30,
            }}
          >
            <Icon code='user_attributes' size='medium' />
            <Typography
              fontStyles='bodyMdRegular'
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Very long text that should be truncated with ellipsis
            </Typography>
          </Dropdown.Option>
        </Dropdown>
      )}
    </>
  );
};
`,d={args:{anchorRef:(0,n.createRef)(),as:"ul",matchWidth:!1,offsetY:4,placement:"bottom",isFocusable:!1},parameters:{docs:{source:{code:h,language:"tsx"}}},render:t(r=>(0,e.jsx)(u,{...r}),"render")},T=["Default","WithIconAndEllipsis"],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetX: 0,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false
  }
}`,...c.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false
  },
  parameters: {
    docs: {
      source: {
        code: withIconAndEllipsisCode,
        language: 'tsx'
      }
    }
  },
  render: args => <WithIconAndEllipsisDemo {...args} />
}`,...d.parameters?.docs?.source}}}})))()}t(g,"init_Dropdown_stories");g();export{c as Default,d as WithIconAndEllipsis,T as __namedExportsOrder,j as default};

var O=Object.defineProperty;var t=(o,a)=>O(o,"name",{value:a,configurable:!0});import{n as _}from"./rolldown-runtime-CzYk_CEw.js";import{t as w}from"./react-HNhQAnN4.js";import{c as I,f as u}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as R}from"./src-CQysuBx9.js";import{t as C}from"./jsx-runtime-Br4tQxt1.js";import{t as j}from"./icon-DzQ0uhXD.js";import{t as v}from"./Typography-C-ZUvCOU.js";import{t as D}from"./typography-CNf2wGes.js";import{n as c,t as S}from"./src-D73aD6JW.js";var r,e,m,T,p,h,g,b,d,y,f,k;function x(){return(x=_((()=>{r=w(),I(),j(),D(),S(),e=C(),m=[{text:"Option 1",value:"1"},{text:"Option 2",value:"2"},{text:"Option 3 with a large text message label",value:"3"},{text:"Option 4",value:"4",disabled:!0}],T={title:"Data Display/Dropdown",component:c,argTypes:{placement:{options:["bottom","top","right","left"],control:{type:"select"}},matchWidth:{control:{type:"boolean"}},offsetX:{control:{type:"number"}},offsetY:{control:{type:"number"}},isFocusable:{control:{type:"boolean"}}},render:t(function(a){const[n,l]=(0,r.useState)(!1),i=(0,r.useRef)(null);return(0,e.jsxs)("div",{style:{height:200,padding:16},children:[(0,e.jsxs)("button",{onClick:t(()=>l(!n),"onClick"),ref:i,style:{marginBottom:12},type:"button",children:[n?"Close":"Open"," dropdown"]}),(0,e.jsx)(c,{...a,anchorRef:i,isOpen:n,onClose:t(()=>l(!1),"onClose"),children:m.map(s=>(0,e.jsx)(c.Option,{isDisabled:s.disabled,onClick:t(()=>console.log(`${s.text} clicked`),"onClick"),children:s.text},s.value))})]})},"Render")},p={args:{anchorRef:(0,r.createRef)(),as:"ul",matchWidth:!1,offsetX:0,offsetY:4,placement:"bottom",isFocusable:!1}},h=[{text:"Very long text that should be truncated with ellipsis but extends beyond the intended width",value:"1"},{text:"My profile",value:"2"}],g=t(o=>{const a=u(),[n,l]=(0,r.useState)(!1),i=(0,r.useRef)(null);return(0,e.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",height:200,padding:a.spacing.spacing_30},children:[(0,e.jsxs)("button",{onClick:t(()=>l(!n),"onClick"),ref:i,style:{width:160},type:"button",children:[n?"Close":"Open"," dropdown"]}),n&&(0,e.jsx)(c,{...o,anchorRef:i,isOpen:!0,onClose:t(()=>l(!1),"onClose"),children:h.map(s=>(0,e.jsxs)(c.Option,{onClick:t(()=>console.log(`${s.text} clicked`),"onClick"),style:{display:"flex",alignItems:"center",gap:a.spacing.spacing_30},children:[(0,e.jsx)(R,{code:"user_attributes",size:"medium"}),(0,e.jsx)(v,{fontStyles:"bodyMdRegular",style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:s.text})]},s.value))})]})},"WithIconAndEllipsisDemo"),b=`
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
`,d={args:{anchorRef:(0,r.createRef)(),as:"ul",matchWidth:!1,offsetY:4,placement:"bottom",isFocusable:!1},parameters:{docs:{source:{code:b,language:"tsx"}}},render:t(o=>(0,e.jsx)(g,{...o}),"render")},y=t(o=>{const a=u(),[n,l]=(0,r.useState)(!1),i=(0,r.useRef)(null);return(0,e.jsxs)("div",{style:{height:200,overflow:"auto",background:a.palette.surface.light},children:[(0,e.jsx)("div",{style:{paddingBlock:a.spacing.spacing_500},children:(0,e.jsxs)("button",{onClick:t(()=>l(!n),"onClick"),ref:i,type:"button",children:[n?"Close":"Open"," dropdown"]})}),(0,e.jsx)(c,{...o,anchorRef:i,isOpen:n,onClose:t(()=>l(!1),"onClose"),children:m.map(s=>(0,e.jsx)(c.Option,{isDisabled:s.disabled,onClick:t(()=>console.log(`${s.text} clicked`),"onClick"),children:s.text},s.value))})]})},"InScrollableContainerDemo"),f={args:{anchorRef:(0,r.createRef)(),as:"ul",matchWidth:!1,offsetX:0,offsetY:4,placement:"bottom",isFocusable:!1},render:t(o=>(0,e.jsx)(y,{...o}),"render")},k=["Default","WithIconAndEllipsis","InScrollableContainer"],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetX: 0,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false
  }
}`,...p.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetX: 0,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false
  },
  render: args => <InScrollableContainerDemo {...args} />
}`,...f.parameters?.docs?.source}}}})))()}t(x,"init_Dropdown_stories");x();export{p as Default,f as InScrollableContainer,d as WithIconAndEllipsis,k as __namedExportsOrder,T as default};

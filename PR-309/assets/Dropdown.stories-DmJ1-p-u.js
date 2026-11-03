var x=Object.defineProperty;var e=(n,s)=>x(n,"name",{value:s,configurable:!0});import{n as _}from"./rolldown-runtime-CzYk_CEw.js";import{t as R}from"./react-HNhQAnN4.js";import{c as v,f as D}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as I}from"./src-Dy65K5lf.js";import{t as T}from"./jsx-runtime-Br4tQxt1.js";import{t as E}from"./icon-DzgDoBJz.js";import{t as C}from"./Typography-CDq-SRj0.js";import{t as S}from"./typography-Bb6H8sua.js";import{n as p,t as j}from"./src-C4cBLMCH.js";var r,t,f,h,u,y,B,i,d,g,w,b,m,W;function O(){return(O=_((()=>{r=R(),v(),E(),S(),j(),t=T(),{expect:f,userEvent:h,within:u}=__STORYBOOK_MODULE_TEST__,y=[{text:"Option 1",value:"1"},{text:"Option 2",value:"2"},{text:"Option 3 with a large text message label",value:"3"},{text:"Option 4",value:"4",disabled:!0}],B={title:"Data Display/Dropdown",component:p,argTypes:{placement:{options:["bottom","top","right","left"],control:{type:"select"}},matchWidth:{control:{type:"boolean"}},offsetX:{control:{type:"number"}},offsetY:{control:{type:"number"}},isFocusable:{control:{type:"boolean"}}},render:e(function(s){const[o,l]=(0,r.useState)(!1),c=(0,r.useRef)(null);return(0,t.jsxs)("div",{style:{height:200,padding:16},children:[(0,t.jsxs)("button",{onClick:e(()=>l(!o),"onClick"),ref:c,style:{marginBottom:12},type:"button",children:[o?"Close":"Open"," dropdown"]}),(0,t.jsx)(p,{...s,anchorRef:c,isOpen:o,onClose:e(()=>l(!1),"onClose"),children:y.map(a=>(0,t.jsx)(p.Option,{isDisabled:a.disabled,onClick:e(()=>console.log(`${a.text} clicked`),"onClick"),children:a.text},a.value))})]})},"Render")},i={args:{anchorRef:(0,r.createRef)(),as:"ul",matchWidth:!1,offsetX:0,offsetY:4,placement:"bottom",isFocusable:!1}},d={...i,play:e(async({canvasElement:n})=>{const s=u(n),o=u(n.ownerDocument.body);await h.click(s.getByRole("button",{name:"Open dropdown"})),await f(await o.findByRole("menu")).toBeVisible()},"play")},g=[{text:"Very long text that should be truncated with ellipsis but extends beyond the intended width",value:"1"},{text:"My profile",value:"2"}],w=e(n=>{const s=D(),[o,l]=(0,r.useState)(!1),c=(0,r.useRef)(null);return(0,t.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",height:200,padding:s.spacing.spacing_30},children:[(0,t.jsxs)("button",{onClick:e(()=>l(!o),"onClick"),ref:c,style:{width:160},type:"button",children:[o?"Close":"Open"," dropdown"]}),o&&(0,t.jsx)(p,{...n,anchorRef:c,isOpen:!0,onClose:e(()=>l(!1),"onClose"),children:g.map(a=>(0,t.jsxs)(p.Option,{onClick:e(()=>console.log(`${a.text} clicked`),"onClick"),style:{display:"flex",alignItems:"center",gap:s.spacing.spacing_30},children:[(0,t.jsx)(I,{code:"user_attributes",size:"medium"}),(0,t.jsx)(C,{fontStyles:"bodyMdRegular",style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:a.text})]},a.value))})]})},"WithIconAndEllipsisDemo"),b=`
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
`,m={args:{anchorRef:(0,r.createRef)(),as:"ul",matchWidth:!1,offsetY:4,placement:"bottom",isFocusable:!1},parameters:{docs:{source:{code:b,language:"tsx"}}},render:e(n=>(0,t.jsx)(w,{...n}),"render")},W=["Default","Open","WithIconAndEllipsis"],i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetX: 0,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false
  }
}`,...i.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Default,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open dropdown'
    }));
    await expect(await page.findByRole('menu')).toBeVisible();
  }
}`,...d.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}}})))()}e(O,"init_Dropdown_stories");O();export{i as Default,d as Open,m as WithIconAndEllipsis,W as __namedExportsOrder,B as default};

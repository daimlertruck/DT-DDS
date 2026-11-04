var _=Object.defineProperty;var n=(o,a)=>_(o,"name",{value:a,configurable:!0});import{n as x}from"./rolldown-runtime-CzYk_CEw.js";import{t as C}from"./jsx-runtime-Br4tQxt1.js";import{a as T,i as r,o as j,r as O,t as S}from"./hooks-BnbxtX73.js";import{n as u}from"./src-CkPHRCW9.js";import{t as v}from"./button-DAcEpx4-.js";var e,m,p,d,h,w,t,s,M;function f(){return(f=x((()=>{v(),S(),j(),e=C(),{expect:m,userEvent:p,within:d}=__STORYBOOK_MODULE_TEST__,h=n(({actionTitle:o,content:a,title:i,subTitle:g,hasHeaderBorder:y,hasFooterBorder:b,hasFooterBackgroundColor:B,isLoading:c})=>{const{isModalOpen:k,toggleModal:l}=O();return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("button",{onClick:l,type:"button",children:"Click me"}),(0,e.jsx)(T,{isOpen:k,children:(0,e.jsxs)(r,{onClickOutside:l,children:[(0,e.jsx)(r.Header,{hasBorder:y,onClose:l,subTitle:g,title:i}),a?(0,e.jsx)(r.Content,{isLoading:c,children:(0,e.jsx)("p",{children:a})}):null,(0,e.jsxs)(r.Footer,{hasBackgroundColor:B,hasBorder:b,children:[(0,e.jsx)(u,{color:"secondary",dataTestId:"cancel",onClick:l,variant:"outlined",children:"Cancel"}),(0,e.jsx)(u,{dataTestId:"action",isDisabled:c,onClick:n(()=>null,"onClick"),children:o})]})]})})]})},"Template"),w={title:"Data Display/Modal",component:r,render:h,argTypes:{hasHeaderBorder:{control:{type:"boolean"},defaultValue:{summary:!1},description:"Add bottom border to Header"},hasHeaderBackgroundColor:{control:{type:"boolean"},defaultValue:{summary:!1},description:"Add background color to Header"},hasFooterBorder:{control:{type:"boolean"},defaultValue:{summary:!1},description:"Add top border to footer"},hasFooterBackgroundColor:{control:{type:"boolean"},defaultValue:{summary:!1},description:"Add background color to Footer"},onClickOutside:{description:"Enables click outside to trigger close an action"},isLoading:{control:{type:"boolean"},defaultValue:{summary:!1},description:"Adds loading spinner and overlay"}}},t={args:{actionTitle:"Action",content:"Some content here",title:"Title",subTitle:"Some random Subtitle here",hasHeaderBorder:!1,hasHeaderBackgroundColor:!1,hasFooterBorder:!1,hasFooterBackgroundColor:!1,isLoading:!1}},s={...t,play:n(async({canvasElement:o})=>{const a=d(o),i=d(o.ownerDocument.body);await p.click(a.getByRole("button",{name:"Click me"})),await m(await i.findByText("Some content here")).toBeVisible()},"play")},M=["Default","Open"],t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    actionTitle: 'Action',
    content: 'Some content here',
    title: 'Title',
    subTitle: 'Some random Subtitle here',
    hasHeaderBorder: false,
    hasHeaderBackgroundColor: false,
    hasFooterBorder: false,
    hasFooterBackgroundColor: false,
    isLoading: false
  }
}`,...t.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Default,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Click me'
    }));
    await expect(await page.findByText('Some content here')).toBeVisible();
  }
}`,...s.parameters?.docs?.source}}}})))()}n(f,"init_Modal_stories");f();export{t as Default,s as Open,M as __namedExportsOrder,w as default};

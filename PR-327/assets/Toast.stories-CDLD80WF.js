var _=Object.defineProperty;var s=(e,n)=>_(e,"name",{value:n,configurable:!0});import{n as y}from"./rolldown-runtime-CzYk_CEw.js";import{t as w}from"./jsx-runtime-Br4tQxt1.js";import{t as k,u as f}from"./core-vaggwWmU.js";import{n as x}from"./src-Ziz95__A.js";import{a as b,c as B,n as C,o as v,r as E,s as r,t as O}from"./src-COEx7qvZ.js";import{t as j}from"./button-D99nHABP.js";var t,m,p,u,l,D,o,a,i,S;function d(){return(d=y((()=>{j(),k(),B(),v(),O(),t=w(),{expect:m,userEvent:p,waitFor:u,within:l}=__STORYBOOK_MODULE_TEST__,D={title:"Data Display/Toast",component:b,argTypes:{type:{mapping:r,options:Object.values(r).filter(e=>typeof e=="string"),control:{type:"inline-radio"}}},render:s(({children:e,type:n,title:c,message:g,dismissible:T,...h})=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{onClick:s(()=>E({type:n,title:c,message:g,dismissible:T,children:e}),"onClick"),type:"button",children:"Click me"}),(0,t.jsx)(f,{isOpen:!0,children:(0,t.jsx)(C,{...h})})]}),"render")},o={args:{type:r.Success,title:"success",dismissible:!0,message:"This is a success message showed in the Toast.",onClose:s(()=>console.log("clicked"),"onClose")}},a={...o,play:s(async({canvasElement:e})=>{const n=l(e),c=l(e.ownerDocument.body);await p.click(n.getByRole("button",{name:"Click me"})),await u(()=>m(c.getByText("This is a success message showed in the Toast.")).toBeVisible())},"play")},i={args:{type:r.Error,title:"error",message:"This is an error message showed in the Toast.",onClose:s(()=>console.log("clicked"),"onClose"),children:(0,t.jsx)(x,{onClick:s(()=>console.log("clicked"),"onClick"),children:"Action 2"})}},S=["Default","Open","WithActions"],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    type: ToastType.Success,
    title: 'success',
    dismissible: true,
    message: 'This is a success message showed in the Toast.',
    onClose: () => console.log('clicked')
  }
}`,...o.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Default,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Click me'
    }));
    await waitFor(() => expect(page.getByText('This is a success message showed in the Toast.')).toBeVisible());
  }
}`,...a.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    type: ToastType.Error,
    title: 'error',
    message: 'This is an error message showed in the Toast.',
    onClose: () => console.log('clicked'),
    children: <Button onClick={() => console.log('clicked')}>Action 2</Button>
  }
}`,...i.parameters?.docs?.source}}}})))()}s(d,"init_Toast_stories");d();export{o as Default,a as Open,i as WithActions,S as __namedExportsOrder,D as default};

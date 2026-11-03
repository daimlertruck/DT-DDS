var D=Object.defineProperty;var i=(t,r)=>D(t,"name",{value:r,configurable:!0});import{n as f}from"./rolldown-runtime-CzYk_CEw.js";import{t as g}from"./react-HNhQAnN4.js";import{t as x}from"./jsx-runtime-Br4tQxt1.js";import{t as T,u as O}from"./core-CkSKov-B.js";import{a as j,i as v,n as s,t as B}from"./src-DUjrj_3_.js";import{n as E,t as V}from"./codes-7fpvv03d.js";var d,e,m,w,c,h,a,n,S,k;function u(){return(u=f((()=>{d=g(),E(),T(),j(),B(),e=x(),{expect:m,userEvent:w,within:c}=__STORYBOOK_MODULE_TEST__,h=i(({body:t,title:r,icon:o,...y})=>{const[l,p]=(0,d.useState)(!1),b=i(()=>{p(_=>!_)},"toggleDrawer");return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("button",{onClick:b,type:"button",children:"Open Drawer"}),(0,e.jsx)(O,{isOpen:l,children:(0,e.jsxs)(s,{...y,isVisible:l,setIsVisible:p,children:[(0,e.jsx)(s.Header,{children:(0,e.jsx)(s.Title,{icon:o,title:r})}),(0,e.jsx)(s.Body,{children:(0,e.jsx)("div",{children:t})})]})})]})},"Template"),a={args:{body:"This is the body of the drawer.",title:"Drawer title",icon:null,position:"right"}},n={args:{body:"This is the body of the drawer.",title:"Drawer title",position:"right"},play:i(async({canvasElement:t})=>{const r=c(t),o=c(t.ownerDocument.body);await w.click(r.getByRole("button",{name:"Open Drawer"})),await m(await o.findByText("This is the body of the drawer.")).toBeVisible()},"play")},S={title:"Data Display/Drawer",component:s,argTypes:{icon:{options:Object.keys(V),control:{type:"select"}},position:{options:Object.values(v),control:{type:"select"}}},render:h},k=["Default","Open"],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    body: 'This is the body of the drawer.',
    title: 'Drawer title',
    icon: null,
    position: 'right'
  }
}`,...a.parameters?.docs?.source}}},n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    body: 'This is the body of the drawer.',
    title: 'Drawer title',
    position: 'right'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open Drawer'
    }));
    await expect(await page.findByText('This is the body of the drawer.')).toBeVisible();
  }
}`,...n.parameters?.docs?.source}}}})))()}i(u,"init_Drawer_stories");u();export{a as Default,n as Open,k as __namedExportsOrder,S as default};

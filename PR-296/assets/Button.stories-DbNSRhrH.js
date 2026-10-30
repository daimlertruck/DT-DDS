var l=Object.defineProperty;var r=(t,i)=>l(t,"name",{value:i,configurable:!0});import{n as c}from"./rolldown-runtime-CzYk_CEw.js";import{t as p}from"./jsx-runtime-Br4tQxt1.js";import{n as s,t as d}from"./src-BEpuNp42.js";var e,u,n,o,m;function a(){return(a=c((()=>{d(),e=p(),u={title:"Data Display/Button",component:s},n={args:{children:"Button",onClick:r(()=>null,"onClick"),isLoading:!1,variant:"solid",color:"primary",size:"medium",isDisabled:!1},argTypes:{variant:{options:["solid","outlined","text"],control:{type:"select"}},color:{options:["primary","secondary","error","contrast","accent"],control:{type:"select"}},size:{options:["medium","large","small"],control:{type:"select"}},isDisabled:{control:"boolean"}}},o={...n,render:r(({...t})=>(0,e.jsx)("div",{style:{width:"200px",height:"100px",backgroundColor:"#000000",padding:"20px"},children:(0,e.jsx)(s,{...t})}),"render")},m=["Default","buttonWithDarkBackground"],n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Button',
    onClick: () => null,
    isLoading: false,
    variant: 'solid',
    color: 'primary',
    size: 'medium',
    isDisabled: false
  },
  argTypes: {
    variant: {
      options: ['solid', 'outlined', 'text'],
      control: {
        type: 'select'
      }
    },
    color: {
      options: ['primary', 'secondary', 'error', 'contrast', 'accent'],
      control: {
        type: 'select'
      }
    },
    size: {
      options: ['medium', 'large', 'small'],
      control: {
        type: 'select'
      }
    },
    isDisabled: {
      control: 'boolean'
    }
  }
}`,...n.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Default,
  render: ({
    ...props
  }) => <div style={{
    width: '200px',
    height: '100px',
    backgroundColor: '#000000',
    padding: '20px'
  }}>
      <Button {...props} />
    </div>
}`,...o.parameters?.docs?.source}}}})))()}r(a,"init_Button_stories");a();export{n as Default,m as __namedExportsOrder,o as buttonWithDarkBackground,u as default};

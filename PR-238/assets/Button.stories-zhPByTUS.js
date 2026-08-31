var i=Object.defineProperty;var o=(e,s)=>i(e,"name",{value:s,configurable:!0});import{t as l}from"./jsx-runtime-Br4tQxt1.js";import{t as a}from"./src-DOZlIpA1.js";var t=l(),m={title:"Data Display/Button",component:a},n={args:{children:"Button",onClick:o(()=>null,"onClick"),isLoading:!1,variant:"solid",color:"primary",size:"medium",isDisabled:!1},argTypes:{variant:{options:["solid","outlined","text"],control:{type:"select"}},color:{options:["primary","secondary","error","contrast","accent"],control:{type:"select"}},size:{options:["medium","large","small"],control:{type:"select"}},isDisabled:{control:"boolean"}}},r={...n,render:o(({...e})=>(0,t.jsx)("div",{style:{width:"200px",height:"100px",backgroundColor:"#000000",padding:"20px"},children:(0,t.jsx)(a,{...e})}),"render")};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};var u=["Default","buttonWithDarkBackground"];export{n as Default,u as __namedExportsOrder,r as buttonWithDarkBackground,m as default};

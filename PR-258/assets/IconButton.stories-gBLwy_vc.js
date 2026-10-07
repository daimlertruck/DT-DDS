var g=Object.defineProperty;var r=(e,o)=>g(e,"name",{value:o,configurable:!0});import{o as f}from"./rolldown-runtime-CzYk_CEw.js";import{t as x}from"./react-HNhQAnN4.js";import{i as b,o as y,t as k}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as m}from"./src-Cgsrikn0.js";import{t as A}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as a}from"./src-CIbK0PmT.js";import{t as s}from"./IconButton-DPHwvLfO.js";y();var M=f(x()),t=A(),j=k.div`
  ${({type:e,size:o="medium"})=>{let n=`
      width: 100%; height: 100%; display: flex; 
      align-items: center; justify-content: center;
      text-transform: uppercase; overflow: hidden;
      border-radius: ${a.radius.radius_500};
    `;const i={small:`
        width: 20px;
        height: 20px;
        ${a.fontStyles.bodyXsBold};
      `,medium:`
        width: ${a.spacing.spacing_60};
        height: ${a.spacing.spacing_60};
        ${a.fontStyles.bodyXsBold};
      `,large:`
        width: ${a.spacing.spacing_70};
        height: ${a.spacing.spacing_70};
        ${a.fontStyles.bodySmBold};
      `};switch(n+=i[o],e){case"letter":case"thumbnail":n+=`
          color: ${a.palette.content.contrast};
          background-color: ${a.palette.primary.default};
        `;break;case"collapsed":n+=`
          color: ${a.palette.content.medium};
          background-color: ${a.palette.content.contrast};
        `}return n}}
`,p=r(({type:e="letter",size:o="medium",text:n,src:i,style:v})=>{let u=n;const h=o==="large"?"medium":"small";return e==="thumbnail"?u=(0,t.jsx)(m,{code:"person",color:"contrast",size:h}):e==="photo"&&i&&(u=(0,t.jsx)("img",{alt:"",src:i,style:{width:"100%",height:"100%",objectFit:"cover"}})),(0,t.jsx)(j,{"data-avatar-type":e,size:o,style:v,type:e,children:u})},"MockAvatar"),O={component:s,title:"Data Display/IconButton",argTypes:{isDisabled:{control:"boolean"},variant:{options:["contrast","default"],control:{type:"select"}},size:{options:["extra-small","small","medium","large","extra-large"],control:{type:"select"}}},render:r(e=>(0,t.jsx)("div",{style:{backgroundColor:e.variant==="default"?"white":"black"},children:(0,t.jsx)(s,{...e,children:(0,t.jsx)(m,{code:"edit"})})}),"render")},l={args:{onClick:r(()=>null,"onClick"),isDisabled:!1,variant:"default",size:"large"}},c={render:r(e=>(0,t.jsxs)("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[(0,t.jsx)(s,{...e,ariaLabel:"Letter Avatar",children:(0,t.jsx)(p,{text:"JD",type:"letter"})}),(0,t.jsx)(s,{...e,ariaLabel:"Thumbnail Avatar",children:(0,t.jsx)(p,{type:"thumbnail"})}),(0,t.jsx)(s,{...e,ariaLabel:"Collapsed Avatar",children:(0,t.jsx)(p,{text:"+1",type:"collapsed"})})]}),"render"),args:{variant:"default",size:"large",isDisabled:!1}},_=b`
  &:hover:not(:disabled) {
    [data-avatar-type='letter'] {
      background-color: #a020f0;
    }
  }
`,d={render:r(e=>(0,t.jsx)("div",{style:{padding:"24px",backgroundColor:"white"},children:(0,t.jsx)(s,{...e,ariaLabel:"Avatar with custom hover",children:(0,t.jsx)(p,{text:"AB",type:"letter"})})}),"render"),args:{onClick:r(()=>console.log("Custom Hover Clicked"),"onClick"),variant:"default",size:"large",cssOverrides:_},parameters:{docs:{description:{story:"Demonstrates using `cssOverrides` to change the background color of the nested Avatar component upon hover. The default primary.dark color is overridden with a custom purple."}}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    onClick: () => null,
    isDisabled: false,
    variant: 'default',
    size: 'large'
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: props => <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  }}>
      <IconButton {...props} ariaLabel='Letter Avatar'>
        <MockAvatar text='JD' type='letter' />
      </IconButton>

      <IconButton {...props} ariaLabel='Thumbnail Avatar'>
        <MockAvatar type='thumbnail' />
      </IconButton>

      <IconButton {...props} ariaLabel='Collapsed Avatar'>
        <MockAvatar text='+1' type='collapsed' />
      </IconButton>
    </div>,
  args: {
    variant: 'default',
    size: 'large',
    isDisabled: false
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: props => {
    return <div style={{
      padding: '24px',
      backgroundColor: 'white'
    }}>
        <IconButton {...props} ariaLabel='Avatar with custom hover'>
          <MockAvatar text='AB' type='letter' />
        </IconButton>
      </div>;
  },
  args: {
    onClick: () => console.log('Custom Hover Clicked'),
    variant: 'default',
    size: 'large',
    cssOverrides: avatarHoverOverride
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates using \`cssOverrides\` to change the background color of the nested Avatar component upon hover. The default primary.dark color is overridden with a custom purple.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};var H=["Default","WithAvatarIntegration","WithCustomAvatarHover"];export{l as Default,c as WithAvatarIntegration,d as WithCustomAvatarHover,H as __namedExportsOrder,O as default};

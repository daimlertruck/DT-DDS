var B=Object.defineProperty;var r=(e,o)=>B(e,"name",{value:o,configurable:!0});import{j as t}from"./jsx-runtime-Cgz2XvFB.js";import{c as C}from"./emotion-react.browser.esm-BzOLYAw5.js";import{I as A}from"./Icon-BWIy_dZb.js";import{I as s}from"./IconButton-DqfnmDe3.js";import{f as w}from"./emotion-styled.browser.esm-CIRWz9XU.js";import{t as a}from"./index-Xf3VWcnb.js";import"./index-CwbBKW39.js";import"./typography-B3nKKPHm.js";const D=w.div`
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
        `;break}return n}}
`,p=r(({type:e="letter",size:o="medium",text:n,src:i,style:j})=>{let u=n;const I=o==="large"?"medium":"small";return e==="thumbnail"?u=t.jsx(A,{code:"person",color:"contrast",size:I}):e==="photo"&&i&&(u=t.jsx("img",{alt:"",src:i,style:{width:"100%",height:"100%",objectFit:"cover"}})),t.jsx(D,{"data-avatar-type":e,size:o,style:j,type:e,children:u})},"MockAvatar"),$=["contrast","default"],z=["extra-small","small","medium","large","extra-large"],X={component:s,title:"Data Display/IconButton",argTypes:{isDisabled:{control:"boolean"},variant:{options:$,control:{type:"select"}},size:{options:z,control:{type:"select"}}},render:r(e=>t.jsx("div",{style:{backgroundColor:e.variant==="default"?"white":"black"},children:t.jsx(s,{...e,children:t.jsx(A,{code:"edit"})})}),"render")},l={args:{onClick:r(()=>null,"onClick"),isDisabled:!1,variant:"default",size:"large"}},c={render:r(e=>t.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[t.jsx(s,{...e,ariaLabel:"Letter Avatar",children:t.jsx(p,{text:"JD",type:"letter"})}),t.jsx(s,{...e,ariaLabel:"Thumbnail Avatar",children:t.jsx(p,{type:"thumbnail"})}),t.jsx(s,{...e,ariaLabel:"Collapsed Avatar",children:t.jsx(p,{text:"+1",type:"collapsed"})})]}),"render"),args:{variant:"default",size:"large",isDisabled:!1}},L=C`
  &:hover:not(:disabled) {
    [data-avatar-type='letter'] {
      background-color: #a020f0;
    }
  }
`,d={render:r(e=>t.jsx("div",{style:{padding:"24px",backgroundColor:"white"},children:t.jsx(s,{...e,ariaLabel:"Avatar with custom hover",children:t.jsx(p,{text:"AB",type:"letter"})})}),"render"),args:{onClick:r(()=>console.log("Custom Hover Clicked"),"onClick"),variant:"default",size:"large",cssOverrides:L},parameters:{docs:{description:{story:"Demonstrates using `cssOverrides` to change the background color of the nested Avatar component upon hover. The default primary.dark color is overridden with a custom purple."}}}};var m,v,h;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    onClick: () => null,
    isDisabled: false,
    variant: 'default',
    size: 'large'
  }
}`,...(h=(v=l.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var g,f,x;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(x=(f=c.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var b,y,k;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(k=(y=d.parameters)==null?void 0:y.docs)==null?void 0:k.source}}};const F=["Default","WithAvatarIntegration","WithCustomAvatarHover"];export{l as Default,c as WithAvatarIntegration,d as WithCustomAvatarHover,F as __namedExportsOrder,X as default};

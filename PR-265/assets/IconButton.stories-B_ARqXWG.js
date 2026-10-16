var A=Object.defineProperty;var r=(e,n)=>A(e,"name",{value:n,configurable:!0});import{n as v,o as M}from"./rolldown-runtime-CzYk_CEw.js";import{t as S}from"./react-HNhQAnN4.js";import{c as j,n as I,o as T,t as w}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as f}from"./src-B4B4Ieim.js";import{t as h}from"./jsx-runtime-Br4tQxt1.js";import{t as x}from"./icon-DYL8fxXL.js";import{r as t,t as B}from"./src-CKSNowAz.js";import{n as C,t as i}from"./IconButton-yXF3faAu.js";var $,m,g,o;function y(){return(y=v((()=>{$=M(S()),w(),x(),B(),m=h(),g=I.div`
  ${({type:e,size:n="medium"})=>{let s=`
      width: 100%; height: 100%; display: flex; 
      align-items: center; justify-content: center;
      text-transform: uppercase; overflow: hidden;
      border-radius: ${t.radius.radius_500};
    `;const p={small:`
        width: 20px;
        height: 20px;
        ${t.fontStyles.bodyXsBold};
      `,medium:`
        width: ${t.spacing.spacing_60};
        height: ${t.spacing.spacing_60};
        ${t.fontStyles.bodyXsBold};
      `,large:`
        width: ${t.spacing.spacing_70};
        height: ${t.spacing.spacing_70};
        ${t.fontStyles.bodySmBold};
      `};switch(s+=p[n],e){case"letter":case"thumbnail":s+=`
          color: ${t.palette.content.contrast};
          background-color: ${t.palette.primary.default};
        `;break;case"collapsed":s+=`
          color: ${t.palette.content.medium};
          background-color: ${t.palette.content.contrast};
        `}return s}}
`,o=r(({type:e="letter",size:n="medium",text:s,src:p,style:D})=>{let u=s;const _=n==="large"?"medium":"small";return e==="thumbnail"?u=(0,m.jsx)(f,{code:"person",color:"contrast",size:_}):e==="photo"&&p&&(u=(0,m.jsx)("img",{alt:"",src:p,style:{width:"100%",height:"100%",objectFit:"cover"}})),(0,m.jsx)(g,{"data-avatar-type":e,size:n,style:D,type:e,children:u})},"MockAvatar");try{o.displayName="MockAvatar",o.__docgenInfo={description:"",displayName:"MockAvatar",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/icon-button/src/mocks/MockAvatar.tsx",methods:[],props:{type:{defaultValue:{value:"letter"},declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/mocks/MockAvatar.tsx",name:"MockProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/mocks/MockAvatar.tsx",name:"MockProps"},required:!1,tags:{},type:{name:"MockAvatarType | undefined"}},size:{defaultValue:{value:"medium"},declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/mocks/MockAvatar.tsx",name:"MockProps"}],description:"",name:"size",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/mocks/MockAvatar.tsx",name:"MockProps"},required:!1,tags:{},type:{name:"MockAvatarSize | undefined"}},text:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/mocks/MockAvatar.tsx",name:"MockProps"}],description:"",name:"text",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/mocks/MockAvatar.tsx",name:"MockProps"},required:!1,tags:{},type:{name:"string | undefined"}},src:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/mocks/MockAvatar.tsx",name:"MockProps"}],description:"",name:"src",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/mocks/MockAvatar.tsx",name:"MockProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/mocks/MockAvatar.tsx",name:"MockProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/mocks/MockAvatar.tsx",name:"MockProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}r(y,"init_MockAvatar");var a,z,c,l,k,d,N;function b(){return(b=v((()=>{j(),x(),C(),y(),a=h(),z={component:i,title:"Data Display/IconButton",argTypes:{isDisabled:{control:"boolean"},variant:{options:["contrast","default"],control:{type:"select"}},size:{options:["extra-small","small","medium","large","extra-large"],control:{type:"select"}}},render:r(e=>(0,a.jsx)("div",{style:{backgroundColor:e.variant==="default"?"white":"black"},children:(0,a.jsx)(i,{...e,children:(0,a.jsx)(f,{code:"edit"})})}),"render")},c={args:{onClick:r(()=>null,"onClick"),isDisabled:!1,variant:"default",size:"large"}},l={render:r(e=>(0,a.jsxs)("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[(0,a.jsx)(i,{...e,ariaLabel:"Letter Avatar",children:(0,a.jsx)(o,{text:"JD",type:"letter"})}),(0,a.jsx)(i,{...e,ariaLabel:"Thumbnail Avatar",children:(0,a.jsx)(o,{type:"thumbnail"})}),(0,a.jsx)(i,{...e,ariaLabel:"Collapsed Avatar",children:(0,a.jsx)(o,{text:"+1",type:"collapsed"})})]}),"render"),args:{variant:"default",size:"large",isDisabled:!1}},k=T`
  &:hover:not(:disabled) {
    [data-avatar-type='letter'] {
      background-color: #a020f0;
    }
  }
`,d={render:r(e=>(0,a.jsx)("div",{style:{padding:"24px",backgroundColor:"white"},children:(0,a.jsx)(i,{...e,ariaLabel:"Avatar with custom hover",children:(0,a.jsx)(o,{text:"AB",type:"letter"})})}),"render"),args:{onClick:r(()=>console.log("Custom Hover Clicked"),"onClick"),variant:"default",size:"large",cssOverrides:k},parameters:{docs:{description:{story:"Demonstrates using `cssOverrides` to change the background color of the nested Avatar component upon hover. The default primary.dark color is overridden with a custom purple."}}}},N=["Default","WithAvatarIntegration","WithCustomAvatarHover"],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    onClick: () => null,
    isDisabled: false,
    variant: 'default',
    size: 'large'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}}})))()}r(b,"init_IconButton_stories");b();export{c as Default,l as WithAvatarIntegration,d as WithCustomAvatarHover,N as __namedExportsOrder,z as default};

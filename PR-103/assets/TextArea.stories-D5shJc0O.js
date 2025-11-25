var Z=Object.defineProperty;var a=(o,n)=>Z(o,"name",{value:n,configurable:!0});import{j as e}from"./jsx-runtime-Cgz2XvFB.js";import{I as ee}from"./Icon-BrO18bYS.js";import{T as v}from"./Tooltip-Bpq0CbTO.js";import{B as L}from"./index-juXVSS06.js";import{L as te}from"./LabelField-Drl51Bjy.js";import{T as R}from"./Typography-CEwLj33J.js";import{r as l}from"./index-CwbBKW39.js";import{T as ae}from"./TextArea.styled-DKPss3GP.js";import{d as oe}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./typography-B3nKKPHm.js";import"./index-DiOwAjVu.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-6Tx4pmSd.js";import"./iframe-Cpex4LsR.js";import"./z-index-BB_IPOEl.js";import"./index-DV-VXEUn.js";import"./index-Dw_1laFD.js";const w=a(({label:o,labelIcon:n,dataTestId:p,name:_,value:i,style:k,onChange:x,maxLength:m,variant:H="outlined",backgroundFill:M="contrast",enableResize:W=!1,disabled:f=!1,required:T=!1,hasError:$=!1,hasLabel:A=!0,message:G="",labelVariant:J="default",placeholder:K,readOnly:N,...s})=>{const[I,C]=l.useState(0),[j,E]=l.useState(!1),[P,g]=l.useState(""),[Q,h]=l.useState(!1),S=oe();l.useEffect(()=>{i?(g(i),C(i.length),h(!1)):g("")},[i]);const U=a(t=>{g(t.target.value),h(!1),C(t.target.value.length),x&&x(t)},"handleChange"),X=a(t=>{E(!0),s.onFocus&&s.onFocus(t)},"onFocus"),Y=a(t=>{E(!1),t.currentTarget.value.trim().length===0&&T&&h(!0),s.onBlur&&s.onBlur(t)},"onBlur"),c=p??`${o.replaceAll(" ","-").toLocaleLowerCase()}-textarea`,F=f?"content.light":"content.medium",r=$||Q,b=G,y=J==="floating";return e.jsxs(L,{style:{position:"relative",alignItems:"flex-start"},children:[A?e.jsx(te,{hasError:r,htmlFor:c,icon:n,isActive:j,isDisabled:f,isFloating:y,isInputFilled:!!I,isRequired:T,style:{zIndex:1},children:o}):null,e.jsx(ae,{backgroundFill:M,"data-error":r,"data-testid":c,disabled:f,enableResize:W,hasError:r,hasLabel:A,id:c,isFloatingLabel:y,maxLength:m,name:_,readOnly:N,style:k,value:P,variant:H,...s,onBlur:Y,onChange:U,onFocus:X,...(!y||j)&&{placeholder:K}}),e.jsxs(L,{style:{flexDirection:"row",justifyContent:"space-between",width:"100%",paddingInline:S.spacing.spacing_40,gap:S.spacing.spacing_30,marginTop:4},children:[b?e.jsx(R,{color:r?"error.default":F,element:"span",fontStyles:"bodySmRegular",children:b}):null,m?e.jsxs(R,{color:r?"error.default":F,dataTestId:"char-counter",element:"span",fontStyles:"bodySmRegular",id:c,...!b&&{style:{marginLeft:"auto"}},children:[I," / ",m]}):null]})]})},"TextArea"),Ce={title:"Data Display/TextArea",component:w,argTypes:{onChange:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onChange",undefined:"Does not have onChange"}}},maxLength:{control:{type:"number",min:1}},variant:{options:["outlined","bottomLine"],control:{type:"select"}},backgroundFill:{options:["default","contrast","light"],control:{type:"select"}},labelVariant:{options:["default","floating"],control:{type:"select"}}},render:a(({onChange:o,...n})=>e.jsx(w,{...n,...o&&{onChange:a(p=>console.log("data changed: ",p),"onChange")}}),"render")},d={args:{label:"Awesome TextArea",value:"",variant:"outlined",backgroundFill:"default",required:!1,message:"Additional info",onChange:void 0,enableResize:!0,hasError:!1,disabled:!1,placeholder:"this is a placeholder",hasLabel:!0,labelVariant:"default",readOnly:!1}},u={args:{label:"My label",labelIcon:e.jsxs(v,{children:[e.jsx(ee,{code:"info",size:"small"}),e.jsx(v.Content,{children:"Additional info about the field"})]})}};var D,O,z;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: 'Awesome TextArea',
    value: '',
    variant: 'outlined',
    backgroundFill: 'default',
    required: false,
    message: 'Additional info',
    onChange: undefined,
    enableResize: true,
    hasError: false,
    disabled: false,
    placeholder: 'this is a placeholder',
    hasLabel: true,
    labelVariant: 'default',
    readOnly: false
  }
}`,...(z=(O=d.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};var B,V,q;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    label: 'My label',
    labelIcon: <Tooltip>
        <Icon code='info' size='small' />
        <Tooltip.Content>Additional info about the field</Tooltip.Content>
      </Tooltip>
  }
}`,...(q=(V=u.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};const je=["Default","TestAreaWithLabelIcon"];export{d as Default,u as TestAreaWithLabelIcon,je as __namedExportsOrder,Ce as default};

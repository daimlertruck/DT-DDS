var fe=Object.defineProperty;var l=(e,a)=>fe(e,"name",{value:a,configurable:!0});import{n as V}from"./rolldown-runtime-CzYk_CEw.js";import{t as me}from"./react-HNhQAnN4.js";import{n as o,t as ge}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as xe}from"./src-DHrISQ1l.js";import{t as De}from"./jsx-runtime-Br4tQxt1.js";import{t as Te}from"./icon-Cd5k6Y-r.js";import{t as ye}from"./Typography-DAlDmJ21.js";import{t as ke}from"./typography-BWWJZ9Jo.js";import{t as Fe}from"./IconButton-RnpJG78v.js";import{t as Se}from"./icon-button-620BpAdQ.js";import{t as _e}from"./LabelField-CK0kGDgG.js";import{t as he}from"./label-field-B7nNy83U.js";var O;function H(){return(H=V((()=>{O=l((e,a)=>({default:a.palette.surface.default,contrast:a.palette.surface.contrast,light:a.palette.surface.light})[e]||a.palette.surface.default,"getThemedBackgroundFill")})))()}l(H,"init_helpers");var T,y,k,F,S,_,h;function K(){return(K=V((()=>{ge(),H(),T=o.div`
  ${({theme:e,isFloatingLabel:a=!0,hasPrefix:t=!1})=>`
    display: flex;
    flex-direction: column;
    gap: ${e.spacing.spacing_20};
    width: 100%;
    position: relative;
    
    ${t?`
    label {
      left: 0;
      padding-left: ${a?e.spacing.l:""};
    }
    `:""}

    :has(input[disabled]) {
      i, label > span {
        color: ${e.palette.content.light};
      }
    }

    &:has(input[readonly]:not(input[disabled])) {
      i, label, label > span {
        color: ${e.palette.content.medium};
      }
    }

    ${!a&&`
        &:has(input[readonly]:not([disabled]):focus) {
          label {
            color: ${e.palette.informative.default};
          }
        }
      `}
  `}

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
`,y=o.div`
  ${({theme:e,isFloatingLabel:a})=>`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${a?"0":e.spacing.spacing_30};
  `}
`,k=o.input`
  ${({theme:e,isFloatingLabel:a,scale:t,isFocused:n})=>`
    ${e.fontStyles.bodyMdRegular}
    border: 0;
    outline: 0;
    width: 100%;
    background-color: inherit;

    &:focus {
      outline: none;
    }
  
    &:read-only {
      color: ${e.palette.content.medium};
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    }

    &[readonly]::placeholder,
    &[readonly]:focus::placeholder {
      color: transparent;
    }

    &::placeholder {
      color: ${a&&!n?"transparent":e.palette.content.medium};
    }

    &:disabled {
      color: ${e.palette.content.light};
    }

    color: ${e.palette.content.default};

    ${t==="compact"?`
        padding: ${a?`${e.spacing.spacing_60} ${e.spacing.spacing_40} ${e.spacing.spacing_30} ${e.spacing.spacing_40}`:`14px ${e.spacing.spacing_30}`};
      `:`
        padding: ${a?`28px ${e.spacing.spacing_40} ${e.spacing.spacing_40}`:`20px ${e.spacing.spacing_40}`};
      `}
  `}
`,F=o.div`
  ${({theme:e,onClick:a})=>{const t=!!a;return`
    display: flex;
    cursor: ${t?"pointer":"default"};
    padding-left: ${e.spacing.spacing_40}};

    &:focus-visible {
      outline: 2px solid ${e.palette.border.dark};
      outline-offset: 1px;
    }

    ${t&&`
        &:hover > i  {
          color: ${e.palette.content.dark};
        }
      `}
  
  `}}
`,S=o.div`
  ${({theme:e,onClick:a})=>{const t=!!a;return`
    display: flex;
    cursor: ${t?"pointer":"default"};
    margin-right: ${e.spacing.spacing_40}};

    &:focus-visible {
      outline: 2px solid ${e.palette.border.dark};
      outline-offset: 1px;
    }

    ${t&&`
        &:hover > i  {
          color: ${e.palette.primary.default};
        }
      `}
  `}}
`,_=o.div`
  padding-left: ${({theme:e})=>e.spacing.spacing_40};
`,h=o.div`
  ${({theme:e,isFloatingLabel:a,variant:t,backgroundFill:n,hasError:c})=>{const p=c?e.palette.error.default:e.palette.border.medium,r=c?e.palette.error.default:e.palette.informative.default;return`
    display:flex;
    flex-direction: row;
    align-items: center;
    min-width: 198px;
    width: 100%;
    color: ${e.palette.content.default};
    background-color: ${O(n,e)};

    ${t==="outlined"?`border-radius: ${e.shape.formField};
        border: 1px solid ${p};

        &:focus-within,
        &:hover:not([disabled]) {
          border: 1px solid ${r};
        }

        &:hover:([disabled]) {
          border: 1px solid ${p};
        }

        &:has(input[readonly]:not([disabled])) {
          background-color: ${e.palette.surface.light};
          border: 1px solid ${e.palette.surface.default};

          &:focus-within, &:hover {
            border: 1px solid ${e.palette.informative.default};
          }
        }
      `:`border-radius: ${e.shape.formField} ${e.shape.formField} 0 0;
        border-bottom: 1px solid ${p};

        &:focus-within,
        &:hover:not([disabled]) {
          border-bottom: 1px solid ${r};
        }

        &:has(input[readonly]:not([disabled])) {
          background-color: ${e.palette.surface.light};
          border-bottom: 1px solid ${e.palette.surface.default};

          &:focus-within, &:hover {
            border-bottom: 1px solid ${e.palette.informative.default};
          }
        }
      `};

    &:has(input[disabled]), &:has(input[disabled]) > * {
      cursor: not-allowed;

      &:hover {
        border-color: ${p};
      }

      input::placeholder {
        color: ${a?"transparent":e.palette.content.light};
      }
    }
  `}}
`;try{T.displayName="TextFieldStyled",T.__docgenInfo={description:"",displayName:"TextFieldStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},isFloatingLabel:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"TextFieldStyledProps"}],description:"",name:"isFloatingLabel",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"TextFieldStyledProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},hasPrefix:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"TextFieldStyledProps"}],description:"",name:"hasPrefix",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"TextFieldStyledProps"},required:!1,tags:{},type:{name:"boolean | undefined"}}},tags:{}}}catch{}try{y.displayName="InputContainerStyled",y.__docgenInfo={description:"",displayName:"InputContainerStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},isFloatingLabel:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"TypeLiteral"}],description:"",name:"isFloatingLabel",required:!0,tags:{},type:{name:"boolean"}}},tags:{}}}catch{}try{k.displayName="InputFieldStyled",k.__docgenInfo={description:"",displayName:"InputFieldStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},isFloatingLabel:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputFieldStyledProps"}],description:"",name:"isFloatingLabel",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputFieldStyledProps"},required:!0,tags:{},type:{name:"boolean"}},scale:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputFieldStyledProps"}],description:"",name:"scale",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputFieldStyledProps"},required:!0,tags:{},type:{name:"Scale"}},isFocused:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputFieldStyledProps"}],description:"",name:"isFocused",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputFieldStyledProps"},required:!0,tags:{},type:{name:"boolean"}}},tags:{}}}catch{}try{F.displayName="InputExtraPrefixStyled",F.__docgenInfo={description:"",displayName:"InputExtraPrefixStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},isClickable:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"TypeLiteral"}],description:"",name:"isClickable",required:!1,tags:{},type:{name:"boolean | undefined"}}},tags:{}}}catch{}try{S.displayName="InputExtraSuffixStyled",S.__docgenInfo={description:"",displayName:"InputExtraSuffixStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},isClickable:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"TypeLiteral"}],description:"",name:"isClickable",required:!1,tags:{},type:{name:"boolean | undefined"}}},tags:{}}}catch{}try{_.displayName="TextFieldMessageStyled",_.__docgenInfo={description:"",displayName:"TextFieldMessageStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}try{h.displayName="InputWrapperStyled",h.__docgenInfo={description:"",displayName:"InputWrapperStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},isFloatingLabel:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputWrapperStyledProps"}],description:"",name:"isFloatingLabel",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputWrapperStyledProps"},required:!0,tags:{},type:{name:"boolean"}},variant:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputWrapperStyledProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputWrapperStyledProps"},required:!0,tags:{},type:{name:"TextFieldVariant"}},backgroundFill:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputWrapperStyledProps"}],description:"",name:"backgroundFill",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputWrapperStyledProps"},required:!0,tags:{},type:{name:"TextFieldBackgroundFill"}},hasError:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputWrapperStyledProps"}],description:"",name:"hasError",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.styled.ts",name:"InputWrapperStyledProps"},required:!0,tags:{},type:{name:"boolean"}}},tags:{}}}catch{}})))()}l(K,"init_TextField_styled");var f,i,$,q;function be(){return(be=V((()=>{f=me(),Te(),Se(),he(),ke(),K(),i=De(),$="extra-suffix",q=(0,f.forwardRef)(({dataTestId:e,hasError:a=!1,extraPrefix:t,extraSuffix:n,label:c,labelIcon:p,isFloatingLabel:r=!0,name:X,id:U,required:v,requiredMessage:z,style:G,children:J,initialValue:g,inputRef:Q,isInputFocused:Y,message:E="",type:w="text",variant:Z="outlined",scale:C="standard",backgroundFill:ee="default",disabled:m=!1,onChange:L=l(()=>null,"onChange"),onResetInput:ae=l(()=>null,"onResetInput"),...u},te)=>{const[R,b]=(0,f.useState)(!1),[d,x]=(0,f.useState)(g??""),[j,N]=(0,f.useState)(!1),I=U??c.replaceAll(" ","-").toLowerCase(),P=e??`${c.replaceAll(" ","-").toLowerCase()}-text-field`;(0,f.useEffect)(()=>{g?(x(g),N(!1)):x("")},[g]);const le=l(s=>{x(s.target.value),N(!1),L&&L(s)},"handleChange"),se=l(s=>{u.readOnly||b(!0),u.onFocus&&u.onFocus(s)},"onFocus"),ie=l(s=>{b(!1);const pe=s.currentTarget.value.trim().length===0,ue=s.relatedTarget?.getAttribute("data-testid")===$;pe&&v&&!ue&&N(!0),u.onBlur&&u.onBlur(s)},"onBlur"),ne=l(()=>{x(""),b(!1),ae()},"handleResetInput"),re=l(s=>s.code==="Enter"&&t?.onClick&&t.onClick(d),"handleExtraPrefixEnter"),de=l(s=>s.code==="Enter"&&n?.onClick&&n.onClick(d),"handleExtraSuffixEnter"),oe=m?"content.light":"content.medium",D=a||j,W=j?z??E:E,B=R||!!d.trim(),ce=w==="search",A=t?.onClick?t.onClick:null,M=n?.onClick?n.onClick:null;return(0,i.jsxs)(T,{"data-testid":P,hasPrefix:!!t,isFloatingLabel:r,style:G,children:[(0,i.jsxs)(y,{isFloatingLabel:r,ref:te,children:[(0,i.jsx)(_e,{hasError:D,htmlFor:I,icon:p,isActive:Y||R,isCentered:!B&&r,isDisabled:m,isFloating:r,isInputFilled:!!d,isRequired:v,scale:C,children:c}),(0,i.jsxs)(h,{backgroundFill:ee,"data-testid":`${P}-wrapper`,hasError:D,isFloatingLabel:r,variant:Z,children:[t?.component?(0,i.jsx)(F,{"data-testid":"extra-prefix",...!!A&&{tabIndex:0,onClick:l(()=>!m&&A(d),"onClick"),onKeyDown:re},children:t.component}):null,(0,i.jsx)(k,{"data-error":D,"data-testid":`${P}-input`,disabled:m,id:I,isFloatingLabel:r,isFocused:B,name:X??I,ref:Q,scale:C,type:w,value:d,...u,onBlur:ie,onChange:le,onFocus:se}),ce&&d?(0,i.jsx)(Fe,{dataTestId:"reset-icon",onClick:ne,style:{marginRight:12},children:(0,i.jsx)(xe,{code:"close"})}):null,n?.component?(0,i.jsx)(S,{"data-testid":$,...!!M&&{tabIndex:0,onClick:l(()=>!m&&M(d),"onClick"),onKeyDown:de},children:n.component}):null]})]}),W?(0,i.jsx)(_,{children:(0,i.jsx)(ye,{color:D?"error.default":oe,fontStyles:"bodySmRegular",children:W})}):null,J]})});try{q.displayName="TextField",q.__docgenInfo={description:"",displayName:"TextField",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/text-field/src/TextField.tsx",methods:[],props:{label:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"label",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!0,tags:{},type:{name:"string"}},labelIcon:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"labelIcon",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"ReactNode"}},isFloatingLabel:{defaultValue:{value:"true"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"isFloatingLabel",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},extraPrefix:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"extraPrefix",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"ExtraComponent | undefined"}},extraSuffix:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"extraSuffix",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"ExtraComponent | undefined"}},hasError:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"hasError",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},requiredMessage:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"requiredMessage",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"string | undefined"}},initialValue:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"initialValue",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"string | undefined"}},inputRef:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"inputRef",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"RefObject<HTMLInputElement> | undefined"}},message:{defaultValue:{value:""},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"message",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"string | undefined"}},variant:{defaultValue:{value:"outlined"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"TextFieldVariant | undefined"}},scale:{defaultValue:{value:"standard"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"scale",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"Scale | undefined"}},backgroundFill:{defaultValue:{value:"default"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"backgroundFill",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"TextFieldBackgroundFill | undefined"}},onResetInput:{defaultValue:{value:"() => null"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"onResetInput",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"(() => void) | undefined"}},isInputFocused:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"isInputFocused",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}}},tags:{}}}catch{}})))()}l(be,"init_TextField");export{be as n,K as r,q as t};

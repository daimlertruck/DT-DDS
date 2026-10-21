var fe=Object.defineProperty;var i=(e,a)=>fe(e,"name",{value:a,configurable:!0});import{n as S}from"./rolldown-runtime-CzYk_CEw.js";import{t as xe}from"./react-HNhQAnN4.js";import{n as o,t as ge}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as me}from"./src-DretUTc1.js";import{t as Te}from"./jsx-runtime-Br4tQxt1.js";import{t as De}from"./icon-B1_Y31KF.js";import{t as ke}from"./Typography-DXBiZdRz.js";import{t as Fe}from"./typography-B9xppGJO.js";import{t as be}from"./IconButton-yXF3faAu.js";import{t as ye}from"./icon-button-DemP2Y7v.js";import{t as $e}from"./LabelField-D1Ty0JL5.js";import{t as Se}from"./label-field-C04A4JsA.js";var R;function j(){return(j=S((()=>{R=i((e,a)=>({default:a.palette.surface.default,contrast:a.palette.surface.contrast,light:a.palette.surface.light})[e]||a.palette.surface.default,"getThemedBackgroundFill")})))()}i(j,"init_helpers");var A,B,M,O,H,K,X;function U(){return(U=S((()=>{ge(),j(),A=o.div`
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
`,B=o.div`
  ${({theme:e,isFloatingLabel:a})=>`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${a?"0":e.spacing.spacing_30};
  `}
`,M=o.input`
  ${({theme:e,isFloatingLabel:a,scale:t,isFocused:r})=>`
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
      color: ${a&&!r?"transparent":e.palette.content.medium};
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
`,O=o.div`
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
`,H=o.div`
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
`,K=o.div`
  padding-left: ${({theme:e})=>e.spacing.spacing_40};
`,X=o.div`
  ${({theme:e,isFloatingLabel:a,variant:t,backgroundFill:r,hasError:c})=>{const p=c?e.palette.error.default:e.palette.border.medium,n=c?e.palette.error.default:e.palette.informative.default;return`
    display:flex;
    flex-direction: row;
    align-items: center;
    min-width: 198px;
    width: 100%;
    color: ${e.palette.content.default};
    background-color: ${R(r,e)};

    ${t==="outlined"?`border-radius: ${e.shape.formField};
        border: 1px solid ${p};

        &:focus-within,
        &:hover:not([disabled]) {
          border: 1px solid ${n};
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
          border-bottom: 1px solid ${n};
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
`})))()}i(U,"init_TextField_styled");var f,s,y,$;function _e(){return(_e=S((()=>{f=xe(),De(),ye(),Se(),Fe(),U(),s=Te(),y="extra-suffix",$=(0,f.forwardRef)(({dataTestId:e,hasError:a=!1,extraPrefix:t,extraSuffix:r,label:c,labelIcon:p,isFloatingLabel:n=!0,name:W,id:z,required:_,requiredMessage:G,style:J,children:Q,initialValue:g,inputRef:Y,isInputFocused:Z,message:h="",type:v="text",variant:L="outlined",scale:N="standard",backgroundFill:ee="default",disabled:x=!1,onChange:P=i(()=>null,"onChange"),onResetInput:ae=i(()=>null,"onResetInput"),...u},te)=>{const[I,D]=(0,f.useState)(!1),[d,m]=(0,f.useState)(g??""),[w,k]=(0,f.useState)(!1),F=z??c.replaceAll(" ","-").toLowerCase(),b=e??`${c.replaceAll(" ","-").toLowerCase()}-text-field`;(0,f.useEffect)(()=>{g?(m(g),k(!1)):m("")},[g]);const ie=i(l=>{m(l.target.value),k(!1),P&&P(l)},"handleChange"),le=i(l=>{u.readOnly||D(!0),u.onFocus&&u.onFocus(l)},"onFocus"),se=i(l=>{D(!1);const pe=l.currentTarget.value.trim().length===0,ue=l.relatedTarget?.getAttribute("data-testid")===y;pe&&_&&!ue&&k(!0),u.onBlur&&u.onBlur(l)},"onBlur"),re=i(()=>{m(""),D(!1),ae()},"handleResetInput"),ne=i(l=>l.code==="Enter"&&t?.onClick&&t.onClick(d),"handleExtraPrefixEnter"),de=i(l=>l.code==="Enter"&&r?.onClick&&r.onClick(d),"handleExtraSuffixEnter"),oe=x?"content.light":"content.medium",T=a||w,C=w?G??h:h,q=I||!!d.trim(),ce=v==="search",E=t?.onClick?t.onClick:null,V=r?.onClick?r.onClick:null;return(0,s.jsxs)(A,{"data-testid":b,hasPrefix:!!t,isFloatingLabel:n,style:J,children:[(0,s.jsxs)(B,{isFloatingLabel:n,ref:te,children:[(0,s.jsx)($e,{hasError:T,htmlFor:F,icon:p,isActive:Z||I,isCentered:!q&&n,isDisabled:x,isFloating:n,isInputFilled:!!d,isRequired:_,scale:N,children:c}),(0,s.jsxs)(X,{backgroundFill:ee,"data-testid":`${b}-wrapper`,hasError:T,isFloatingLabel:n,variant:L,children:[t?.component?(0,s.jsx)(O,{"data-testid":"extra-prefix",...!!E&&{tabIndex:0,onClick:i(()=>!x&&E(d),"onClick"),onKeyDown:ne},children:t.component}):null,(0,s.jsx)(M,{"data-error":T,"data-testid":`${b}-input`,disabled:x,id:F,isFloatingLabel:n,isFocused:q,name:W??F,ref:Y,scale:N,type:v,value:d,...u,onBlur:se,onChange:ie,onFocus:le}),ce&&d?(0,s.jsx)(be,{dataTestId:"reset-icon",onClick:re,style:{marginRight:12},children:(0,s.jsx)(me,{code:"close"})}):null,r?.component?(0,s.jsx)(H,{"data-testid":y,...!!V&&{tabIndex:0,onClick:i(()=>!x&&V(d),"onClick"),onKeyDown:de},children:r.component}):null]})]}),C?(0,s.jsx)(K,{children:(0,s.jsx)(ke,{color:T?"error.default":oe,fontStyles:"bodySmRegular",children:C})}):null,Q]})});try{$.displayName="TextField",$.__docgenInfo={description:"",displayName:"TextField",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/text-field/src/TextField.tsx",methods:[],props:{label:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"label",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!0,tags:{},type:{name:"string"}},labelIcon:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"labelIcon",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"ReactNode"}},isFloatingLabel:{defaultValue:{value:"true"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"isFloatingLabel",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},extraPrefix:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"extraPrefix",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"ExtraComponent | undefined"}},extraSuffix:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"extraSuffix",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"ExtraComponent | undefined"}},hasError:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"hasError",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},requiredMessage:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"requiredMessage",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"string | undefined"}},initialValue:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"initialValue",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"string | undefined"}},inputRef:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"inputRef",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"RefObject<HTMLInputElement> | undefined"}},message:{defaultValue:{value:""},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"message",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"string | undefined"}},variant:{defaultValue:{value:"outlined"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"TextFieldVariant | undefined"}},scale:{defaultValue:{value:"standard"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"scale",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"Scale | undefined"}},backgroundFill:{defaultValue:{value:"default"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"backgroundFill",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"TextFieldBackgroundFill | undefined"}},onResetInput:{defaultValue:{value:"() => null"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"onResetInput",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"(() => void) | undefined"}},isInputFocused:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"}],description:"",name:"isInputFocused",parent:{fileName:"DT-DDS/packages/react-packages/text-field/src/TextField.tsx",name:"TextFieldProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}}},tags:{}}}catch{}})))()}i(_e,"init_TextField");export{_e as n,U as r,$ as t};

var K=Object.defineProperty;var l=(e,t)=>K(e,"name",{value:t,configurable:!0});import{o as L}from"./rolldown-runtime-CzYk_CEw.js";import{t as N}from"./react-HNhQAnN4.js";import{o as O,t as P,u as Q}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as U}from"./jsx-runtime-Br4tQxt1.js";import{t as T}from"./Typography-BVFm109i.js";import{t as C}from"./src-1jRqCCWR.js";import"./box-DLdZVqFP.js";import"./typography-D38L8NZ6.js";import{t as W}from"./LabelField-BX_neKLa.js";import"./label-field-Qt53KtQ_.js";var X=l((e,t)=>({default:t.palette.surface.default,contrast:t.palette.surface.contrast,light:t.palette.surface.light})[e]||t.palette.surface.default,"getThemedBackgroundFill"),u=L(N());O();var Y=P.textarea`
  ${({theme:e,enableResize:t,backgroundFill:m,variant:c,hasError:o,isFloatingLabel:p,hasLabel:i})=>{const r=o?e.palette.error.default:e.palette.informative.default;return`
    ${e.fontStyles.bodyMdRegular}

    background-color: ${X(m,e)};
    min-height: 100px;
    width: 100%;
    outline: none;
    color: ${e.palette.content.default};
    resize: ${t?"vertical":"none"};
    padding: ${p&&i?"30px 12px 12px 12px":"12px"};
    border: 0;

    ${!p&&i&&"margin-top: 8px"};

    ::placeholder {
      color: ${e.palette.content.medium};
    }

    ${c==="outlined"?`border-radius: ${e.shape.formField};
            border: 1px solid ${o?e.palette.error.default:e.palette.border.medium};

            &:focus-within,
            &:hover:not([disabled]) { 
              border: 1px solid ${r};
            }
          `:`border-radius: ${e.shape.formField} ${e.shape.formField} 0 0;
            border-bottom: 1px solid ${o?e.palette.error.default:e.palette.border.medium};
           
            &:focus-within,
            &:hover:not([disabled]) { 
              border-bottom: 1px solid  ${r};
            }
          `};

    &:read-only:not(:disabled) {
      border-color: ${e.palette.border.default};
      color: ${e.palette.content.medium};
      background-color: ${e.palette.surface.light};

      &:focus-within,
      &:hover { 
       ${c==="outlined"?`border: 1px solid ${r};`:`border-bottom: 1px solid ${r}`}
      }
    }

    &:disabled {
      cursor: not-allowed;
      color: ${e.palette.content.light};
    } 
  `}}
`,s=U(),ce=l(({label:e,labelIcon:t,dataTestId:m,name:c,value:o,style:p,onChange:i,maxLength:r,variant:R="outlined",backgroundFill:A="contrast",enableResize:B=!1,disabled:g=!1,required:h=!1,hasError:E=!1,hasLabel:y=!0,message:q="",labelVariant:k="default",placeholder:z,readOnly:D,...n})=>{const[w,F]=(0,u.useState)(0),[S,v]=(0,u.useState)(!1),[M,x]=(0,u.useState)(""),[V,b]=(0,u.useState)(!1),j=Q();(0,u.useEffect)(()=>{o?(x(o),F(o.length),b(!1)):x("")},[o]);const H=l(a=>{x(a.target.value),b(!1),F(a.target.value.length),i&&i(a)},"handleChange"),G=l(a=>{v(!0),n.onFocus&&n.onFocus(a)},"onFocus"),J=l(a=>{v(!1),a.currentTarget.value.trim().length===0&&h&&b(!0),n.onBlur&&n.onBlur(a)},"onBlur"),f=m??`${e.replaceAll(" ","-").toLocaleLowerCase()}-textarea`,I=g?"content.light":"content.medium",d=E||V,$=q,_=k==="floating";return(0,s.jsxs)(C,{style:{position:"relative",alignItems:"flex-start"},children:[y?(0,s.jsx)(W,{hasError:d,htmlFor:f,icon:t,isActive:S,isDisabled:g,isFloating:_,isInputFilled:!!w,isRequired:h,style:{zIndex:1},children:e}):null,(0,s.jsx)(Y,{backgroundFill:A,"data-error":d,"data-testid":f,disabled:g,enableResize:B,hasError:d,hasLabel:y,id:f,isFloatingLabel:_,maxLength:r,name:c,readOnly:D,style:p,value:M,variant:R,...n,onBlur:J,onChange:H,onFocus:G,...(!_||S)&&{placeholder:z}}),(0,s.jsxs)(C,{style:{flexDirection:"row",justifyContent:"space-between",width:"100%",paddingInline:j.spacing.spacing_40,gap:j.spacing.spacing_30,marginTop:4},children:[$?(0,s.jsx)(T,{color:d?"error.default":I,element:"span",fontStyles:"bodySmRegular",children:$}):null,r?(0,s.jsxs)(T,{color:d?"error.default":I,dataTestId:"char-counter",element:"span",fontStyles:"bodySmRegular",id:f,...!$&&{style:{marginLeft:"auto"}},children:[w," / ",r]}):null]})]})},"TextArea");export{ce as t};

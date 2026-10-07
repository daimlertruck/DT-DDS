var et=Object.defineProperty;var n=(t,e)=>et(t,"name",{value:e,configurable:!0});import{o as ot}from"./rolldown-runtime-CzYk_CEw.js";import{t as rt}from"./react-HNhQAnN4.js";import{t as d}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as nt}from"./src-Cgsrikn0.js";import{t as at}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as lt}from"./Typography-BVFm109i.js";import"./typography-D38L8NZ6.js";import{t as it}from"./IconButton-DPHwvLfO.js";import"./icon-button-DUNOTLRV.js";import{t as st}from"./LabelField-BX_neKLa.js";import"./label-field-Qt53KtQ_.js";var dt=n((t,e)=>({default:e.palette.surface.default,contrast:e.palette.surface.contrast,light:e.palette.surface.light})[t]||e.palette.surface.default,"getThemedBackgroundFill"),$=ot(rt()),ct=d.div`
  ${({theme:t,isFloatingLabel:e=!0,hasPrefix:o=!1})=>`
    display: flex;
    flex-direction: column;
    gap: ${t.spacing.spacing_20};
    width: 100%;
    position: relative;
    
    ${o?`
    label {
      left: 0;
      padding-left: ${e?t.spacing.l:""};
    }
    `:""}

    :has(input[disabled]) {
      i, label > span {
        color: ${t.palette.content.light};
      }
    }

    &:has(input[readonly]:not(input[disabled])) {
      i, label, label > span {
        color: ${t.palette.content.medium};
      }
    }

    ${!e&&`
        &:has(input[readonly]:not([disabled]):focus) {
          label {
            color: ${t.palette.informative.default};
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
`,pt=d.div`
  ${({theme:t,isFloatingLabel:e})=>`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${e?"0":t.spacing.spacing_30};
  `}
`,ut=d.input`
  ${({theme:t,isFloatingLabel:e,scale:o,isFocused:l})=>`
    ${t.fontStyles.bodyMdRegular}
    border: 0;
    outline: 0;
    width: 100%;
    background-color: inherit;

    &:focus {
      outline: none;
    }
  
    &:read-only {
      color: ${t.palette.content.medium};
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
      color: ${e&&!l?"transparent":t.palette.content.medium};
    }

    &:disabled {
      color: ${t.palette.content.light};
    }

    color: ${t.palette.content.default};

    ${o==="compact"?`
        padding: ${e?`${t.spacing.spacing_60} ${t.spacing.spacing_40} ${t.spacing.spacing_30} ${t.spacing.spacing_40}`:`14px ${t.spacing.spacing_30}`};
      `:`
        padding: ${e?`28px ${t.spacing.spacing_40} ${t.spacing.spacing_40}`:`20px ${t.spacing.spacing_40}`};
      `}
  `}
`,ft=d.div`
  ${({theme:t,onClick:e})=>{const o=!!e;return`
    display: flex;
    cursor: ${o?"pointer":"default"};
    padding-left: ${t.spacing.spacing_40}};

    &:focus-visible {
      outline: 2px solid ${t.palette.border.dark};
      outline-offset: 1px;
    }

    ${o&&`
        &:hover > i  {
          color: ${t.palette.content.dark};
        }
      `}
  
  `}}
`,$t=d.div`
  ${({theme:t,onClick:e})=>{const o=!!e;return`
    display: flex;
    cursor: ${o?"pointer":"default"};
    margin-right: ${t.spacing.spacing_40}};

    &:focus-visible {
      outline: 2px solid ${t.palette.border.dark};
      outline-offset: 1px;
    }

    ${o&&`
        &:hover > i  {
          color: ${t.palette.primary.default};
        }
      `}
  `}}
`,gt=d.div`
  padding-left: ${({theme:t})=>t.spacing.spacing_40};
`,bt=d.div`
  ${({theme:t,isFloatingLabel:e,variant:o,backgroundFill:l,hasError:c})=>{const p=c?t.palette.error.default:t.palette.border.medium,i=c?t.palette.error.default:t.palette.informative.default;return`
    display:flex;
    flex-direction: row;
    align-items: center;
    min-width: 198px;
    width: 100%;
    color: ${t.palette.content.default};
    background-color: ${dt(l,t)};

    ${o==="outlined"?`border-radius: ${t.shape.formField};
        border: 1px solid ${p};

        &:focus-within,
        &:hover:not([disabled]) {
          border: 1px solid ${i};
        }

        &:hover:([disabled]) {
          border: 1px solid ${p};
        }

        &:has(input[readonly]:not([disabled])) {
          background-color: ${t.palette.surface.light};
          border: 1px solid ${t.palette.surface.default};

          &:focus-within, &:hover {
            border: 1px solid ${t.palette.informative.default};
          }
        }
      `:`border-radius: ${t.shape.formField} ${t.shape.formField} 0 0;
        border-bottom: 1px solid ${p};

        &:focus-within,
        &:hover:not([disabled]) {
          border-bottom: 1px solid ${i};
        }

        &:has(input[readonly]:not([disabled])) {
          background-color: ${t.palette.surface.light};
          border-bottom: 1px solid ${t.palette.surface.default};

          &:focus-within, &:hover {
            border-bottom: 1px solid ${t.palette.informative.default};
          }
        }
      `};

    &:has(input[disabled]), &:has(input[disabled]) > * {
      cursor: not-allowed;

      &:hover {
        border-color: ${p};
      }

      input::placeholder {
        color: ${e?"transparent":t.palette.content.light};
      }
    }
  `}}
`,a=at(),R="extra-suffix",Tt=(0,$.forwardRef)(({dataTestId:t,hasError:e=!1,extraPrefix:o,extraSuffix:l,label:c,labelIcon:p,isFloatingLabel:i=!0,name:B,id:D,required:m,requiredMessage:O,style:q,children:M,initialValue:g,inputRef:K,isInputFocused:X,message:w="",type:_="text",variant:H="outlined",scale:C="standard",backgroundFill:U="default",disabled:f=!1,onChange:I=n(()=>null,"onChange"),onResetInput:W=n(()=>null,"onResetInput"),...u},z)=>{const[E,v]=(0,$.useState)(!1),[s,b]=(0,$.useState)(g??""),[S,y]=(0,$.useState)(!1),h=D??c.replaceAll(" ","-").toLowerCase(),k=t??`${c.replaceAll(" ","-").toLowerCase()}-text-field`;(0,$.useEffect)(()=>{g?(b(g),y(!1)):b("")},[g]);const G=n(r=>{b(r.target.value),y(!1),I&&I(r)},"handleChange"),J=n(r=>{u.readOnly||v(!0),u.onFocus&&u.onFocus(r)},"onFocus"),N=n(r=>{v(!1);const L=r.currentTarget.value.trim().length===0,tt=r.relatedTarget?.getAttribute("data-testid")===R;L&&m&&!tt&&y(!0),u.onBlur&&u.onBlur(r)},"onBlur"),Q=n(()=>{b(""),v(!1),W()},"handleResetInput"),Y=n(r=>r.code==="Enter"&&o?.onClick&&o.onClick(s),"handleExtraPrefixEnter"),Z=n(r=>r.code==="Enter"&&l?.onClick&&l.onClick(s),"handleExtraSuffixEnter"),V=f?"content.light":"content.medium",x=e||S,j=S?O??w:w,T=E||!!s.trim(),P=_==="search",F=o?.onClick?o.onClick:null,A=l?.onClick?l.onClick:null;return(0,a.jsxs)(ct,{"data-testid":k,hasPrefix:!!o,isFloatingLabel:i,style:q,children:[(0,a.jsxs)(pt,{isFloatingLabel:i,ref:z,children:[(0,a.jsx)(st,{hasError:x,htmlFor:h,icon:p,isActive:X||E,isCentered:!T&&i,isDisabled:f,isFloating:i,isInputFilled:!!s,isRequired:m,scale:C,children:c}),(0,a.jsxs)(bt,{backgroundFill:U,"data-testid":`${k}-wrapper`,hasError:x,isFloatingLabel:i,variant:H,children:[o?.component?(0,a.jsx)(ft,{"data-testid":"extra-prefix",...!!F&&{tabIndex:0,onClick:n(()=>!f&&F(s),"onClick"),onKeyDown:Y},children:o.component}):null,(0,a.jsx)(ut,{"data-error":x,"data-testid":`${k}-input`,disabled:f,id:h,isFloatingLabel:i,isFocused:T,name:B??h,ref:K,scale:C,type:_,value:s,...u,onBlur:N,onChange:G,onFocus:J}),P&&s?(0,a.jsx)(it,{dataTestId:"reset-icon",onClick:Q,style:{marginRight:12},children:(0,a.jsx)(nt,{code:"close"})}):null,l?.component?(0,a.jsx)($t,{"data-testid":R,...!!A&&{tabIndex:0,onClick:n(()=>!f&&A(s),"onClick"),onKeyDown:Z},children:l.component}):null]})]}),j?(0,a.jsx)(gt,{children:(0,a.jsx)(lt,{color:x?"error.default":V,fontStyles:"bodySmRegular",children:j})}):null,M]})});export{Tt as t};

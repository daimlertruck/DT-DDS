var no=Object.defineProperty;var s=(o,n)=>no(o,"name",{value:n,configurable:!0});import{j as a}from"./jsx-runtime-Cgz2XvFB.js";import{r as g}from"./index-CwbBKW39.js";import{I as eo}from"./Icon-9dVURh2l.js";import{I as lo}from"./IconButton-D1lKSM55.js";import{L as so}from"./LabelField-BrIM5Qam.js";import{T as ao}from"./Typography-Dk4smw7A.js";import{f as c}from"./emotion-styled.browser.esm-CIRWz9XU.js";const io=s((o,n)=>({default:n.palette.surface.default,contrast:n.palette.surface.contrast,light:n.palette.surface.light})[o]||n.palette.surface.default,"getThemedBackgroundFill"),ro=c.div`
  ${({theme:o,isFloatingLabel:n=!0,hasPrefix:t=!1})=>`
    display: flex;
    flex-direction: column;
    gap: ${o.spacing.spacing_20};
    width: 100%;
    position: relative;
    
    ${t?`
    label {
      left: 0;
      padding-left: ${n?o.spacing.l:""};
    }
    `:""}

    :has(input[disabled]) {
      i, label > span {
        color: ${o.palette.content.light};
      }
    }

    &:has(input[readonly]:not(input[disabled])) {
      i, label, label > span {
        color: ${o.palette.content.medium};
      }
    }

    ${!n&&`
        &:has(input[readonly]:not([disabled]):focus) {
          label {
            color: ${o.palette.informative.default};
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
`,co=c.div`
  ${({theme:o,isFloatingLabel:n})=>`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${n?"0":o.spacing.spacing_30};
  `}
`,po=c.input`
  ${({theme:o,isFloatingLabel:n,scale:t,isFocused:e})=>`
    ${o.fontStyles.bodyMdRegular}
    border: 0;
    outline: 0;
    width: 100%;
    background-color: inherit;

    &:focus {
      outline: none;
    }
  
    &:read-only {
      color: ${o.palette.content.medium};
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
      color: ${n&&!e?"transparent":o.palette.content.medium};
    }

    &:disabled {
      color: ${o.palette.content.light};
    }

    color: ${o.palette.content.default};

    ${t==="compact"?`
        padding: ${n?`${o.spacing.spacing_60} ${o.spacing.spacing_40} ${o.spacing.spacing_30} ${o.spacing.spacing_40}`:`14px ${o.spacing.spacing_30}`};
      `:`
        padding: ${n?`28px ${o.spacing.spacing_40} ${o.spacing.spacing_40}`:`20px ${o.spacing.spacing_40}`};
      `}
  `}
`,uo=c.div`
  ${({theme:o,onClick:n})=>{const t=!!n;return`
    display: flex;
    cursor: ${t?"pointer":"default"};
    padding-left: ${o.spacing.spacing_40}};

    &:focus-visible {
      outline: 2px solid ${o.palette.border.dark};
      outline-offset: 1px;
    }

    ${t&&`
        &:hover > i  {
          color: ${o.palette.content.dark};
        }
      `}
  
  `}}
`,$o=c.div`
  ${({theme:o,onClick:n})=>{const t=!!n;return`
    display: flex;
    cursor: ${t?"pointer":"default"};
    margin-right: ${o.spacing.spacing_40}};

    &:focus-visible {
      outline: 2px solid ${o.palette.border.dark};
      outline-offset: 1px;
    }

    ${t&&`
        &:hover > i  {
          color: ${o.palette.primary.default};
        }
      `}
  `}}
`,go=c.div`
  padding-left: ${({theme:o})=>o.spacing.spacing_40};
`,fo=c.div`
  ${({theme:o,isFloatingLabel:n,variant:t,backgroundFill:e,hasError:d})=>{const p=d?o.palette.error.default:o.palette.border.medium,i=d?o.palette.error.default:o.palette.informative.default;return`
    display:flex;
    flex-direction: row;
    align-items: center;
    min-width: 198px;
    width: 100%;
    color: ${o.palette.content.default};
    background-color: ${io(e,o)};

    ${t==="outlined"?`border-radius: ${o.shape.formField};
        border: 1px solid ${p};

        &:focus-within,
        &:hover:not([disabled]) {
          border: 1px solid ${i};
        }

        &:hover:([disabled]) {
          border: 1px solid ${p};
        }

        &:has(input[readonly]:not([disabled])) {
          background-color: ${o.palette.surface.light};
          border: 1px solid ${o.palette.surface.default};

          &:focus-within, &:hover {
            border: 1px solid ${o.palette.informative.default};
          }
        }
      `:`border-radius: ${o.shape.formField} ${o.shape.formField} 0 0;
        border-bottom: 1px solid ${p};

        &:focus-within,
        &:hover:not([disabled]) {
          border-bottom: 1px solid ${i};
        }

        &:has(input[readonly]:not([disabled])) {
          background-color: ${o.palette.surface.light};
          border-bottom: 1px solid ${o.palette.surface.default};

          &:focus-within, &:hover {
            border-bottom: 1px solid ${o.palette.informative.default};
          }
        }
      `};

    &:has(input[disabled]), &:has(input[disabled]) > * {
      cursor: not-allowed;

      &:hover {
        border-color: ${p};
      }

      input::placeholder {
        color: ${n?"transparent":o.palette.content.light};
      }
    }
  `}}
`,O="extra-suffix",mo=g.forwardRef(({dataTestId:o,hasError:n=!1,extraPrefix:t,extraSuffix:e,label:d,labelIcon:p,isFloatingLabel:i=!0,name:S,id:q,required:C,requiredMessage:K,style:M,children:X,initialValue:f,inputRef:H,isInputFocused:U,message:I="",type:m="text",variant:W="outlined",scale:E="standard",backgroundFill:z="default",disabled:$=!1,onChange:_=s(()=>null,"onChange"),onResetInput:G=s(()=>null,"onResetInput"),...u},J)=>{const[T,h]=g.useState(!1),[r,b]=g.useState(f??""),[j,k]=g.useState(!1),v=q??d.replaceAll(" ","-").toLowerCase(),w=o??`${d.replaceAll(" ","-").toLowerCase()}-text-field`;g.useEffect(()=>{f?(b(f),k(!1)):b("")},[f]);const N=s(l=>{b(l.target.value),k(!1),_&&_(l)},"handleChange"),Q=s(l=>{u.readOnly||h(!0),u.onFocus&&u.onFocus(l)},"onFocus"),Y=s(l=>{var D;h(!1);const oo=l.currentTarget.value.trim().length===0,to=((D=l.relatedTarget)==null?void 0:D.getAttribute("data-testid"))===O;oo&&C&&!to&&k(!0),u.onBlur&&u.onBlur(l)},"onBlur"),Z=s(()=>{b(""),h(!1),G()},"handleResetInput"),V=s(l=>l.code==="Enter"&&(t==null?void 0:t.onClick)&&t.onClick(r),"handleExtraPrefixEnter"),x=s(l=>l.code==="Enter"&&(e==null?void 0:e.onClick)&&e.onClick(r),"handleExtraSuffixEnter"),L=$?"content.light":"content.medium",y=n||j,F=j?K??I:I,R=T||!!r.trim(),P=m==="search",A=t!=null&&t.onClick?t.onClick:null,B=e!=null&&e.onClick?e.onClick:null;return a.jsxs(ro,{"data-testid":w,hasPrefix:!!t,isFloatingLabel:i,style:M,children:[a.jsxs(co,{isFloatingLabel:i,ref:J,children:[a.jsx(so,{hasError:y,htmlFor:v,icon:p,isActive:U||T,isCentered:!R&&i,isDisabled:$,isFloating:i,isInputFilled:!!r,isRequired:C,scale:E,children:d}),a.jsxs(fo,{backgroundFill:z,"data-testid":`${w}-wrapper`,hasError:y,isFloatingLabel:i,variant:W,children:[t!=null&&t.component?a.jsx(uo,{"data-testid":"extra-prefix",...!!A&&{tabIndex:0,onClick:s(()=>!$&&A(r),"onClick"),onKeyDown:V},children:t.component}):null,a.jsx(po,{"data-error":y,"data-testid":`${w}-input`,disabled:$,id:v,isFloatingLabel:i,isFocused:R,name:S??v,ref:H,scale:E,type:m,value:r,...u,onBlur:Y,onChange:N,onFocus:Q}),P&&r?a.jsx(lo,{dataTestId:"reset-icon",onClick:Z,style:{marginRight:12},children:a.jsx(eo,{code:"close"})}):null,e!=null&&e.component?a.jsx($o,{"data-testid":O,...!!B&&{tabIndex:0,onClick:s(()=>!$&&B(r),"onClick"),onKeyDown:x},children:e.component}):null]})]}),F?a.jsx(go,{children:a.jsx(ao,{color:y?"error.default":L,fontStyles:"bodySmRegular",children:F})}):null,X]})});export{mo as T};

var nt=Object.defineProperty;var s=(t,n)=>nt(t,"name",{value:n,configurable:!0});import{j as i}from"./jsx-runtime-Cgz2XvFB.js";import{r as g}from"./index-CwbBKW39.js";import{I as et}from"./Icon-BWIy_dZb.js";import{I as lt}from"./IconButton-DqfnmDe3.js";import{L as st}from"./LabelField-nCy-PARe.js";import{T as it}from"./Typography-Dk4smw7A.js";import{f as c}from"./emotion-styled.browser.esm-CIRWz9XU.js";const at=s((t,n)=>({default:n.palette.surface.default,contrast:n.palette.surface.contrast,light:n.palette.surface.light})[t]||n.palette.surface.default,"getThemedBackgroundFill"),rt=c.div`
  ${({theme:t,isFloatingLabel:n=!0,hasPrefix:o=!1})=>`
    display: flex;
    flex-direction: column;
    gap: ${t.spacing.spacing_20};
    width: 100%;
    position: relative;
    
    ${o?`
    label {
      left: 0;
      padding-left: ${n?t.spacing.l:""};
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

    ${!n&&`
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
`,ct=c.div`
  ${({theme:t,isFloatingLabel:n})=>`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${n?"0":t.spacing.spacing_30};
  `}
`,dt=c.input`
  ${({theme:t,isFloatingLabel:n,scale:o,isFocused:e})=>`
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
      color: ${n&&!e?"transparent":t.palette.content.medium};
    }

    &:disabled {
      color: ${t.palette.content.light};
    }

    color: ${t.palette.content.default};

    ${o==="compact"?`
        padding: ${n?`${t.spacing.spacing_60} ${t.spacing.spacing_40} ${t.spacing.spacing_30} ${t.spacing.spacing_40}`:`14px ${t.spacing.spacing_30}`};
      `:`
        padding: ${n?`28px ${t.spacing.spacing_40} ${t.spacing.spacing_40}`:`20px ${t.spacing.spacing_40}`};
      `}
  `}
`,pt=c.div`
  ${({theme:t,onClick:n})=>{const o=!!n;return`
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
`,ut=c.div`
  ${({theme:t,onClick:n})=>{const o=!!n;return`
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
`,$t=c.div`
  padding-left: ${({theme:t})=>t.spacing.spacing_40};
`,gt=c.div`
  ${({theme:t,isFloatingLabel:n,variant:o,backgroundFill:e,hasError:d})=>{const p=d?t.palette.error.default:t.palette.border.medium,a=d?t.palette.error.default:t.palette.informative.default;return`
    display:flex;
    flex-direction: row;
    align-items: center;
    min-width: 198px;
    width: 100%;
    color: ${t.palette.content.default};
    background-color: ${at(e,t)};
  
    ${o==="outlined"?`border-radius: ${t.shape.formField};
        border: 1px solid ${p};

        &:focus-within,
        &:hover:not([disabled]) { 
          border: 1px solid ${a};
        }

        &:hover:([disabled]) { 
          border: 1px solid ${p};
        }
      `:`border-radius: ${t.shape.formField} ${t.shape.formField} 0 0;
        border-bottom: 1px solid ${p};
        
        &:focus-within,
        &:hover:not([disabled]) { 
          border-bottom: 1px solid  ${a};
        }
      `};

    &:has(input[readonly]:not([disabled])) {
      background-color: ${t.palette.surface.light};
      border: 1px solid ${t.palette.surface.default};

      &:focus-within, &:hover { 
          border: 1px solid  ${t.palette.informative.default};
        }
    }

    &:has(input[disabled]), &:has(input[disabled]) > * {
      cursor: not-allowed;

      &:hover {
        border-color: ${p};
      }

      input::placeholder {
        color: ${n?"transparent":t.palette.content.light};
      }
    }
  `}}
`,O="extra-suffix",It=g.forwardRef(({dataTestId:t,hasError:n=!1,extraPrefix:o,extraSuffix:e,label:d,labelIcon:p,isFloatingLabel:a=!0,name:S,id:q,required:C,requiredMessage:K,style:M,children:X,initialValue:y,inputRef:H,isInputFocused:U,message:I="",type:m="text",variant:W="outlined",scale:E="standard",backgroundFill:z="default",disabled:$=!1,onChange:_=s(()=>null,"onChange"),onResetInput:G=s(()=>null,"onResetInput"),...u},J)=>{const[T,h]=g.useState(!1),[r,f]=g.useState(""),[j,k]=g.useState(!1),v=q??d.replaceAll(" ","-").toLowerCase(),w=t??`${d.replaceAll(" ","-").toLowerCase()}-text-field`;g.useEffect(()=>{y?(f(y),k(!1)):f("")},[y]);const N=s(l=>{f(l.target.value),k(!1),_&&_(l)},"handleChange"),Q=s(l=>{u.readOnly||h(!0),u.onFocus&&u.onFocus(l)},"onFocus"),V=s(l=>{var D;h(!1);const tt=l.currentTarget.value.trim().length===0,ot=((D=l.relatedTarget)==null?void 0:D.getAttribute("data-testid"))===O;tt&&C&&!ot&&k(!0),u.onBlur&&u.onBlur(l)},"onBlur"),Y=s(()=>{f(""),h(!1),G()},"handleResetInput"),Z=s(l=>l.code==="Enter"&&(o==null?void 0:o.onClick)&&o.onClick(r),"handleExtraPrefixEnter"),L=s(l=>l.code==="Enter"&&(e==null?void 0:e.onClick)&&e.onClick(r),"handleExtraSuffixEnter"),x=$?"content.light":"content.medium",b=n||j,F=j?K??I:I,R=T||!!r.trim(),P=m==="search",A=o!=null&&o.onClick?o.onClick:null,B=e!=null&&e.onClick?e.onClick:null;return i.jsxs(rt,{"data-testid":w,hasPrefix:!!o,isFloatingLabel:a,style:M,children:[i.jsxs(ct,{isFloatingLabel:a,ref:J,children:[i.jsx(st,{hasError:b,htmlFor:v,icon:p,isActive:U||T,isCentered:!R&&a,isDisabled:$,isFloating:a,isInputFilled:!!r,isRequired:C,scale:E,children:d}),i.jsxs(gt,{backgroundFill:z,"data-testid":`${w}-wrapper`,hasError:b,isFloatingLabel:a,variant:W,children:[o!=null&&o.component?i.jsx(pt,{"data-testid":"extra-prefix",...!!A&&{tabIndex:0,onClick:s(()=>!$&&A(r),"onClick"),onKeyDown:Z},children:o.component}):null,i.jsx(dt,{"data-error":b,"data-testid":`${w}-input`,disabled:$,id:v,isFloatingLabel:a,isFocused:R,name:S??v,ref:H,scale:E,type:m,value:r,...u,onBlur:V,onChange:N,onFocus:Q}),P&&r?i.jsx(lt,{dataTestId:"reset-icon",onClick:Y,style:{marginRight:12},children:i.jsx(et,{code:"close"})}):null,e!=null&&e.component?i.jsx(ut,{"data-testid":O,...!!B&&{tabIndex:0,onClick:s(()=>!$&&B(r),"onClick"),onKeyDown:L},children:e.component}):null]})]}),F?i.jsx($t,{children:i.jsx(it,{color:b?"error.default":x,fontStyles:"bodySmRegular",children:F})}):null,X]})});export{It as T};

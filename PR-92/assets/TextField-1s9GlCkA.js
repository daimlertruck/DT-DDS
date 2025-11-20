import{j as s}from"./jsx-runtime-CB_V9I5Y.js";import{I as tt}from"./Icon-w916x_k_.js";import{I as ot}from"./IconButton-C_mszqXk.js";import{L as nt}from"./LabelField-mvyT1FXM.js";import{T as et}from"./Typography-Bb7lZ69m.js";import{r as $}from"./index-CTjT7uj6.js";import{f as c}from"./emotion-styled.browser.esm-DBghOYGd.js";const lt=(t,n)=>({default:n.palette.surface.default,contrast:n.palette.surface.contrast,light:n.palette.surface.light})[t]||n.palette.surface.default,st=c.div`
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
`,it=c.div`
  ${({theme:t,isFloatingLabel:n})=>`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${n?"0":t.spacing.spacing_30};
  `}
`,at=c.input`
  ${({theme:t,isFloatingLabel:n,scale:o})=>`
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
      color: ${n?"transparent":t.palette.content.medium};
    }

    &:focus::placeholder {
      color: ${t.palette.content.medium}; 
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
`,ct=c.div`
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
`,rt=c.div`
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
`,dt=c.div`
  padding-left: ${({theme:t})=>t.spacing.spacing_40};
`,pt=c.div`
  ${({theme:t,isFloatingLabel:n,variant:o,backgroundFill:e,hasError:r})=>{const d=r?t.palette.error.default:t.palette.border.medium,i=r?t.palette.error.default:t.palette.informative.default;return`
    display:flex;
    flex-direction: row;
    align-items: center;
    min-width: 198px;
    width: 100%;
    color: ${t.palette.content.default};
    background-color: ${lt(e,t)};
  
    ${o==="outlined"?`border-radius: ${t.shape.formField};
        border: 1px solid ${d};

        &:focus-within,
        &:hover:not([disabled]) { 
          border: 1px solid ${i};
        }

        &:hover:([disabled]) { 
          border: 1px solid ${d};
        }
      `:`border-radius: ${t.shape.formField} ${t.shape.formField} 0 0;
        border-bottom: 1px solid ${d};
        
        &:focus-within,
        &:hover:not([disabled]) { 
          border-bottom: 1px solid  ${i};
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
        border-color: ${d};
      }

      input::placeholder {
        color: ${n?"transparent":t.palette.content.light};
      }
    }
  `}}
`,B="extra-suffix",kt=$.forwardRef(({dataTestId:t,hasError:n=!1,extraPrefix:o,extraSuffix:e,label:r,labelIcon:d,isFloatingLabel:i=!0,name:D,id:O,required:w,requiredMessage:S,style:q,children:K,initialValue:b,inputRef:M,message:C="",type:I="text",variant:X="outlined",scale:m="standard",backgroundFill:H="default",disabled:u=!1,onChange:E=()=>null,onResetInput:U=()=>null,...p},W)=>{const[_,y]=$.useState(!1),[a,g]=$.useState(""),[T,h]=$.useState(!1),k=O??r.replaceAll(" ","-").toLowerCase(),v=t??`${r.replaceAll(" ","-").toLowerCase()}-text-field`;$.useEffect(()=>{b?(g(b),h(!1)):g("")},[b]);const z=l=>{g(l.target.value),h(!1),E&&E(l)},G=l=>{p.readOnly||y(!0),p.onFocus&&p.onFocus(l)},J=l=>{var A;y(!1);const x=l.currentTarget.value.trim().length===0,P=((A=l.relatedTarget)==null?void 0:A.getAttribute("data-testid"))===B;x&&w&&!P&&h(!0),p.onBlur&&p.onBlur(l)},N=()=>{g(""),y(!1),U()},Q=l=>l.code==="Enter"&&(o==null?void 0:o.onClick)&&o.onClick(a),V=l=>l.code==="Enter"&&(e==null?void 0:e.onClick)&&e.onClick(a),Y=u?"content.light":"content.medium",f=n||T,j=T?S??C:C,Z=_||!!a.trim(),L=I==="search",F=o!=null&&o.onClick?o.onClick:null,R=e!=null&&e.onClick?e.onClick:null;return s.jsxs(st,{"data-testid":v,hasPrefix:!!o,isFloatingLabel:i,style:q,children:[s.jsxs(it,{isFloatingLabel:i,ref:W,children:[s.jsx(nt,{hasError:f,htmlFor:k,icon:d,isActive:_,isCentered:!Z&&i,isDisabled:u,isFloating:i,isInputFilled:!!a,isRequired:w,scale:m,children:r}),s.jsxs(pt,{backgroundFill:H,"data-testid":`${v}-wrapper`,hasError:f,isFloatingLabel:i,variant:X,children:[o!=null&&o.component?s.jsx(ct,{"data-testid":"extra-prefix",...!!F&&{tabIndex:0,onClick:()=>!u&&F(a),onKeyDown:Q},children:o.component}):null,s.jsx(at,{"data-error":f,"data-testid":`${v}-input`,disabled:u,id:k,isFloatingLabel:i,name:D??k,ref:M,scale:m,type:I,value:a,...p,onBlur:J,onChange:z,onFocus:G}),L&&a?s.jsx(ot,{dataTestId:"reset-icon",onClick:N,style:{marginRight:12},children:s.jsx(tt,{code:"close"})}):null,e!=null&&e.component?s.jsx(rt,{"data-testid":B,...!!R&&{tabIndex:0,onClick:()=>!u&&R(a),onKeyDown:V},children:e.component}):null]})]}),j?s.jsx(dt,{children:s.jsx(et,{color:f?"error.default":Y,fontStyles:"bodySmRegular",children:j})}):null,K]})});export{kt as T};

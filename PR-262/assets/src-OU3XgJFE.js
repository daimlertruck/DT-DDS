var y=Object.defineProperty;var t=(r,a)=>y(r,"name",{value:a,configurable:!0});import{l as b}from"./preload-helper-DhB_op97.js";import{t as v}from"./react-Cv64OdzP.js";import{n as $,t as h}from"./emotion-styled.browser.esm-YTZgSpOx.js";import{t as k}from"./src-DQoSsMZn.js";import{t as p}from"./jsx-runtime-CPdzY0Ku.js";import"./icon-DhOkWClN.js";var x=b(v()),_={inline:{large:{regular:"linkLgRegular",bold:"linkLgBold"},medium:{regular:"linkMdRegular",bold:"linkMdBold"},small:{regular:"linkSmRegular",bold:"linkSmBold"}},standalone:{large:{regular:"bodyLgRegular",bold:"bodyLgBold"},medium:{regular:"bodyMdRegular",bold:"bodyMdBold"},small:{regular:"bodySmRegular",bold:"bodySmBold"}}},S=t(r=>({inline:{primary:{default:r.accent.default,hover:r.accent.dark,active:r.accent.medium,disabled:r.content.light},secondary:{default:r.accent.default,hover:r.accent.dark,active:r.accent.medium,disabled:r.content.light}},standalone:{primary:{default:r.primary.default,hover:r.accent.default,active:r.accent.default,disabled:r.primary.light},secondary:{default:r.secondary.default,hover:r.secondary.dark,active:r.secondary.medium,disabled:r.secondary.light}}}),"colorMap"),M=h("a",{shouldForwardProp:t(r=>$(r)&&!r.startsWith("$"),"shouldForwardProp")})`
  ${({theme:r,$disabled:a,$size:d="medium",$variant:e="standalone",$color:n="primary",$fontWeight:i="regular"})=>{const o=S(r.palette)[e][n];return`
      color: ${o.default};
      display: inline-flex;
      align-items: center;
      gap: ${r.spacing.spacing_10};

      ${r.fontStyles[_[e][d][i]]};

      ${a?`
            color: ${o.disabled};
            cursor: not-allowed;
          `:`
            &:hover {
              color: ${o.hover};
            }

            &:active {
              color: ${o.active};
            }
          `};

      &:focus-visible {
        outline: 2px solid ${r.palette.primary.default};
      }
    `}}
`,l=p(),P=(0,x.forwardRef)(({isDisabled:r,children:a,size:d="medium",dataTestId:e,onClick:n,variant:i,fontWeight:o="regular",href:s,style:u,icon:c,color:m,...g},f)=>(0,l.jsx)(M,{$color:m,"data-testid":e??"link",$disabled:r,$fontWeight:o,ref:f,$size:d,style:u,$variant:i,...!r&&{href:s,onClick:n},...g,children:i==="inline"||!c?a:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("span",{children:a}),(0,l.jsx)(k,{code:c,color:"inherit",size:d})]})}));export{P as t};

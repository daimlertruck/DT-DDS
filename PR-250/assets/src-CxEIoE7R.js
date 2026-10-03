var y=Object.defineProperty;var t=(r,a)=>y(r,"name",{value:a,configurable:!0});import{o as b}from"./rolldown-runtime-CzYk_CEw.js";import{t as v}from"./react-HNhQAnN4.js";import{n as $,t as h}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as k}from"./src-Cgsrikn0.js";import{t as p}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";var x=b(v()),_={inline:{large:{regular:"linkLgRegular",bold:"linkLgBold"},medium:{regular:"linkMdRegular",bold:"linkMdBold"},small:{regular:"linkSmRegular",bold:"linkSmBold"}},standalone:{large:{regular:"bodyLgRegular",bold:"bodyLgBold"},medium:{regular:"bodyMdRegular",bold:"bodyMdBold"},small:{regular:"bodySmRegular",bold:"bodySmBold"}}},S=t(r=>({inline:{primary:{default:r.accent.default,hover:r.accent.dark,active:r.accent.medium,disabled:r.content.light},secondary:{default:r.accent.default,hover:r.accent.dark,active:r.accent.medium,disabled:r.content.light}},standalone:{primary:{default:r.primary.default,hover:r.accent.default,active:r.accent.default,disabled:r.primary.light},secondary:{default:r.secondary.default,hover:r.secondary.dark,active:r.secondary.medium,disabled:r.secondary.light}}}),"colorMap"),M=h("a",{shouldForwardProp:t(r=>$(r)&&!r.startsWith("$"),"shouldForwardProp")})`
  ${({theme:r,$disabled:a,$size:l="medium",$variant:e="standalone",$color:n="primary",$fontWeight:i="regular"})=>{const o=S(r.palette)[e][n];return`
      color: ${o.default};
      display: inline-flex;
      align-items: center;
      gap: ${r.spacing.spacing_10};

      ${r.fontStyles[_[e][l][i]]};

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
`,d=p(),P=(0,x.forwardRef)(({isDisabled:r,children:a,size:l="medium",dataTestId:e,onClick:n,variant:i,fontWeight:o="regular",href:s,style:u,icon:c,color:m,...g},f)=>(0,d.jsx)(M,{$color:m,"data-testid":e??"link",$disabled:r,$fontWeight:o,ref:f,$size:l,style:u,$variant:i,...!r&&{href:s,onClick:n},...g,children:i==="inline"||!c?a:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("span",{children:a}),(0,d.jsx)(k,{code:c,color:"inherit",size:l})]})}));export{P as t};

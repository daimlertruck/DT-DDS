var _=Object.defineProperty;var c=(e,r)=>_(e,"name",{value:r,configurable:!0});import{j as p}from"./jsx-runtime-Cgz2XvFB.js";import{r as x}from"./index-CwbBKW39.js";import{I as B}from"./Icon-BWIy_dZb.js";import{f as u,j as g,d as F}from"./emotion-styled.browser.esm-CIRWz9XU.js";const s={small:20,large:24},H=179,h={small:16,large:20},A={small:(s.small-h.small)/2,large:(s.large-h.large)/2},P=c(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),W=u("label",{shouldForwardProp:c(e=>g(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  display: inline-flex;
  align-items: flex-start;
  width: ${({$hasLabel:e})=>e?"100%":"auto"};
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  position: relative;
`,O=u.input`
  appearance: none;
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`,T=u("div",{shouldForwardProp:c(e=>g(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  pointer-events: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.shape.checkbox};

  ${({theme:e,$checked:r,$indeterminate:t,$disabled:o,$error:a,$size:l})=>{const i=P(e),d=r||t,n=o?i.disabled[d?"active":"inactive"]:i.default[d?"active":"inactive"][a?"error":"normal"];return`
      height: ${s[l]}px;
      min-height: ${s[l]}px;
      width: ${s[l]}px;
      min-width: ${s[l]}px;

      background-color: ${n.bg};
      border: 1px solid ${n.border};

      ${!o&&"hover"in n?`
            label:hover & {
              background-color: ${n.hover};
            }
          `:""}
    `}}

  input:focus-visible + & {
    outline: 2px solid ${({theme:e})=>e.palette.primary.default};
    outline-offset: 2px;
  }
`,X=u("span",{shouldForwardProp:c(e=>g(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  user-select: none;
  max-width: ${H}px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-top: ${({$size:e})=>`${A[e]}px`};

  ${({theme:e,$disabled:r,$size:t})=>`
    padding-left: ${e.spacing.spacing_30};
    ${t==="small"?e.fontStyles.bodyMdRegular:e.fontStyles.bodyLgRegular};
    color: ${r?e.palette.content.light:e.palette.content.default};
  `}
`;function I(...e){return r=>{for(const t of e)t&&(typeof t=="function"?t(r):t&&(t.current=r))}}c(I,"mergeRefs");const K=x.forwardRef(({dataTestId:e="checkbox",onChange:r,isChecked:t=!1,isDisabled:o=!1,isIndeterminate:a=!1,hasError:l=!1,size:i="large",label:d,children:n,style:m,id:k,"aria-label":y,...w},S)=>{const L=F(),b=x.useRef(null),C=I(b,S);x.useEffect(()=>{b.current&&(b.current.indeterminate=a)},[a]);const E=c(R=>{o||r==null||r(R)},"handleChange"),f=!!(d||n),v=k||(f?`checkbox-${e}`:void 0),$=a?"remove":t?"check":null,j=i==="small"?"medium":"large";return p.jsxs(W,{$checked:t,$disabled:o,$error:l,$hasLabel:f,$indeterminate:a,$size:i,"data-testid":e,htmlFor:v,style:m,children:[p.jsx(O,{"aria-checked":a?"mixed":void 0,"aria-invalid":l,"aria-label":f?void 0:y||"Checkbox",checked:t,disabled:o,id:v,onChange:E,ref:C,type:"checkbox",...w}),p.jsx(T,{$checked:t,$disabled:o,$error:l,$indeterminate:a,$size:i,children:$?p.jsx(B,{code:$,color:L.palette.content.contrast,size:j}):null}),f?p.jsx(X,{$disabled:o,$size:i,children:d||n}):null]})});K.displayName="Checkbox";export{K as C};

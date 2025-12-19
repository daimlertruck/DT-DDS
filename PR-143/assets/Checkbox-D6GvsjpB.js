var _=Object.defineProperty;var n=(e,r)=>_(e,"name",{value:r,configurable:!0});import{j as p}from"./jsx-runtime-Cgz2XvFB.js";import{r as x}from"./index-CwbBKW39.js";import{I as B}from"./Icon-BWIy_dZb.js";import{f,j as v,d as F}from"./emotion-styled.browser.esm-CIRWz9XU.js";const c={small:20,large:24},H=187,m={small:16,large:20},A={small:(c.small-m.small)/2,large:(c.large-m.large)/2},P=n(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),W=f("label",{shouldForwardProp:n(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  display: inline-flex;
  align-items: flex-start;
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  position: relative;
`,I=f.input`
  appearance: none;
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`,O=f("div",{shouldForwardProp:n(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  pointer-events: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.shape.checkbox};

  ${({theme:e,$checked:r,$indeterminate:t,$disabled:o,$error:a,$size:l})=>{const s=P(e),d=r||t,i=o?s.disabled[d?"active":"inactive"]:s.default[d?"active":"inactive"][a?"error":"normal"];return`
      height: ${c[l]}px;
      min-height: ${c[l]}px;
      width: ${c[l]}px;
      min-width: ${c[l]}px;

      background-color: ${i.bg};
      border: 1px solid ${i.border};

      ${!o&&"hover"in i?`
            label:hover & {
              background-color: ${i.hover};
            }
          `:""}
    `}}

  input:focus-visible + & {
    outline: 2px solid ${({theme:e})=>e.palette.primary.default};
    outline-offset: 2px;
  }
`,T=f("div",{shouldForwardProp:n(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
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
`;function X(...e){return r=>{for(const t of e)t&&(typeof t=="function"?t(r):t&&(t.current=r))}}n(X,"mergeRefs");const K=x.forwardRef(({dataTestId:e="checkbox",onChange:r,isChecked:t=!1,isDisabled:o=!1,isIndeterminate:a=!1,hasError:l=!1,size:s="large",label:d,children:i,style:$,id:k,"aria-label":y,...w},S)=>{const C=F(),u=x.useRef(null),E=X(u,S);x.useEffect(()=>{u.current&&(u.current.indeterminate=a)},[a]);const L=n(R=>{o||r==null||r(R)},"handleChange"),b=!!(d||i),g=k||(b?e:void 0),h=a?"remove":t?"check":null,j=s==="small"?"medium":"large";return p.jsxs(W,{$disabled:o,"data-testid":e,htmlFor:g,style:$,children:[p.jsx(I,{"aria-checked":a?"mixed":void 0,"aria-invalid":l,"aria-label":b?void 0:y||"Checkbox",checked:t,disabled:o,id:g,onChange:L,ref:E,type:"checkbox",...w}),p.jsx(O,{$checked:t,$disabled:o,$error:l,$indeterminate:a,$size:s,children:h?p.jsx(B,{code:h,color:C.palette.content.contrast,size:j}):null}),b?p.jsx(T,{$disabled:o,$size:s,children:d||i}):null]})});K.displayName="Checkbox";export{K as C};

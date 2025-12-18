var E=Object.defineProperty;var i=(e,o)=>E(e,"name",{value:o,configurable:!0});import{j as d}from"./jsx-runtime-Cgz2XvFB.js";import{r as x}from"./index-CwbBKW39.js";import{I as _}from"./Icon-BWIy_dZb.js";import{f as u,j as v,d as B}from"./emotion-styled.browser.esm-CIRWz9XU.js";const p={small:20,large:24},F=179,A=i(e=>`calc((${e}px - 1.25em) / 2)`,"CHECKBOX_LABEL_VERTICAL_OFFSET"),P=i(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),W=u("label",{shouldForwardProp:i(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  display: inline-flex;
  align-items: flex-start;
  width: ${({$hasLabel:e})=>e?"100%":"auto"};
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  position: relative;
`,H=u.input`
  appearance: none;
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`,O=u("div",{shouldForwardProp:i(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  pointer-events: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.shape.checkbox};

  ${({theme:e,$checked:o,$indeterminate:t,$disabled:r,$error:a,$size:l})=>{const n=P(e),s=o||t,c=r?n.disabled[s?"active":"inactive"]:n.default[s?"active":"inactive"][a?"error":"normal"];return`
      height: ${p[l]}px;
      min-height: ${p[l]}px;
      width: ${p[l]}px;
      min-width: ${p[l]}px;

      background-color: ${c.bg};
      border: 1px solid ${c.border};

      ${!r&&"hover"in c?`
            label:hover & {
              background-color: ${c.hover};
            }
          `:""}
    `}}

  input:focus-visible + & {
    outline: 2px solid ${({theme:e})=>e.palette.primary.default};
    outline-offset: 2px;
  }
`,T=u("span",{shouldForwardProp:i(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  user-select: none;
  max-width: ${F}px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-top: ${({$size:e})=>A(p[e])};

  ${({theme:e,$disabled:o,$size:t})=>`
    padding-left: ${e.spacing.spacing_30};
    ${t==="small"?e.fontStyles.bodyMdRegular:e.fontStyles.bodyLgRegular};
    color: ${o?e.palette.content.light:e.palette.content.default};
  `}
`;function X(...e){return o=>{for(const t of e)t&&(typeof t=="function"?t(o):t&&(t.current=o))}}i(X,"mergeRefs");const K=x.forwardRef(({dataTestId:e="checkbox",onChange:o,isChecked:t=!1,isDisabled:r=!1,isIndeterminate:a=!1,hasError:l=!1,size:n="large",label:s,children:c,style:h,id:m,"aria-label":k,...y},w)=>{const C=B(),b=x.useRef(null),S=X(b,w);x.useEffect(()=>{b.current&&(b.current.indeterminate=a)},[a]);const j=i(R=>{r||o==null||o(R)},"handleChange"),f=!!(s||c),$=m||(f?`checkbox-${e}`:void 0),g=a?"remove":t?"check":null,L=n==="small"?"medium":"large";return d.jsxs(W,{$checked:t,$disabled:r,$error:l,$hasLabel:f,$indeterminate:a,$size:n,"data-testid":e,htmlFor:$,style:h,children:[d.jsx(H,{"aria-checked":a?"mixed":void 0,"aria-invalid":l,"aria-label":f?void 0:k||"Checkbox",checked:t,disabled:r,id:$,onChange:j,ref:S,type:"checkbox",...y}),d.jsx(O,{$checked:t,$disabled:r,$error:l,$indeterminate:a,$size:n,children:g?d.jsx(_,{code:g,color:C.palette.content.contrast,size:L}):null}),f?d.jsx(T,{$disabled:r,$size:n,children:s||c}):null]})});K.displayName="Checkbox";export{K as C};

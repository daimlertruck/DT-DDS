var P=Object.defineProperty;var i=(e,r)=>P(e,"name",{value:r,configurable:!0});import{j as s}from"./jsx-runtime-Cgz2XvFB.js";import{r as b}from"./index-CwbBKW39.js";import{I as z}from"./Icon-BWIy_dZb.js";import{f,j as v,d as E}from"./emotion-styled.browser.esm-CIRWz9XU.js";const L={small:20,large:24},W=i(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),A=i((e,r,t,o,a)=>{const c=W(e),l=r||t?"active":"inactive";if(o)return c.disabled[l];const d=a?"error":"normal";return c.default[l][d]},"getCheckboxState"),B=f("label",{shouldForwardProp:i(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  display: inline-flex;
  align-items: center;
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  position: relative;
`,K=f.input`
  appearance: none;
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`,I=f("div",{shouldForwardProp:i(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  pointer-events: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.shape.checkbox};

  ${({theme:e,$checked:r,$indeterminate:t,$disabled:o,$error:a,$size:c})=>{const n=A(e,r,t,o,a),l=L[c];return`
      height: ${l}px;
      width: ${l}px;

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
`,M=f("div",{shouldForwardProp:i(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  user-select: none;
  display: flex;
  align-items: center;

  ${({theme:e,$disabled:r,$size:t})=>`
    padding-left: ${e.spacing.spacing_30};
    ${t==="small"?e.fontStyles.bodyMdRegular:e.fontStyles.bodyLgRegular};
    color: ${r?e.palette.content.light:e.palette.content.default};
  `}
`;function N(...e){return r=>{for(const t of e)t&&(typeof t=="function"?t(r):t&&(t.current=r))}}i(N,"mergeRefs");const V=b.forwardRef(({dataTestId:e="checkbox",onChange:r,isChecked:t=!1,isDisabled:o=!1,isIndeterminate:a=!1,hasError:c=!1,size:n="large",label:l,children:d,style:h,id:$,"aria-label":m,...y},k)=>{const S=E(),u=b.useRef(null),j=N(u,k);b.useEffect(()=>{u.current&&(u.current.indeterminate=a)},[a]);const C=i(F=>{o||r==null||r(F)},"handleChange"),R=i(()=>a?"remove":t?"check":null,"getIconCode"),p=!!(l||d),x=$||(p?e:void 0),g=R(),w=n==="small"?"medium":"large";return s.jsxs(B,{$disabled:o,"data-testid":e,htmlFor:x,style:h,children:[s.jsx(K,{"aria-checked":a?"mixed":void 0,"aria-invalid":c,"aria-label":p?void 0:m||"Checkbox",checked:t,disabled:o,id:x,onChange:C,ref:j,type:"checkbox",...y}),s.jsx(I,{$checked:t,$disabled:o,$error:c,$indeterminate:a,$size:n,"data-testid":"checkbox-box",children:g?s.jsx(z,{code:g,color:S.palette.content.contrast,size:w}):null}),p?s.jsx(M,{$disabled:o,$size:n,children:l||d}):null]})});V.displayName="Checkbox";export{V as C};

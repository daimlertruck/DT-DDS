var _=Object.defineProperty;var s=(e,r)=>_(e,"name",{value:r,configurable:!0});import{j as d}from"./jsx-runtime-Cgz2XvFB.js";import{r as f}from"./index-CwbBKW39.js";import{I}from"./Icon-BWIy_dZb.js";import{f as g,j as h,d as P}from"./emotion-styled.browser.esm-CIRWz9XU.js";const b={small:20,large:24},W=1,A={small:16,large:20},G=s(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),N=g("label",{shouldForwardProp:s(e=>h(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  display: inline-flex;
  align-items: center;
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  position: relative;
`,T=g.input`
  appearance: none;
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`,M=g("div",{shouldForwardProp:s(e=>h(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  pointer-events: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.shape.checkbox};

  ${({theme:e,$checked:r,$indeterminate:t,$disabled:o,$error:n,$size:l})=>{const i=G(e),c=r||t,a=o?i.disabled[c?"active":"inactive"]:i.default[c?"active":"inactive"][n?"error":"normal"];return`
      height: ${b[l]}px;
      min-height: ${b[l]}px;
      width: ${b[l]}px;
      min-width: ${b[l]}px;

      background-color: ${a.bg};
      border: 1px solid ${a.border};

      ${!o&&"hover"in a?`
            label:hover & {
              background-color: ${a.hover};
            }
          `:""}
    `}}

  input:focus-visible + & {
    outline: 2px solid ${({theme:e})=>e.palette.primary.default};
    outline-offset: 2px;
  }
`,U=g("div",{shouldForwardProp:s(e=>h(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  user-select: none;
  display: flex;
  align-items: center;

  ${({theme:e,$disabled:r,$size:t})=>`
    padding-left: ${e.spacing.spacing_30};
    ${t==="small"?e.fontStyles.bodyMdRegular:e.fontStyles.bodyLgRegular};
    color: ${r?e.palette.content.light:e.palette.content.default};
  `}
`;function V(...e){return r=>{for(const t of e)t&&(typeof t=="function"?t(r):t&&(t.current=r))}}s(V,"mergeRefs");const Z=f.forwardRef(({dataTestId:e="checkbox",onChange:r,isChecked:t=!1,isDisabled:o=!1,isIndeterminate:n=!1,hasError:l=!1,size:i="large",label:c,children:a,style:y,id:k,"aria-label":R,...E},L)=>{const S=P(),v=f.useRef(null),j=V(v,L),u=f.useRef(null);f.useEffect(()=>{v.current&&(v.current.indeterminate=n)},[n]),f.useLayoutEffect(()=>{if(!u.current)return;const p=u.current.closest("label");if(!p)return;const F=u.current,H=A[i]+W,B=F.offsetHeight>H;p.style.alignItems=B?"flex-start":"center"},[c,a]);const C=s(p=>{o||r==null||r(p)},"handleChange"),x=!!(c||a),m=k||(x?e:void 0),$=n?"remove":t?"check":null,w=i==="small"?"medium":"large";return d.jsxs(N,{$disabled:o,"data-testid":e,htmlFor:m,style:y,children:[d.jsx(T,{"aria-checked":n?"mixed":void 0,"aria-invalid":l,"aria-label":x?void 0:R||"Checkbox",checked:t,disabled:o,id:m,onChange:C,ref:j,type:"checkbox",...E}),d.jsx(M,{$checked:t,$disabled:o,$error:l,$indeterminate:n,$size:i,children:$?d.jsx(I,{code:$,color:S.palette.content.contrast,size:w}):null}),x?d.jsx(U,{$disabled:o,$size:i,ref:u,children:c||a}):null]})});Z.displayName="Checkbox";export{Z as C};

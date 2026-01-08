var I=Object.defineProperty;var i=(e,r)=>I(e,"name",{value:r,configurable:!0});import{j as d}from"./jsx-runtime-Cgz2XvFB.js";import{r as f}from"./index-CwbBKW39.js";import{I as _}from"./Icon-BWIy_dZb.js";import{f as b,j as v,d as A}from"./emotion-styled.browser.esm-CIRWz9XU.js";const P={small:20,large:24},W=1,z={small:16,large:20},G=i(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),K=i((e,r,t,o,n)=>{const s=G(e),l=r||t?"active":"inactive";if(o)return s.disabled[l];const c=n?"error":"normal";return s.default[l][c]},"getCheckboxState"),N=b("label",{shouldForwardProp:i(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  display: inline-flex;
  align-items: center;
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  position: relative;
`,T=b.input`
  appearance: none;
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`,M=b("div",{shouldForwardProp:i(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  pointer-events: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.shape.checkbox};

  ${({theme:e,$checked:r,$indeterminate:t,$disabled:o,$error:n,$size:s})=>{const a=K(e,r,t,o,n),l=P[s];return`
      height: ${l}px;
      width: ${l}px;

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
`,U=b("div",{shouldForwardProp:i(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  user-select: none;
  display: flex;
  align-items: center;

  ${({theme:e,$disabled:r,$size:t})=>`
    padding-left: ${e.spacing.spacing_30};
    ${t==="small"?e.fontStyles.bodyMdRegular:e.fontStyles.bodyLgRegular};
    color: ${r?e.palette.content.light:e.palette.content.default};
  `}
`;function V(...e){return r=>{for(const t of e)t&&(typeof t=="function"?t(r):t&&(t.current=r))}}i(V,"mergeRefs");const Z=f.forwardRef(({dataTestId:e="checkbox",onChange:r,isChecked:t=!1,isDisabled:o=!1,isIndeterminate:n=!1,hasError:s=!1,size:a="large",label:l,children:c,style:$,id:y,"aria-label":k,...S},R)=>{const C=A(),g=f.useRef(null),E=V(g,R),u=f.useRef(null);f.useEffect(()=>{g.current&&(g.current.indeterminate=n)},[n]),f.useLayoutEffect(()=>{if(!u.current)return;const p=u.current.closest("label");if(!p)return;const F=u.current,H=z[a]+W,B=F.offsetHeight>H;p.style.alignItems=B?"flex-start":"center"},[l,c]);const L=i(p=>{o||r==null||r(p)},"handleChange"),j=i(()=>n?"remove":t?"check":null,"getIconCode"),x=!!(l||c),h=y||(x?e:void 0),m=j(),w=a==="small"?"medium":"large";return d.jsxs(N,{$disabled:o,"data-testid":e,htmlFor:h,style:$,children:[d.jsx(T,{"aria-checked":n?"mixed":void 0,"aria-invalid":s,"aria-label":x?void 0:k||"Checkbox",checked:t,disabled:o,id:h,onChange:L,ref:E,type:"checkbox",...S}),d.jsx(M,{$checked:t,$disabled:o,$error:s,$indeterminate:n,$size:a,"data-testid":"checkbox-box",children:m?d.jsx(_,{code:m,color:C.palette.content.contrast,size:w}):null}),x?d.jsx(U,{$disabled:o,$size:a,ref:u,children:l||c}):null]})});Z.displayName="Checkbox";export{Z as C};

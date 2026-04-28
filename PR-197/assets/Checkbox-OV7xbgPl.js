var I=Object.defineProperty;var i=(e,r)=>I(e,"name",{value:r,configurable:!0});import{j as d}from"./jsx-runtime-Cgz2XvFB.js";import{r as f}from"./index-CwbBKW39.js";import{I as _}from"./Icon-9dVURh2l.js";import{f as b,j as v,d as A}from"./emotion-styled.browser.esm-CIRWz9XU.js";const P={small:20,large:24},W=1,G={small:16,large:20},K=i(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),N=i((e,r,t,n,a)=>{const s=K(e),l=r||t?"active":"inactive";if(n)return s.disabled[l];const c=a?"error":"normal";return s.default[l][c]},"getCheckboxState"),T=b("label",{shouldForwardProp:i(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  display: inline-flex;
  align-items: center;
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  position: relative;
`,z=b.input`
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
  flex-shrink: 0;

  ${({theme:e,$checked:r,$indeterminate:t,$disabled:n,$error:a,$size:s})=>{const o=N(e,r,t,n,a),l=P[s];return`
      height: ${l}px;
      width: ${l}px;

      background-color: ${o.bg};
      border: 1px solid ${o.border};

      ${!n&&"hover"in o?`
            label:hover & {
              background-color: ${o.hover};
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
`;function V(...e){return r=>{for(const t of e)t&&(typeof t=="function"?t(r):t&&(t.current=r))}}i(V,"mergeRefs");const Z=f.forwardRef(({dataTestId:e="checkbox",onChange:r,isChecked:t=!1,isDisabled:n=!1,isIndeterminate:a=!1,hasError:s=!1,size:o="large",label:l,children:c,style:$,id:y,"aria-label":k,...S},R)=>{const C=A(),g=f.useRef(null),E=V(g,R),u=f.useRef(null);f.useEffect(()=>{g.current&&(g.current.indeterminate=a)},[a]),f.useLayoutEffect(()=>{if(!u.current)return;const p=u.current.closest("label");if(!p)return;const F=u.current,H=G[o]+W,B=F.offsetHeight>H;p.style.alignItems=B?"flex-start":"center"},[l,c,o]);const L=i(p=>{n||r==null||r(p)},"handleChange"),j=i(()=>a?"remove":t?"check":null,"getIconCode"),x=!!(l||c),h=y||(x?e:void 0),m=j(),w=o==="small"?"medium":"large";return d.jsxs(T,{$disabled:n,"data-testid":e,htmlFor:h,style:$,children:[d.jsx(z,{"aria-checked":a?"mixed":void 0,"aria-invalid":s,"aria-label":x?void 0:k||"Checkbox",checked:t,disabled:n,id:h,onChange:L,ref:E,type:"checkbox",...S}),d.jsx(M,{$checked:t,$disabled:n,$error:s,$indeterminate:a,$size:o,"data-testid":"checkbox-box",children:m?d.jsx(_,{code:m,color:C.palette.content.contrast,size:w}):null}),x?d.jsx(U,{$disabled:n,$size:o,ref:u,children:l||c}):null]})});Z.displayName="Checkbox";export{Z as C};

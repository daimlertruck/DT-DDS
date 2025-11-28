var b=Object.defineProperty;var o=(e,t)=>b(e,"name",{value:t,configurable:!0});import{j as n}from"./jsx-runtime-Cgz2XvFB.js";import{r as l}from"./index-CwbBKW39.js";import{T as m}from"./Tooltip-1U51AXOb.js";import{f as c,d as w}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./typography-B3nKKPHm.js";import"./index-Dk4wIVQH.js";import"./index-DV-VXEUn.js";import{u as v}from"./useMedia-CRgJMRRc.js";import{u as y}from"./useDebounceResize-BJcA-PrN.js";const R=o(e=>n.jsx("svg",{fill:"none",height:"12",viewBox:"0 0 8 12",width:"8",xmlns:"http://www.w3.org/2000/svg",...e,children:n.jsx("path",{clipRule:"evenodd",d:"M6.99468 4.99507C7.18215 5.1826 7.28747 5.4369 7.28747 5.70207C7.28747 5.96723 7.18215 6.22154 6.99468 6.40907L2.40168 11.0021C2.21539 11.1846 1.96458 11.2863 1.70375 11.285C1.44292 11.2837 1.19315 11.1795 1.00871 10.995C0.824278 10.8106 0.72008 10.5608 0.718763 10.3C0.717445 10.0392 0.819115 9.78836 1.00168 9.60207L4.90168 5.70207L1.00168 1.80207C0.819115 1.61578 0.717445 1.36497 0.718763 1.10414C0.72008 0.843312 0.824278 0.593541 1.00871 0.409105C1.19315 0.224668 1.44292 0.120471 1.70375 0.119153C1.96458 0.117836 2.21539 0.219506 2.40168 0.402069L6.99468 4.99507Z",fill:"currentColor",fillRule:"evenodd"})}),"ArrowRight"),j=o(e=>n.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...e,children:n.jsx("path",{d:"M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"})}),"MoreHorizontal"),$=c.nav`
  ${({theme:e})=>`
    ${e.fontStyles.bodyMdRegular}
    color: ${e.palette.secondary.default};
    overflow: hidden;
  `}
`,B=c.ul`
  padding: 0px;
  margin: 0px;
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: ${({theme:e})=>e.spacing.spacing_30};
`,L=c.li`
  ${({theme:e})=>`
    display: flex;

    &:not(:last-child) {
      ${e.fontStyles.linkMdRegular}
      color: ${e.palette.accent.default};
      cursor: pointer;

      svg {
        color: ${e.palette.accent.default};
      }
      
      & * {
        text-decoration: underline;
      }
      
      &:hover {
        color: ${e.palette.accent.dark};

        svg {
          color: ${e.palette.accent.dark};
        }
      }
    }

    a {
      color: inherit;
    }

    svg {
      color: ${e.palette.secondary.default};
    }

    &:last-child * {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `}
`,T=c.div`
  ${({theme:e})=>`
    display: flex;
    align-items: center;
    gap: ${e.spacing.spacing_20};
  `}
`,M=o((e,t)=>!!e.current&&!!t.current,"isBreadcrumbRefValid"),S=o(e=>{const t=l.useRef(null),r=l.useRef(null),s=w(),i=v(`(min-width: ${s.breakpoints.mq3}px)`),[d,p]=l.useState(e),g=l.useCallback(()=>{if(i||!M(t,r)){p(e);return}const u=l.Children.toArray(e);if(r.current.scrollWidth>t.current.clientWidth){const a=u[u.length-1],x=[u[0],n.jsx(h.Item,{children:n.jsx(j,{})},"more-icon"),l.isValidElement(a)?l.cloneElement(a,{...a.props,style:{overflow:"hidden"}}):a];p(x)}},[e,i,t,r]);return y(g),{visibleChildren:d,breadcrumbRef:t,breadcrumbListRef:r}},"useCollapsedBreadcrumb"),C=30,h=o(({children:e,separator:t="slash"})=>{const{visibleChildren:r,breadcrumbRef:s,breadcrumbListRef:i}=S(e);return n.jsx($,{"aria-label":"Breadcrumb","data-testid":"breadcrumb",ref:s,children:n.jsx(B,{ref:i,children:k(r,t)})})},"Breadcrumb"),E=o(({children:e,style:t})=>{const{truncatedChildren:r,tooltip:s}=f(e);return n.jsx(L,{style:t,children:n.jsxs(m,{style:{overflow:"hidden"},children:[n.jsx(T,{children:r}),n.jsx(m.Content,{children:s})]})})},"BreadcrumbItem"),I=o(e=>e.length>=C?`${e.substring(0,C)}...`:e,"truncateText"),f=o(e=>{let t="";return{truncatedChildren:l.Children.map(e,r=>{if(typeof r=="string"){const s=I(r);return t=s!==r?r:"",s}else if(l.isValidElement(r)){const{truncatedChildren:s,tooltip:i}=f(r.props.children);return t=i,l.cloneElement(r,{...r.props,children:s})}else return null}),tooltip:t}},"mapTruncateChildren"),k=o((e,t)=>{const r=o(()=>({slash:n.jsx("span",{children:"/"}),arrow:n.jsx(R,{})})[t],"addSeparator"),s=o(i=>l.Children.count(e)-1===i,"isLastBreadcrumb");return l.Children.map(e,(i,d)=>n.jsxs(n.Fragment,{children:[i,!s(d)&&r()]}))},"withSeparator");h.Item=E;export{h as B};

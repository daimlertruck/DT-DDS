import{j as n}from"./jsx-runtime-DMAvRu52.js";import{T as p}from"./Tooltip-OievAhLb.js";import{r as o}from"./index-Dl6G-zuu.js";import{n as a,d as b}from"./emotion-styled.browser.esm-Dv69Fly8.js";import"./index-CL4Xg4Pf.js";import"./index-BSh7GFw5.js";import"./index-DCrStp1_.js";import{u as g}from"./useMedia-D3XZz7EL.js";import{u as w}from"./useDebounceResize-Dz-u_MwM.js";const v=e=>n.jsx("svg",{fill:"none",height:"12",viewBox:"0 0 8 12",width:"8",xmlns:"http://www.w3.org/2000/svg",...e,children:n.jsx("path",{clipRule:"evenodd",d:"M6.99468 4.99507C7.18215 5.1826 7.28747 5.4369 7.28747 5.70207C7.28747 5.96723 7.18215 6.22154 6.99468 6.40907L2.40168 11.0021C2.21539 11.1846 1.96458 11.2863 1.70375 11.285C1.44292 11.2837 1.19315 11.1795 1.00871 10.995C0.824278 10.8106 0.72008 10.5608 0.718763 10.3C0.717445 10.0392 0.819115 9.78836 1.00168 9.60207L4.90168 5.70207L1.00168 1.80207C0.819115 1.61578 0.717445 1.36497 0.718763 1.10414C0.72008 0.843312 0.824278 0.593541 1.00871 0.409105C1.19315 0.224668 1.44292 0.120471 1.70375 0.119153C1.96458 0.117836 2.21539 0.219506 2.40168 0.402069L6.99468 4.99507Z",fill:"currentColor",fillRule:"evenodd"})}),y=e=>n.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...e,children:n.jsx("path",{d:"M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"})}),j=a.nav`
  ${({theme:e})=>`
    ${e.fontStyles.body2}
    color: ${e.palette.secondary.default};
    overflow: hidden;
  `}
`,R=a.ul`
  padding: 0px;
  margin: 0px;
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: ${({theme:e})=>e.spacing["4xs"]};
`,$=a.li`
  ${({theme:e})=>`
    display: flex;

    &:not(:last-child) {
      ${e.fontStyles.link2}
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
`,B=a.div`
  ${({theme:e})=>`
    display: flex;
    align-items: center;
    gap: ${e.spacing["5xs"]};
  `}
`,L=(e,t)=>!!e.current&&!!t.current,T=e=>{const t=o.useRef(null),r=o.useRef(null),s=b(),l=g(`(min-width: ${s.breakpoints.m}px)`),[c,u]=o.useState(e),f=o.useCallback(()=>{if(l||!L(t,r)){u(e);return}const d=o.Children.toArray(e);if(r.current.scrollWidth>t.current.clientWidth){const i=d[d.length-1],x=[d[0],n.jsx(C.Item,{children:n.jsx(y,{})},"more-icon"),o.isValidElement(i)?o.cloneElement(i,{...i.props,style:{overflow:"hidden"}}):i];u(x)}},[e,l,t,r]);return w(f),{visibleChildren:c,breadcrumbRef:t,breadcrumbListRef:r}},m=30,C=({children:e,separator:t="slash"})=>{const{visibleChildren:r,breadcrumbRef:s,breadcrumbListRef:l}=T(e);return n.jsx(j,{"aria-label":"Breadcrumb","data-testid":"breadcrumb",ref:s,children:n.jsx(R,{ref:l,children:M(r,t)})})},S=({children:e,style:t})=>{const{truncatedChildren:r,tooltip:s}=h(e);return n.jsx($,{style:t,children:n.jsxs(p,{style:{overflow:"hidden"},children:[n.jsx(B,{children:r}),n.jsx(p.Content,{children:s})]})})},E=e=>e.length>=m?`${e.substring(0,m)}...`:e,h=e=>{let t="";return{truncatedChildren:o.Children.map(e,r=>{if(typeof r=="string"){const s=E(r);return t=s!==r?r:"",s}else if(o.isValidElement(r)){const{truncatedChildren:s,tooltip:l}=h(r.props.children);return t=l,o.cloneElement(r,{...r.props,children:s})}else return null}),tooltip:t}},M=(e,t)=>{const r=()=>({slash:n.jsx("span",{children:"/"}),arrow:n.jsx(v,{})})[t],s=l=>o.Children.count(e)-1===l;return o.Children.map(e,(l,c)=>n.jsxs(n.Fragment,{children:[l,!s(c)&&r()]}))};C.Item=S;export{C as B};

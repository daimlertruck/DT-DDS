import{j as M}from"./jsx-runtime-CB_V9I5Y.js";import"./index-D9dZuxfj.js";import"./index-Bdaw4huQ.js";import{D as L,P as m}from"./z-index-DWgeqfVW.js";import{r as g}from"./index-CTjT7uj6.js";import{u as z}from"./useClickOutside-CA5UtDJB.js";import{f as S}from"./emotion-styled.browser.esm-DBghOYGd.js";import"./index-XjDa9cP3.js";const k=S.li`
  ${({theme:t})=>`
    ${t.fontStyles.bodyMdRegular};
    
    color: ${t.palette.content.default};
    padding: ${t.spacing.spacing_40} ${t.spacing.spacing_50};
    list-style: none;
    text-overflow: ellipsis;
    overflow-x: hidden;
    text-wrap: nowrap;

    &:not([aria-disabled="true"]) {
      &[aria-selected="true"], &[aria-selected="true"] span {
        ${t.fontStyles.bodyMdBold};
      }

      &:hover, &[data-highlighted="true"] {
        background: ${t.palette.accent.light};
        cursor: pointer;
      }
    }

    &[aria-disabled="true"] {
      color: ${t.palette.content.light};
      cursor: not-allowed;

      &[aria-selected="true"] {
        background-color: ${t.palette.surface.light};
      }
    }
  `}
`,B=g.forwardRef(({dataTestId:t,children:e,style:a,isDisabled:r,isSelected:i=!1,isHighlighted:o=!1,onClick:d,...l},x)=>{const p=t??"dropdown-option",u=s=>{if(r){s.preventDefault(),s.stopPropagation();return}d==null||d(s)};return M.jsx(k,{...l,"aria-disabled":r,"aria-selected":i,"data-highlighted":o,"data-testid":p,onClick:u,ref:x,style:a,children:e})}),I=S.div`
  list-style-type: none;
  width: 100%;
  max-height: 360px;
  overflow: auto;

  ${({theme:t})=>`
    padding: ${t.spacing.spacing_50} ${t.spacing.spacing_0};
    background-color: ${t.palette.surface.contrast};
    border-radius: ${t.shape.dropdown};
    border: 1px solid ${t.palette.border.medium};
  `}
`;function N({placement:t,anchor:e,menuWidth:a,menuHeight:r,offsetX:i,offsetY:o}){switch(t){case"bottom":return{top:e.bottom+o,left:e.left+i};case"top":return{top:e.top-o-r,left:e.left+i};case"right":return{top:e.top+o,left:e.right+i};case"left":return{top:e.top+o,left:e.left-i-a}}}function R(t,e,{offsetX:a=0,offsetY:r=4,matchWidth:i=!0,minViewportPadding:o=8,placement:d="bottom",menuRef:l}={}){const[x,p]=g.useState({visibility:"hidden",position:"fixed"});return g.useLayoutEffect(()=>{if(!e||!(t!=null&&t.current)){p({visibility:"hidden",position:"fixed"});return}const u=t==null?void 0:t.current,s=l==null?void 0:l.current,n=()=>{const y=window.innerWidth,v=window.innerHeight,b=u.getBoundingClientRect(),w=s==null?void 0:s.getBoundingClientRect(),D=i?b.width:(w==null?void 0:w.width)??b.width,O=(w==null?void 0:w.height)??0;let{top:$,left:h}=N({placement:d,anchor:b,menuWidth:D,menuHeight:O,offsetX:a,offsetY:r});const _=Math.max(o,y-D-o),j=Math.max(o,v-O-o);h=Math.max(o,Math.min(h,_)),$=Math.max(o,Math.min($,j)),p({position:"fixed",top:$,left:h,width:i?b.width:void 0,maxWidth:i?b.width:300,boxSizing:"border-box",zIndex:L})};n();const c=new ResizeObserver(n);c.observe(u),u&&c.observe(u);const f={passive:!0};return window.addEventListener("scroll",n,f),window.addEventListener("resize",n,f),()=>{c.disconnect(),window.removeEventListener("scroll",n,f),window.removeEventListener("resize",n,f)}},[l,t,e,d,a,r,i,o]),{style:x}}const H=(t,e)=>{if(t){if(typeof t=="function"){t(e);return}t.current=e}},G=Object.assign(g.forwardRef(({children:t,style:e,dataTestId:a="dropdown",isOpen:r=!1,anchorRef:i,matchWidth:o=!0,offsetX:d,offsetY:l,as:x="div",onClose:p,placement:u,...s},n)=>{const c=g.useRef(null),f=g.useCallback(v=>{c.current=v,H(n,v)},[n]),{style:y}=R(i,r,{matchWidth:o,offsetX:d,offsetY:l,placement:u,menuRef:c});return z({refs:[c,i],handler:()=>p==null?void 0:p()}),M.jsx(m,{isOpen:!0,children:M.jsx(I,{as:x,"data-testid":a,ref:f,role:"menu",style:{...y,...e},...s,"aria-hidden":!r,children:t})})}),{Option:B});export{G as D};

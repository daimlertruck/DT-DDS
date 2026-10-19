var ee=Object.defineProperty;var a=(e,t)=>ee(e,"name",{value:t,configurable:!0});import{n as i,o as te}from"./rolldown-runtime-CzYk_CEw.js";import{t as M}from"./react-HNhQAnN4.js";import{n as I,t as L}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{t as _}from"./jsx-runtime-Br4tQxt1.js";import{t as O,u as ae}from"./core-J-hnd1xI.js";var j;function R(){return(R=i((()=>{L(),j=I.div`
  position: relative;
  display: inline-flex;
  width: fit-content;
`})))()}a(R,"init_TooltipContainerStyled");var f,v,T,b,y,x;function E(){return(E=i((()=>{f=M(),v=_(),T={containerRectProperties:{top:-1,left:-1,height:-1,width:-1},isVisible:!1,setContainerRectProperties:a(()=>null,"setContainerRectProperties"),setIsVisible:a(()=>null,"setIsVisible")},b=(0,f.createContext)(T),y=a(({children:e})=>{const[t,n]=(0,f.useState)(T.containerRectProperties),[r,p]=(0,f.useState)(T.isVisible);return(0,v.jsx)(b.Provider,{value:{containerRectProperties:t,setContainerRectProperties:n,isVisible:r,setIsVisible:p},children:e})},"TooltipContextProvider"),x=a(()=>{const e=(0,f.useContext)(b);if(!e)throw new Error("Tooltip compound components cannot be rendered outside the Tooltip component");return e},"useTooltipContext");try{y.displayName="TooltipContextProvider",y.__docgenInfo={description:"",displayName:"TooltipContextProvider",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/tooltip/src/context/TooltipProvider.tsx",methods:[],props:{},tags:{}}}catch{}})))()}a(E,"init_TooltipProvider");function D(){return(D=i((()=>{E()})))()}a(D,"init_context");var V,h;function F(){return(F=i((()=>{R(),D(),V=_(),h=a(({children:e,style:t,dataTestId:n,hideDelay:r=0})=>{const{setIsVisible:p,setContainerRectProperties:m}=x();let o;const s=a(c=>{clearTimeout(o);const{top:G,left:K,height:Q,width:Z}=c.currentTarget.getBoundingClientRect();m({top:G,left:K,height:Q,width:Z}),p(!0)},"showTooltip"),l=a(()=>{o=setTimeout(()=>{p(!1)},r)},"hideTooltip");return(0,V.jsx)(j,{"data-testid":n??"tooltip-container",onMouseEnter:s,onMouseLeave:l,style:t,children:e})},"TooltipContainer");try{h.displayName="TooltipContainer",h.__docgenInfo={description:"",displayName:"TooltipContainer",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/tooltip/src/components/container/TooltipContainer.tsx",methods:[],props:{hideDelay:{defaultValue:{value:"0"},declarations:[{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/container/TooltipContainer.tsx",name:"TooltipContainerProps"}],description:"",name:"hideDelay",parent:{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/container/TooltipContainer.tsx",name:"TooltipContainerProps"},required:!1,tags:{},type:{name:"number | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}a(F,"init_TooltipContainer");function A(){return(A=i((()=>{F()})))()}a(A,"init_container");var d;function S(){return(S=i((()=>{d={Top:"top",Bottom:"bottom",Right:"right",Left:"left"}})))()}a(S,"init_TooltipDirection");var N;function B(){return(B=i((()=>{N={Full:"full",Opacity:"opacity"}})))()}a(B,"init_TooltipBackground");var H;function U(){return(U=i((()=>{L(),O(),S(),B(),H=I.div`
  ${({theme:e,direction:t,top:n,left:r,background:p})=>`
    ${e.fontStyles.bodySmRegular};
    width: max-content;
    max-width: calc(200px + 2 * ${e.spacing.spacing_30});
    overflow-wrap: break-word;
    padding: ${e.spacing.spacing_30};
    background-color: ${e.palette.secondary.dark};
    box-shadow: ${e.shadows.elevation_200};
    color: ${e.palette.content.contrast};
    border-radius: ${e.shape.tooltip};
    text-align: left;
    white-space: initial;
    position: absolute;
    z-index: 13; 
    top: ${n}px;
    left: ${r}px;
    
    &:after {
      content: "";
      position: absolute;
      border: 0px solid transparent;
    }
    ${p===N.Opacity&&"opacity: 80%"};
    ${t===d.Bottom&&`
      transform: translateX(-50%);
        &:after {
          bottom: 100%;
          left: 50%;
          margin-left: -7px;
          border-width: 0px 7px 8px 7px;
          border-bottom-color: ${e.palette.secondary.dark};
        }
      `};
    ${t===d.Top&&`
        transform: translate(-50%, -100%);
        &:after {
          top: 100%;
          left: 50%;
          margin-left: -7px;
          border-width: 8px 7px 0px 7px;
          border-top-color: ${e.palette.secondary.dark};
        }
      `};
    ${t===d.Right&&`
        transform: translateY(-50%);
        &:after {
          top: 50%;
          right: 100%;
          margin-top: -7px;
          border-width: 7px 8px 7px 0px;
          border-right-color: ${e.palette.secondary.dark};
        }
      `};
    ${t===d.Left&&`
        transform: translate(-100%, -50%);
        
        &:after {
          top: 50%;
          left: 100%;
          margin-top: -7px;
          border-width: 7px 0px 7px 8px;
          border-left-color: ${e.palette.secondary.dark};
        }
      `}
  `}
`})))()}a(U,"init_TooltipContentStyled");var g,$,W;function X(){return(X=i((()=>{S(),D(),g=12,$={top:-1,left:-1},W=a((e,t)=>{const{containerRectProperties:{top:n,left:r,height:p,width:m}}=x();if(typeof window>"u")return $;const o=window.scrollX,s=window.scrollY;return{[d.Top]:(()=>{const l=n-g+s,c=r+m/2+o;return{top:Math.max(l,s+t.height),left:Math.min(o+window.innerWidth-t.width/2,Math.max(o+t.width/2,c))}})(),[d.Bottom]:(()=>{const l=n+p+g+s,c=r+m/2+o;return{top:Math.min(l,s+window.innerHeight-t.height),left:Math.min(o+window.innerWidth-t.width/2,Math.max(o+t.width/2,c))}})(),[d.Left]:(()=>{const l=n+p/2+s,c=r-g+o;return{top:Math.min(s+window.innerHeight-t.height/2,Math.max(s+t.height/2,l)),left:Math.max(c,o+t.width)}})(),[d.Right]:(()=>{const l=n+p/2+s,c=r+m+g+o;return{top:Math.min(s+window.innerHeight-t.height/2,Math.max(s+t.height/2,l)),left:Math.min(c,o+window.innerWidth-t.width)}})()}[e]},"useTooltipPosition")})))()}a(X,"init_useTooltipPosition");var k,C,q,P;function Y(){return(Y=i((()=>{k=te(M()),O(),U(),B(),S(),D(),X(),C=_(),q=a(()=>typeof DOMRect<"u"?new DOMRect(0,0,0,0):{x:0,y:0,width:0,height:0,top:0,left:0,right:0,bottom:0,toJSON(){return{x:0,y:0,width:0,height:0,top:0,left:0,right:0,bottom:0}}},"createSafeDOMRect"),P=a(({children:e,direction:t=d.Top,background:n=N.Full,style:r,dataTestId:p})=>{const{isVisible:m}=x(),o=(0,k.useRef)(null),[s,l]=(0,k.useState)(q());(0,k.useLayoutEffect)(()=>{o.current&&l(o.current.getBoundingClientRect())},[m,e]);const c=W(t,s);return e?(0,C.jsx)(ae,{isOpen:m,children:(0,C.jsx)(H,{background:n,"data-testid":p??"tooltip-content",direction:t,left:c.left,ref:o,role:"tooltip",style:r,top:c.top,children:e})}):null},"TooltipContent");try{P.displayName="TooltipContent",P.__docgenInfo={description:"",displayName:"TooltipContent",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",methods:[],props:{direction:{defaultValue:{value:"top"},declarations:[{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"}],description:"",name:"direction",parent:{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"},required:!1,tags:{},type:{name:"TooltipDirection | undefined"}},background:{defaultValue:{value:"full"},declarations:[{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"}],description:"",name:"background",parent:{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"},required:!1,tags:{},type:{name:"TooltipBackground | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}a(Y,"init_TooltipContent");function z(){return(z=i((()=>{Y()})))()}a(z,"init_content");function J(){return(J=i((()=>{A(),z()})))()}a(J,"init_components");var w,u;function oe(){return(oe=i((()=>{J(),D(),w=_(),u=a(({children:e,style:t,dataTestId:n,hideDelay:r})=>(0,w.jsx)(y,{children:(0,w.jsx)(h,{dataTestId:n,hideDelay:r,style:t,children:e})}),"Tooltip"),u.Content=P;try{u.displayName="Tooltip",u.__docgenInfo={description:"",displayName:"Tooltip",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/tooltip/src/Tooltip.tsx",methods:[],props:{hideDelay:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/container/TooltipContainer.tsx",name:"TooltipContainerProps"}],description:"",name:"hideDelay",parent:{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/container/TooltipContainer.tsx",name:"TooltipContainerProps"},required:!1,tags:{},type:{name:"number | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}try{u.Content.displayName="Tooltip.Content",u.Content.__docgenInfo={description:"",displayName:"Tooltip.Content",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/tooltip/src/Tooltip.tsx",methods:[],props:{direction:{defaultValue:{value:"top"},declarations:[{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"}],description:"",name:"direction",parent:{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"},required:!1,tags:{},type:{name:"TooltipDirection | undefined"}},background:{defaultValue:{value:"full"},declarations:[{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"}],description:"",name:"background",parent:{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"},required:!1,tags:{},type:{name:"TooltipBackground | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}a(oe,"init_Tooltip");export{d as a,y as c,B as i,E as l,oe as n,S as o,N as r,D as s,u as t};

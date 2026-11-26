var ne=Object.defineProperty;var a=(e,t)=>ne(e,"name",{value:t,configurable:!0});import{n as p,o as re}from"./rolldown-runtime-CzYk_CEw.js";import{t as v}from"./react-HNhQAnN4.js";import{n as O,t as j}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{t as x}from"./jsx-runtime-Br4tQxt1.js";import{t as R,u as se}from"./core-C2xruMFN.js";var E;function F(){return(F=p((()=>{j(),E=O.div`
  position: relative;
  display: inline-flex;
  width: fit-content;
`})))()}a(F,"init_TooltipContainerStyled");var g,q,k,C,h,S;function A(){return(A=p((()=>{g=v(),q=x(),k={containerRectProperties:{top:-1,left:-1,height:-1,width:-1},isVisible:!1,setContainerRectProperties:a(()=>null,"setContainerRectProperties"),setIsVisible:a(()=>null,"setIsVisible")},C=(0,g.createContext)(k),h=a(({children:e})=>{const[t,r]=(0,g.useState)(k.containerRectProperties),[s,i]=(0,g.useState)(k.isVisible);return(0,q.jsx)(C.Provider,{value:{containerRectProperties:t,setContainerRectProperties:r,isVisible:s,setIsVisible:i},children:e})},"TooltipContextProvider"),S=a(()=>{const e=(0,g.useContext)(C);if(!e)throw new Error("Tooltip compound components cannot be rendered outside the Tooltip component");return e},"useTooltipContext");try{h.displayName="TooltipContextProvider",h.__docgenInfo={description:"",displayName:"TooltipContextProvider",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/tooltip/src/context/TooltipProvider.tsx",methods:[],props:{},tags:{}}}catch{}})))()}a(A,"init_TooltipProvider");function T(){return(T=p((()=>{A()})))()}a(T,"init_context");var w,M,P;function H(){return(H=p((()=>{w=v(),F(),T(),M=x(),P=a(({children:e,style:t,dataTestId:r,hideDelay:s=0})=>{const{setIsVisible:i,setContainerRectProperties:m}=S(),o=(0,w.useRef)(void 0);(0,w.useEffect)(()=>()=>clearTimeout(o.current),[]);const n=a(u=>{clearTimeout(o.current);const{top:ee,left:te,height:ae,width:oe}=u.currentTarget.getBoundingClientRect();m({top:ee,left:te,height:ae,width:oe}),i(!0)},"showTooltip"),c=a(()=>{clearTimeout(o.current),o.current=setTimeout(()=>i(!1),s)},"hideTooltip"),l=a(u=>{u.target.matches(":focus-visible")&&n(u)},"handleFocus"),Q=a(u=>{u.currentTarget.contains(u.relatedTarget)||c()},"handleBlur"),Z=a(u=>{u.key==="Escape"&&(clearTimeout(o.current),i(!1))},"handleKeyDown");return(0,M.jsx)(E,{"data-testid":r??"tooltip-container",onMouseEnter:n,onMouseLeave:c,onFocus:l,onBlur:Q,onKeyDown:Z,style:t,children:e})},"TooltipContainer");try{P.displayName="TooltipContainer",P.__docgenInfo={description:"",displayName:"TooltipContainer",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/tooltip/src/components/container/TooltipContainer.tsx",methods:[],props:{hideDelay:{defaultValue:{value:"0"},declarations:[{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/container/TooltipContainer.tsx",name:"TooltipContainerProps"}],description:"",name:"hideDelay",parent:{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/container/TooltipContainer.tsx",name:"TooltipContainerProps"},required:!1,tags:{},type:{name:"number | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}a(H,"init_TooltipContainer");function U(){return(U=p((()=>{H()})))()}a(U,"init_container");var d;function b(){return(b=p((()=>{d={Top:"top",Bottom:"bottom",Right:"right",Left:"left"}})))()}a(b,"init_TooltipDirection");var V;function $(){return($=p((()=>{V={Full:"full",Opacity:"opacity"}})))()}a($,"init_TooltipBackground");var W;function X(){return(X=p((()=>{j(),R(),b(),$(),W=O.div`
  ${({theme:e,direction:t,top:r,left:s,background:i})=>`
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
    top: ${r}px;
    left: ${s}px;
    
    &:after {
      content: "";
      position: absolute;
      border: 0px solid transparent;
    }
    ${i===V.Opacity&&"opacity: 80%"};
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
`})))()}a(X,"init_TooltipContentStyled");var D,I,Y;function K(){return(K=p((()=>{b(),T(),D=12,I={top:-1,left:-1},Y=a((e,t)=>{const{containerRectProperties:{top:r,left:s,height:i,width:m}}=S();if(typeof window>"u")return I;const o=window.scrollX,n=window.scrollY;return{[d.Top]:(()=>{const c=r-D+n,l=s+m/2+o;return{top:Math.max(c,n+t.height),left:Math.min(o+window.innerWidth-t.width/2,Math.max(o+t.width/2,l))}})(),[d.Bottom]:(()=>{const c=r+i+D+n,l=s+m/2+o;return{top:Math.min(c,n+window.innerHeight-t.height),left:Math.min(o+window.innerWidth-t.width/2,Math.max(o+t.width/2,l))}})(),[d.Left]:(()=>{const c=r+i/2+n,l=s-D+o;return{top:Math.min(n+window.innerHeight-t.height/2,Math.max(n+t.height/2,c)),left:Math.max(l,o+t.width)}})(),[d.Right]:(()=>{const c=r+i/2+n,l=s+m+D+o;return{top:Math.min(n+window.innerHeight-t.height/2,Math.max(n+t.height/2,c)),left:Math.min(l,o+window.innerWidth-t.width)}})()}[e]},"useTooltipPosition")})))()}a(K,"init_useTooltipPosition");var y,N,L,_;function z(){return(z=p((()=>{y=re(v()),R(),X(),$(),b(),T(),K(),N=x(),L=a(()=>typeof DOMRect<"u"?new DOMRect(0,0,0,0):{x:0,y:0,width:0,height:0,top:0,left:0,right:0,bottom:0,toJSON(){return{x:0,y:0,width:0,height:0,top:0,left:0,right:0,bottom:0}}},"createSafeDOMRect"),_=a(({children:e,direction:t=d.Top,background:r=V.Full,style:s,dataTestId:i})=>{const{isVisible:m}=S(),o=(0,y.useRef)(null),[n,c]=(0,y.useState)(L());(0,y.useLayoutEffect)(()=>{o.current&&c(o.current.getBoundingClientRect())},[m,e]);const l=Y(t,n);return e?(0,N.jsx)(se,{isOpen:m,children:(0,N.jsx)(W,{background:r,"data-testid":i??"tooltip-content",direction:t,left:l.left,ref:o,role:"tooltip",style:s,top:l.top,children:e})}):null},"TooltipContent");try{_.displayName="TooltipContent",_.__docgenInfo={description:"",displayName:"TooltipContent",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",methods:[],props:{direction:{defaultValue:{value:"top"},declarations:[{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"}],description:"",name:"direction",parent:{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"},required:!1,tags:{},type:{name:"TooltipDirection | undefined"}},background:{defaultValue:{value:"full"},declarations:[{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"}],description:"",name:"background",parent:{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"},required:!1,tags:{},type:{name:"TooltipBackground | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}a(z,"init_TooltipContent");function J(){return(J=p((()=>{z()})))()}a(J,"init_content");function G(){return(G=p((()=>{U(),J()})))()}a(G,"init_components");var B,f;function ie(){return(ie=p((()=>{G(),T(),B=x(),f=a(({children:e,style:t,dataTestId:r,hideDelay:s})=>(0,B.jsx)(h,{children:(0,B.jsx)(P,{dataTestId:r,hideDelay:s,style:t,children:e})}),"Tooltip"),f.Content=_;try{f.displayName="Tooltip",f.__docgenInfo={description:"",displayName:"Tooltip",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/tooltip/src/Tooltip.tsx",methods:[],props:{hideDelay:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/container/TooltipContainer.tsx",name:"TooltipContainerProps"}],description:"",name:"hideDelay",parent:{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/container/TooltipContainer.tsx",name:"TooltipContainerProps"},required:!1,tags:{},type:{name:"number | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}try{f.Content.displayName="Tooltip.Content",f.Content.__docgenInfo={description:"",displayName:"Tooltip.Content",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/tooltip/src/Tooltip.tsx",methods:[],props:{direction:{defaultValue:{value:"top"},declarations:[{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"}],description:"",name:"direction",parent:{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"},required:!1,tags:{},type:{name:"TooltipDirection | undefined"}},background:{defaultValue:{value:"full"},declarations:[{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"}],description:"",name:"background",parent:{fileName:"DT-DDS/packages/react-packages/tooltip/src/components/content/TooltipContent.tsx",name:"TooltipContentProps"},required:!1,tags:{},type:{name:"TooltipBackground | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}a(ie,"init_Tooltip");export{d as a,h as c,$ as i,A as l,ie as n,b as o,V as r,T as s,f as t};

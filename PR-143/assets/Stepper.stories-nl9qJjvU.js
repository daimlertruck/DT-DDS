var it=Object.defineProperty;var s=(i,n)=>it(i,"name",{value:n,configurable:!0});import{j as t}from"./jsx-runtime-Cgz2XvFB.js";import{I as v}from"./Icon-BWIy_dZb.js";import{r as c}from"./index-CwbBKW39.js";import{S as e}from"./Stepper-CLOmDETF.js";import"./Tooltip-BNaC4BLi.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./typography-B3nKKPHm.js";import"./index-BZrxPEz_.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-CqNvQxNp.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";const nt=s(i=>{const{initialStep:n=0,totalSteps:r}=i||{},[a,d]=c.useState(n),[S,p]=c.useState(new Set),m=a===0,A=r!==void 0?a===r-1:!1,l=r!==void 0?a<r-1:!0,u=a>0,U=c.useCallback(()=>{l&&d(o=>o+1)},[l]),X=c.useCallback(()=>{u&&d(o=>o-1)},[u]),Y=c.useCallback(o=>{o>=0&&(r===void 0||o<r)&&d(o)},[r]),Z=c.useCallback(()=>{d(n),p(new Set)},[n]),$=c.useCallback(o=>{p(h=>new Set(h).add(o))},[]),tt=c.useCallback(o=>{p(h=>{const C=new Set(h);return C.delete(o),C})},[]),et=c.useCallback(o=>S.has(o),[S]);return{activeStep:a,isFirstStep:m,isLastStep:A,canGoNext:l,canGoBack:u,completedSteps:S,handleNext:U,handleBack:X,handleChangeStep:Y,handleReset:Z,markStepComplete:$,markStepIncomplete:tt,isStepComplete:et}},"useStepper"),k={Vertical:"vertical",Horizontal:"horizontal"},z={Number:"number",Bullet:"bullet",Icon:"icon"},yt={title:"Data Display/Stepper",component:e,argTypes:{currentStep:{control:{type:"number",min:0},description:"Current active step index (0-based)"},orientation:{options:Object.keys(k),mapping:k,control:{type:"radio"},description:"Stepper orientation"},variant:{options:Object.keys(z),mapping:z,control:{type:"radio"},description:"Stepper variant"},completedSteps:{control:{type:"object"},description:"Array of completed step indices"},steps:{control:{type:"object"},description:"Array of step configurations"}},parameters:{layout:"padded"}},x={args:{currentStep:1,completedSteps:[0],orientation:"vertical",variant:"number",steps:[{title:"Personal Information",description:"Enter your basic"},{title:"Address Details",description:"Provide your address"},{title:"Review & Submit",description:"Check all information"}]},render:s(({currentStep:i,completedSteps:n,orientation:r,variant:a,steps:d})=>t.jsx(e,{activeStep:i,orientation:r,variant:a,children:d.map((S,p)=>{let m="incomplete";return n.includes(p)&&(m="completed"),t.jsx(e.Step,{description:S.description,state:m,title:S.title},p)})}),"render")},y={args:{orientation:"vertical",variant:"number"},render:s(({orientation:i,variant:n})=>t.jsxs(e,{orientation:i,variant:n,children:[t.jsx(e.Step,{description:"This step is done",state:"completed",title:"Completed"}),t.jsx(e.Step,{description:"Currently on this step",isActive:!0,state:"incomplete",title:"Active"}),t.jsx(e.Step,{description:"Not yet started",state:"incomplete",title:"Incomplete"}),t.jsx(e.Step,{description:"Requires attention",state:"warning",title:"Warning"}),t.jsx(e.Step,{description:"Something went wrong",state:"error",title:"Error"}),t.jsx(e.Step,{description:"Cannot access yet",state:"disabled",title:"Disabled"}),t.jsx(e.Step,{description:"Bold title with light background",isActive:!0,state:"completed",title:"Completed Active"}),t.jsx(e.Step,{description:"Bold title with warning colors",isActive:!0,state:"warning",title:"Warning Active"}),t.jsx(e.Step,{description:"Bold title with error colors",isActive:!0,state:"error",title:"Error Active"})]}),"render")},g={args:{variant:"bullet",orientation:"horizontal"},render:s(({orientation:i,variant:n})=>t.jsxs(e,{orientation:i,variant:n,children:[t.jsx(e.Step,{state:"completed"}),t.jsx(e.Step,{isActive:!0,state:"incomplete"}),t.jsx(e.Step,{state:"incomplete"}),t.jsx(e.Step,{state:"disabled"}),t.jsx(e.Step,{state:"warning"}),t.jsx(e.Step,{state:"error"})]}),"render")},b={args:{variant:"icon",orientation:"vertical"},render:s(({orientation:i,variant:n})=>t.jsxs(e,{orientation:i,variant:n,children:[t.jsx(e.Step,{description:"Payment processed successfully",icon:t.jsx(v,{code:"credit_card",size:"small"}),state:"completed",title:"Payment"}),t.jsx(e.Step,{description:"Verify your email address",icon:t.jsx(v,{code:"mail",size:"small"}),isActive:!0,state:"incomplete",title:"Verification"}),t.jsx(e.Step,{description:"Complete your profile",icon:t.jsx(v,{code:"edit",size:"small"}),state:"incomplete",title:"Profile Setup"}),t.jsx(e.Step,{description:"Action required on your order",icon:t.jsx(v,{code:"shopping_cart",size:"small"}),state:"warning",title:"Order Review"}),t.jsx(e.Step,{description:"Shipping address validation failed",icon:t.jsx(v,{code:"local_shipping",size:"small"}),state:"error",title:"Shipping"}),t.jsx(e.Step,{description:"Delivery is not available yet",icon:t.jsx(v,{code:"home",size:"small"}),state:"disabled",title:"Delivery"})]}),"render")},f={args:{orientation:"horizontal",variant:"number"},render:s(({orientation:i,variant:n})=>t.jsxs(e,{orientation:i,variant:n,children:[t.jsx(e.Step,{description:"This is a very long description that will be truncated after two lines and show a tooltip when you hover over it",state:"completed",title:"Very Long Step Title That Exceeds Maximum Width"}),t.jsx(e.Step,{description:"Short description",isActive:!0,state:"incomplete",title:"Normal Title"}),t.jsx(e.Step,{description:"Another long description that demonstrates the tooltip functionality when text overflows",state:"incomplete",title:"Another Step With A Really Long Title"})]}),"render")},j={args:{orientation:"vertical",variant:"number"},render:s(({orientation:i,variant:n})=>t.jsxs(e,{orientation:i,variant:n,children:[t.jsx(e.Step,{state:"completed",title:"Step 1"}),t.jsx(e.Step,{isActive:!0,state:"incomplete",title:"Step 2"}),t.jsx(e.Step,{state:"incomplete",title:"Step 3"}),t.jsx(e.Step,{state:"incomplete",title:"Step 4"})]}),"render")},w={render:s(()=>{const{activeStep:i,isFirstStep:n,isLastStep:r,handleNext:a,handleBack:d,markStepComplete:S}=nt({initialStep:0,totalSteps:4}),p=[{title:"Personal Info",description:"Enter your details"},{title:"Contact",description:"Provide contact info"},{title:"Address",description:"Enter your address"},{title:"Review",description:"Review and submit"}],m=s(l=>l===i?"incomplete":l<i?"completed":"incomplete","getStepState"),A=s(()=>{S(i),a()},"handleNextWithComplete");return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[t.jsx(e,{activeStep:i,orientation:"horizontal",variant:"number",children:p.map((l,u)=>t.jsx(e.Step,{description:l.description,state:m(u),title:l.title},u))}),t.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[t.jsx("button",{disabled:n,onClick:d,style:{padding:"8px 16px",cursor:n?"not-allowed":"pointer",opacity:n?.5:1},type:"button",children:"Back"}),t.jsx("button",{disabled:r,onClick:A,style:{padding:"8px 16px",cursor:r?"not-allowed":"pointer",opacity:r?.5:1},type:"button",children:r?"Finish":"Next"})]}),t.jsxs("div",{style:{textAlign:"center",fontSize:"14px",color:"#666"},children:["Step ",i+1," of ",p.length]})]})},"render")};var I,W,B;x.parameters={...x.parameters,docs:{...(I=x.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    currentStep: 1,
    completedSteps: [0],
    orientation: 'vertical',
    variant: 'number',
    steps: [{
      title: 'Personal Information',
      description: 'Enter your basic'
    }, {
      title: 'Address Details',
      description: 'Provide your address'
    }, {
      title: 'Review & Submit',
      description: 'Check all information'
    }]
  },
  render: ({
    currentStep,
    completedSteps,
    orientation,
    variant,
    steps
  }) => <Stepper activeStep={currentStep} orientation={orientation} variant={variant}>
      {steps.map((step, idx) => {
      let state: StepState = 'incomplete';
      if (completedSteps.includes(idx)) state = 'completed';
      return <Stepper.Step description={step.description} key={idx} state={state} title={step.title} />;
    })}
    </Stepper>
}`,...(B=(W=x.parameters)==null?void 0:W.docs)==null?void 0:B.source}}};var D,E,N;y.parameters={...y.parameters,docs:{...(D=y.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical',
    variant: 'number'
  },
  render: ({
    orientation,
    variant
  }) => <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step description='This step is done' state='completed' title='Completed' />
      <Stepper.Step description='Currently on this step' isActive state='incomplete' title='Active' />
      <Stepper.Step description='Not yet started' state='incomplete' title='Incomplete' />
      <Stepper.Step description='Requires attention' state='warning' title='Warning' />
      <Stepper.Step description='Something went wrong' state='error' title='Error' />
      <Stepper.Step description='Cannot access yet' state='disabled' title='Disabled' />
      <Stepper.Step description='Bold title with light background' isActive state='completed' title='Completed Active' />
      <Stepper.Step description='Bold title with warning colors' isActive state='warning' title='Warning Active' />
      <Stepper.Step description='Bold title with error colors' isActive state='error' title='Error Active' />
    </Stepper>
}`,...(N=(E=y.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};var T,P,R;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    variant: 'bullet',
    orientation: 'horizontal'
  },
  render: ({
    orientation,
    variant
  }) => <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step state='completed' />
      <Stepper.Step isActive state='incomplete' />
      <Stepper.Step state='incomplete' />
      <Stepper.Step state='disabled' />
      <Stepper.Step state='warning' />
      <Stepper.Step state='error' />
    </Stepper>
}`,...(R=(P=g.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var V,L,F;b.parameters={...b.parameters,docs:{...(V=b.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    variant: 'icon',
    orientation: 'vertical'
  },
  render: ({
    orientation,
    variant
  }) => <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step description='Payment processed successfully' icon={<Icon code='credit_card' size='small' />} state='completed' title='Payment' />
      <Stepper.Step description='Verify your email address' icon={<Icon code='mail' size='small' />} isActive state='incomplete' title='Verification' />
      <Stepper.Step description='Complete your profile' icon={<Icon code='edit' size='small' />} state='incomplete' title='Profile Setup' />
      <Stepper.Step description='Action required on your order' icon={<Icon code='shopping_cart' size='small' />} state='warning' title='Order Review' />
      <Stepper.Step description='Shipping address validation failed' icon={<Icon code='local_shipping' size='small' />} state='error' title='Shipping' />
      <Stepper.Step description='Delivery is not available yet' icon={<Icon code='home' size='small' />} state='disabled' title='Delivery' />
    </Stepper>
}`,...(F=(L=b.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};var O,_,q;f.parameters={...f.parameters,docs:{...(O=f.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal',
    variant: 'number'
  },
  render: ({
    orientation,
    variant
  }) => <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step description='This is a very long description that will be truncated after two lines and show a tooltip when you hover over it' state='completed' title='Very Long Step Title That Exceeds Maximum Width' />
      <Stepper.Step description='Short description' isActive state='incomplete' title='Normal Title' />
      <Stepper.Step description='Another long description that demonstrates the tooltip functionality when text overflows' state='incomplete' title='Another Step With A Really Long Title' />
    </Stepper>
}`,...(q=(_=f.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var H,G,M;j.parameters={...j.parameters,docs:{...(H=j.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical',
    variant: 'number'
  },
  render: ({
    orientation,
    variant
  }) => <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step state='completed' title='Step 1' />
      <Stepper.Step isActive state='incomplete' title='Step 2' />
      <Stepper.Step state='incomplete' title='Step 3' />
      <Stepper.Step state='incomplete' title='Step 4' />
    </Stepper>
}`,...(M=(G=j.parameters)==null?void 0:G.docs)==null?void 0:M.source}}};var J,K,Q;w.parameters={...w.parameters,docs:{...(J=w.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => {
    const {
      activeStep,
      isFirstStep,
      isLastStep,
      handleNext,
      handleBack,
      markStepComplete
    } = useStepper({
      initialStep: 0,
      totalSteps: 4
    });
    const steps = [{
      title: 'Personal Info',
      description: 'Enter your details'
    }, {
      title: 'Contact',
      description: 'Provide contact info'
    }, {
      title: 'Address',
      description: 'Enter your address'
    }, {
      title: 'Review',
      description: 'Review and submit'
    }];
    const getStepState = (idx: number): StepState => {
      if (idx === activeStep) return 'incomplete';
      if (idx < activeStep) return 'completed';
      return 'incomplete';
    };
    const handleNextWithComplete = () => {
      markStepComplete(activeStep);
      handleNext();
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
        <Stepper activeStep={activeStep} orientation='horizontal' variant='number'>
          {steps.map((step, idx) => <Stepper.Step description={step.description} key={idx} state={getStepState(idx)} title={step.title} />)}
        </Stepper>

        <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center'
      }}>
          <button disabled={isFirstStep} onClick={handleBack} style={{
          padding: '8px 16px',
          cursor: isFirstStep ? 'not-allowed' : 'pointer',
          opacity: isFirstStep ? 0.5 : 1
        }} type='button'>
            Back
          </button>
          <button disabled={isLastStep} onClick={handleNextWithComplete} style={{
          padding: '8px 16px',
          cursor: isLastStep ? 'not-allowed' : 'pointer',
          opacity: isLastStep ? 0.5 : 1
        }} type='button'>
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>

        <div style={{
        textAlign: 'center',
        fontSize: '14px',
        color: '#666'
      }}>
          Step {activeStep + 1} of {steps.length}
        </div>
      </div>;
  }
}`,...(Q=(K=w.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};const gt=["Default","AllStates","BulletVariant","IconVariant","WithLongText","WithoutDescriptions","InteractiveWithHook"];export{y as AllStates,g as BulletVariant,x as Default,b as IconVariant,w as InteractiveWithHook,f as WithLongText,j as WithoutDescriptions,gt as __namedExportsOrder,yt as default};

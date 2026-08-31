var A=Object.defineProperty;var r=(i,n)=>A(i,"name",{value:n,configurable:!0});import{t as s}from"./src-Cgsrikn0.js";import{t as C}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{n as t,t as k}from"./src-Dqvxz6ct.js";var e=C(),j={Vertical:"vertical",Horizontal:"horizontal"},f={Number:"number",Bullet:"bullet",Icon:"icon"},B={title:"Data Display/Stepper",component:t,argTypes:{currentStep:{control:{type:"number",min:0},description:"Current active step index (0-based)"},orientation:{options:Object.keys(j),mapping:j,control:{type:"radio"},description:"Stepper orientation"},variant:{options:Object.keys(f),mapping:f,control:{type:"radio"},description:"Stepper variant"},completedSteps:{control:{type:"object"},description:"Array of completed step indices"},steps:{control:{type:"object"},description:"Array of step configurations"}},parameters:{layout:"padded"}},d={args:{currentStep:1,completedSteps:[0],orientation:"vertical",variant:"number",steps:[{title:"Personal Information",description:"Enter your basic"},{title:"Address Details",description:"Provide your address"},{title:"Review & Submit",description:"Check all information"}]},render:r(({currentStep:i,completedSteps:n,orientation:o,variant:y,steps:g})=>(0,e.jsx)(t,{activeStep:i,orientation:o,variant:y,children:g.map((l,a)=>{let c="incomplete";return n.includes(a)&&(c="completed"),(0,e.jsx)(t.Step,{description:l.description,state:c,title:l.title},a)})}),"render")},S={args:{orientation:"vertical",variant:"number"},render:r(({orientation:i,variant:n})=>(0,e.jsxs)(t,{orientation:i,variant:n,children:[(0,e.jsx)(t.Step,{description:"This step is done",state:"completed",title:"Completed"}),(0,e.jsx)(t.Step,{description:"Currently on this step",isActive:!0,state:"incomplete",title:"Active"}),(0,e.jsx)(t.Step,{description:"Not yet started",state:"incomplete",title:"Incomplete"}),(0,e.jsx)(t.Step,{description:"Requires attention",state:"warning",title:"Warning"}),(0,e.jsx)(t.Step,{description:"Something went wrong",state:"error",title:"Error"}),(0,e.jsx)(t.Step,{description:"Cannot access yet",state:"disabled",title:"Disabled"}),(0,e.jsx)(t.Step,{description:"Bold title with light background",isActive:!0,state:"completed",title:"Completed Active"}),(0,e.jsx)(t.Step,{description:"Bold title with warning colors",isActive:!0,state:"warning",title:"Warning Active"}),(0,e.jsx)(t.Step,{description:"Bold title with error colors",isActive:!0,state:"error",title:"Error Active"})]}),"render")},m={args:{variant:"bullet",orientation:"horizontal"},render:r(({orientation:i,variant:n})=>(0,e.jsxs)(t,{orientation:i,variant:n,children:[(0,e.jsx)(t.Step,{state:"completed"}),(0,e.jsx)(t.Step,{isActive:!0,state:"incomplete"}),(0,e.jsx)(t.Step,{state:"incomplete"}),(0,e.jsx)(t.Step,{state:"disabled"}),(0,e.jsx)(t.Step,{state:"warning"}),(0,e.jsx)(t.Step,{state:"error"})]}),"render")},u={args:{variant:"icon",orientation:"vertical"},render:r(({orientation:i,variant:n})=>(0,e.jsxs)(t,{orientation:i,variant:n,children:[(0,e.jsx)(t.Step,{description:"Payment processed successfully",icon:(0,e.jsx)(s,{code:"credit_card",size:"small"}),state:"completed",title:"Payment"}),(0,e.jsx)(t.Step,{description:"Verify your email address",icon:(0,e.jsx)(s,{code:"mail",size:"small"}),isActive:!0,state:"incomplete",title:"Verification"}),(0,e.jsx)(t.Step,{description:"Complete your profile",icon:(0,e.jsx)(s,{code:"edit",size:"small"}),state:"incomplete",title:"Profile Setup"}),(0,e.jsx)(t.Step,{description:"Action required on your order",icon:(0,e.jsx)(s,{code:"shopping_cart",size:"small"}),state:"warning",title:"Order Review"}),(0,e.jsx)(t.Step,{description:"Shipping address validation failed",icon:(0,e.jsx)(s,{code:"local_shipping",size:"small"}),state:"error",title:"Shipping"}),(0,e.jsx)(t.Step,{description:"Delivery is not available yet",icon:(0,e.jsx)(s,{code:"home",size:"small"}),state:"disabled",title:"Delivery"})]}),"render")},v={args:{orientation:"horizontal",variant:"number"},render:r(({orientation:i,variant:n})=>(0,e.jsxs)(t,{orientation:i,variant:n,children:[(0,e.jsx)(t.Step,{description:"This is a very long description that will be truncated after two lines and show a tooltip when you hover over it",state:"completed",title:"Very Long Step Title That Exceeds Maximum Width"}),(0,e.jsx)(t.Step,{description:"Short description",isActive:!0,state:"incomplete",title:"Normal Title"}),(0,e.jsx)(t.Step,{description:"Another long description that demonstrates the tooltip functionality when text overflows",state:"incomplete",title:"Another Step With A Really Long Title"})]}),"render")},h={args:{orientation:"vertical",variant:"number"},render:r(({orientation:i,variant:n})=>(0,e.jsxs)(t,{orientation:i,variant:n,children:[(0,e.jsx)(t.Step,{state:"completed",title:"Step 1"}),(0,e.jsx)(t.Step,{isActive:!0,state:"incomplete",title:"Step 2"}),(0,e.jsx)(t.Step,{state:"incomplete",title:"Step 3"}),(0,e.jsx)(t.Step,{state:"incomplete",title:"Step 4"})]}),"render")},x={render:r(()=>{const{activeStep:i,isFirstStep:n,isLastStep:o,handleNext:y,handleBack:g,markStepComplete:l}=k({initialStep:0,totalSteps:4}),a=[{title:"Personal Info",description:"Enter your details"},{title:"Contact",description:"Provide contact info"},{title:"Address",description:"Enter your address"},{title:"Review",description:"Review and submit"}],c=r(p=>p===i?"incomplete":p<i?"completed":"incomplete","getStepState"),w=r(()=>{l(i),y()},"handleNextWithComplete");return(0,e.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[(0,e.jsx)(t,{activeStep:i,orientation:"horizontal",variant:"number",children:a.map((p,b)=>(0,e.jsx)(t.Step,{description:p.description,state:c(b),title:p.title},b))}),(0,e.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[(0,e.jsx)("button",{disabled:n,onClick:g,style:{padding:"8px 16px",cursor:n?"not-allowed":"pointer",opacity:n?.5:1},type:"button",children:"Back"}),(0,e.jsx)("button",{disabled:o,onClick:w,style:{padding:"8px 16px",cursor:o?"not-allowed":"pointer",opacity:o?.5:1},type:"button",children:o?"Finish":"Next"})]}),(0,e.jsxs)("div",{style:{textAlign:"center",fontSize:"14px",color:"#666"},children:["Step ",i+1," of ",a.length]})]})},"render")};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
    }); // eslint-disable-line react-hooks/rules-of-hooks

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
}`,...x.parameters?.docs?.source}}};var P=["Default","AllStates","BulletVariant","IconVariant","WithLongText","WithoutDescriptions","InteractiveWithHook"];export{S as AllStates,m as BulletVariant,d as Default,u as IconVariant,x as InteractiveWithHook,v as WithLongText,h as WithoutDescriptions,P as __namedExportsOrder,B as default};

// The implementation should be written in TypeScript.

import * as React from "react";
import { Step } from "../components/task1/Step";

// Challenge 1
// Please implement this useSteps hook to work with step-by-step forms.
// This hook gives us: go to next step, go to the previous step, current step and history of steps.
// API of the useSteps hook

export interface UseStepState<S> {
  step: S;
  stepsHistory: S[];
}
interface UseStepApi<S> {
  step: S;
  setStepsHistory: React.Dispatch<React.SetStateAction<S[]>>;
  goToPrevStep(step?: S): UseStepState<S>;
  goToNextStep(step: S): UseStepState<S>;
  goToInitialStep(): void;
}

function useSteps<S extends string>(
  initialStep: S
): UseStepState<S> & UseStepApi<S> {
  const [step, setStep] = React.useState<S>(initialStep);
  const [stepsHistory, setStepsHistory] = React.useState<S[]>([initialStep]);

  const goToPrevStep = (prevStep: S): UseStepState<S> => {
    if (!prevStep) {
      setStep(initialStep);
      setStepsHistory((prev) => [...prev, initialStep]);
    } else {
      setStep(prevStep);
      setStepsHistory((prev) => [...prev, prevStep]);
    }
    return { step: prevStep, stepsHistory };
  };

  const goToNextStep = (nextStep: S): UseStepState<S> => {
    setStep(nextStep);
    setStepsHistory((prev) => [...prev, nextStep]);
    return { step, stepsHistory };
  };

  const goToInitialStep = () => {
    setStep(initialStep);
  };

  return {
    step,
    goToPrevStep,
    goToNextStep,
    setStepsHistory,
    stepsHistory,
    goToInitialStep,
  };
}

// Example of the usage of this component with useSteps hook
export enum Steps {
  STEP_A = "STEP_A",
  STEP_B = "STEP_B",
  STEP_C = "STEP_C",
  STEP_D = "STEP_D",
  STEP_SUBMITTED = "STEP_SUBMITTED",
}

export interface Form {
  name: string;
  lastname: string;
  phone: string;
  age: string;
}

const MyStepByStepForm: React.FunctionComponent = () => {
  const [form, setForm] = React.useState<Form>({
    name: "",
    lastname: "",
    phone: "",
    age: "",
  });

  const { step, goToNextStep, goToPrevStep, goToInitialStep } = useSteps<Steps>(
    Steps.STEP_A
  );
  const onSubmitStepA = () => goToNextStep(Steps.STEP_B);
  const onSubmitStepB = () => goToNextStep(Steps.STEP_C);
  const onSubmitStepC = () => goToNextStep(Steps.STEP_D);
  const onSubmitForm = () => {
    goToNextStep(Steps.STEP_SUBMITTED);
    console.log("Send form", form);
    setForm({
      name: "",
      lastname: "",
      phone: "",
      age: "",
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  switch (step) {
    case Steps.STEP_B:
      return (
        <Step
          form={form}
          onChange={onChange}
          prevStep={Steps.STEP_A}
          step={step}
          onSubmit={onSubmitStepB}
          onBack={goToPrevStep}
        />
      );
    case Steps.STEP_C:
      return (
        <Step
          form={form}
          onChange={onChange}
          prevStep={Steps.STEP_B}
          step={step}
          onSubmit={onSubmitStepC}
          onBack={goToPrevStep}
        />
      );
    case Steps.STEP_D:
      return (
        <Step
          form={form}
          onChange={onChange}
          prevStep={Steps.STEP_C}
          step={step}
          onSubmit={onSubmitForm}
          onBack={goToPrevStep}
        />
      );

    default:
      return (
        <Step
          form={form}
          onChange={onChange}
          prevStep={undefined}
          step={step}
          onSubmit={onSubmitStepA}
          onBack={goToPrevStep}
          goToInitialStep={goToInitialStep}
        />
      );
  }
};

export default MyStepByStepForm;

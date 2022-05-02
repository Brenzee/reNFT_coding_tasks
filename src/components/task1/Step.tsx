import * as React from "react";
import { Form, Steps, UseStepState } from "../../tasks/TaskA";

// Basic styling
const stepWrapper: React.CSSProperties = {
  margin: "auto",
  width: "400px",
  marginTop: "2rem",
};

const stepButtonsStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
};
// End of basic styling

// This can be made less repetative
const stepContainers = {
  STEP_A: (
    form: Form,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown: React.KeyboardEventHandler
  ) => (
    <div>
      <label className="step_label" htmlFor="name">
        Name
        <input
          name="name"
          onChange={onChange}
          value={form.name}
          onKeyDown={onKeyDown}
        />
      </label>
    </div>
  ),
  STEP_B: (
    form: Form,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown: React.KeyboardEventHandler
  ) => (
    <div>
      <label className="step_label" htmlFor="lastname">
        Last name
        <input
          name="lastname"
          onChange={onChange}
          value={form.lastname}
          onKeyDown={onKeyDown}
        />
      </label>
    </div>
  ),
  STEP_C: (
    form: Form,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown: React.KeyboardEventHandler
  ) => (
    <div>
      <label className="step_label" htmlFor="phone">
        Phone number
        <input
          name="phone"
          onChange={onChange}
          value={form.phone}
          onKeyDown={onKeyDown}
        />
      </label>
    </div>
  ),
  STEP_D: (
    form: Form,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown: React.KeyboardEventHandler
  ) => (
    <div>
      <label className="step_label" htmlFor="age">
        Age
        <input
          name="age"
          onChange={onChange}
          value={form.age}
          onKeyDown={onKeyDown}
        />
      </label>
    </div>
  ),
  STEP_SUBMITTED: () => <div>Your form has been submitted</div>,
};

interface StepProps {
  onSubmit: () => UseStepState<Steps> | void;
  onBack(step?: Steps): UseStepState<Steps>;
  step: Steps;
  prevStep: Steps | undefined;
  form: Form;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  goToInitialStep?(): void;
}

export const Step: React.FC<StepProps> = (props: StepProps) => {
  const { onSubmit, onBack, step, prevStep, form, onChange, goToInitialStep } =
    props;

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <div style={stepWrapper}>
      <h2>Task A</h2>
      {stepContainers[step](form, onChange, onKeyDown) ||
        stepContainers.STEP_A(form, onChange, onKeyDown)}
      <div style={stepButtonsStyle}>
        {/* Don't show prev button when on first step*/}
        {prevStep && <button onClick={() => onBack(prevStep)}>Go back</button>}

        {/* If form has been submitted */}
        {step !== Steps.STEP_SUBMITTED && (
          <button style={{ marginLeft: "auto" }} onClick={onSubmit}>
            {step === Steps.STEP_D ? "Submit" : "Next step"}
          </button>
        )}

        {step === Steps.STEP_SUBMITTED && (
          <button style={{ marginLeft: "auto" }} onClick={goToInitialStep}>
            Back to initial
          </button>
        )}
      </div>
    </div>
  );
};

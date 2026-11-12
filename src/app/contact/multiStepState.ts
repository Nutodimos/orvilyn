export interface MultiStepState {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string>;
}

export const initialMultiStepState: MultiStepState = {
  status: "idle",
};

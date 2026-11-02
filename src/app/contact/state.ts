export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  values?: {
    name: string;
    email: string;
    phone: string;
    message: string;
    interests: string[];
  };
};

export const initialContactState: ContactState = { status: "idle" };

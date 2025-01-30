import zod from "zod";

const signupInput = zod.object({
  name: zod.string().optional(),
  email: zod.string().email(),
  password: zod.string().min(8),
});

const signinInput = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

export { signupInput, signinInput };

export type SigninInput = zod.infer<typeof signinInput>;
export type SignupInput = zod.infer<typeof signupInput>;

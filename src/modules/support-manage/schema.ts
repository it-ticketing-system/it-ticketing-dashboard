import { z } from 'zod';


export const supportFormSchema = z.object({
  name: z.string().min(1, 'validation.nameRequired'),
  username: z.string().min(1, 'validation.usernameRequired'),
  password: z.string().optional().refine(val => !val || val.length >= 8, 'validation.passwordMin'),
  departmentIds: z.array(z.number()).min(1, 'validation.departmentsRequired'),
  availabilityStatus: z.enum(['AVAILABLE', 'ON_LEAVE', 'INACTIVE'], {
    error: 'validation.statusRequired',
  }),
  permissions: z.array(z.string()).optional(),
});

export type SupportFormValues = z.infer<typeof supportFormSchema>;

import { z } from 'zod';

export const registerFormSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 digits long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    preferred_attendant: z.string().optional(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().min(8, { message: 'Confirm password must be at least 8 characters long' })
}).refine(
    (data) => data.password === data.confirmPassword, {}
);

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
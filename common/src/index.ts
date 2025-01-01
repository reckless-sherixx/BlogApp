import { z } from 'zod';

//authentication 

export const signupInput = z.object({
    email:z.string().email(),
    password:z.string().min(2),
    name:z.string().optional()
})
export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email:z.string().email(),
    password:z.string().min(2),
    name:z.string().optional()
})
export type SigninInput = z.infer<typeof signinInput>



//Blog

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
});
export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
    title: z.string(),
    content: z.string(),
    id:z.number()
});
export type UpdatePostType = z.infer<typeof updatePostInput>;
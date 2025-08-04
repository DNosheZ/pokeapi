'use client'
import {useForm} from 'react-hook-form';
function SignUpPage() {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        const resJSON = await res.json();
    });
    return (
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 h-[calc(100vh-7rem)] flex justify-center items-center">
            <form action="" onSubmit={onSubmit} >
            <h1 className="text-slate-600 font-bold text-4xl mb-4">Sign Up</h1>
                <div>
                    <label htmlFor="username"
                    className="text-slate-500 mb-2 block">Username:</label>
                    <input type="text" 
                    {...register("username", 
                    { required: true })}
                    id="username" name="username" required 
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"/>
                    {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                </div>
                <div>
                    <label htmlFor="email"
                    className="text-slate-500 mb-2 block">Email:</label>
                    <input type="email" 
                    {...register("email", 
                    { required: true })}
                    id="email" name="email" required 
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"/>
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
                <div>
                    <label htmlFor="password"
                    className="text-slate-500 mb-2 block">Password:</label>
                    <input type="password" 
                    {...register("password", 
                    { required: true })} 
                    id="password" name="password" required 
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"/>
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </div>
                <div>
                    <label htmlFor="confirmPassword"
                    className="text-slate-500 mb-2 block">Confirm Password:</label>
                    <input type="Password" 
                    {...register("confirmPassword", 
                    { required: true })} 
                    id="confirmPassword" name="confirmPassword" required 
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"/>
                    {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                </div>
                <button className="p-3 group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black bg-slate-900 text-slate-300 mt-2"
                 type="submit">Sign Up</button>
            </form>
        </div>
    );
}



function SignUp() {
  const {register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        const resJSON = await res.json();
    });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-2/3 space-y-6">
      <div>
        <FormField
          control={form.control}
          name="username"
          {...register("username", { required: true })}
            id="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} 
                 
                />
              </FormControl>
            </FormItem>
          )}
        />
        {errors.username && <span className="text-red-500">{errors.username.message}</span>}
      </div>
      <div>
        <FormField
          control={form.control}
          name="email"
          {...register("email", { required: true })}
            id="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} 
                 
                />
              </FormControl>
              
            </FormItem>
          )}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>
      <div>
        <FormField
          control={form.control}
          name="password"
          {...register("password", { required: true })}
            id="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} 
                 
                />
              </FormControl>
              
            </FormItem>
          )}
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>
      <div>
        <FormField
          control={form.control}
          name="confirmPassword"
          {...register("confirmPassword", { required: true })}
            id="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} 
                 
                />
              </FormControl>
              
            </FormItem>
          )}
        />
        {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
      </div>
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}


export default SignUpPage;

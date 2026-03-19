"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
 
  FieldError,
 
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import {useForm} from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
const formSchema=z.object({
 
  password:z.string().min(8,"Minimum length is 8"),
  email:z.email(),
})

 const handleGoogleLogin=async()=>{
    const data=await authClient.signIn.social({
      provider:"google",
      callbackURL:"http://localhost:3000"

      
    })
    console.log(data)
  }

export function LoginPage({ ...props }: React.ComponentProps<typeof Card>) {
 
  const form =useForm({
    defaultValues:{
    
      email:"",
      password:""
    },
    validators:{
   onSubmit:formSchema
    },
    onSubmit:async({value})=>{
      const toastId=toast.loading("Logging in user")
  try{
 const { data, error } = await authClient.signIn.email(value)
 if(error){
toast.error(error.message,{id:toastId})
return
 }

 toast.success("User logged in succesfully",{id:toastId});

  }catch(err){
toast.error("Something went wrong,please try again",{id:toastId})
  }
    }
  })
 
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Sign in your account</CardTitle>
        <CardDescription>
          Enter your information below to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
        id="register-form"
        onSubmit={(e)=>{
          e.preventDefault();
          form.handleSubmit();
        }}>
      <FieldGroup>
       
        <form.Field
        name="email" 
        children={(field)=>
        {
          const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid
          return(
            <Field>
         <FieldLabel>
          Email
         </FieldLabel>
         <Input
         type="email"
         id={field.name}
         name={field.name}
         value={field.state.value}
         onChange={(e)=>field.handleChange(e.target.value)}
         >
         
         </Input>
          {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
          )
        }
        }
        />
        <form.Field
        name="password" 
        children={(field)=>
        {
          const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid
          return(
            <Field>
         <FieldLabel>
          Password
         </FieldLabel>
         <Input
         type="password"
         id={field.name}
         name={field.name}
         value={field.state.value}
         onChange={(e)=>field.handleChange(e.target.value)}
         >
         
         </Input>
          {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
          )
        }
        }
        />
      </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex gap-3 flex-col">
         <Button className="w-full" form="register-form" type="submit">Login</Button>
          <Button className="w-full" onClick={()=>handleGoogleLogin()}
                 variant="outline" type="button">
                  Login with Google
                </Button>
      </CardFooter>
    </Card>
  )
}

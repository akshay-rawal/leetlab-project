import { useState } from 'react';
import { Schema } from './schemas/Schema';
import {Code,Eye,EyeOff,Loader2,Lock,Mail} from "lucide-react"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from 'react-router-dom';
import AuthImagePattern from "../components/shared/AuthImagePattern"
import { useAuthStore } from '../store/store';
import { useNavigate } from 'react-router-dom';




const SignupPage = () => {
  const navigate = useNavigate();

  const {signup,isSigninUp} = useAuthStore()
   const [showPassword,setShowPassword] = useState(false)
   const formMethods = useForm({
  resolver:zodResolver(Schema )
})

const { register, handleSubmit, formState } = formMethods;
const { errors,isSubmitting  } = formState;




 const onSubmit = async (data) => {
    try {
     const user =  await signup(data)  
      console.log(("signup data.....",data));
      if(user){
        navigate("/")
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className='h-screen grid lg:grid-cols-2'>
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome </h1>
              <p className="text-base-content/60">Sign Up to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Code className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  {...register("name")}
                  className={`input input-bordered w-full pl-10 ${
                    errors.name ? "input-error" : ""
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}              
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`input input-bordered w-full pl-10 ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`input input-bordered w-full pl-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            {/* Confirm Password */}
<div className="form-control">
  <label className="label">
    <span className="label-text font-medium">Confirm Password</span>
  </label>
  <input
    type="password"
    {...register("confirmPassword")}
    className={`input input-bordered w-full ${
      errors.confirmPassword ? "input-error" : ""
    }`}
    placeholder="Confirm Password"
  />
  {errors.confirmPassword && (
    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
  )}
</div>


            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
             disabled={isSigninUp}
            >
               {isSigninUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

       {/* Right Side - Image/Pattern */}
      <AuthImagePattern
      
        title={"Welcome to our platform!"}
        subtitle={
          "Sign up to access our platform and start using our services."
        }
      />
    </div>
  
)}  


 export  default SignupPage;
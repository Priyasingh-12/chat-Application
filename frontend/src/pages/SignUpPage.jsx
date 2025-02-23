import {
  User,
  Mail,
  Lock,
  EyeOff,
  Eye,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    let errorMessage = "";
  
    if (!formData.fullName.trim()) errorMessage = "Full name is required.";
    else if (!formData.email.trim()) errorMessage = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errorMessage = "Invalid email format";
    else if (!formData.password) errorMessage = "Password is required";
    else if (formData.password.length < 6) errorMessage = "Password must be at least 6 characters";
  
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-center",
        duration: 2000, 
      });
      return false;
    }
  
    return true;
  };  


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const success = validateForm();
    if (success) {
      try {
        await signup(formData);
      } catch (error) {
        console.error("Signup failed:", error);
      }
    }
  };
  

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-10 rounded-xl bg-primary/10 flex items-center selection:justify-center 
                group-hover:bg-primary/20 transition-colors "
              >
                <MessageSquare className="text-primary size-9" />
              </div>
              <h1 className="text-2xl font-bold mt-2 text-purple-800">
                Create Account
              </h1>
              <p className="text-base-content/60 text-purple-600">
                Get Started With Your Free Account
              </p>
            </div>
          </div>
          {/* ******************************************************** */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  className={`input input-bordered w-full pl-10`}
                  type="text"
                  placeholder="Enter Your Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  className={`input input-bordered w-full pl-10`}
                  type="email" 
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  className={`input input-bordered w-full pl-10`}
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
               type="submit"
              className="btn btn-primary w-full "
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading .........
                </>
              ) : (
                <>Create Account</>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60 text-purple-800">
              Already have an Account ?{" "}
              <Link to="/login" className="link link-primary text-red-600">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;

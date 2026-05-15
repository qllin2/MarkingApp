import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import api from "../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";

export function LoginForm({ className, ...props }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [justRegistered, setJustRegistered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("registered") === "1") {
      setJustRegistered(true);
    }
  }, [location.search]);

  const handleLogin = async () => {
    setIsLoading(true);
    setLoginError("");
    try {
      const res = await api.post("/login", { username, password });

      if (!res.data.token) {
        setLoginError(res.data.message || "Login failed: No token received.");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      window.dispatchEvent(new Event("authChange"));

    } catch (err) {
      console.error("Login error:", err);
      setLoginError(err.response?.data?.message || "Incorrect email or password.");
      setIsLoading(false);
    }
    // No need to set isLoading to false here, as the component will unmount upon successful redirect.
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0">
        <CardHeader className="items-start">
          <div className="relative h-11 pl-1 flex items-start justify-start">
            <img src="/logo_black.png" alt="Logo" className="w-[140px] h-fit object-contain" />
          </div>
       
          
          <div className="text-sm text-muted-foreground">
            Login to your assignment marking portal
          </div>
        </CardHeader>
        <CardContent>
          {justRegistered && (
            <p className="text-green-600 text-sm mb-4">Account created! Please log in.</p>
          )}
          {loginError && (
            <p className="text-red-600 text-sm mb-4">{loginError}</p>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="border-0"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="border-0"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={isLoading}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div
                className="text-center text-xs cursor-pointer underline underline-offset-4"
                onClick={() => navigate("/forgetpassword")}
              >
                Forget your password?
              </div>

              <Button type="submit" className="w-full cursor-pointer bg-[#201f30] hover:bg-[#201f30]/80" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div
                className="text-center text-xs cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Don&apos;t have an account?{" "}
                <span className="underline underline-offset-4">Sign up</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-white text-center text-xs mt-4">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
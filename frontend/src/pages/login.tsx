import { assets } from "./../assets/assets";
import GridDistortion from "@/blocks/Backgrounds/GridDistortion/GridDistortion";

const Login = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Grid Distortion Background - Full screen and underneath everything */}
      <div className="absolute inset-0 z-0">
        <GridDistortion
          imageSrc={assets.logimg}
          grid={15}
          mouse={0.25}
          strength={0.15}
          relaxation={0.9}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Login Form Container - Centered with z-index to appear above the background */}
      <div className="absolute inset-0 z-10 flex items-center justify-end mr-58 mt-28">
        <div className="w-full max-w-md rounded-lg bg-black/50 p-8 backdrop-blur-sm">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-white">WHEEL O RENT</h1>
            <p className="text-gray-400">Sign in to continue</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-gray-700 bg-gray-900/70 p-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                className="w-full rounded-md border border-gray-700 bg-gray-900/70 p-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-indigo-500 focus:ring-indigo-500/50"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 p-3 text-center font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
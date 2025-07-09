import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md px-4">
        <SignIn
          appearance={{
            elements: {
              card: "shadow-xl rounded-lg",
            },
          }}
          redirectUrl="/"
          signUpUrl="/sign-up"
        />
      </div>
    </main>
  );
}

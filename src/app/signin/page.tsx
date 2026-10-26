import { Suspense } from "react";
import { SignInForm } from "@/components/SignInForm";

export default function SignInPage() {

  return (
    <Suspense fallback={<div className="skeleton mx-auto h-96 w-full max-w-104 rounded-2xl" />}>
      <SignInForm />
    </Suspense>
  );
}

import { KeyRound } from "lucide-react";
import CodeLoginForm from "@/components/portal/CodeLoginForm";

export default function PortalLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex bg-primary/10 rounded-2xl p-4 mb-4">
            <KeyRound className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Customer Portal</h1>
          <p className="text-gray-600 text-sm mt-2">
            Enter the code Tomer gave you to view your job history and status.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <CodeLoginForm />
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Don&apos;t have a code? It&apos;s provided by Tomer after your first
          service.
        </p>
      </div>
    </div>
  );
}

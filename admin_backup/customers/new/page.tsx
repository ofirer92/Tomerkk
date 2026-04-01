import CustomerForm from "@/components/admin/CustomerForm";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function NewCustomerPage() {
  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
        <Link href="/admin/customers" className="hover:text-primary transition-colors">
          לקוחות
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 font-medium">לקוח חדש</span>
      </div>

      <h1 className="text-2xl font-bold text-primary mb-6">הוספת לקוח חדש</h1>
      <CustomerForm />
    </div>
  );
}

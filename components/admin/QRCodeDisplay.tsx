"use client";

import { useEffect, useState } from "react";
import { Download, Printer, Loader2 } from "lucide-react";

interface QRCodeDisplayProps {
  customerId: string;
}

interface QrData {
  dataUrl: string;
  targetUrl: string;
  customerName: string;
  code: string;
}

export default function QRCodeDisplay({ customerId }: QRCodeDisplayProps) {
  const [data, setData] = useState<QrData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/qr/${customerId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError("שגיאה בטעינת ה-QR"))
      .finally(() => setLoading(false));
  }, [customerId]);

  const handleDownload = () => {
    if (!data) return;
    const a = document.createElement("a");
    a.href = data.dataUrl;
    a.download = `qr-${data.code}.png`;
    a.click();
  };

  const handlePrint = () => {
    if (!data) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>QR Code – ${data.customerName}</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding: 40px; }
            img { width: 300px; height: 300px; }
            p { margin-top: 16px; font-size: 14px; color: #555; }
            .code { font-family: monospace; font-size: 18px; font-weight: bold; color: #1e3a5f; }
          </style>
        </head>
        <body>
          <img src="${data.dataUrl}" alt="QR Code" />
          <p class="code">${data.code}</p>
          <p>${data.customerName}</p>
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center text-red-500 py-8 text-sm">{error || "שגיאה לא ידועה"}</div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={data.dataUrl}
        alt={`QR for ${data.customerName}`}
        className="w-48 h-48 rounded-xl border border-gray-200"
      />
      <div className="text-center">
        <p className="font-mono font-bold text-primary text-lg">{data.code}</p>
        <p className="text-gray-500 text-sm">{data.customerName}</p>
        <p className="text-gray-400 text-xs mt-1 break-all max-w-xs">{data.targetUrl}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          הורד PNG
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Printer className="w-4 h-4" />
          הדפס
        </button>
      </div>
    </div>
  );
}

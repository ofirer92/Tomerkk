import QRCode from "qrcode";

export async function generateQrDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: "H",
    width: 400,
    margin: 2,
    color: {
      dark: "#1E3A5F",
      light: "#FFFFFF",
    },
  });
}

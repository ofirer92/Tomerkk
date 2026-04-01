import { SignJWT, jwtVerify } from "jose";
import type { CustomerJwtPayload } from "@/types";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "dev-secret-change-in-production"
);

const COOKIE_NAME = "portal_token";
const MAX_AGE = 60 * 60 * 24 * 15; // 15 days in seconds

export async function signCustomerToken(
  payload: CustomerJwtPayload
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15d")
    .sign(secret);
}

export async function verifyCustomerToken(
  token: string
): Promise<CustomerJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as CustomerJwtPayload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME, MAX_AGE };

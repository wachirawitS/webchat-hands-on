import AuthSetup from "@/components/features/auth/auth-setup";
import { LinePayload } from "@/components/features/chat/chat-card";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const AuthSetupPage = async () => {
  let linePayload: LinePayload | null = null;

  const cookieStore = await cookies();
  const token = cookieStore.get("line_auth")?.value;
  const jwtSecret = process.env.LINE_JWT_SECRET;

  if (token && jwtSecret) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(jwtSecret)
      );
      linePayload = payload as LinePayload;
    } catch {
      linePayload = null;
    }
  }

  return (
    <div>
      <AuthSetup palyload={linePayload} />
    </div>
  );
};

export default AuthSetupPage;

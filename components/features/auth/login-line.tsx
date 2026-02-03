"use client";

import { Button } from "@/components/ui/button";
import { lineAuth } from "../../../shared/services/line-auth.service";

const LoginLine = () => {
  return (
    <Button
      onClick={() => {
        const redirectUrl = lineAuth.getRedirectUrl();
        window.location.href = redirectUrl;
      }}
      className="bg-green-600 hover:bg-green-700"
    >
      เข้าสู่ระบบด้วย LINE
    </Button>
  );
};

export default LoginLine;

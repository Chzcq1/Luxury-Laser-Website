import { Router, type IRouter, Request, Response } from "express"; // เพิ่ม Request, Response
import { HealthCheckResponse } from "@workspace/api-zod";

const router: IRouter = Router();

// ระบุ Type ให้ชัดเจนที่ res และใช้ Request กับ _req
router.get("/healthz", (_req: Request, res: Response) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

export default router;

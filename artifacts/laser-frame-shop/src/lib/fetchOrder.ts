// ============================================================
//  Google Sheets Integration — แก้ค่าตรงนี้ก่อน deploy
// ============================================================
//
//  วิธีตั้งค่า:
//  1. เปิด Google Sheet แล้วคัดลอก ID จาก URL:
//     https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
//  2. สร้าง API Key ใน Google Cloud Console (เปิดใช้ Sheets API)
//  3. วางค่าด้านล่าง
//
//  โครงสร้างชีทที่ต้องการ:
//  --- ชีท "Current Jobs" ---
//  คอลัมน์ A: รหัสงาน (OrderID)   เช่น A101
//  คอลัมน์ B: เบอร์โทร (Phone)    เช่น 0634650129
//  คอลัมน์ C: ชื่อลูกค้า
//  คอลัมน์ D: รายละเอียด          เช่น พระ 10 องค์
//  คอลัมน์ E: สถานะ (Status)      ใส่ตัวเลข 1, 2, 3 หรือ 4
//  คอลัมน์ F: หมายเหตุ (ไม่บังคับ)
//
//  --- ชีท "History" ---
//  คอลัมน์ A: รหัสงาน (OrderID)
//  คอลัมน์ B: เบอร์โทร (Phone)
//  คอลัมน์ C: ชื่อลูกค้า
//  คอลัมน์ D: รายละเอียด
//  คอลัมน์ E: วันที่ส่งมอบ
// ============================================================

export const SHEETS_CONFIG = {
  SHEET_ID: "1-phV30LysaZG84R5lRa209I4gUvTT3dejCNogLqoKqo", // ไอดีชีทเดิม
  API_KEY: import.meta.env.VITE_API_KEY, // เปลี่ยนมาใช้ตัวแปรระบบแทนการพิมพ์รหัสจริง
  CURRENT_JOBS_SHEET: "current",
  HISTORY_SHEET: "history",
};


// ── Types ───────────────────────────────────────────────────

export type OrderStatus = 1 | 2 | 3 | 4;

export type OrderResult =
  | {
      found: true;
      source: "current";
      orderId: string;
      customerName: string;
      description: string;
      status: OrderStatus;
      note: string;
    }
  | {
      found: true;
      source: "history";
      orderId: string;
      customerName: string;
      description: string;
      completionDate: string;
    }
  | { found: false };

// ── Helper ──────────────────────────────────────────────────

function normalizePhone(raw: string): string {
  return raw.replace(/[-\s()]/g, "").trim();
}

async function fetchSheet(sheetName: string): Promise<string[][]> {
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/` +
    `${SHEETS_CONFIG.SHEET_ID}/values/${encodeURIComponent(sheetName)}` +
    `?key=${SHEETS_CONFIG.API_KEY}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Sheets API error: ${res.status}`);
  const json = await res.json();
  return (json.values as string[][]) ?? [];
}

// ── Main fetch function ──────────────────────────────────────

export async function fetchOrder(
  phone: string,
  orderId: string
): Promise<OrderResult> {
  const normalizedPhone = normalizePhone(phone);
  const normalizedOrderId = orderId.trim().toUpperCase();

  // ค้นหาใน Current Jobs ก่อน
  const currentRows = await fetchSheet(SHEETS_CONFIG.CURRENT_JOBS_SHEET);
  // แถวแรกเป็น header ข้ามไป
  for (const row of currentRows.slice(1)) {
    const rowOrderId = (row[0] ?? "").trim().toUpperCase();
    const rowPhone = normalizePhone(row[1] ?? "");
    if (rowOrderId === normalizedOrderId && rowPhone === normalizedPhone) {
      const rawStatus = parseInt(row[4] ?? "1", 10);
      const status = ([1, 2, 3, 4].includes(rawStatus)
        ? rawStatus
        : 1) as OrderStatus;
      return {
        found: true,
        source: "current",
        orderId: row[0] ?? orderId,
        customerName: row[2] ?? "",
        description: row[3] ?? "",
        status,
        note: row[5] ?? "",
      };
    }
  }

  // ค้นหาใน History
  const historyRows = await fetchSheet(SHEETS_CONFIG.HISTORY_SHEET);
  for (const row of historyRows.slice(1)) {
    const rowOrderId = (row[0] ?? "").trim().toUpperCase();
    const rowPhone = normalizePhone(row[1] ?? "");
    if (rowOrderId === normalizedOrderId && rowPhone === normalizedPhone) {
      return {
        found: true,
        source: "history",
        orderId: row[0] ?? orderId,
        customerName: row[2] ?? "",
        description: row[3] ?? "",
        completionDate: row[4] ?? "",
      };
    }
  }

  return { found: false };
}

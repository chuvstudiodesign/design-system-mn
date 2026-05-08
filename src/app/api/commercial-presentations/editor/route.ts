import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const outputDir = path.join(
  process.cwd(),
  "outputs",
  "commercial-presentation-editor"
);

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const savedAt = new Date().toISOString();
    const document = {
      savedAt,
      ...payload,
    };

    await mkdir(outputDir, { recursive: true });

    const body = JSON.stringify(document, null, 2);
    await writeFile(path.join(outputDir, "latest.json"), body, "utf8");
    await writeFile(path.join(outputDir, `${timestamp()}.json`), body, "utf8");

    return NextResponse.json({
      ok: true,
      savedAt,
      path: "outputs/commercial-presentation-editor/latest.json",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

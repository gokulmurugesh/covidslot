import connectMongo from "@/database/conn";
import Location from "@model/LocationSchema";

import { NextResponse } from "next/server";

export async function POST(req) {
  connectMongo().catch((error) => {
    return NextResponse.json({ error: "Connection Failed...!" });
  });

  if (!req.body)
    return NextResponse.json(
      { error: "Don't have form data...!" },
      { status: 404 }
    );
  const { state } = await req.json();

  const data = await Location.distinct("city", { state: state }).catch(
    (err) => {
      return NextResponse.json({ error: "Operaion Failed" });
    }
  );

  return NextResponse.json({ data });
}

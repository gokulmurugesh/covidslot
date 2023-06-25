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
  const { _id, change } = await req.json();
  if (change == 1) {
    const data = await Location.updateOne(
      { _id: _id },
      { $inc: { slotsAvailable: 1 } }
    ).catch((err) => {
      return NextResponse.json({ error: "Operaion Failed" });
    });
    return NextResponse.json({ data });
  } else if(change == -1) {
    const data = await Location.updateOne(
      { _id: _id },
      { $inc: { slotsAvailable: -1 } }
    ).catch((err) => {
      return NextResponse.json({ error: "Operaion Failed" });
    });
    return NextResponse.json({ data });
  } else {
    return NextResponse.json({ error : "Invalid change value" });
  }
}

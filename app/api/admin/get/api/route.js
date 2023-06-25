import connectMongo from "@/database/conn";
import Locations from "@model/LocationSchema";

import { NextResponse } from "next/server";

export async function GET() {
  connectMongo().catch((error) => {
    return NextResponse.json({ error: "Connection Failed...!" });
  });
  
  const data = await Locations.find({}).catch(err => {
    return NextResponse.json({ error: 'Creation Failed' });
  })
  return NextResponse.json({ data });
}
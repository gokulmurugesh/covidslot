import connectMongo from "@/database/conn";
import Locations from "@model/LocationSchema";

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
  const { centre, slotsAvailable, city, state } = await req.json();
  
  const data = await Locations.create({ centre, slotsAvailable, city, state }).catch(err => {
    return NextResponse.json({ error: 'Creation Failed' });
  })
  return NextResponse.json({ data });
}
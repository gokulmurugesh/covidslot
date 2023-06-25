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
  const { _id } = await req.json();
  
  const data = await Locations.findByIdAndRemove(_id).catch(err => {
    return NextResponse.json({ error: 'Deletion Failed' });
  })
  return NextResponse.json({ data });
}
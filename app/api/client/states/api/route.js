import connectMongo from "@/database/conn";
import Location from "@model/LocationSchema";

import { NextResponse } from "next/server";

export async function GET() {
  console.log("getStates Called")
  
  connectMongo().catch((error) => {
    return NextResponse.json({ error: "Connection Failed...!" });
  });

  

  const data = await Location.distinct("state").catch(
    (err) => {
      return NextResponse.json({ error: "Operaion Failed" });
    }
  );

  return NextResponse.json({ data });
}

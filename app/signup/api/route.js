import connectMongo from "@/database/conn";
import Users from "@model/UserSchema";
import { hash } from "bcryptjs";

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
  const { firstname, lastname, email, password, cpassword } = await req.json();

  //   check duplicate users
  const checkexisting = await Users.findOne({ email });
  if (checkexisting)
    return NextResponse.json(
      {
        error: "User Already Exists...!",
      },
      { status: 422 }
    );

  // hash password
  const data = await Users.create({ firstname, lastname, email, password: await hash(password, 12) }).catch(err => {
    return NextResponse.json({ error: 'Creation Failed' });
  })
  return NextResponse.json({ data });
}

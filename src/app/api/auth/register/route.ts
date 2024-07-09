import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { name, email, password, role } = await request.json();

  try {
    const results = await supabase.from("users").insert({
      name: name,
      email: email,
      password: password,
      role: role,
    });

    if (results.error === null && results.status === 201) {
      return NextResponse.json({ status: 201, message: "User registered successfully", error: null });
    } else if (results.error && results.status === 409) {
      return NextResponse.json({ status: 409, message: "User already exists", error: results.error});
    } else {
      return NextResponse.json({ status: 400, message: "User registration failed", error: results.error});
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error", error: error});
  }
}
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import bc from "bcryptjs";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { email, password } = await request.json();

  try {
    const results = await supabase.from("users").select().eq("email", email).single();
    const {data: user} = results;
    
    if (results.error === null && results.status === 200) {
      const isValidPassword = await bc.compare(password, user.password)
      if (!isValidPassword) {
        return NextResponse.json({ status: 401, message: "invalid password", error: "invalid password" });
      } else {
        return NextResponse.json({ status: 200, message: "Login success", error: null, data: {id: user.id, name: user.name, email: user.email, role: user.role} });
      }
    } else {
      return NextResponse.json({ status: 400, message: "User not found", error: results.error});
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error", error: error});
  }
}
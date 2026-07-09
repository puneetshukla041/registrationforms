// app/api/register/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Registration from '@/models/Registration';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Basic validation
    const { firstName, lastName, email, phoneNumber, hospital } = body;
    if (!firstName || !lastName || !email || !phoneNumber || !hospital) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newRegistration = await Registration.create(body);

    return NextResponse.json(
      { success: true, data: newRegistration },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
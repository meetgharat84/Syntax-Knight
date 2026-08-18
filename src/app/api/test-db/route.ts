import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json(
      {
        success: true,
        message: 'Syntax Knight is successfully connected to MongoDB! 🚀⚔️',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

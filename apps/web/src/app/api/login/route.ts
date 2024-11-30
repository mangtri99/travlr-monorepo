// library imports
import { NextResponse, NextRequest } from 'next/server';

// internal imports
import { signIn } from '../../../utils/auth';

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { email, password } = data;

  try {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (!result || result.error) {
      return NextResponse.json({ error: 'Invalid credentials' });
    } else {
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error during sign-in', error);
    return NextResponse.error();
  }
}

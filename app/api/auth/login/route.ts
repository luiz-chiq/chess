import { UserService } from '@/app/src/services/server/UserService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { user, password } = await request.json();
    const validUser = UserService.validateCredentials(user, password);
    
    if (validUser) {
      return NextResponse.json({
        success: true,
        message: 'Login bem-sucedido!',
        user: UserService.sanitizeUser(validUser),
        token: 'fake-jwt-token'
      });
    }

    return NextResponse.json(
      { success: false, message: 'Usuário ou senha incorretos' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erro no servidor' },
      { status: 500 }
    );
  }
}

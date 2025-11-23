import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { user, password } = await request.json();

    // Aqui você faria a validação real do usuário
    // Por exemplo, checar no banco de dados
    console.log(`Tentativa de login do usuário: ${user} ${password}`);``
    if (user === 'admin' && password === '123') {
      return NextResponse.json({
        success: true,
        message: 'Login bem-sucedido!',
        user: {
          id: '1',
          username: user,
        },
        // Você pode gerar um token JWT aqui
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

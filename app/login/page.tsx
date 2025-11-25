'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '../src/services/AuthService';
import styles from './login.module.css';
import { useUser } from '../src/hooks/zustand/useUser';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [inputError, setInputError] = useState(false);
  const [loading, setLoading] = useState(false);

  const setStoreUsername = useUser(
    (state) => state.setUsername
  );
  const setStoreToken = useUser((state) => state.setToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    ); // apenas para simular a tempo da requisição
    try {
      const response = await AuthService.login({
        user: username,
        password,
      });

      if (response.data.success) {
        setStoreUsername(username);
        setStoreToken(response.data.token);
        router.replace('/');
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Erro ao fazer login'
      );
      setInputError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div>
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setInputError(false);
              }}
              className={
                inputError
                  ? styles.inputError
                  : styles.normalInput
              }
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setInputError(false);
              }}
              className={
                inputError
                  ? styles.inputError
                  : styles.normalInput
              }
              required
            />
          </div>
        </div>
        <div
          style={{
            visibility: error ? 'visible' : 'hidden',
          }}
          className={styles.error}
        >
          {error}
        </div>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.createAccount}
            onClick={() =>
              router.push('/login/create-account')
            }
          >
            Criar conta
          </button>
          {/* TODO: implementar criação de conta */}
          <button
            type="submit"
            className={styles.login}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}

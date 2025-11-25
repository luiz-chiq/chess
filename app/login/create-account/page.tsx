'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "../../src/services/AuthService";
import styles from "../login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPasswordsMatch = useMemo(() => password === password2, [password, password2]);
  const isButtonDisabled = !(username && password && isPasswordsMatch && !loading);

  useEffect(() => {

    console.log(isPasswordsMatch)
  }, [password, password2, isPasswordsMatch]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500)); // apenas para simular a tempo da requisição
    try {
      const response = await AuthService.createAccount({ user: username, password });
      
      if (response.data.success) { 
        // setStoreUsername(username);
        // setStoreToken(response.data.token);
        router.replace('/login');
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar conta');
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
              setUsername(e.target.value)
              setInputError(false)
            }}
            className={inputError ? styles.inputError : styles.normalInput}
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
                    setPassword(e.target.value)
                    setInputError(false)
                    }}
                    className={inputError ? styles.inputError : styles.normalInput}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Senha</label>
                <input
                    id="password2"
                    type="password"
                    placeholder="Repita sua senha"
                    value={password2}
                    onChange={(e) => {
                    setPassword2(e.target.value)
                    setInputError(false)
                    }}
                    className={inputError ? styles.inputError : styles.normalInput}
                    required
                />
            </div>
        </div>
        <div style={{ visibility: error || !isPasswordsMatch ? 'visible' : 'hidden' }} className={styles.error}>{!isPasswordsMatch ? "As senhas não coincidem" : error}</div>
        <div className={styles.buttonGroup}>
          <button 
            type="button"
            className={styles.createAccount}
            onClick={() => router.back()}>
            Cancelar
          </button>
          <button type="submit" className={styles.login} disabled={isButtonDisabled}>
            {loading ? 'Carregando...' : 'Criar Conta'}
          </button>
        </div>
      </form>
    </div>
  );
}

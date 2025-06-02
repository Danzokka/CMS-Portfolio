"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function DebugAuthPage() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
  const [isLogging, setIsLogging] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
    console.log(`[Debug] ${message}`);
  };

  const handleTestLogin = async () => {
    setIsLogging(true);
    addLog("Iniciando teste de login...");

    try {
      addLog(`Tentando fazer login com: ${email}`);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      addLog(`Resultado do signIn: ${JSON.stringify(result)}`);

      if (result?.error) {
        addLog(`❌ Erro na autenticação: ${result.error}`);
      } else if (result?.ok) {
        addLog("✅ Login realizado com sucesso!");
        addLog("Aguardando atualização da sessão...");

        // Aguarda um pouco para a sessão ser atualizada
        setTimeout(() => {
          addLog("Redirecionamento deveria acontecer agora...");
        }, 1000);
      } else {
        addLog("❓ Resultado desconhecido do login");
      }
    } catch (error) {
      addLog(`💥 Exceção durante login: ${error}`);
    } finally {
      setIsLogging(false);
    }
  };

  const handleLogout = async () => {
    addLog("Fazendo logout...");
    await signOut({ redirect: false });
    addLog("Logout realizado");
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        🔍 Debug de Autenticação NextAuth
      </h1>

      {/* Status da Sessão */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">📊 Status da Sessão</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-sm ${
                  status === "authenticated"
                    ? "bg-green-100 text-green-800"
                    : status === "loading"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {status}
              </span>
            </p>
            {session?.user && (
              <>
                <p>
                  <strong>Email:</strong> {session.user.email}
                </p>
                <p>
                  <strong>ID:</strong> {session.user.id}
                </p>
              </>
            )}
          </div>
          <div>
            <p>
              <strong>Sessão Completa:</strong>
            </p>
            <pre className="text-xs bg-white p-2 rounded border overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Formulário de Teste */}
      {status !== "authenticated" ? (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">🔐 Teste de Login</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={isLogging}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={isLogging}
              />
            </div>
            <button
              onClick={handleTestLogin}
              disabled={isLogging}
              className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLogging ? "🔄 Fazendo Login..." : "🚀 Testar Login"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">✅ Usuário Autenticado</h2>
          <p className="mb-4">
            Bem-vindo, <strong>{session.user?.email}</strong>!
          </p>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            🚪 Fazer Logout
          </button>
        </div>
      )}

      {/* Logs em Tempo Real */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">📝 Logs em Tempo Real</h2>
          <button
            onClick={clearLogs}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            🗑️ Limpar Logs
          </button>
        </div>
        <div className="bg-black text-green-400 p-4 rounded-lg h-64 overflow-y-auto font-mono text-sm">
          {logs.length === 0 ? (
            <p className="text-gray-500">
              Nenhum log ainda... Faça um teste de login!
            </p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Informações de Configuração */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">
          ⚙️ Informações de Configuração
        </h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>
            • <strong>NEXTAUTH_URL:</strong>{" "}
            {process.env.NEXTAUTH_URL || "❌ Não definida"}
          </li>
          <li>
            • <strong>Backend URL:</strong>{" "}
            {process.env.NEXT_PUBLIC_BACKEND_URL || "❌ Não definida"}
          </li>
          <li>
            • <strong>NEXTAUTH_SECRET:</strong>{" "}
            {process.env.NEXTAUTH_SECRET ? "✅ Configurado" : "❌ Não definido"}
          </li>
        </ul>
      </div>
    </div>
  );
}

'use client';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api/auth';

import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';

const loginPage = () => {
  const router = useRouter();
  const { email, password, setEmail, setPassword } = useAuthStore();
  const { setUser } = useUserStore()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password });
      setUser(user)
      router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 flex flex-col gap-5"
    >
      <input
        className="bg-gray-800"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="bg-gray-800"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button className="bg-gray-800" type="submit">
        Login
      </button>
    </form>
  );
};

export default loginPage;

'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api/auth';

import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';

const loginPage = () => {
  const router = useRouter();
  const { email, password, setEmail, setPassword } = useAuthStore();
  const { setUser } = useUserStore();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password });
      setUser(user);
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
      <div className="grid gap-3">
        <Label htmlFor="login-email">E-Mail</Label>
        <Input
          id="login-email"
          name="name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          name="name"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};

export default loginPage;

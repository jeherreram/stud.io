import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold text-gray-900">
          Telc B1 Email Practice
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Master German email writing for Telc B1 certification with AI-powered evaluation and progress tracking.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/login">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/auth/register">
            <Button size="lg" variant="outline">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


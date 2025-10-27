'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createBrowserSupabaseClient } from '@/lib/supabase-client'
import type { EmailPrompt, Evaluation, UserWeakness } from '@/types/database'

export default function PracticePage() {
  const [prompt, setPrompt] = useState<EmailPrompt | null>(null)
  const [response, setResponse] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [weaknesses, setWeaknesses] = useState<UserWeakness[]>([])
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchRandomPrompt()
  }, [])

  const fetchRandomPrompt = async () => {
    try {
      const res = await fetch('/api/prompts/random')
      const data = await res.json()
      setPrompt(data)
    } catch (error) {
      console.error('Error fetching prompt:', error)
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setResponse(text)
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length
    setWordCount(words)
  }

  const handleSubmit = async () => {
    if (!prompt || !response.trim()) return

    setLoading(true)

    try {
      // Save response (user ID comes from session)
      const responseRes = await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt_id: prompt.id,
          content: response,
          word_count: wordCount,
        }),
      })

      const savedResponse = await responseRes.json()

      // Trigger evaluation
      const evalRes = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response_id: savedResponse.id,
          prompt_id: prompt.id,
          user_response: response,
          required_points: prompt.required_points,
          email_type: prompt.type,
        }),
      })

      const result = await evalRes.json()
      setEvaluation(result.evaluation)
      setWeaknesses(result.weaknesses || [])
      setShowResults(true)
    } catch (error) {
      console.error('Error submitting response:', error)
      alert('Failed to evaluate. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleNewPractice = () => {
    fetchRandomPrompt()
    setResponse('')
    setWordCount(0)
    setEvaluation(null)
    setWeaknesses([])
    setShowResults(false)
  }

  if (showResults && evaluation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Evaluation Results</h1>
            <Link href="/dashboard">
              <Button variant="ghost">← Back to Dashboard</Button>
            </Link>
          </div>

          <Card className={`mb-6 ${evaluation.passed ? 'border-green-500' : 'border-red-500'}`}>
            <CardHeader>
              <CardTitle className={evaluation.passed ? 'text-green-600' : 'text-red-600'}>
                {evaluation.passed ? '✓ Passed' : '✗ Failed'}
              </CardTitle>
              <CardDescription>
                Total Points: {evaluation.total_points} / 15
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Criterion I - Content Points</h3>
                <p>Grade: {evaluation.criterion_i_grade} | Points: {evaluation.criterion_i_points}/5</p>
                <p className="text-sm text-muted-foreground">Assessment based on addressing all required points</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Criterion II - Communicative Design</h3>
                <p>Grade: {evaluation.criterion_ii_grade} | Points: {evaluation.criterion_ii_points}/5</p>
                <p className="text-sm text-muted-foreground">Format, structure, expression, register</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Criterion III - Formal Accuracy</h3>
                <p>Grade: {evaluation.criterion_iii_grade} | Points: {evaluation.criterion_iii_points}/5</p>
                <p className="text-sm text-muted-foreground">Grammar, syntax, spelling</p>
              </div>
              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">Feedback</h3>
                <p className="whitespace-pre-wrap">{evaluation.feedback}</p>
              </div>
            </CardContent>
          </Card>

          {weaknesses && weaknesses.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Identified Weaknesses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {weaknesses.map((w: any) => (
                    <div key={w.category} className="p-3 border rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{w.category.replace(/_/g, ' ')}</p>
                          <p className="text-sm text-muted-foreground">{w.description}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          w.severity === 'HIGH' ? 'bg-red-100 text-red-800' :
                          w.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {w.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Button onClick={handleNewPractice} className="w-full">Practice Another Email</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Email Writing Practice</h1>
          <Link href="/dashboard">
            <Button variant="ghost">← Back to Dashboard</Button>
          </Link>
        </div>

        {prompt && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="mb-2">Email Prompt</CardTitle>
                  <CardDescription>
                    Type: <span className="capitalize">{prompt.type}</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">You received this email:</p>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-semibold mb-2">From: {prompt.sender}</p>
                  <p className="text-sm whitespace-pre-wrap">{prompt.content}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Required Points to Address (4 points):</h3>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  {prompt.required_points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Your Response</CardTitle>
            <CardDescription>
              Write your email response in German (maximum 150 words)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              value={response}
              onChange={handleTextChange}
              placeholder="Write your email response here..."
              className="w-full h-64 p-4 border rounded-lg font-mono"
            />
            <div className="mt-2 flex justify-between">
              <span className={`text-sm ${wordCount > 150 ? 'text-red-600' : 'text-muted-foreground'}`}>
                Words: {wordCount} / 150
              </span>
            </div>
            <Button 
              onClick={handleSubmit} 
              className="w-full mt-4"
              disabled={loading || !response.trim() || wordCount > 150}
            >
              {loading ? 'Evaluating...' : 'Submit for Evaluation'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


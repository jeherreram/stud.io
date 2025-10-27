'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function ProgressPage() {
  const [progress, setProgress] = useState<any>(null)
  const [weaknesses, setWeaknesses] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [progressRes, weaknessesRes] = await Promise.all([
        fetch('/api/progress'),
        fetch('/api/weaknesses'),
      ])

      const progressData = await progressRes.json()
      const weaknessesData = await weaknessesRes.json()

      setProgress(progressData)
      setWeaknesses(weaknessesData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  const scoreChartData = progress?.recent_evaluations?.reverse().map((e: any, idx: number) => ({
    attempt: idx + 1,
    score: e.total_points,
    passed: e.passed ? 1 : 0,
  })) || []

  const typeChartData = progress?.by_type || []

  const weaknessChartData = weaknesses?.by_category ? 
    Object.entries(weaknesses.by_category).map(([cat, data]: [string, any]) => ({
      category: cat.replace(/_/g, ' '),
      total: data.total,
    })) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Progress & Analytics</h1>
          <Link href="/dashboard">
            <Button variant="ghost">← Back to Dashboard</Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Attempts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{progress?.total_attempts || 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pass Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{progress?.pass_rate?.toFixed(1) || 0}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{progress?.avg_score?.toFixed(1) || 0} / 15</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Score Progression</CardTitle>
              <CardDescription>Your scores over recent attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={scoreChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attempt" />
                  <YAxis domain={[0, 15]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance by Email Type</CardTitle>
              <CardDescription>Average scores for each type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={typeChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis domain={[0, 15]} />
                  <Tooltip />
                  <Bar dataKey="avg_score" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Weakness Analysis</CardTitle>
            <CardDescription>Common errors by category</CardDescription>
          </CardHeader>
          <CardContent>
            {weaknessChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={weaknessChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="total" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground">No weaknesses identified yet. Keep practicing!</p>
            )}
          </CardContent>
        </Card>

        <Button onClick={fetchData} variant="outline" className="w-full">
          Refresh Data
        </Button>
      </div>
    </div>
  )
}


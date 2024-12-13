import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight, Brain, Gamepad2, Star, Trophy, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-8 px-4 text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h1 className="text-3xl font-bold text-blue-800">
            Start Your Learning Adventure! 🚀
          </h1>
          <p className="text-lg text-blue-600">
            Earn cool badges while learning awesome new skills!
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/explore">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Join the Adventure
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="outline">
                Continue Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="p-4 mt-8">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/50 backdrop-blur">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-bold mb-1">Earn Badges</h3>
              <p className="text-sm text-gray-600">Complete fun challenges</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-bold mb-1">Learn Skills</h3>
              <p className="text-sm text-gray-600">Master new abilities</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-bold mb-1">Join Friends</h3>
              <p className="text-sm text-gray-600">Learn together</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-orange-100 rounded-full flex items-center justify-center">
                <Gamepad2 className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="font-bold mb-1">Have Fun</h3>
              <p className="text-sm text-gray-600">Learning is adventure</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Badges Section */}
      <section className="p-4 mt-8">
        <h2 className="text-xl font-bold mb-4">Popular Badges 🏆</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "Math Wizard", color: "bg-blue-100", stars: 3 },
            { title: "Science Explorer", color: "bg-green-100", stars: 4 },
            { title: "Digital Artist", color: "bg-purple-100", stars: 3 },
            { title: "Coding Hero", color: "bg-orange-100", stars: 5 }
          ].map((badge, index) => (
            <Card key={index} className="bg-white/50 backdrop-blur">
              <CardContent className="p-4">
                <div className={`aspect-square rounded-lg ${badge.color} mb-2 flex items-center justify-center`}>
                  <Trophy className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="font-bold text-sm mb-1">{badge.title}</h3>
                <div className="flex">
                  {Array.from({ length: badge.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="p-4 mt-8 mb-12">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h2 className="font-bold mb-2">How to Start? 🎯</h2>
            <ol className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold">1</div>
                Create your explorer account
              </li>
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold">2</div>
                Choose your favorite badges
              </li>
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold">3</div>
                Complete fun challenges
              </li>
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold">4</div>
                Earn awesome badges!
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
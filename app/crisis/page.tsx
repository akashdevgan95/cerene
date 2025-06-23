import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, MessageCircle, Heart, AlertTriangle, Clock } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function CrisisResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/landing" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MindfulAI
              </span>
            </Link>
            <Link href="/landing">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Emergency Banner */}
        <Card className="mb-8 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              <h2 className="text-xl font-bold text-red-900 dark:text-red-100">Emergency Situations</h2>
            </div>
            <p className="text-red-800 dark:text-red-200 mb-4">
              If you are in immediate danger or having thoughts of suicide, please contact emergency services
              immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Call 911
              </Button>
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 988 (Suicide & Crisis Lifeline)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Crisis Resources</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            You are not alone. Help is available 24/7 through these trusted resources.
          </p>
        </div>

        {/* National Crisis Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">National Crisis Hotlines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-900 dark:text-blue-100">
                  <Phone className="w-5 h-5" />
                  <span>988 Suicide & Crisis Lifeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 dark:text-blue-200 mb-4">
                  Free and confidential emotional support for people in suicidal crisis or emotional distress.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-900 dark:text-blue-100">Call: 988</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-800 dark:text-blue-200">Chat: suicidepreventionlifeline.org</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-800 dark:text-blue-200">Available 24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-900 dark:text-green-100">
                  <MessageCircle className="w-5 h-5" />
                  <span>Crisis Text Line</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 dark:text-green-200 mb-4">
                  Free, 24/7 support for those in crisis. Text with a trained crisis counselor.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-900 dark:text-green-100">Text HOME to 741741</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-green-800 dark:text-green-200">Available 24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Specialized Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Specialized Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900 dark:text-purple-100">LGBTQ+ Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  The Trevor Project provides crisis support for LGBTQ+ youth.
                </p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Call:</strong> 1-866-488-7386
                  </p>
                  <p>
                    <strong>Text:</strong> START to 678-678
                  </p>
                  <p>
                    <strong>Chat:</strong> thetrevorproject.org
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-900 dark:text-orange-100">Veterans Crisis Line</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">Confidential support for veterans and their families.</p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Call:</strong> 1-800-273-8255, Press 1
                  </p>
                  <p>
                    <strong>Text:</strong> 838255
                  </p>
                  <p>
                    <strong>Chat:</strong> veteranscrisisline.net
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-pink-900 dark:text-pink-100">Domestic Violence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  National Domestic Violence Hotline provides support and resources.
                </p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Call:</strong> 1-800-799-7233
                  </p>
                  <p>
                    <strong>Text:</strong> START to 88788
                  </p>
                  <p>
                    <strong>Chat:</strong> thehotline.org
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-indigo-900 dark:text-indigo-100">Substance Abuse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">SAMHSA National Helpline for substance abuse treatment.</p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Call:</strong> 1-800-662-4357
                  </p>
                  <p>
                    <strong>Website:</strong> samhsa.gov
                  </p>
                  <p>
                    <strong>Available:</strong> 24/7
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-teal-900 dark:text-teal-100">Eating Disorders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  National Eating Disorders Association support and resources.
                </p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Call:</strong> 1-800-931-2237
                  </p>
                  <p>
                    <strong>Text:</strong> NEDA to 741741
                  </p>
                  <p>
                    <strong>Chat:</strong> nationaleatingdisorders.org
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-900 dark:text-red-100">Sexual Assault</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">RAINN National Sexual Assault Hotline provides support.</p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Call:</strong> 1-800-656-4673
                  </p>
                  <p>
                    <strong>Chat:</strong> rainn.org
                  </p>
                  <p>
                    <strong>Available:</strong> 24/7
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* International Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">International Resources</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Canada</h4>
                  <p className="text-sm text-muted-foreground">Talk Suicide Canada: 1-833-456-4566</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">United Kingdom</h4>
                  <p className="text-sm text-muted-foreground">Samaritans: 116 123</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Australia</h4>
                  <p className="text-sm text-muted-foreground">Lifeline: 13 11 14</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Ireland</h4>
                  <p className="text-sm text-muted-foreground">Samaritans: 116 123</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">New Zealand</h4>
                  <p className="text-sm text-muted-foreground">Lifeline: 0800 543 354</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">More Countries</h4>
                  <p className="text-sm text-muted-foreground">findahelpline.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Self-Care Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Immediate Self-Care Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Grounding Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • 5-4-3-2-1 technique: Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste
                  </li>
                  <li>• Deep breathing: Breathe in for 4, hold for 4, out for 4</li>
                  <li>• Progressive muscle relaxation</li>
                  <li>• Cold water on your face or hands</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Reach Out</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Call a trusted friend or family member</li>
                  <li>• Contact your therapist or counselor</li>
                  <li>• Go to a safe, public place</li>
                  <li>• Use a crisis hotline or text service</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Warning Signs */}
        <Card className="mb-8 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-900 dark:text-yellow-100">
              <AlertTriangle className="w-5 h-5" />
              <span>Warning Signs to Watch For</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">In Yourself:</h4>
                <ul className="space-y-1 text-yellow-800 dark:text-yellow-200 text-sm">
                  <li>• Thoughts of death or suicide</li>
                  <li>• Feeling hopeless or trapped</li>
                  <li>• Extreme mood changes</li>
                  <li>• Withdrawing from others</li>
                  <li>• Increased substance use</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">In Others:</h4>
                <ul className="space-y-1 text-yellow-800 dark:text-yellow-200 text-sm">
                  <li>• Talking about wanting to die</li>
                  <li>• Looking for ways to kill themselves</li>
                  <li>• Talking about feeling hopeless</li>
                  <li>• Giving away possessions</li>
                  <li>• Saying goodbye to loved ones</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 border-pink-200 dark:border-pink-800">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Remember: You Are Not Alone</h3>
            <p className="text-muted-foreground mb-6">
              Crisis situations are temporary. Help is available, and recovery is possible. Reach out for support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                <Phone className="w-4 h-4 mr-2" />
                Call 988 Now
              </Button>
              <Link href="/contact">
                <Button variant="outline">Contact Our Support Team</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}

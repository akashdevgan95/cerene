import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Database, UserCheck } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/landing" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your privacy is our top priority. Learn how we protect and handle your personal information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last updated: December 17, 2024</p>
        </div>

        {/* Quick Overview */}
        <Card className="mb-8 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-900 dark:text-blue-100">
              <Eye className="w-5 h-5" />
              <span>Privacy at a Glance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-800 dark:text-blue-200">End-to-end encryption</span>
            </div>
            <div className="flex items-center space-x-3">
              <Database className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-800 dark:text-blue-200">No data selling</span>
            </div>
            <div className="flex items-center space-x-3">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-800 dark:text-blue-200">HIPAA compliant</span>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>1. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>
            When you create an account with MindfulAI, we collect basic information such as your name, email address,
            and therapy preferences. This information is necessary to provide you with personalized therapy sessions.
          </p>

          <h3>Therapy Session Data</h3>
          <p>
            All conversations with our AI therapist are encrypted and stored securely. We use this data solely to
            improve your therapy experience and provide continuity across sessions. Your therapy data is never shared
            with third parties.
          </p>

          <h3>Usage Analytics</h3>
          <p>
            We collect anonymized usage data to understand how our service is used and to improve the platform. This
            includes session duration, feature usage, and technical performance metrics.
          </p>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Provide personalized AI therapy sessions</li>
            <li>Maintain conversation history and context</li>
            <li>Send important service updates and notifications</li>
            <li>Improve our AI models and therapy techniques</li>
            <li>Ensure platform security and prevent abuse</li>
          </ul>

          <h2>3. Data Protection & Security</h2>
          <p>We implement industry-leading security measures to protect your data:</p>
          <ul>
            <li>
              <strong>End-to-End Encryption:</strong> All therapy conversations are encrypted using AES-256 encryption
            </li>
            <li>
              <strong>HIPAA Compliance:</strong> We follow strict healthcare data protection standards
            </li>
            <li>
              <strong>Secure Infrastructure:</strong> Our servers are hosted in SOC 2 compliant data centers
            </li>
            <li>
              <strong>Access Controls:</strong> Only authorized personnel can access systems, never your personal data
            </li>
          </ul>

          <h2>4. Data Sharing & Third Parties</h2>
          <p>
            We do not sell, rent, or share your personal information with third parties for marketing purposes. We may
            share anonymized, aggregated data for research purposes to advance mental health care.
          </p>

          <h3>Service Providers</h3>
          <p>
            We work with trusted service providers who help us operate our platform. These providers are bound by strict
            confidentiality agreements and can only access data necessary for their specific services.
          </p>

          <h2>5. Your Rights & Choices</h2>
          <ul>
            <li>
              <strong>Access:</strong> Request a copy of your personal data
            </li>
            <li>
              <strong>Correction:</strong> Update or correct your information
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your account and data
            </li>
            <li>
              <strong>Portability:</strong> Export your therapy session history
            </li>
            <li>
              <strong>Opt-out:</strong> Unsubscribe from marketing communications
            </li>
          </ul>

          <h2>6. Data Retention</h2>
          <p>
            We retain your therapy session data for as long as your account is active. If you delete your account, we
            will permanently delete your personal data within 30 days, except where required by law.
          </p>

          <h2>7. International Data Transfers</h2>
          <p>
            Your data is primarily stored in secure data centers within the United States. If you access our service
            from outside the US, your data may be transferred to and processed in the US under appropriate safeguards.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our service is not intended for children under 13. We do not knowingly collect personal information from
            children under 13. If you believe we have collected such information, please contact us immediately.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any material changes by email or
            through our service. Your continued use of MindfulAI after such changes constitutes acceptance of the
            updated policy.
          </p>

          <h2>10. Contact Us</h2>
          <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
          <ul>
            <li>Email: privacy@mindfulai.com</li>
            <li>Address: 123 Privacy Street, San Francisco, CA 94105</li>
            <li>Phone: 1-800-MINDFUL</li>
          </ul>
        </div>

        {/* CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Questions about your privacy?</h3>
            <p className="text-muted-foreground mb-6">
              Our privacy team is here to help. Contact us with any questions or concerns.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Contact Privacy Team
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}

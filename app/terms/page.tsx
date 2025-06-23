import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, Scale } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/landing" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CereneAI
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
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using CereneAI services.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: December 17, 2024
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-900 dark:text-orange-100">
              <AlertTriangle className="w-5 h-5" />
              <span>Important Notice</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-800 dark:text-orange-200">
              CereneAI is not a replacement for professional mental health care.
              If you are experiencing a mental health crisis, please contact
              emergency services or call the 988 Suicide & Crisis Lifeline
              immediately.
            </p>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using CereneAI ("the Service"), you agree to be
            bound by these Terms of Service ("Terms"). If you do not agree to
            these Terms, you may not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            CereneAI provides AI-powered mental health support through
            conversational therapy sessions. Our service is designed to
            supplement, not replace, professional mental health care.
          </p>

          <h3>Service Limitations</h3>
          <ul>
            <li>CereneAI is not a licensed mental health professional</li>
            <li>The service cannot diagnose mental health conditions</li>
            <li>
              Emergency situations require immediate professional intervention
            </li>
            <li>
              The AI may not always provide perfect or appropriate responses
            </li>
          </ul>

          <h2>3. User Eligibility</h2>
          <p>
            You must be at least 18 years old to use CereneAI. Users between
            13-17 may use the service with parental consent and supervision.
          </p>

          <h2>4. User Responsibilities</h2>
          <h3>Appropriate Use</h3>
          <ul>
            <li>
              Use the service for its intended mental health support purpose
            </li>
            <li>Provide accurate information during registration</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Report any technical issues or inappropriate AI responses</li>
          </ul>

          <h3>Prohibited Activities</h3>
          <ul>
            <li>Attempting to reverse engineer or manipulate the AI system</li>
            <li>Using the service for illegal activities</li>
            <li>Sharing your account with others</li>
            <li>Attempting to extract or misuse other users' data</li>
          </ul>

          <h2>5. Privacy and Data Protection</h2>
          <p>
            Your privacy is important to us. Please review our{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>{" "}
            to understand how we collect, use, and protect your information.
          </p>

          <h2>6. Subscription and Billing</h2>
          <h3>Free Trial</h3>
          <p>
            New users receive a 7-day free trial. You may cancel at any time
            during the trial period without charge.
          </p>

          <h3>Subscription Plans</h3>
          <ul>
            <li>Subscriptions are billed monthly or annually</li>
            <li>Prices are subject to change with 30 days notice</li>
            <li>Refunds are provided according to our refund policy</li>
            <li>You may cancel your subscription at any time</li>
          </ul>

          <h2>7. Intellectual Property</h2>
          <p>
            CereneAI and all related content, features, and functionality are
            owned by us and protected by international copyright, trademark, and
            other intellectual property laws.
          </p>

          <h2>8. Disclaimers and Limitations</h2>
          <h3>Medical Disclaimer</h3>
          <p>
            CereneAI is not a medical device and does not provide medical
            advice, diagnosis, or treatment. Always consult with qualified
            healthcare professionals for medical concerns.
          </p>

          <h3>Service Availability</h3>
          <p>
            We strive to maintain 99.9% uptime but cannot guarantee
            uninterrupted service. We are not liable for temporary service
            interruptions.
          </p>

          <h2>9. Crisis Situations</h2>
          <p>
            If you are experiencing thoughts of self-harm or suicide, please
            immediately contact:
          </p>
          <ul>
            <li>Emergency Services: 911</li>
            <li>988 Suicide & Crisis Lifeline: 988</li>
            <li>Crisis Text Line: Text HOME to 741741</li>
          </ul>

          <h2>10. Termination</h2>
          <p>
            You may terminate your account at any time. We may terminate or
            suspend your account for violation of these Terms or for any other
            reason with reasonable notice.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. Material changes will be
            communicated via email or through the service. Continued use after
            changes constitutes acceptance.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of California,
            United States, without regard to conflict of law principles.
          </p>

          <h2>13. Contact Information</h2>
          <p>For questions about these Terms, contact us:</p>
          <ul>
            <li>Email: legal@CereneAI.com</li>
            <li>Address: 123 Legal Street, San Francisco, CA 94105</li>
            <li>Phone: 1-800-MINDFUL</li>
          </ul>
        </div>

        {/* CTA */}
        <Card className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-purple-200 dark:border-purple-800">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Ready to get started?
            </h3>
            <p className="text-muted-foreground mb-6">
              By using CereneAI, you agree to these terms and our commitment to
              your mental wellness.
            </p>
            <Link href="/?from=landing">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Start Your Journey
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

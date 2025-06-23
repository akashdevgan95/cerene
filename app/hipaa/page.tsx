import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, FileCheck, Users, Database, Award } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function HIPAACompliancePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/landing" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
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
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">HIPAA Compliance</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            MindfulAI meets the highest standards for healthcare data protection and privacy.
          </p>
          <Badge className="mt-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
            ✓ HIPAA Compliant Platform
          </Badge>
        </div>

        {/* Compliance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
            <CardHeader className="text-center">
              <Lock className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <CardTitle className="text-green-900 dark:text-green-100">Data Encryption</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 dark:text-green-200 text-sm text-center">
                All PHI is encrypted in transit and at rest using AES-256 encryption
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
            <CardHeader className="text-center">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <CardTitle className="text-blue-900 dark:text-blue-100">Access Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 dark:text-blue-200 text-sm text-center">
                Strict role-based access controls and audit logging for all data access
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20">
            <CardHeader className="text-center">
              <Database className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <CardTitle className="text-purple-900 dark:text-purple-100">Secure Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800 dark:text-purple-200 text-sm text-center">
                SOC 2 Type II certified data centers with 24/7 monitoring
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>What is HIPAA?</h2>
          <p>
            The Health Insurance Portability and Accountability Act (HIPAA) is a federal law that establishes national
            standards for protecting sensitive patient health information. As a digital health platform, MindfulAI is
            committed to full HIPAA compliance.
          </p>

          <h2>Our HIPAA Compliance Measures</h2>

          <h3>Administrative Safeguards</h3>
          <ul>
            <li>
              <strong>Security Officer:</strong> Designated HIPAA security officer responsible for compliance oversight
            </li>
            <li>
              <strong>Workforce Training:</strong> All employees receive comprehensive HIPAA training
            </li>
            <li>
              <strong>Access Management:</strong> Minimum necessary access principles for all PHI
            </li>
            <li>
              <strong>Incident Response:</strong> Documented procedures for security incidents and breaches
            </li>
          </ul>

          <h3>Physical Safeguards</h3>
          <ul>
            <li>
              <strong>Facility Access:</strong> Secure data centers with biometric access controls
            </li>
            <li>
              <strong>Workstation Security:</strong> Encrypted devices and secure remote access protocols
            </li>
            <li>
              <strong>Media Controls:</strong> Secure disposal and reuse of electronic media
            </li>
          </ul>

          <h3>Technical Safeguards</h3>
          <ul>
            <li>
              <strong>Access Control:</strong> Unique user identification and automatic logoff
            </li>
            <li>
              <strong>Audit Controls:</strong> Comprehensive logging of all system access and activities
            </li>
            <li>
              <strong>Integrity:</strong> Electronic PHI protection against improper alteration
            </li>
            <li>
              <strong>Transmission Security:</strong> End-to-end encryption for all data transmission
            </li>
          </ul>

          <h2>Business Associate Agreements</h2>
          <p>
            All third-party vendors who may have access to PHI sign comprehensive Business Associate Agreements (BAAs)
            that ensure HIPAA compliance throughout our service ecosystem.
          </p>

          <h2>Patient Rights Under HIPAA</h2>
          <p>As a MindfulAI user, you have the following rights regarding your health information:</p>
          <ul>
            <li>
              <strong>Right to Access:</strong> Request copies of your therapy session records
            </li>
            <li>
              <strong>Right to Amend:</strong> Request corrections to your health information
            </li>
            <li>
              <strong>Right to Restrict:</strong> Request limitations on how your PHI is used
            </li>
            <li>
              <strong>Right to Accounting:</strong> Receive a list of disclosures of your PHI
            </li>
            <li>
              <strong>Right to Notification:</strong> Be notified of any breaches affecting your PHI
            </li>
          </ul>

          <h2>Data Breach Prevention</h2>
          <p>We employ multiple layers of security to prevent data breaches:</p>
          <ul>
            <li>24/7 security monitoring and threat detection</li>
            <li>Regular penetration testing and vulnerability assessments</li>
            <li>Multi-factor authentication for all system access</li>
            <li>Encrypted databases with regular security updates</li>
            <li>Incident response team ready to address any security concerns</li>
          </ul>

          <h2>Compliance Auditing</h2>
          <p>
            MindfulAI undergoes regular third-party security audits and maintains SOC 2 Type II certification. Our
            compliance program includes:
          </p>
          <ul>
            <li>Annual HIPAA risk assessments</li>
            <li>Quarterly security reviews</li>
            <li>Continuous monitoring of compliance metrics</li>
            <li>Regular updates to policies and procedures</li>
          </ul>

          <h2>Reporting Security Concerns</h2>
          <p>
            If you have any security concerns or suspect a potential HIPAA violation, please contact our security team
            immediately:
          </p>
          <ul>
            <li>Email: security@mindfulai.com</li>
            <li>Phone: 1-800-MINDFUL (24/7 security hotline)</li>
            <li>Address: HIPAA Security Officer, 123 Security Blvd, San Francisco, CA 94105</li>
          </ul>
        </div>

        {/* Certifications */}
        <Card className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-center text-foreground">Our Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <FileCheck className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <h4 className="font-semibold text-foreground">HIPAA Compliant</h4>
                <p className="text-sm text-muted-foreground">Full compliance with healthcare privacy regulations</p>
              </div>
              <div>
                <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <h4 className="font-semibold text-foreground">SOC 2 Type II</h4>
                <p className="text-sm text-muted-foreground">Certified secure data handling and processing</p>
              </div>
              <div>
                <Award className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <h4 className="font-semibold text-foreground">ISO 27001</h4>
                <p className="text-sm text-muted-foreground">International security management standards</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Questions about our HIPAA compliance?</h3>
            <p className="text-muted-foreground mb-6">
              Our compliance team is available to answer any questions about our security and privacy practices.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Contact Compliance Team
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}

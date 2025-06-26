import {
  Html,
  Text,
  Container,
  Tailwind,
  Heading,
  Hr,
} from "@react-email/components";

// OTP Email Template
export const WaitlistOTPEmail = ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => (
  <Tailwind>
    <Html lang="en">
      <Container className="bg-white p-6 rounded-lg shadow-md text-black font-sans">
        <Heading className="text-xl font-semibold mb-4 text-purple-500">
          Your CereneAI Verification Code
        </Heading>
        <Text className="text-base mb-2">Hi there,</Text>
        <Text className="text-base mb-2">
          Your OTP code for verifying{" "}
          <strong className="text-purple-500">{email}</strong> is:
        </Text>
        <Text className="text-3xl font-bold text-center py-4 tracking-widest text-purple-500">
          {otp}
        </Text>
        <Text className="text-sm text-gray-500 mb-6">
          This code will expire in 5 minutes. If you didn't request this, you
          can safely ignore this email.
        </Text>
        <Hr />
        <Text className="text-xs text-gray-400 mt-4 text-center">
          CereneAI • AI-powered therapy, reimagined for you
        </Text>
      </Container>
    </Html>
  </Tailwind>
);

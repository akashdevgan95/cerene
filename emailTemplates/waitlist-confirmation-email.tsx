import {
  Html,
  Text,
  Container,
  Tailwind,
  Heading,
  Hr,
  Button,
} from "@react-email/components";

export const WaitlistConfirmationEmail = ({ email }: { email: string }) => (
  <Tailwind>
    <Html lang="en">
      <Container className="bg-white p-6 rounded-lg shadow-md text-black font-sans">
        <Heading className="text-xl font-semibold mb-4 text-purple-500">
          Welcome to the CereneAI Waitlist!
        </Heading>
        <Text className="text-base mb-4">Hi there,</Text>
        <Text className="text-base mb-4">
          Your email <strong className="text-purple-500">{email}</strong> has
          been successfully verified and added to the waitlist.
        </Text>
        <Text className="text-sm text-gray-500 mb-6">
          We'll let you know when your spot becomes available. In the meantime,
          feel free to share CereneAI with friends and get early access perks!
        </Text>

        <Button
          href="https://cerene.ai"
          className="bg-purple-500 text-white font-medium px-6 py-3 mx-auto rounded-md text-sm hover:opacity-90"
        >
          Share CereneAI
        </Button>
        <Hr />
        <Text className="text-xs text-gray-400 mt-4 text-center">
          CereneAI • Empowering mental wellness, privately
        </Text>
      </Container>
    </Html>
  </Tailwind>
);

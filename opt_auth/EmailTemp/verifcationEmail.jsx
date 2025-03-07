import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Container,
} from "@react-email/components";

export default function verifaction({ username, otp }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <style>
          {`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>
      </Head>

      <Preview>Verify your account with this OTP: {otp}</Preview>

      <Section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: "40px 20px",
          borderRadius: "16px",
        }}
      >
        <Container
          style={{
            textAlign: "center",
            padding: "32px",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Heading
            as="h2"
            style={{
              color: "#ffffff",
              marginBottom: "16px",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Hello {username},
          </Heading>
          <Text
            style={{
              fontSize: "16px",
              color: "#cbd5e1",
              marginBottom: "24px",
              lineHeight: "1.6",
            }}
          >
            Thank you for signing up! To complete your registration, please use
            the one-time verification code below:
          </Text>

          {/* OTP Box */}
          <Text
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              background:
                "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
              backgroundSize: "200% 200%",
              animation: "gradient 15s ease infinite",
              padding: "16px 32px",
              borderRadius: "8px",
              display: "inline-block",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              letterSpacing: "8px",
              color: "#ffffff",
              marginBottom: "24px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            {otp}
          </Text>

          <Text
            style={{
              fontSize: "14px",
              color: "#94a3b8",
              marginBottom: "24px",
            }}
          >
            Copy this code and paste it on the verification page.
          </Text>

          {/* Verification Button */}
          <Button
            href="https://your-website.com/verify"
            style={{
              background:
                "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
              backgroundSize: "200% 200%",
              animation: "gradient 15s ease infinite",
              color: "#ffffff",
              padding: "16px 32px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              display: "inline-block",
              marginTop: "8px",
              marginBottom: "24px",
              textDecoration: "none",
              border: "none",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            Verify Your Account
          </Button>

          <Text
            style={{
              fontSize: "14px",
              color: "#94a3b8",
              marginTop: "16px",
            }}
          >
            If you did not request this verification, you can safely ignore this
            email.
          </Text>
        </Container>
      </Section>

      <Text
        style={{
          fontSize: "12px",
          textAlign: "center",
          marginTop: "24px",
          color: "#64748b",
        }}
      >
        This is an automated message. Please do not reply.
      </Text>
    </Html>
  );
}

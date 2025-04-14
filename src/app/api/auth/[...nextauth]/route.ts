import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET || "",
            authorization: {
                params: {
                    scope: "openid email profile",
                }
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
            authorization: {
                params: {
                    scope: "read:user user:email",
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Check if this is a callback URL from auth provider
            if (url.includes('/api/auth/signin/')) {
                return `${baseUrl}/`;
            }
            return baseUrl;
        }
    },
    pages: {
        signIn: "/api/auth/signin",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "#0070f3", // Hex color code
        logo: "/logo.png", // Absolute URL to image
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
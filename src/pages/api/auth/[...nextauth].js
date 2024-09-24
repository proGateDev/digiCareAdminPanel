// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { apiEndpoints } from "../../../../contsants/endPoints";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  
  callbacks: {
    // This callback is called whenever a user signs in
    async signIn({ user, account, profile }) {
      // You can access user information here
      const userData = {
        name: user.name,
        email: user.email,
        image: user.image,
        accessToken: account.access_token,
        provider: account.provider,
      };

      console.log(userData);

      // Make an API call to your backend to store this data
      try {
        const response = await fetch(apiEndpoints.userSignUp, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),  // Send user data to backend
        });

        if (!response.ok) {
          throw new Error("Failed to store user in the backend");
        }

        console.log('User stored successfully');
      } catch (error) {
        console.error('Error saving user:', error);
        return false; // Return false if you want to stop the login process in case of failure
      }

      return true; // Continue the login process
    },
  },
};

export default NextAuth(authOptions);

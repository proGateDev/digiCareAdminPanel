import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "../component/Layouts/DefaultLayout";
import axios from "axios";
import useAuth from "../hooks/useAuth"; 
import Swal from 'sweetalert2';

export default function Profile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { getJwtToken } = useAuth();
  const bearerToken = getJwtToken();

  const getProfile = async () => {
    try {
      const response = await axios.get('http://192.168.0.172:8000/user/profile', {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      });
      console.log(response)
      const { user } = response.data;

      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.mobile || ""); 
    } catch (error) {
      Swal.fire({
        title: "Session expired!",
        text: error?.response?.data?.response,
        icon: "error"
    });
    // router.push('/login');
    }
  };

  useEffect(() => {
    getProfile();
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) {
      setError("Please fill in all required fields.");
    } else {
      setError("");
      console.log({ email, password, name, phone });
    }
  };

  return (
    <DefaultLayout>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  )
}

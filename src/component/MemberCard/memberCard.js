"use client"

import axios from "axios";
import React, { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2';
import { Router, useRouter } from "next/router";
import Image from "next/image";

export default function MemberCard() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getJwtToken } = useAuth()
    const token = getJwtToken()
    const router = useRouter();

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get('http://192.168.0.172:8000/user/members', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMembers(response.data.members);
            } catch (err) {

                Swal.fire({
                    title: "Session expired!",
                    text: err?.response?.data?.response,
                    icon: "error"
                });
                router.push('/login')
            } finally {
                setLoading(false);
            }
        }
        fetchMembers();
    }, [])

    if (loading) return <p>Loading Members....</p>;
    if (error) return <p className="text-red">{error}</p>;

    return (
        <>
            <div className="m-4">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members?.map((member) => (
                        <li
                            key={member._id}
                            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="bg-gray-100 p-3 rounded-full text-gray-500">
                                    <Image
                                        width={40}
                                        height={40}
                                        src={`/images/${member.isApproved ? "approved" : "pending"}.png`}
                                        alt="Logo"
                                        priority
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                            </div>

                            <div className="space-y-2">
                                <p>
                                    <strong>Email:</strong> {member.email}
                                </p>
                                <p>
                                    <strong>Mobile:</strong> {member.mobile}
                                </p>
                                <p>
                                    <strong>Role:</strong> {member.role}
                                </p>
                                <p>
                                    <strong>Group Type:</strong> {member.groupType}
                                </p>
                            </div>

                            <button className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                                View Profile
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>

    )
}
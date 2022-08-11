import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm, Link } from "@inertiajs/inertia-react";

export default function Clients(props) {
    const { data, setData, errors, post } = useForm({
        name: "",
        identification: "",
        address: "",
        telephone: "",
        email: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        post(route("clients.store"));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create client
                </h2>
            }
        >
            <Head title="Clients" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("clients.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Name</label>

                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />

                                        <span className="text-red-600">
                                            {errors.name}
                                        </span>
                                    </div>

                                    <div className="mb-0">
                                        <label className="">
                                            Identification
                                        </label>

                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Identification"
                                            name="identification"
                                            errors={(errors, "identification")}
                                            value={data.identification}
                                            onChange={(e) =>
                                                setData(
                                                    "identification",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <span className="text-red-600">
                                            {errors.identification}
                                        </span>
                                    </div>

                                    <div className="mb-0">
                                        <label className="">Address</label>

                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Address"
                                            name="address"
                                            errors={(errors, "address")}
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <span className="text-red-600">
                                            {errors.address}
                                        </span>
                                    </div>

                                    <div className="mb-0">
                                        <label className="">Telephone</label>

                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Telephone"
                                            name="telephone"
                                            errors={(errors, "telephone")}
                                            value={data.telephone}
                                            onChange={(e) =>
                                                setData(
                                                    "telephone",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <span className="text-red-600">
                                            {errors.telephone}
                                        </span>
                                    </div>

                                    <div className="mb-0">
                                        <label className="">Email</label>

                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Email"
                                            name="email"
                                            errors={(errors, "email")}
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />

                                        <span className="text-red-600">
                                            {errors.email}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

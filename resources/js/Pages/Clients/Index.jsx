import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";

export default function Clients(props) {
    const { clients } = usePage().props;

    function destroy(e) {
        if (confirm("Are you sure you want to delete this client?")) {
            Inertia.delete(route("clients.destroy", e.currentTarget.id));
        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Clients
                </h2>
            }
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={route("clients.create")}
                                >
                                    Create client
                                </Link>
                            </div>

                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 w-20">No.</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">
                                            Identification
                                        </th>
                                        <th className="px-4 py-2">Address</th>
                                        <th className="px-4 py-2">
                                            Ientification
                                        </th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {clients.data.map(
                                        ({
                                            id,
                                            name,
                                            identification,
                                            address,
                                            telephone,
                                            email,
                                        }) => (
                                            <tr>
                                                <td className="border px-4 py-2">
                                                    {id}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {name}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {identification}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {address}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {telephone}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {email}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    <Link
                                                        tabIndex="1"
                                                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                        href={route(
                                                            "clients.edit",
                                                            id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={destroy}
                                                        id={id}
                                                        tabIndex="-1"
                                                        type="button"
                                                        className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}

                                    {clients.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="4"
                                            >
                                                No clients found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <Pagination class="mt-6" links={clients.links} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
